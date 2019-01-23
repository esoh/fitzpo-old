import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import modalReducer from './common/modalReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({modal: modalReducer, auth: authReducer})
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
