import React, {Component} from 'react';
import {Container} from "react-bootstrap";

import Banner from './pages-components/Banner';
import Currency from './pages-components/Currency';
import LastNews from './pages-components/LastNews';
import Statistics from './pages-components/Statistics';
import FormIndividuals from './pages-components/formIndividuals';

class Home extends Component{
	
	constructor(props){
		super(props);

		this.state = {
			categories: []
		}

	}

	render(){
		let style={
			height: '550px'
		}
		return(
			<div id="home-pg">
			<FormIndividuals form='desctop'/>
			<Banner data={this.props.store.categories} style={style} type='carousel'/>
			<Currency data={this.props.store.currency}/>
			<LastNews />
			<Statistics />
			</div>
		)
	}
}



export default Home;