import * as test from 'tape'
import { htmlToHs } from '../lib/htmlToHs'

type Test = test.Test

test('Basic tags', (t: Test): void => {
  const str =
    htmlToHs(`
      <div>
        <span></span>
      </div>
    `)

  t.equals(str,
    `
      div({},
        span({}),
      ),
    `)

  t.end()
})

test('Tags w/ attributes', (t: Test): void => {
  const str =
    htmlToHs(`
      <div>
        <span id="first" class="second"></span>
        <a class="third"></a>
      </div>
    `)

  t.equals(str,
    `
      div({},
        span({ id: 'first', className: 'second' }),
        a({ className: 'third' }),
      ),
    `)

  t.end()
})

test('Self-Closing Tags', (t: Test): void => {
  const str =
    htmlToHs(`
      <div>
        <img src="random.png" class="aClass"/>
      </div>
    `)

  t.equals(str,
    `
      div({},
        img({ src: 'random.png', className: 'aClass' }),
      ),
    `)

  t.end()
})

test('Dealing with random spaces', (t: Test): void => {
  const str =
    htmlToHs(`
      <div >
        <img   src="random.png"  class="testClass" />
      </div  >
    `)

  t.equals(str,
    `
      div({},
        img({ src: 'random.png', className: 'testClass' }),
      ),
    `)

  t.end()
})

// tslint:disable:max-line-length
test('Real-World 1', (t: Test): void => {
  const actual =
    htmlToHs(`
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control">
        </div>
      </form>
    `)

  const expected =
    `
      form({},
        div({ className: 'form-group' },
          label({ htmlFor: 'exampleInputEmail1' }, 'Email address'),
          input({ type: 'email', className: 'form-control' }),
        ),
      ),
    `

  t.equals(actual, expected)

  t.end()
})

// tslint:disable:max-line-length
test('Real-World 2', (t: Test): void => {
  const actual =
    htmlToHs(`
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
      </form>
    `)

  const expected =
    `
      form({},
        div({ className: 'form-group' },
          label({ htmlFor: 'exampleInputEmail1' }, 'Email address'),
          input({ type: 'email', className: 'form-control', id: 'exampleInputEmail1', placeholder: 'Enter email' }),
          small({ id: 'emailHelp', className: 'form-text text-muted' }, 'We\\'ll never share your email with anyone else.'),
        ),
      ),
    `

  t.equals(actual, expected)

  t.end()
})

test('aria labels', (t: Test): void => {
  const actual =
    htmlToHs(`
      <div>
        <span aria-describedby="thing" id="test-item"></span>
      </div>
    `)

  const expected =
    `
      div({},
        span({ 'aria-describedby': 'thing', id: 'test-item' }),
      ),
    `

  t.equals(actual, expected)

  t.end()
})
