import React, {Component, useState } from 'react';
import Contact from './pages/pages-components/contactUs';
import {Container, Navbar, Nav, Dropdown} from "react-bootstrap";
import {NavLink, Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";

import './Footer.css';
import {Animation} from './pages/pages-components/wigets/secondaryFunc.jsx';
//import logo from '%PUBLIC_URL%/image/banners/About-us.jpg';


export default function Footer ({data}){

		return (
			<footer id="footer-container">
			<MobileApp />
			<div className="color-blue-bg">
			<Container>

				<div className="container-contact">
					<Contact classN="flex-lg-row flex-wrap justify-content-between w-100 contact-list-group" colorIcon="rgba(254, 254, 254, 1)"/>
				</div>

				<div className="social-networks d-flex justify-content-between pt-10">
					<Navbar.Brand>
						<div className="container-brand">
							<img src={`${window.location.origin}/image/Logo/White.svg`} alt="" className="w-100"/>
						</div>
					</Navbar.Brand>
					<Nav>
						 <Nav.Link href="#google">
							<svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    							<g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        							<g id="Footer/Blue-Copy" className="social-icon-hov" transform="translate(-1081.000000, -121.000000)" fill="#FEFEFE">
            							<g id="Social" transform="translate(1081.000000, 121.000000)">
                							<g id="google-plus">
                    							<path d="M25,0 C11.1995968,0 0,11.1995968 0,25 C0,38.8004032 11.1995968,50 25,50 C38.8004032,50 50,38.8004032 50,25 C50,11.1995968 38.8004032,0 25,0 Z M17.8729839,37.5 C10.9375,37.5 5.37298387,31.9052419 5.37298387,25 C5.37298387,18.0947581 10.9375,12.5 17.8729839,12.5 C21.0282258,12.5 23.9314516,13.608871 26.2399194,15.7560484 L22.8528226,19.0423387 C21.5221774,17.7419355 19.6975806,17.1169355 17.8729839,17.1169355 C13.5483871,17.1169355 10.0907258,20.6955645 10.0907258,24.9899194 C10.0907258,29.2842742 13.5383065,32.8629032 17.8729839,32.8629032 C21.1592742,32.8629032 24.4153226,30.9375 24.9395161,27.4899194 L17.8729839,27.4899194 L17.8729839,23.1955645 L29.6572581,23.1955645 C29.7883065,23.8810484 29.8487903,24.5665323 29.8487903,25.2822581 C29.8487903,32.4193548 25.0604839,37.5 17.8729839,37.5 Z M41.078629,26.7943548 L41.078629,30.3729839 L37.5,30.3729839 L37.5,26.7943548 L33.921371,26.7943548 L33.921371,23.2157258 L37.5,23.2157258 L37.5,19.6370968 L41.078629,19.6370968 L41.078629,23.2157258 L44.6270161,23.2157258 L44.6270161,26.7943548 L41.078629,26.7943548 Z" id="Shape"></path>
                							</g>
            							</g>
        							</g>
    							</g>
							</svg>
						 </Nav.Link>
						 <Nav.Link href="#telegram">
							<svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    							<g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        							<g id="Footer/Blue-Copy" className="social-icon-hov" transform="translate(-1151.000000, -121.000000)" fill="#FEFEFE">
            							<g id="Social" transform="translate(1081.000000, 121.000000)">
                							<g id="telegram" transform="translate(70.000000, 0.000000)">
                    							<path d="M25,0 C11.1895161,0 0,11.1895161 0,25 C0,38.8104839 11.1895161,50 25,50 C38.8104839,50 50,38.8104839 50,25 C50,11.1895161 38.8104839,0 25,0 Z M37.2782258,17.1270161 L33.1754032,36.4616935 C32.8729839,37.8326613 32.0564516,38.1653226 30.9173387,37.5201613 L24.6673387,32.9133065 L21.6532258,35.8165323 C21.3205645,36.1491935 21.0383065,36.4314516 20.3931452,36.4314516 L20.8366935,30.0705645 L32.4193548,19.6068548 C32.9233871,19.1633065 32.3084677,18.9112903 31.6431452,19.3548387 L17.328629,28.3669355 L11.1592742,26.4415323 C9.81854839,26.0181452 9.78830645,25.1008065 11.4415323,24.4556452 L35.5443548,15.1612903 C36.6633065,14.7580645 37.641129,15.4334677 37.2782258,17.1270161 L37.2782258,17.1270161 Z" id="Shape"></path>
                							</g>
            							</g>
        							</g>
    							</g>
							</svg>
						 </Nav.Link>
						 <Nav.Link href="#facebook">
							<svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    							<g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        							<g id="Footer/Blue-Copy" className="social-icon-hov" transform="translate(-1221.000000, -121.000000)" fill="#FEFEFE">
            							<g id="Social" transform="translate(1081.000000, 121.000000)">
                							<g id="facebook" transform="translate(140.000000, 0.000000)">
                    							<path d="M50,25.1521298 C50,11.2576065 38.8104839,0 25,0 C11.1895161,0 0,11.2576065 0,25.1521298 C0,37.7058824 9.1421371,48.1115619 21.09375,50 L21.09375,32.4229209 L14.7429435,32.4229209 L14.7429435,25.1521298 L21.09375,25.1521298 L21.09375,19.6105477 C21.09375,13.3073022 24.8235887,9.82555781 30.5362903,9.82555781 C33.2721774,9.82555781 36.1330645,10.31643 36.1330645,10.31643 L36.1330645,16.5030426 L32.9798387,16.5030426 C29.875,16.5030426 28.90625,18.4421907 28.90625,20.4310345 L28.90625,25.1521298 L35.8397177,25.1521298 L34.7308468,32.4229209 L28.90625,32.4229209 L28.90625,50 C40.8578629,48.1115619 50,37.7058824 50,25.1521298 Z" id="Path"></path>
                							</g>
            							</g>
        							</g>
    							</g>
							</svg>
						 </Nav.Link>
					</Nav>
				</div>

				<Categories cat={data} />

			</Container>
			</div>
			<div className="color-white-bg">
				<Container>
					<FooterDown />
					<SiteProtect />
				</Container>
			</div>
			</footer>
		)
	
}


function Categories({cat}){
	
	let arr = cat.length>0?cat:[];
	const render = (arr || []).map(element=>{
		return <NestedCategories element={element} key={element.id}/>
	});
	

	return(
		<div className="container-categories-list">
			<Nav className="flex-column flex-lg-row justify-content-around">
				{render}
			</Nav>
		</div>
	)
}

function NestedCategories({element}){

	let widthWindow = window.innerWidth<=992;
	const [show, setShow] = useState(widthWindow?false:true);
	let main_slug = element.slug;
	const supportedLanguages = ["ru", "en", "uz", "oz"];
	let lang = window.location.pathname.split('/');
		lang.splice(0,1);
		lang = lang[0].length===2&&supportedLanguages.includes(lang[0])?lang[0]:'ru';

	const nestedCat = (element.children || []).map(element => {	
		
		return(
			<NavLink to={`/${lang}/${main_slug}/${element.type==='category'?element.slug:element.id}`} key={element.id} className="color-white-text text-left position-relative second-link" >{element.title}</NavLink> 
		);
	});

	
	var onTogle = ()=>{
		if(widthWindow) setShow(!show);
		
	}

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {

  		return <NavLink to={`/${element.slug}`} innerRef={ref} className="nav-link dropdown-toggle color-white-text font-weight-bold" onClick={e => onClick(e)}>{children}</NavLink>
		});

	return(
		<Dropdown className="position-static" show={show} onClick={onTogle}>
    <Dropdown.Toggle as={CustomToggle}>
    {element.title}
    </Dropdown.Toggle>
    <Dropdown.Menu className="w-100 align-items-lg-start">
       {nestedCat}
    </Dropdown.Menu>
            
 </Dropdown>
	)
}

