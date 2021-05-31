// Import components, functions, types, variables, and styles
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'

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
