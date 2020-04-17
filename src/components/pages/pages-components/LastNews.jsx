import React, {Component, useState, useEffect} from 'react';
import {ListGroup, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './css/LastNews.css';

export default function LastNews({data, categories, match}){

	const [dataArr, getData] = useState([]);
	const [mount, setMount] = useState(true);
	const [url, setUrl] = useState('');
	let lang=  match.url.split('/');
	lang.splice(0,1);
	lang = lang[0].length===2?lang[0]:'ru';
	var urlF = '';
	
	var pathLink = '';
	useEffect(()=>{
		
		if(data.length>0&&mount){
			getData(data);
			setMount(false);
			
			for(var k=0; k<categories.length; k++){
				
				urlF = categories[k].children.filter(item=>item.slug==='news');
		
				if(urlF.length>0){
					urlF = '/'+lang+'/'+categories[k].slug+'/'+urlF[0].slug;
					setUrl(urlF);
					break;
				}
			}
			
		}
	})



	return(
		<Container id="last-news" style={{padding:'20px 15px', minHeight:'400px'}}>
			<div className="head-title-block d-flex justify-content-between flex-lg-row flex-column mb-20">
				<h2 className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="news.last-news-title" /></h2>
				<Link to={url}>
					<div className="d-flex picture-arrow" 
					style={{marginTop: '15px'}} 
					onMouseOver={(e)=>e.target.classList.contains('picture-arrow')?
					e.target.classList.add('anim-arrow'):e.target.parentElement.classList.add('anim-arrow')}
					onMouseOut={(e)=>e.target.classList.contains('picture-arrow')?
					e.target.classList.remove('anim-arrow'):e.target.parentElement.classList.remove('anim-arrow')}>
						<img src={`${window.location.origin}/image/Icons/Path-Right.svg`} alt=""/>
						<img src={`${window.location.origin}/image/Icons/Path-Right.svg`} alt=""/>
						<img src={`${window.location.origin}/image/Icons/Path-Right.svg`} alt=""/>	
					</div>
				</Link>
			</div>
			<News data={dataArr} match={match} urlD={url}/>
		</Container>
	)
}

function News({data, match, urlD}){

	let getLatestNews = ()=>{
		let newsLat = [];
		let srt = data.sort((a,b)=>{
				if(a.created_at>b.created_at) return 1;
				if(a.created_at<b.created_at) return -1;
			});
		if(srt.length>0){
			let num = srt.length<=3?srt.length:3;
			for(var k =0; k<num; k++){
				newsLat.push(srt[k]);
			}
		}
		return newsLat;
	}

	let dataNews = getLatestNews();

	let content = '';
	if(dataNews.length>0){
		content = dataNews.map((item,index)=>{
			
			let url = `${urlD}/${item.id}`;
			
			return (
				<div className="item-news d-flex flex-column justify-content-around col-lg-4" key={index} >
					
					<div>
					<p className="color-grey-text">{item.published_at}</p>
					<h6 className="mb-60 color-white-text font-weight-bold text-uppercase">{item.title}</h6>
					</div>
					<Link to={url} className="color-white-text text-uppercase">
						<FormattedHTMLMessage id="btn.read-more" />
					</Link>
					<img src={item.images&&item.images.widget?item.images.widget:''} alt={item.title} className="position-absolute" />
					<div className="icon-ract-dis position-absolute color-white-bg">
						<div className="sm-red-rect position-absolute shadow-sm"></div>
					</div>
					
				</div>
			)
		})
	}

	return (
		<div className="block-news-list d-flex justify-content-lg-start justify-content-center flex-lg-row flex-column">
			{content}
		</div>
	)
}