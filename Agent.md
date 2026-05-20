# Agent Notes

## Multilingual Documentation

When changing public documentation or user-facing copy, keep all supported locales in sync.

- English is the default source content.
- Update matching Chinese (`.zh.mdx`), Spanish (`.es.mdx`), and Japanese (`.ja.mdx`) files when the same page exists in those locales.
- If a change removes content, remove it from every localized version too.
- If only one locale is intentionally changed, call that out explicitly in the final response.

## Database Icons

When adding or replacing database icons, source the SVG from the Database category on theSVG:

- https://www.thesvg.org/?category=Database
- Prefer the upstream CDN asset under `https://cdn.jsdelivr.net/gh/GLINCKER/thesvg@main/public/icons/{slug}/default.svg`.
- Keep local filenames under `public/icons/databases/` stable and descriptive.
