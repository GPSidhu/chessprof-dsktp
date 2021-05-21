import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
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
