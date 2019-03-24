import React from 'react';
import ReactDOM from 'react-dom';

import * as VKConnect from '@vkontakte/vkui-connect';

import './static/css/common.css';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './configureStore';

import App from './containers/App';

VKConnect.send('VKWebAppInit', {});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

if (module.hot) module.hot.accept();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