function FooterDown(){
		
	return(
		<div className="desription-site-cookie">
			<p className="color-blue-text text-left"><FormattedHTMLMessage id="footer.text-descript-1" /></p>
			<p className="color-blue-text text-left"><FormattedHTMLMessage id="footer.text-descript-2" /></p>
			<p className="color-blue-text text-left mb-0"><FormattedHTMLMessage id="footer.text-descript-3" /></p>
		</div>
	)
}

function SiteProtect(){

	let year = new Date();
	year = year.getFullYear();
	
	return(
		<div className="bottom-footer-protect d-flex justify-content-between flex-wrap">
			<div className="lft-side-date col-md-4 pt-l-0">
				<p className="color-blue-text text-left mb-0 font-weight-bold text-site-sm" style={{paddingTop:'12px'}}>
					© 2018-{year} <FormattedHTMLMessage id="footer.text-descript-4" />
				</p>
			</div>

			<div className="bottom-contain-items col-md-8  pt--5">
			<Nav className="justify-content-start align-items-center align-items-sm-baseline justify-content-between ">
			<div className="d-flex">
			<NavLink to='#' className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="footer.link-1" /></NavLink>
			<span className="color-blue-text font-weight-bold"> | </span>
			<NavLink to='#' className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="footer.link-2" /></NavLink>
			</div>
			<div className="">
				<div className="container-logo-madetec" style={{width: '40px'}}>
					<a href="#" title="Madetec Solution"><img src={`${window.location.origin}/image/Logo/Madetec.svg`} alt="Madetec" className="w-100"/></a>
				</div> 
			</div>
			</Nav>
			
			</div>

			
		
		</div>
	)
}

