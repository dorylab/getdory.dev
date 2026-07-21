# Design QA

- Source visual truth path: `/var/folders/8t/5d4kjsy95pdb46sy3x204z8w0000gn/T/codex-clipboard-0d2c37bc-db07-4369-b3d1-511c680350d5.png`
- Implementation screenshot path: unavailable; local Browser capture was blocked by the Browser URL security policy.
- Viewport: source image 2048 × 1125 px; implementation comparison viewport could not be captured.
- State: Chinese locale, light theme, top of `/zh/for-humans`.

## Full-view comparison evidence

The source image was opened and inspected. It shows an oversized two-line hero heading, tight heading leading, excessive first-screen vertical space, and a weak transition into the first product section. A rendered post-change screenshot could not be captured, so a visual before/after comparison is unavailable.

## Focused region comparison evidence

Focused comparison was not possible without the rendered implementation screenshot. The intended focus regions were the hero typography, hero-to-first-section transition, section heading rhythm, and product-frame alignment.

## Findings

- [P2] Post-change visual alignment is not yet confirmed.
  - Location: `/zh/for-humans`, desktop light theme.
  - Evidence: source screenshot is available, but the Browser security policy blocked the implementation capture.
  - Impact: the production build is valid, but typography wrapping and section balance still need a rendered visual check.
  - Fix: capture the page at the matching viewport, compare it with the source, and adjust any remaining wrapping or spacing drift.

## Comparison history

### Iteration 1

- Earlier findings: oversized CJK hero type, overly tight display leading, broad hero whitespace, inconsistent section spacing, and a negative image offset that pulled one product section off the shared grid.
- Fixes made: added CJK-aware hero sizing, increased hero line height, narrowed the content measure, normalized five section grids and vertical spacing, removed the large negative media offset, and unified product-frame radius and shadow treatment.
- Post-fix visual evidence: unavailable because the local Browser capture was blocked.

## Implementation checks

- `pnpm types:check`: passed.
- `pnpm build`: passed.

final result: blocked
