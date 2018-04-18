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
div({},
  span({ id: 'idHere', className: 'classHere' }),
),
```  

**Features**  
* `webpack.config` written in ts
* tree-shaking support (all without having to use babel)
* no `JSX` (or `TSX`). All pure ts with `react-dom-factories`
* ~~`tsconfig` uses `paths` to make import paths look nicer~~
  * ~~webpack > resolve > alias should inform webpack what these mean (not fully tested yet)~~ (pending)
  
**Notes**
* `tsconfig` may have extraneous items (libs for example)
* `tsconfig.webpack.json` is what webpack will transpile ts into
  1. it receives the es5 code with es6 modules so it can tree-shake...
  2. then it transpiles again to es5 and commonjs modules for the browser
* `tslint` is a tad opinionated and can be modified per liking
* You'll need to export env var `TS_NODE_PROJECT=tsconfig.webpack.json`
