import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import {Container} from "react-bootstrap";

import CreditList from './pages-components/Credit-list';
import CreditItem from './pages-components/Credit-item';

import './css/Credit.css';

var testObject = [
	{
		id:1,
		type:'cards',
     	title:'Кобрединг карта', 
     	desc:"Эта кредитная карта для всех тех кто любит технику. Получайте кэшбек и выгодные проценты бесплатно", 
     	text:"",
     	images:{
     		banner: null,
     		large: `${window.location.origin}/image/picture/car.png`
     	},
     	files:{
     		name: '',
     		url: ''
     	},
      products: false,
     	published_at:""
	},

	{
		id:2, 
		type:'car loan', 
     	title:'Автокредит', 
     	desc:"Расчитайте и оформите заявку за 5 минут. Мы сделаем лучшие условия автокредитования для вас", 
     	text:"",
     	images:{
     		banner: `${window.location.origin}/image/banners/Автокредит.jpg`,
     		large: `${window.location.origin}/image/picture/car.png`
     	},
      products: true,
      
     	calculators:[
     		{
     			id: 2,
     			title: '',
      			type: "credit",
      			percent: 33,
      			term: 36,
      			currency: "UZS",
      			amount: 100000000,
      			prepayment: 25,
      			replenishment: false

     		},
     		{
     			id: 3,
     			title: '',
      			type: "credit",
      			percent: 30,
      			term: 35,
      			currency: "UZS",
      			amount: 100000000,
      			prepayment: 50,
      			replenishment: false

     		}
     	], 
     	files:{
     		name: '',
     		url: ''
     	}, 
     	published_at:""
	},

	{
		id:3,
		type:'mikrozaym',
     	title:'Микрозайм', 
     	desc:"Оплачивайте покупки или услуги, когда средств не достаточно. С помощью микрозайма",
     	text:"",
     	images:{
     		banner: `${window.location.origin}/image/banners/Денежные переводы.jpg`,
     		large: `${window.location.origin}/image/picture/car.png`
     	},
      products: false,
     	calculators:[
     		{
     			id: 6,
     			title: '',
      			type: "credit",
      			percent: 34,
      			term: 12,
      			currency: "UZS",
      			amount: 100000000,
      			prepayment: 0,
      			replenishment: false

     		}
     	], 
     	files:{
     		name: '',
     		url: ''
     	}, 
     	published_at:""
	},

];

export default class Credit extends Component{

	constructor(props){
		super(props);
	}

	render(){
		let paramsId = this.props.match.params.id;
   
		return(
			<>
				{
					paramsId !== undefined?<CreditItem match={this.props.match}  store={this.props.store} data={testObject}/>:<CreditList match={this.props.match} store={this.props.store} data={testObject}/>
				}
			</>
		)
	}
}

