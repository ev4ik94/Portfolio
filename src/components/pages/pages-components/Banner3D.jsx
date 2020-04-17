import React, {Component, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import Carousel from 'react-spring-3d-carousel';


var cardsArticle = [
	{
		id: "8",
		title: "UZCARD",
		dec: "Безпроцентный льготный период до 110 дней, бесплатное обслуживание карты.Страхование паспорта, без справки о доходах",
		images: {
     		bg:"",
     		icon: "/image/picture/testPicture/cards/2.png"
		},
		properties:[
			{
				title:"Для повседневного пользования",
				text:"Безпроцентный льготный период до 110 дней, бесплатное обслуживание карты.Страхование паспорта, без справки о доходах",
			},

		],
		published:"at"
	},
	{
		id: "10",
		title: "UnionPay International",
		dec: "Безпроцентный льготный период до 110 дней, бесплатное обслуживание карты.Страхование паспорта, без справки о доходах",
		images: {
     		bg:"",
     		icon: "/image/picture/testPicture/cards/3.png"
		},
		properties:[
			{
				title:"Для повседневного пользования",
				text:"Безпроцентный льготный период до 110 дней, бесплатное обслуживание карты.Страхование паспорта, без справки о доходах",
			},

		],
		published:"at"
	},
	{
		id: "11",
		title: "HUMO",
		dec: "Безпроцентный льготный период до 110 дней, бесплатное обслуживание карты.Страхование паспорта, без справки о доходах",
		images: {
     		bg:"",
     		icon: "/image/picture/testPicture/cards/4.png"
		},
		properties:[
			{
				title:"Для повседневного пользования",
				text:"Безпроцентный льготный период до 110 дней, бесплатное обслуживание карты.Страхование паспорта, без справки о доходах",
			},

		],
		published:"at"
	},
	{
		id: "9",
		title: "КОБЕЙДЖ",
		dec: "Кобейджинговая карта UnionPay - Uzcard",
		images: {
     		bg:"",
     		icon: "/image/picture/testPicture/cards/5.png"
		},
		properties:[
			{
				title:"Для повседневного пользования",
				text:"Кобейджинговая карта UnionPay - Uzcard",
			},

		],
		published:"at"
	},
	{
		id: "5",
		title: "КОБЕЙДЖ",
		dec: "Кобейджинговая карта UnionPay - Uzcard",
		images: {
     		bg:"",
     		icon: "/image/picture/testPicture/cards/pic.png"
		},
		properties:[
			{
				title:"Для повседневного пользования",
				text:"Кобейджинговая карта UnionPay - Uzcard",
			},

		],
		published:"at"
	},
];

export default class Carousel3D extends Component{
	
	constructor(props){
		super(props);

		 this.state = {
    		goToSlide: 0,
    		offsetRadius: 2,
    		showNavigation: false,
    		slides: []
    		
  		};

  		this.carousel = React.createRef();
		
	}


	componentDidMount(){
		if(this.state.slides.length===0){
			let arr = cardsArticle.map((item,index)=>{
				return {
					key: index,
    				content: <div className="gallery-item" data-id={index}>
							<div className="blck-info-head pb-30">
								<div className="title-banner color-white-text text-center color-white-text col-6">{item.title}</div>
								<h6 className="font-weight-bold color-white-text text-center">{item.properties.title}</h6>
								<p className="color-white-text text-center" style={{fontSize:'.8rem'}}>{item.dec}</p>
								<Link to={'link'} className="d-block col-6 m-aut text-center btn-redirect-view color-red-bg color-white-text"><FormattedHTMLMessage id="btn.read-more" /></Link>
							</div>
							<div className="wrap">
								<div className="card-visa-wrapper">
									<div className="visa-card">
										<div className="shine-wrap"><div className="shine"></div></div>
										<div className="card-plastic">
											<img src={`${window.location.origin}/image/picture/testPicture/cards/pic.png`} alt={'item.title'} />
										</div>
									</div>
								</div>
							</div>
							<div className="shadow-wrap">
								<div className="shadow"></div>
							</div>
	
							<div className="floor-wrap">
								<img src={`${window.location.origin}/image/picture/testPicture/cards/cyl.png`} alt="" />
							</div>	
						</div>,
					onClick: ()=> this.setState({goToSlide:index})
				}
			})
			this.setState({slides: arr});
			
		}
	}

componentDidUpdate(prevState){
	if(this.state.goToSlide!==prevState.goToSlide){
		let arrSlides = document.getElementsByClassName('gallery-item');
		for(let k=0; k<arrSlides.length; k++){
			if(Number(arrSlides[k].getAttribute('data-id'))===this.state.goToSlide){
				arrSlides[k].classList.add('gallery-item-selected');
			}else{
				arrSlides[k].classList.remove('gallery-item-selected');
			}
		}
	}
}



	

render(){
	

	return(
	<div className="carousel-3d color-blue-bg">
			<div className="gallery-container">
			
	<Carousel slides={this.state.slides} goToSlide={this.state.goToSlide}
          offsetRadius={this.state.offsetRadius}
          showNavigation={this.state.showNavigation}/>
	</div>
	</div>
	)
	}	
}