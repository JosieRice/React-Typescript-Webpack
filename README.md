# React-Typescript-Webpack

My current favourite frontend build options :)

## Setup for Development (vs code)
1. add `Prettier - Code formatter` extension

## Coding best practices

- new files should be formatted to Spaces: 4
- `Shift + Option + F` on files before committing (to run prettier auto formatting)
- `Shift + Option + O` on files before committing (to alphabetise imports)
- it's rare that a typescript type is `any`, so if you've added one of those or a `// @ts-ignore`, take a moment to propery type it or verify that it is actualy an `any` type

## To Run Locally

1. clone repo
2. navigate to the repo's root directory in a terminal
3. run `npm i` in terminal
4. run `npm run dev` in terminal for dev build OR `npm run prod` to build production bundles for deploy
