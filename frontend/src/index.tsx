// Import components, functions, types, variables, and styles
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/App'
import { store, persistor } from './store'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css'


// DOM
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
