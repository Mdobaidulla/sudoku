# Sudoku
## Josh Seides

### Installation Instructions
1. `npm install`
1. `npm start` (a browser should automatically open with the React app)

### Overview
This app is made using the React framework. The base technologies used include JavaScript, HTML, and CSS.

### Structure
The app is modularized using React's component architecture. There are four levels of components:

* `Board`
    - `Button`
    - `Row`
        + `Square`

`Board` is the main controller and contains the state of the game within its component state. Each component is now discussed in more detail.

#### `Board`
* <b>State</b>: values of squares, difficulty, initial board layout
* <b>Functions</b>: generating boards, checking boards, solving boards, opening and closing modals
* <b>View</b>: modals for creating new games and updating square values, all nine `Row` components

#### `Button`
* <b>Props</b>: text, CSS classes, `onHover` classes, `onClick` callback
* <b>View</b>: `div` for button with styles for background and hover transitions

#### `Row`
* <b>Props</b>: intiial positions, numbers, `change` callback, row index
* <b>Functions</b>: generating squares
* <b>View</b>: all nine `Square` components for the row

#### `Square`
* <b>Props</b>: intiial position, value, `change` callback, row index
* <b>View</b>: square `div` with listeners for `onClick` and hover

### Use of React
React is used for its performant manipulation of the DOM and modularization architecture which fits a gamr of Sudoku very well. Any change to values in the squares is quickly updated in the state of the `Board` and automatically re-rendered. This provides for a very smooth UI/UX, as users do not have to refresh the page for any changes, and due to React's use of a virtual DOM, only changes in the DOM tree are actually manipulated so load times are very fast.

### Styling
A high importance is placed on flexible styling. The squares are styled with CSS flexbox to allow for responsive web design that adjusts to various screen sizes.

### Note about Generator and Solver
The algorithm for generation and solving comes from the <a href="https://github.com/robatron/sudoku.js?MobileOptOut=1" target="_blank">sudoku.js</a> library. It uses the backtracking algorithm to solve game boards. All other code, including the checker algorithm, is completely self-written.
