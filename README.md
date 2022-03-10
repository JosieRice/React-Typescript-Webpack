# React-Typescript-Webpack

My current favourite frontend build options :)

## Setup for Development (vs code)
1. Recommended extentions to install
    - vscode-styled-components (Diego Lincoln version) -> gives intellisense and syntax highlighting to styled components
    - Prettier - Code formatter -> to run the autoformatting
    - GitLens — Git supercharged -> helps track down changes in the code

## Coding best practices

- new files should be formatted to Spaces: 4
- `Shift + Option + F` on files before committing (to run prettier auto formatting)
- `Shift + Option + O` on files before committing (to alphabetise imports)
- it's rare that a typescript type is `any`, so if you've added one of those or a `// @ts-ignore`, take a moment to propery type it or verify that it is actualy an `any` type

## To Run Locally

1. clone repo
2. navigate to the repo's root directory in a terminal
3. run `npm i` in terminal
4. run `npm run dev` in terminal

## To Run a Production build

1. navigate to the repo's root directory in a terminal
2. run `npm run prod` in terminal