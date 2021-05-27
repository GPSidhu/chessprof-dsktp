import React from 'react';
import ReactDOM from 'react-dom';

// router
import { BrowserRouter, Switch } from 'react-router-dom'

// redux 
import { Provider } from 'react-redux'
import { store } from './redux/store'

// src
import './index.css';
import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store} >
            <BrowserRouter>
                <Switch>
                    <App />
                </Switch>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
