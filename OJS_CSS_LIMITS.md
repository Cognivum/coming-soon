# OJS: What CSS Can and Cannot Change

This checklist is tailored for your current OJS approach (no PHP/core edits unless necessary).

## CSS Can Change

- Colors, fonts, spacing, borders, shadows
- Element sizing (logo height/width constraints)
- Visual order (limited, with flex/grid)
- Hide/show visual blocks (`display: none`)
- Responsive behavior

## CSS Cannot Reliably Change

- Link target URLs (`href`) such as logo destination
- Menu item source logic and visibility conditions
- Generated text from backend translations/logic
- Routing behavior (`index.php`, `/index`, redirects)
- Journal/site data coming from OJS settings or database

## Requires Template Override (Theme)

- Changing logo link from journal home to publisher home
- Replacing/removing hardcoded footer brand markup
- Structural header/footer rewrites beyond pure styling
- Reordering elements when DOM order is fixed by template logic

## Requires Server/Config (Not CSS)

- Removing `index.php` from URLs (`restful_urls + mod_rewrite`)
- Canonical redirects (`/journal/index` -> `/journal`)
- Host, SSL, rewrite, cache behavior

## Practical Rule

1. Use OJS Admin + custom CSS first.
2. If behavior/URL/target cannot change, use theme template override.
3. Keep overrides minimal and version-controlled.
