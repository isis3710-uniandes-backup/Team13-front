import React from 'react';
import ReactDOM from 'react-dom';
import {MainRouter} from './mainRouter';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './_helpers/store';
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

addLocaleData(esLocaleData);

let userLang = navigator.userLanguage || navigator.language

function getLocale(){
	return userLang==="es-ES" ? localeEsMessages : localeEnMessages
}

ReactDOM.render(
	<IntlProvider locale={userLang} messages= {getLocale()}>
		<Provider store={store}>
			<MainRouter />
		</Provider>
	</IntlProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
