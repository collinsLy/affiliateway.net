const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

async function run() {
  const refPath = path.resolve('tests/reference/dashboard.png');
  const outDir = path.resolve('tests/output');
  const curPath = path.join(outDir, 'dashboard-current.png');
  const diffPath = path.join(outDir, 'dashboard-diff.png');

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 738 } });
  await page.goto('http://localhost:5000/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const root = await page.locator('main.container');
  await root.screenshot({ path: curPath });
  await browser.close();

  if (!fs.existsSync(refPath)) {
    console.log('Reference image missing. Saved current screenshot to:', curPath);
    console.log('Place your reference at:', refPath, 'and re-run.');
    process.exit(0);
  }

  const img1 = PNG.sync.read(fs.readFileSync(refPath));
  const img2 = PNG.sync.read(fs.readFileSync(curPath));

  const { width, height } = img1;
  if (img2.width !== width || img2.height !== height) {
    console.error('Image size mismatch:', refPath, img1.width, img1.height, 'vs', curPath, img2.width, img2.height);
    process.exit(2);
  }

  const diff = new PNG({ width, height });
  const mismatch = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  console.log('Pixel differences:', mismatch);
  console.log('Diff written to:', diffPath);
  if (mismatch > 0) process.exit(1);
}

run().catch((e) => { console.error(e); process.exit(1); });

