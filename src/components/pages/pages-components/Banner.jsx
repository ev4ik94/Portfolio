
import React, {Component, useState, useEffect} from 'react';
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import {FormattedHTMLMessage}from "react-intl";


import {bannerDefault} from './wigets/API.js';
import {textEllipsis} from './wigets/secondaryFunc.jsx';
import './css/Banners.css';
import Carousel3D from './Banner3D';
import LazyImage from './wigets/LazyLoadImage';


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




export default function Banner({data, style, type, button, text, title, match, obj}){
	
	let windowEidth = window.innerWidth<730;
		
	return(
		<>
		{type==='carousel'&&<ProductCarousel match={match} data={obj}/>}
		{type==='single'&&<BannerSing img={data} button={button} title={title} text={text}/>}
     {(type==='carousel3d'&&windowEidth)&&<CarouselCards data={cardsArticle}/>}
      {(type==='carousel3d'&&!windowEidth)&&<Carousel3D match={match}/>}
		</>
	)
}



function BannerSing({img, button, title, text}){

	const [imgBanner, setImg] = useState('');
	const [getData, setData] = useState(true);

	useEffect(()=>{

		if(img!==imgBanner&&img.length>0){
			
			if(img[0].desktop&&img[0].mobile){
				setImg(img[0]);
			}else{
				setImg(bannerDefault);
			}
		}

	})
	
	

	return(
		<div className="position-relative" style={{minHeight:'500px', height:'500px'}}>
			<picture>
       			<source srcSet={imgBanner.mobile?imgBanner.mobile:imgBanner}  
        		media="(max-width: 600px)" className="img-cover w-100 h-100" />
       			<img src={imgBanner.desktop?imgBanner.desktop:imgBanner} alt="" className="img-cover w-100 h-100" />
    		</picture>
    		<div className="banner-text-blck position-absolute col-md-5">
    		{title && (<h3 className="color-blue-text font-weight-bold mb-10" style={{textShadow:'white 2px 2px 5px'}}>{title}</h3>)}
    		{text && (<p className="text-left color-blue-text text-truncate d-block" style={{textShadow:'white 2px 2px 5px', fontWeight:'500'}}>{textEllipsis(text, 200)}</p>)}
    		{button && (
    			<button className="shadow-sm button-banner-article text-left col-md-6 color-red-bg color-white-text font-weight-bold">{button}</button>
    			)}

    		</div>

		</div>
	)
}



class ProductCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, play:true};
    this.goToIndex = this.goToIndex.bind(this);
    
   
  }

  componentDidUpdate(prevProps){
    if(this.props.match.params.slug!==prevProps.match.params.slug){
      this.setState({activeIndex:0});
    }

    
   
  }

 
  goToIndex(newIndex) {
    this.setState({ activeIndex: newIndex });
  }

  autoplay(e){
  	let max = this.props.data.length;
  	if(this.state.play){
  		let index = e>0&&e<max?e:0;
  		this.setState({ activeIndex: index });	
  	}
  	
  }
 
  render() {
 
    const { activeIndex } = this.state;
    const items = this.props.data;
  
    
    return (
      <Carousel activeIndex={activeIndex} onSelect={(e)=>this.autoplay(e)} 
      style={{minHeight:'500px', height:'500px'}} interval={5000} pauseOnHover={false}>
		
		{items.length===0 && (<Carousel.Item className="h-100"><img className="d-block w-100 img-cover" src={bannerDefault}/></Carousel.Item>)}

        {(items ||[]).map((item, index) => {
         
          return (
            <Carousel.Item key={index} className="h-100">
                {index===0 && ( <LazyImage image={{srcMain:item.bannerImgDesc,
                              srcDef: item.bannerImgMob,
                              title: item.title}} />)}
                {index>0 && ( 
                  <picture>
                <source media="(max-width: 650px)" srcSet={item.bannerImgMob&&item.bannerImgMob!==''?item.bannerImgMob:item.bannerImgDesc} className="img-cover"/>
                <img src={item.bannerImgDesc&&item.bannerImgDesc!==''?item.bannerImgDesc:bannerDefault} alt=""  className="img-cover" />
              </picture>)}
              
                <Carousel.Caption>
                <h3 className="text-left color-blue-text font-weight-bold">{item.title}</h3>
                <p className="text-left color-blue-text text-site-sm">{textEllipsis(item.text,200)}</p>
                <Link to={'#'} className="color-white-text">
                  <div className="btn-more-banner btn-arrow color-red-bg text-left">{item.buttonText}</div>
                </Link>
            </Carousel.Caption>
            </Carousel.Item>

           
          );
        })}

   
        <ol className="carousel-indicators d-flex justify-content-start">
        <div className="line-play-pause position-absolute d-flex">
        	<div className="btn-bplay-pause" onClick={()=>this.setState({play: !this.state.play})}>
        	<FontAwesomeIcon icon={this.state.play?faPause:faPlay} className="align-middle" />
        	</div>
        	<span className="line-horizont"></span>
        	<div className="logo-line position-absolute"><img src={`${window.location.origin}/image/Logo/White.svg`} alt="" /></div>
        </div>
          {items.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => this.goToIndex(index)}
                className={activeIndex === index?'active position-relative':'position-relative'}
              >
              <img src={item.icon} alt={item.title} className="position-absolute" />
              </li>
            );
          })}
        </ol>
      </Carousel>
    );
  }
}




class CarouselCards extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    }
    
  }

  activeSlide(e){
    this.setState({activeIndex: e});
  }

  
 
  render() {
 
  
    const items = this.props.data;
  
    
    return (
      <Carousel style={{minHeight:'500px', height:'500px'}}  
      interval={5000} touch={true} onSelect={(e)=>this.activeSlide(e)} 
      className="carousel-3d color-blue-bg">
   
      
    {items.length===0 && (<Carousel.Item className="h-100"><img className="d-block w-100 img-cover" src={bannerDefault}/></Carousel.Item>)}

        {(items ||[]).map((item, index) => {
         
         let classN = `h-100 gallery-item ${this.state.activeIndex===index?'gallery-item-selected':''}`;
          return (
            <Carousel.Item key={index} className={classN}>
                 
              <div className="blck-info-head pb-30">
        
                <h6 className="font-weight-bold color-white-text text-center pt-40">{item.length>0&&item[0].translation?item[0].translation.title:''}</h6>
                <p className="color-white-text text-center" style={{fontSize:'.8rem'}}>{item.length>0&&item[0].translation?item[0].translation.desc:''}</p>
               
              </div>
              <div className="wrap">
                <div className="card-visa-wrapper" style={{width:'320px'}}>
                  <div className="visa-card" style={{width:'320px'}}>
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
            
            </Carousel.Item>
          );
        })}

        

      </Carousel>
    );
  }
}

function Card3D({data}){

  return(
  <div className="carousel-3d color-blue-bg">
      <div className="gallery-container">
      <div className="gallery-item gallery-item-selected">
              <div className="blck-info-head pb-30">
        
                <h6 className="font-weight-bold color-white-text text-center pt-40">{data.length>0&&data[0].translation?data[0].translation.title:''}</h6>
                <p className="color-white-text text-center" style={{fontSize:'.8rem'}}>{data.length>0&&data[0].translation?data[0].translation.desc:''}</p>
               
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
            </div>
            </div>
            </div>

  )
}






