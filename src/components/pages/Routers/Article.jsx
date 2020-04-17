import React, {Component, useState, useEffect} from 'react';
import Credit from './../Credit';
import Deposite from './../Deposite';
import ArticleContent from './../ArticleContent';
import ArticleItem from './../ArticleItem';
import {scrollTop} from './../pages-components/wigets/secondaryFunc.jsx';
import NotFound from './../pages-components/NotFound';

import FormIndividuals from './../pages-components/formIndividuals';




export default class Article extends Component{

	constructor(props){
		super(props);

		this.state = {
			slug: props.match.params.slug,
			id: props.match.params.id || false,
			dataArticle: [],
			getData: true,
			banner: [],
			getFirst: true,
			notFound: false
		}

		

	}

	componentDidUpdate(prevProps, prevState){

		if(this.props.match.params.slug!==prevProps.match.params.slug){
			this.setState({slug: this.props.match.params.slug});
			

		}

		if(this.state.slug!==prevState.slug){
			if(!isNaN(this.state.slug)){
				this.setState({id:Number(this.state.slug)});
			}else{
				this.setState({id:false});
			}
			this.getData(this.props.store);
			scrollTop();		
			
		}

		if(this.props.match.params.id!==prevProps.match.params.id){
			this.setState({id:this.props.match.params.id?this.props.match.params.id:false});
			scrollTop();
			
		}

		if(this.props.store!==prevProps.store){
			if(this.state.getFirst) this.getData(this.props.store);
			scrollTop();
		}

		if(this.props.store.article!==prevProps.store.article){
			this.setState({dataArticle: this.props.store.article});	
		}

	}


	componentDidMount(){
     
    	if(this.props.store.article!==this.state.dataArticle){
    		if(!isNaN(this.state.slug)){
				this.setState({id:Number(this.state.slug)});
			}
    		if(this.state.getFirst) this.getData(this.props.store);
    	}    	
    	    
    }

	getData(store){
		let arrChild = [];
		let categories  =[];
		let parentId = null;
		
		if(store.categories.length>0){		
	
			for(var k=0; k<store.categories.length; k++){
				
					arrChild = store.categories[k].children.filter(item=>item.type==='category'?item.slug===this.state.slug:item.id===Number(this.state.slug));
					if(arrChild.length>0){

						parentId = arrChild[0].type==='article'?store.categories[k].id:null;
						break;
					}

			}
			if(arrChild.length>0){
				if(arrChild[0].type==='article'){
					
					if(parentId!==null) store.getArticle(parentId);
					
				}else{
					
					store.getArticle(arrChild[0].id);
				}
				categories = arrChild[0];
				this.setState({notFound: false});
				console.log(arrChild[0])				
				this.setState({banner: categories.image?categories.image:[], getFirst:false});				
			}else{
					this.setState({notFound: true});
				}
			}
	}


	render(){
		
		return(
			<>
				<FormIndividuals />
				{this.state.notFound && <NotFound />}
				{(this.state.id && !this.state.notFound) && <ArticleItem dataArticle={this.state.dataArticle} match={this.props.match} id={this.state.id}/>}
				{(!this.state.id && !this.state.notFound) && <ArticleContent dataArticle={this.state.dataArticle} banner={this.state.banner}  match={this.props.match} />}
				
			</>
		)
	}
	
}

