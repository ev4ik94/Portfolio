import React, {Component, useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import dataJson from './../../VirtData/articles.json';


import Banner from './pages-components/Banner';
import Currency from './pages-components/Currency';
import LastNews from './pages-components/LastNews';
import Statistics from './pages-components/Statistics';
import FormIndividuals from './pages-components/formIndividuals';



export default class CategoryContent extends Component{

	constructor(props){
		super(props);
	}

	componentDidUpdate(prevProps){
		console.log(this.props)
	}

	render(){
		return(
			<>
				<FormIndividuals form='desctop'/>
				<h1>CategoryC</h1>
				<Currency />
				<LastNews />
				<Statistics/>
			</>
		)
	}
}