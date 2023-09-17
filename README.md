# OpenMage Visual Testing

This repo contains code to visually test a blank OpenMage instance using [Cypress](https://www.cypress.io/).
It can be used as a starting point to a specific shop running OpenMage aswell.

## How to use

Install via `npm i`.

Use scripts from `package.json`:

`npm run <script>`

| Script     | What does it do                                                                                           |
|------------|-----------------------------------------------------------------------------------------------------------|
| lint       | Runs eslint with rules defined in `.eslintrc.js`                                                          |
| cy:ui:test | Runs the suites headless, execute this when testing for regressions.                                      |
| cy:ui:dev  | Runs tests in devmode, meaning you'll see the normal cypress window which is helpful while writing tests. |
