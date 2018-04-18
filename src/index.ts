import { calc } from 'csx'
import { createElement as r } from 'react'
import { render } from 'react-dom'
import { div, label, textarea } from 'react-dom-factories'
import { connect, Provider } from 'react-redux'
import { createStore, Dispatch, Store } from 'redux'
import { media, style } from 'typestyle'
import { htmlToHs } from '../lib/htmlToHs'

const htmlInputArea = (dispatch: Dispatch<State>) =>
  div({ className: 'form-group' },
    label({ htmlFor: 'htmlString' }),
    textarea({
      className:
        `form-control
        ${style(
          media({ minWidth: 0, maxWidth: '767px' },
            {
              height: calc('50vh - 50px'),
            },
          ),
          {
            height: calc('100vh - 50px'),
          },
        )}`,
      id: 'htmlString',
      onChange: (e: any) => dispatch({ type: '', value: htmlToHs(e.target.value) }),
      placeholder: 'Text In',
    }),
  )

// tslint:disable-next-line:no-shadowed-variable
const htmlOutputArea: React.SFC<{ state: State }> = ({ state }) =>
  div({ className: 'form-group' },
    label({ htmlFor: 'htmlString' }),
    textarea({
      className:
        `form-control
        ${style(
          media({ minWidth: 0, maxWidth: '767px' },
            {
              height: calc('50vh - 50px'),
            },
          ),
          {
            height: calc('100vh - 50px'),
          },
        )}`,
      id: 'htmlString',
      placeholder: 'Text Out',
      readOnly: true,
      value: state.value,
    }),
  )

const HtmlOutputArea = connect(
  (state: State) => ({ state }),
)(htmlOutputArea)

interface RootProps {
  store: Store<State>
}

// tslint:disable-next-line:no-shadowed-variable
const Root: React.SFC<RootProps> = ({ store }) =>
  r(Provider, { store },
    div({ className: 'container-fluid' },
      div({ className: 'row' },
        div({ className: 'col-md-6' },
          htmlInputArea(store.dispatch),
        ),
        div({ className: 'col-md-6' },
          r(HtmlOutputArea),
        ),
      ),
    ),
  )

interface State { value: string }

interface Action { type: any, value: string }

const reducer = (state: State, action: Action): State =>
  ({ ...state, value: action.value })

const store = createStore(reducer, { value: '' })

render(
  r(Root, { store }),
  document.getElementById('root'),
)
