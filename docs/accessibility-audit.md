# Accessibility Audit (WCAG 2.1 AA)

## Semantics
- Header uses interactive controls with labels (logo link, language button, logout button).
- Charts have descriptive labels and tooltips for data points.

## Keyboard
- All controls focusable in tab order.
- Focus indicators visible.

## Contrast
- Text vs background meets AA (checked against palette in `index.css`).
- Disabled/muted states remain legible.

## ARIA
- Logo link: `aria-label="Go to dashboard"`.
- Logout button: `aria-label="Log out"`.
- Chart containers: accessible tooltips provide values.

## Media
- Responsive typography adapts without loss of structure.

## Known Deviations
- Recharts SVGs have limited native accessibility; tooltips compensate. Further enhancement may include offscreen table summaries.

## Recommendations
- Add skip links if more sections are added.
- Provide language selector with menu role if localization is implemented.

