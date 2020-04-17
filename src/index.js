import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Provider as ReduxProvider } from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {IntlProvider, FormattedMessage} from 'react-intl';
import {readCookie} from './components/pages/pages-components/wigets/secondaryFunc.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


import './index.css';
import App from './App';
import reducers from './reducers';
import messages_ru from "./translation/ru.json";
import messages_uz from "./translation/uz.json";
import messages_en from "./translation/en.json";

export const imgL = './image';

const store = createStore(reducers, applyMiddleware(thunk));




const messages = {
    'ru': messages_ru,
    'uz': messages_uz,
    'en': messages_en,
    'oz': messages_en
};

const langArr = [['Рус', 'ru'], ['Узб', 'oz'], ['Eng', 'en'], ['Uzb', 'uz']];

let lang = readCookie('lang')?langArr.filter(item=>item[0]===readCookie('lang'))[0][1]:'ru';

const AppBundle = (
    <ReduxProvider store={store}>
        <IntlProvider locale={lang?lang:'ru'} messages={messages[lang?lang:'ru']}><App /></IntlProvider >
    </ReduxProvider>
);

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            AppBundle,
            document.getElementById('root')
        );
    });
};


