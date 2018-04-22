# html-to-react-hs  
`yarn(npm) start` to run  

Take HTML and convert it into a React-DOM Hyperscript style  

```html
<div>
  <span id="idHere" class="classHere"></span>
</div>
```  
To  
```javascript
import { div, span } from 'react-dom-factories'

div({},
  span({ id: 'idHere', className: 'classHere' }),
),
```  

## Motivation ##
See here: https://github.com/jsforum/jsforum/issues/1  
And here: https://twitter.com/andrestaltz/status/987748964693889025?s=19

- Everything is just JS (or TS), so no suprises  
  - Weird ways to comment code out
  - Not tricked into thinking your using HTML
- No additional build step (.tsx, .jsx files)
- No context switch (from JSX to JS or TS)  

It's all just function calls anyway. One argument against this syntax is "it's not represented in the docs".  
Which is true, although if you're using TypeScript, you can inspect things to get a sense for how it ought be written.
(Kind of like docs in a sense).  

## Features ##  
* `webpack.config` written in ts
* tree-shaking support (all without having to use babel)
* no `JSX` (or `TSX`). All pure ts with `react-dom-factories`
* ~~`tsconfig` uses `paths` to make import paths look nicer~~
  * ~~webpack > resolve > alias should inform webpack what these mean (not fully tested yet)~~ (pending)
  
## Notes ##
* `tsconfig` may have extraneous items (libs for example)
* `tsconfig.webpack.json` is what webpack will transpile ts into
  1. it receives the es5 code with es6 modules so it can tree-shake...
  2. then it transpiles again to es5 and commonjs modules for the browser
* `tslint` is a tad opinionated and can be modified per liking
* You'll need to export env var `TS_NODE_PROJECT=tsconfig.webpack.json`
