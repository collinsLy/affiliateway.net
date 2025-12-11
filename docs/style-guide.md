# Dashboard Style Guide

## Layout
- Container: `max-width: 640px`, centered, `px-4`, vertical spacing `24px`.
- Header: 64px height, black background, logo left, title centered, actions right.
- Cards: white background, subtle shadow, rounded `20px`, consistent `padding: 28px`.

## Colors
- Background: `#F3F6FD` (HSL 220 33% 97%).
- Primary: `#3B82F6` (HSL 221 83% 53%).
- Text: dark `#111827` and muted `#9CA3AF`.
- Chart palette: `--chart-1` to `--chart-5` defined in `client/src/index.css`.

## Typography
- Font family: `Plus Jakarta Sans`, fallback `Inter`, sans-serif.
- Title: 17px, medium.
- Stat total: 40px, bold.
- Stat labels: 13px, muted.
- Body: 15px normal.

## Iconography
- Lucide icons sized 16–24px, muted gray except active states.

## Spacing
- Card internal gap: `28px`.
- Grid gaps: `16px`.
- Section spacing: `24px`.

## Effects
- Card shadow: soft drop for depth.
- Chart areas: gradient fills, 1.5px strokes.
- Hover: opacity or color transitions `200ms` ease-out.

## Components
- Header: nav with accessible labels.
- Stat cards: total, verified, not verified blocks.
- Area charts: marketing and sharing with tooltips.
- Pie chart: donut, tooltip, legend.

## Located Zone
- Row density: line-height 1.2, compact bottom padding.
- Quantity weight: 600 for numeric emphasis without heaviness.
- Button: contained within the card footer with full-width alignment.
