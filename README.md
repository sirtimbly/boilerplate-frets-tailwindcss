# boilerplate-frets-tailwindcss
Boilerplate project with FRETS, tailwindcss, parcel, and xo all configured properly

## Install

Clone this repository locally.

From the command line run   `yarn` (or `npm install`)

## Development

`yarn dev` (or `npm run dev`)

This launches parcel, which runs a local dev server at [localhost:1234](http://localhost:1234) by default. Parcel will watch for changes and recompile and refresh the browser.

It will also launch the frets-styles-generator in watch mode, which creates convenient typescript class files with everything that exists the CSS. It correctly runs Tailwind and you will have access to tailwind as well as your custom CSS classes while writing UI functions.

eg.

```ts
import {$} from './styles/app-styles.ts'
const helloNode = $.div.p_2.mxAuto.textCenter.h('hello')
```

## Production

TODO:

[] parcel in production build mode
[] css-purge
[] cssnano
[] testing
