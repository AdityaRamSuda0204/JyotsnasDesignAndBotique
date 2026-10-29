# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

**Note**: feel free to use the package manager of your choice.

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

The development server compiles an unminified JavaScript bundle and runs
hot-module reload, so its first load is slower than the finished site. To
preview the optimized production build locally, run:

```bash
npm run build
npm run serve
```

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Storefront data

The storefront is static and currently reads mock catalog data from
`src/data/store.json`. Components use the normalized accessors in
`src/lib/storeData.js`; keep any future API response mapping inside that
adapter so the UI does not depend on a particular data source or response
shape. Wishlist and cart selections are stored locally in the browser. Login
and authentication flows are not included.

The Docusaurus docs and blog plugins are disabled while this is a storefront.
Below-the-fold editorial and category images are lazy-loaded to avoid delaying
the initial view. Storefront imagery is served from `static/img/store` instead
of waiting on an external image service.

Cart and wishlist persistence are isolated in `src/lib/cartStorage.js` and
`src/lib/wishlist.js` so browser storage can later be replaced by API calls
without changing storefront components. The WhatsApp checkout contact is
configured under `config` in `src/data/store.json`. Checkout opens WhatsApp
with the order prefilled; the customer reviews and sends the message there.

Products use `priceType: "fixed"` with `price`, or
`priceType: "range"` with `minPrice` and `maxPrice` for made-to-order designs.
The shared pricing helpers format both kinds consistently across product cards,
details, the cart, and WhatsApp checkout. The shared brand logo is used for the
header, favicon, and social sharing image.

## Deployment

The site is configured for
`https://adityaramsuda0204.github.io/JyotsnasDesignAndBotique/`. A GitHub Actions
workflow builds and deploys the site whenever changes are pushed to `main`.

In the repository settings, open **Pages** and set the build and deployment
source to **GitHub Actions**. The first deployment runs after the workflow is
pushed to GitHub. To preview a production build locally, use the commands in
the [Build](#build) section.
