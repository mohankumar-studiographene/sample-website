# React CSR Boilerplate

- Includes --
  - React 18
  - Redux Setup
  - Scss/SCSS Module
  - Routing Setup
  - .env file setup
  - Basic styling setup
  - Pre commit hook setup
  - Linting setup (prettier and eslint)
  - Build creation using Webpack 5
  - Path Alias using @ (for creating path from the src)
  - Jest with React testing library (For Unit test case) 

## Scripts

| Script          | Description                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| `npm install`   | Installs all dependencies                                                                     |
| `npm start`     | Starts project in `development` environment                                                   |
| `npm run build` | Builds the project for `production` environment                                               |
| `npm run serve` | Builds the project for `production` environment and serve it on th port specified in the .env |
| `npm run jest`  | Run it for check unit test cases                                                               |

## Folder structure

```
#directory structure
|--src
  |--assets                   # This folder contains all the assets that are copied into the build folder eg. images
      |--images
      |--scss                 # contain global styling
      ├── favicon             # favicon file
      ├── manifest.json       # Provides information about an application (such as name, author, icon, and description)
  |--components
      |--general              # This folder contains all Global Reusable Components eg. button, input
      |--flow                 # This folder contains the component (extended logic) for the routes component
  |--App                      # Main Entry point
  |--pages                    # This folder contains the route component
  |--store
      ├── createStore.js      # Create and instrument redux store
      ├── rootReducers.js     # Reducer registry and injection
      |--store.js                 # The Redux store configuration
  |--utils                    # have utilities like your API wrapper, string utils etc
  ├── index.jsx               # Application bootstrap and rendering
  ├── Routes.js               # Contain the application routes definition
  ├── index.html              # Main HTML page container

```

## Developer guidelines

### .envtemplate

Edit this template according to your project requirement, so that whoever clone your git repo will
know what .env variables they need. Secret api key, token no. should be save in .env file and that
file should not be push to remote git repo for security.

### Remove Redux setup

You can remove the store folder from the src directory. And make sure to remove the <Provider>
Component from the `src/index/jsx' file. And also remove the npm packages using the following
command

`npm uninstall react-redux redux redux-devtools-extension`

### Either use normal Scss or SCSS Module

Please don't fix these two ways of css styling. Pick either one of them for the entire project



