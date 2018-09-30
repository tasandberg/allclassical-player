import React from 'react'
import { render } from 'react-dom'
import reducers from './src/reducers'
import { createStore } from 'redux'

const store = createStore(reducers)

const App = () => <h1>plz</h1>

render(<App />, document.getElementById('main'))