class MobileApp extends Component{

	constructor(props){
		super(props);

		this.state = {
			mount: true
		}

		this.animCard = this.animCard.bind(this);
	}

	componentDidMount(){

		if(this.state.mount) this.animCard();
		
	}



	animCard(){
		let elem = document.getElementsByClassName('image-app')[0];
		let self = this;

		window.addEventListener('scroll', function() {
			
  			if(Animation(elem, self.state.mount)){
  				self.setState({mount: false});
  				document.getElementById('pictute-card-anim').classList.add('animate-card');
  			}
  			
		});
	}
	
	render(){
	return(
		<div className="app-bank-mobile color-white-bg" style={{padding:'20px 0px'}} id="app-bank">
			<Container>
				<div className="d-flex justify-content-md-between flex-wrap justify-content-center">
					<div className="app-mobile-description col-md-6">
						<p className="color-grey-text text-site-sm"><FormattedHTMLMessage id='footer.text-descript-app3' /></p>
						<h2 className="color-blue-text font-weight-bold"><FormattedHTMLMessage id='footer.text-descript-title' /></h2>
						<p className="color-blue-text text-site-sm" style={{marginTop: '1rem'}}><FormattedHTMLMessage id='footer.text-descript-app' /></p>
						<h6 className="color-blue-text font-weight-bold" style={{marginBottom:'1rem'}}><FormattedHTMLMessage id='footer.text-descript-app2' /></h6>

						<Nav>
							<a href="#app-store">
								<div className='link-app-down' style={{marginRight:'5px'}}><img src={`${window.location.origin}/image/Icons/app-store.svg`} alt="" /></div>
							</a>
							<a href="#play-market">
								<div className='link-app-down' style={{marginLeft:'5px'}}><img src={`${window.location.origin}/image/Icons/google-play.svg`} alt="" /></div>
							</a>
						</Nav>
					</div>

					<div className="image-app col-md-4">
						<div className="container-image m-aut">
							<img src={`${window.location.origin}/image/picture/Mobile.png`} alt="" className="picture-mobile img-contain position-relative" />
							<img src={`${window.location.origin}/image/picture/Mobile card.png`} className="picture-card img-contain position-absolute" alt="" id="pictute-card-anim" />
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
}

