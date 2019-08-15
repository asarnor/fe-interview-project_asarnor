# Abstract Frontend Interview Project
It’s our belief at Abstract that there’s no better way to learn how people work together than for people to actually work together. Because of this, we’d like you to complete a small project as part of your interview process.

We will pay you for your work on this, because your effort is worth payment! We pay $125 per hour for interview projects. If this seems unreasonable, please let us know. If you are hired, you’ll see your project bonus on your first paycheck. If not, you’ll receive payment and a 1099 for your work. Please track your hours as a log of what you’ve done and when.

You have one week to complete this project. We’ve worked hard to refine the scope so that it only takes about 8 hours to complete. If you start to think the project will take you longer than 8 hours, please let us know immediately.

If you have any questions about the project, please add them as comments in this repo and we’ll reply inline.

### Submitting Your Project

Please create a pull request and add **@deetuck-abstract**, **@zpnk**, **@mattsacks**, and **@rickharris** as reviewers when you’re ready to submit your project. We’ll likely ask you some questions on the PR.

## The Brief

We would like you to build a simple application using JavaScript and React that emulates how a drawing application might render layers. In this case, your application will render what we will refer to as a *Symbol*.

Symbols are defined as JSON objects with a list of `contents`, which can be shapes like Rectangles and Ovals, or other Symbols.

Each layer in a symbol's `contents` have descriptive attributes. For instance:

- Rectangles and Ovals have `width`, `height`, `x`, `y`, and `fill` attributes.
- Symbols have `x`, `y`, and `scale` attributes.

You can find a full specification of symbols at the [bottom of this spec](#symbol-specification).

We will give you a JSON object that defines a list of different symbols, and we'd like you to use that data to build an application with a couple features:

1. The user can choose from a dropdown of Symbols to render to the page. When selected, the Symbol will be rendered according to its attributes
2. Once a Symbol is selected, the app displays a list of its `contents`, and the user can click on one of these items to highlight the portion of the render that it represents.

Here's a demo of how it should work:

![FE interview demo](https://user-images.githubusercontent.com/5036362/62641468-7e303700-b8f8-11e9-9faa-fdae5c10d490.gif)

_Note: This project isn’t a real part of the Abstract product and won’t be shipped, but it is based on some problems we have solved while building the product._

## Technical Details

This repo is based on https://github.com/facebook/create-react-app, and it is initialized with some opinionated settings. Feel free to modify anything to your own preferences.

To get started, run `npm|yarn install` and `npm|yarn start`, or see the Create React App documentation for more details.

### Fetching Data

Symbol data is provided through a function in [`fetchData.js`](src/fetchData.js) — please have your app use this as the initial source for its data. Feel free to transform the data as needed after retrieving it from this API.

### Layer Data Specification

The data returned from fetchData is an object with symbol IDs mapped to symbol definitions. You can find all of the test data in [`fetchData.js`](src/fetchData.js).

Each symbol definition has the following attributes:
- `width` and `height` are the natural size in pixels of the symbol
- `contents` defines the internal components of the symbol

Inside of `contents`:
- all internal symbols have an `x` and `y` coordinate that represent the position of the symbol relative to the top left corner of the parent symbol’s bounding box at its natural size
- `type: "rect"` and `type: "oval"` are primitive shape definitions. You can render contents using any web technology of your choosing
- `fill` is a valid CSS color-code that defines the interior color of a shape
- shapes will have a `width` and a `height` attribute that represent the width and height of the shape at the natural size of its containing symbol
- `type: [symbol ID]` is an internal instance of another symbol. This way, symbols can be composed and reused
- `scale` is the factor by which an internal symbol should be scaled from its natural size
