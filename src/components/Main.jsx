import React, {Component, useState} from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Categories from './pages/Routers/Categories';
import Article from './pages/Routers/Article';
import NotFound from './pages/pages-components/NotFound';

function LanguageCheck(url, lng){

 		let path = url.split('/');
 		path.splice(0, 1);
 		let urlPath = '';
 		if(path[0].length===2){
 			path.splice(0, 1);
			urlPath = `/ru/${path.join('/')}`;
			return urlPath;
 		}else{
 			return '/';
 		}
 	
}

function Main ({store}){
 	
 	const supportedLanguages = ["ru", "en", "uz", "oz"];
 	
 	
 	let red = /^([a-z]{2})\/([a-z0-9_-]+)\/([a-z0-9_-]+)\/([0-9]{1,4}$)/g;
 	let red1 = /^([a-z]{2})\/([a-z0-9_-]+)\/([a-z0-9_-]+$)/g;
 	let red2 = /^([a-z]{2})\/([a-z0-9_-]+$)/g;
    let red3 = /^([a-z]{2})\/([a-z0-9_-]+)\/([0-9]{1,4}$)/g;
 	let regx = new RegExp(red);
 	let regx1 = new RegExp(red1);
 	let regx2 = new RegExp(red2);
    let regx3 = new RegExp(red3);

 	let url = window.location.pathname;
 	url = url.slice(1);
 	
 	
	return(
	 <Switch>

     	<Route strict path='/:lng([a-z]{2})/:slug/:slug/:id'  render={({match})=> {
     		
     		if(url.match(regx)!==null){
                
     			return supportedLanguages.includes(match.params.lng)?<Article match={match} store={store} getArticle={store.getArticle}/>:<Redirect to={LanguageCheck(match.url, match.params.lng)} />
     		}else{
     			return <NotFound match={match} />
     		}
     	}} />
        
     	<Route strict path='/:lng([a-z]{2})/:slug/:slug'  render={({match})=> {
     		
     		if(url.match(regx1)!==null){
               
     			return supportedLanguages.includes(match.params.lng)?<Article match={match} store={store} getArticle={store.getArticle} article={store.article}/>:<Redirect to={LanguageCheck(match.url, match.params.lng)} />
     		}else{
     			return <NotFound match={match} />
     		}
     	}} />

     	<Route strict path='/:lng/:slug'  render={({match})=> {
            return supportedLanguages.includes(match.params.lng)?<Categories match={match} store={store}/> :<Redirect to={LanguageCheck(match.url, match.params.lng)} />
        }} />
     	
    	<Route strict path='/:lng'  render={({match})=> {
            return supportedLanguages.includes(match.params.lng)?<Categories match={match} store={store}/> :<Redirect to={LanguageCheck(match.url, match.params.lng)} />
        }} />

    	<Route strict path='*'  render={({match})=>match.params.lng===undefined?<Redirect to={`/ru${match.url}`} />: <NotFound match={match} />} />
    	
  	</Switch>
		)
	
};

export default Main;
