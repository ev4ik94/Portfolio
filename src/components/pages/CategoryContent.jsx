import React, {Component, useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import dataJson from './../../VirtData/articles.json';



import Banner from './pages-components/Banner';
import Currency from './pages-components/Currency';
import LastNews from './pages-components/LastNews';
import NotFound from './pages-components/NotFound';
import Statistics from './pages-components/Statistics';
import FormIndividuals from './pages-components/formIndividuals';
import {getInfoHtml, scrollTop} from './pages-components/wigets/secondaryFunc.jsx';



export default class CategoryContent extends Component{

	constructor(props){
		super(props);

		this.state = {
			bannersImg: [],
			buttons: [],
			title: [],
			text: [],
			articles: [],
			curentSlug: '',
			notFound: false,
			news: [],
			categories: [],
			data: [],
			catChildren:[],
			bannersData: []
			
		}

		this.props.store.getNews();

		
	}

	componentDidUpdate(prevProps, prevState){

		if(this.props.store.categories!==prevProps.store.categories){
			//this.getCurentCtaegory(this.props.store.categories);

			this.setState({categories: this.props.store.categories});
		}

		if(this.props.store.article!==prevProps.store.article){

			this.setState({articles: [...this.state.articles, this.props.store.article]});
			setTimeout(()=>this.getBannersImg(), 300);
		}

		if(this.props.match.params.slug!==prevProps.match.params.slug){
			scrollTop();
			//this.getCurentCtaegory(this.props.store.categories);

			this.setState({articles: []});
			this.setState({notFound: false});
			this.props.store.getBanner();

		}

		if(this.props.store.news!==prevProps.store.news){
			this.setState({news: this.props.store.news});
		}

		if(this.props.store.banners!==prevProps.store.banners){
			//this.setState({news: this.props.store.news});
			this.setState({bannersData:this.props.store.banners})
			setTimeout(()=>this.getBannersImg(), 300);
		}

		
	}

	componentDidMount(){
			
		if(this.state.curentSlug!==this.props.match.params.slug){
			this.props.store.getBanner();
			
		}

		if(this.state.categories!==this.props.store.categories){
			this.setState({categories:this.props.store.categories});			
		}

	}

	  getCurentCtaegory(data){
		var childArr = [];
		 
    		if(data.length>0){

			for(let j=0; j<data.length; j++){
				if(data[j].slug===this.props.match.params.slug){
					childArr = data[j].children;

					if(childArr.length>0){
						this.setState({catChildren: childArr});
						childArr.forEach(item=>this.props.store.getArticle(this.props.match.params.slug==='individuals'?3:(this.props.match.params.slug==='corporate-5'?15:item.id)));
						break;
					}
				}
			}

			if(childArr.length===0) this.setState({notFound: true});
		}
		
		

		
		
	}

	async getBannersImg(){
		
		if(this.state.bannersData.length>0){

		let objDat = [];
		let artLength = this.state.bannersData.length>4?4:this.state.bannersData.length;
		for(let i=0; i<artLength; i++){
		
     		objDat.push({
     			bannerImgDesc: this.state.bannersData[i].images.desktop,
     			bannerImgMob: this.state.bannersData[i].images.mobile,
     			title: this.state.bannersData[i].title,
     			text:this.state.bannersData[i].desc,
     			buttonText: this.state.bannersData[i].button,
     			icon: this.state.bannersData[i].icon,
     			id: this.state.bannersData[i].item_id
     		})

		}

		this.setState({data: objDat})
		}

	}

	render(){
		
		return(
			<>
				{this.state.notFound && (<NotFound />)}
				{!this.state.notFound && (
					<>
					<FormIndividuals form='desctop'/>
				<Banner type='carousel' match={this.props.match} obj={this.state.data}/>
				<Currency data={this.props.store.currency}/>
				<LastNews data={this.state.news} categories={this.state.categories} match={this.props.match}/>
				<Statistics/>
					</>
					)}
			</>
		)
	}
}