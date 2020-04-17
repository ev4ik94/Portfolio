import React, {Component, useState} from 'react';
import {Container} from "react-bootstrap";

import './css/articleContentItem.css';

export default class HtmlArticleContent extends Component{
	constructor(props){
		super(props);

		this.state = {
			content: '',
			prevTab: '',
			nextTab:''
		}

		this.tabsToggle = this.tabsToggle.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
    if (this.props.content !== prevProps.content) 
          this.getData(this.props.content);

      if(this.state.content !== prevState.content)
      	this.htmlContent();
    }

    getData(content){
    	this.setState({content: content});
    }

    htmlContent(){
    	let content = document.getElementsByClassName('content-article')[0];
    	let toggleTabs = content.getElementsByTagName('a');
    	
    	for(var k=0; k<toggleTabs.length; k++){
    		if(toggleTabs[k].getAttribute('role')==='tab'){
    			if(toggleTabs[k].classList.contains('active')) this.setState({prevTab: toggleTabs[k].getAttribute('href').replace('#', '')});
    			toggleTabs[k].addEventListener('click', this.tabsToggle);
    		}
    	}
    	
    	  		
    }

    async tabsToggle(e){
    	e.preventDefault();
    	let id = e.srcElement.hash;
    	id = id?id.replace('#', ''):null;

    	let contTabs = document.getElementsByClassName('nav-tabs');
    	for(var k=0; k<contTabs.length; k++){
    		for(var i=0; i<contTabs[k].getElementsByTagName('a').length; i++){
    			if(contTabs[k].getElementsByTagName('a')[i].classList.contains('active'))
    				contTabs[k].getElementsByTagName('a')[i].classList.remove('active');
    		}
    	}
    	await this.setState({prevTab: this.state.nextTab!==''?this.state.nextTab:this.state.prevTab, 
    		nextTab:id});

    	let prev = document.getElementById(this.state.prevTab),
    	next = document.getElementById(this.state.nextTab);

    	prev.classList.remove('active', 'show');
    	next.classList.add('active', 'show');
    	e.target.classList.add('active');
    	
    	
    }


	render(){
		return(
			<div className="content-article pt-50" style={{minHeight:'500px'}}>
			<div dangerouslySetInnerHTML={{__html: this.state.content}} />
			</div>
		)
	}
}


