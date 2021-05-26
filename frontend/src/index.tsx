// Import components, functions, types, variables, and styles
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'fontsource-roboto'

import * as serviceWorker from './serviceWorker'
import './index.css'
import App from './components/App'
import { store } from './store'

// DOM
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
