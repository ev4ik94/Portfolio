import {combineReducers} from 'redux';
import user from './user';
import Categories from './categories';
import currency from './currency';
import Article from './article';
import News from './news';
import Calculators from './calculators';
import Banner from './banner';


export default combineReducers({
	user,
	Categories,
	currency,
	Article,
	News,
	Calculators,
	Banner
});