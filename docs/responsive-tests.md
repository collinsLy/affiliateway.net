# Responsive Test Cases

## Viewports
- Mobile: 360x640, 390x844, 414x896
- Tablet: 768x1024, 834x1112
- Desktop: 1280x800, 1440x900

## Scenarios
- Header: logo, title, actions aligned; title hides <md.
- Cards: width constrained to container, spacing consistent.
- Charts: tooltips readable; axes labels do not overflow.
- Pie chart: center label readable; legend wraps gracefully.
- Buttons: hit area >=44px height; focus outline visible.

## Steps
- Resize and verify layout matches reference proportions.
- Check hover/focus states with keyboard and mouse.
- Validate performance: interactions under 100ms.

## Acceptance
- No horizontal scroll.
- Tap targets meet size rules.
- Text readable; lines do not clip.

