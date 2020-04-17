import React, {Component, useState, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import dataJson from './../../VirtData/articles.json';

import Banner from './pages-components/Banner';
import {getInfoHtml} from './pages-components/wigets/secondaryFunc.jsx';

 

export default class ArticleContent extends Component{

	constructor(props){
		super(props);

		this.state = {
			bannerImg: [],
			dataArticle: []
		}
	}

	componentDidUpdate(prevProps) {
    
    if (this.props.dataArticle !== prevProps.dataArticle) 
          this.setState({dataArticle: this.props.dataArticle});

      if (this.props.banner !== prevProps.banner){ 
             this.setState({bannerImg: [this.props.banner]});
        }

    }

     componentDidMount(){
     	

    	if((this.props.dataArticle!==this.state.dataArticle)&&(this.props.banner!==this.state.bannerImg)){
    	    	this.setState({dataArticle: this.props.dataArticle,
    	    	bannerImg: [this.props.banner]});

    	    }
    }

	render(){
		
		return(
			<>
			<Banner data={this.state.bannerImg} type={this.props.match.params.slug==='cards'?'carousel3d':'single'} match={this.props.match}/>
			<Container>
				<Content dataArticle={dataJson} match={this.props.match} data={this.state.dataArticle}/>
			</Container>
			</>
		)
	}
}








function Content({dataArticle, match, data}){
	
	let link = match.url?match.url:'/';
	let colorList = ['red', 'blue', 'grey', 'skyblue'];
	if(data.length>0){


	var list = (data || []).map((item,index)=>{

		let colorIndex = index<=3?index:((index-colorList.length)<=colorList.length?index-colorList.length:(index-(colorList.length*2)));
		let color = colorList[colorIndex];
		let img = '';
		let regEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
		
		regEx = new RegExp(regEx);
		
		if(item.image&&item.image.match(regEx)){
			img = item.image;
		}else{
			img = getInfoHtml('img', 'icon-arcticle', item.translation?item.translation.text:'')!==null?
			getInfoHtml('img', 'icon-arcticle', item.translation?item.translation.text:'').getAttribute('src'):'';
		}
		
		
		return (
			<li className='item-article justify-content-between flex-lg-row flex-column' data-type={color} key={item.id}>
				<div className="col-lg-3 col-12 d-flex flex-column justify-content-between pb-10">
					
					<p className="title-article mb-0 font-weight-bold color-white-text pb-10">{data.length>0?data[index].translation.title:''}</p>
					<Link to={`${link}/${item.id}`} className="more-info-article col-md-5 col-sm-7 col-9 col-lg-12 font-weight-bold d-block text-uppercase color-blue-text btn-arrow color-white-bg">
					<FormattedHTMLMessage id="btn.read-more" />
					</Link>
				</div>

				<div className="col-lg-5 col-12 info-article pb-10">
					<p className="color-white-text justify-content-between">{item.translation.desc}</p>
					<div className="d-flex info-ltl-article">
						<div className="col-md-5 justify-content-center" style={{paddingLeft:0}}>
							<p className="color-white-text text-left text-uppercase" style={{fontSize:'1rem'}}>
							<FormattedHTMLMessage id="credit.item-list5" />{item.calculators?item.calculators[0].percent:0} %
							</p>
							<p className="color-white-text text-left">
							<FormattedHTMLMessage id="credit.item-list1" />
							</p>
						</div>
						<div className="col-lg-5 col-12 justify-content-center" >
							<p className="color-white-text text-left text-uppercase" style={{fontSize:'1rem'}}>
							<FormattedHTMLMessage id="credit.item-list3" />
							 {item.calculators?item.calculators[0].term:0}
							<FormattedHTMLMessage id="credit.item-list4" />
							</p>
							<p className="color-white-text text-left">
							<FormattedHTMLMessage id="credit.item-list2" />
							</p>
						</div>
					</div>
				</div>

				<div className="article-item-image col-md-3 col-sm-6 col-12">
				<img src={img} alt={item.title} className="w-100 h-100 img-contain"/>
				</div>
			</li>
		)
	});
	}

	return(
		<ul className="m-aut pl-0" id="list-article">
		{list}
		</ul>
	)
}


