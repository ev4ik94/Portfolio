import React, {Component} from 'react';
import {NavLink, withRouter, Link} from "react-router-dom";
import PropTypes from "prop-types";
import './Header.css';
import './Nav.css';

import {findGetParameter, setCookie, readCookie, sortArr} from './pages/pages-components/wigets/secondaryFunc.jsx';


import Contact from './pages/pages-components/contactUs';

import {Container, Dropdown, Nav, Navbar, 
NavDropdown, DropdownItem, ListGroup, Form, FormControl, Button} from "react-bootstrap";
import {FormattedHTMLMessage}from "react-intl";




class NestedSet extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		element: PropTypes.object.isRequired
	};

	constructor(props){
		super(props);
		const {match, location, history, element, activeCut} = this.props;
		let matchLink = window.location.pathname.match(element.slug);
		let widthWindow = window.innerWidth<992;
		let activeCat = matchLink !== null && matchLink[0] === element.slug ? element.id : false;
		this.state = {
			activeSlug: activeCat,
			actCat: activeCat
		}
		
	}


	async activeBtn(slug){

		let activeCut = slug===this.props.element.slug?this.props.element.id:false;
		if(activeCut){
			this.props.setCat(activeCut);

		}
		
		
	}

	clkCat(){
		document.getElementById('responsive-navbar-nav').classList.remove('show');
	}

	


	render() {
		const supportedLanguages = ["ru", "en", "uz", "oz"];
		const self = this;
		const {element} = this.props;
		
		let matchLink = window.location.pathname.match(element.slug);
		let firstL = matchLink !== null && matchLink[0] === element.slug ? element.id : false;		
		let activeCutt = this.props.cut===element.id?this.props.cut:false;
		let lang = window.location.pathname.split('/');
		lang.splice(0,1);
		lang = lang[0].length===2&&supportedLanguages.includes(lang[0])?lang[0]:'ru';
		
		

		const nestedComments = (this.props.element.children || []).map(element => {
			
			let url = `/${lang}/${self.props.element.slug}/${element.type==='category'?element.slug:element.id}`;
			
			 return(
			 	<NavLink to={url} key={element.id} className="font-weight-bold child-header-links" onClick={()=>this.clkCat()}>{element.title}</NavLink>
			 );
		});

		const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
			let func = (e)=>{

				onClick(e);
				this.activeBtn(element.slug);
			}

  		return <Dropdown.Item as='li' className="nav-link dropdown-toggle color-white-text font-weight-bold" onClick={(e) => func(e)}>{children}</Dropdown.Item>
		});
		
		
		
		return (

			<Dropdown className="position-static" show={(this.props.cut>0?activeCutt:(firstL))?true:false}
            >

            <Dropdown.Toggle as={CustomToggle}>
            {element.title}
            </Dropdown.Toggle>
            <div className="dropdown-menu-arrow"></div>
            <Dropdown.Menu className="w-100 shadow-sm menu-header-nav">
                <div className="col-md-8 d-flex justify-content-start flex-column flex-lg-row pt-10">{nestedComments}</div>
                <div className="col-md-4 d-lg-flex d-none justify-content-end position-static align-items-center">
                	<div className="d-inline-block mr-2">
                		<img src="/image/Icons/phone.svg" className="" alt=""/>
                	</div>
                	<div className="mr-2 text-left">
                	<p className="mb-0 color-blue-text" style={{fontSize:'.8rem'}}><FormattedHTMLMessage id="header.contact-us-1" /></p>
                	<p className="mb-0 font-weight-bold color-blue-text">(+998 71)214 20 00</p>
                	</div>
                	<Dropdown className="position-static">
                		<Dropdown.Toggle className="d-inline-block mr-2 shadow-none" id="tuggle-lg-contact">
                			<img src="/image/Icons/arrow-pro.svg" className="" alt=""/>
                		</Dropdown.Toggle>
                		<Dropdown.Menu className="" id="dropdown-contact-us">
                			<Contact classN="flex-row justify-content-between w-100 contact-list-group" 
                			colorIcon="rgba(33, 38, 64, 1)" element="header"/>
                		</Dropdown.Menu>
                	</Dropdown>
                </div>
            </Dropdown.Menu>
            
            </Dropdown>
		);

	}
}


const ShowTheLocationWithRouter = withRouter(NestedSet);


export default class Header extends Component {
	
	constructor(props) {
		super(props);
		let lang = window.location.pathname.split('/');
		lang.splice(0,1);
		lang = lang[0];
		
		this.state = {
			getList: false,
			dataCategory: props.data,
			search: false,
			toggleMenu: false,
			lang: readCookie('lang')?readCookie('lang'):'Рус',
			langShow: false,
			activeCut: 10
		};

		
		this.containerList = React.createRef();
		this.searchInp = React.createRef();
				
		
	}

	componentDidUpdate(prevProps, prevState) {
     
    if (this.props.data !== prevProps.data) {
      
          this.setState({dataCategory: this.props.data});
          setTimeout(()=>this.setData(),200)
      }

      if(this.state.lang!==prevState.lang){
      	setCookie('lang', this.state.lang);
      	window.location.reload();
      }

      
      if(this.state.activeCut!==prevState.activeCut){
      	this.renderCategories(this.state.dataCategory);
      }
      
    }

	async setData() {
		
		let result = this.state.dataCategory;
		
		if(result){
			
			result = await result.filter(item=>item.id!==29&&item.id!==30);
			result = sortArr(result, 'id');
			this.renderCategories(result);
			this.setState({dataCategory: result});
		}
		
	}

	
	async renderCategories(arr) {

		let self = this;
		
		var NestedCategory = arr.map((element, index) => {

			return <ShowTheLocationWithRouter element={element} key={element.id} 
			setCat={(cat)=>this.setState({activeCut:cat})}
			cut={this.state.activeCut}
			/>
		})
		
		await this.setState({getList: NestedCategory});

	}

	slideFrom(e){
		e.preventDefault();
				
		let form = document.getElementById('container-form-mob');
		let wrap = document.getElementsByClassName('wrap-shad')[0];
		if(!form.classList.contains('form-show')){

			form.classList.remove('form-hide');
			form.classList.add('form-show');
			wrap.setAttribute('data-show', 'show');
		}
		
	}

	
	render() {
		

		var self = this;
		let withWind = window.innerWidth<=992;
		let lng = window.location.pathname.split('/');
		const arrLng = {'Рус': 'ru', 'Uzb':'uz', 'Eng':'en', 'Узб':'oz'};
		lng.splice(0,1);
		if(lng[0].length===2&&['ru', 'en', 'uz', 'oz'].includes(lng[0])){
			lng.splice(0,1);
		}
		let url = lng.join('/');
		let lang = readCookie('lang')?readCookie('lang'):'Рус';
		lang = arrLng[lang];
		

		
		return (
			<Navbar collapseOnSelect expand="lg" className="color-blue-bg" 
			expanded={this.state.toggleMenu} onToggle={(e)=>this.setState({toggleMenu: e})}>
				<Container fluid="true" className="flex-lg-nowrap">

					<div className="header-nav-brand d-flex flex-nowrap w-100 col-lg-2 justify-content-between">
					<div className="d-flex flex-nowrap">
						<Navbar.Toggle className="mr-2" aria-controls="responsive-navbar-nav" />
						<NavLink to={'/'+lang} className="navbar-brand">
							<img src="/image/Logo/Blue-bg-text.svg" alt=""/>
						</NavLink>
					</div>

					<div className="d-lg-none d-flex justify-content-between align-items-center" style={{padding:'0px 5px'}}>
				
						<Dropdown className="position-static">
							<Dropdown.Toggle id="toggle-contacts" className="shadow-none">
           						<div className="icon-container">
           						<img src="/image/Icons/phone-mobile.svg" className="" alt=""/>
           						</div>
            				</Dropdown.Toggle>
            
            				<Dropdown.Menu className="" id="dropdown-contact-us-mobile">
                		<ListGroup as='ul' className="justify-content-start w-100">
                			<ListGroup.Item as='li' className="d-flex">
                				<div className="icon-contacts mr-2">
                					<img src="/image/Icons/logo-cb.svg" alt=""/>
                				</div>
                				<div className="text-contsct-us">
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.Cb-bank-title" />
                					</p>
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.Cb-bank-phone" />
                					</p>
                				</div>
                			</ListGroup.Item>
                			<ListGroup.Item as='li'  className="d-flex">
                				<div className="icon-contacts  mr-2">
                					<img src="/image/Icons/phone.svg" alt=""/>
                				</div>
                				<div className="text-contsct-us">
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.information" />
                					</p>
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.information-phone" />
                					</p>
                				</div>
                			</ListGroup.Item>
                			<ListGroup.Item as='li'  className="d-flex">
                				<div className="icon-contacts  mr-2">
                					<img src="/image/Icons/email.svg" alt=""/>
                				</div>
                				<div className="text-contsct-us">
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.email-text" />
                					</p>
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.email" />
                					</p>
                				</div>
                			</ListGroup.Item>
                			<ListGroup.Item as='li'  className="d-flex">
                				<div className="icon-contacts  mr-2">
                					<img src="/image/Icons/logo-cb.svg" alt=""/>
                				</div>
                				<div className="text-contsct-us">
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.virtual-reseption" />
                					</p>
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.virtual-reseption2" />
                					</p>
                				</div>
                			</ListGroup.Item>
                			<ListGroup.Item as='li'  className="d-flex">
                				<div className="icon-contacts  mr-2">
                					<img src="/image/Icons/Time.svg" alt=""/>
                				</div>
                				<div className="text-contsct-us">
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.work-time-text" />
                					</p>
                					<p className="mb-0 color-blue-text text-nowrap text-left">
                						<FormattedHTMLMessage id="header.work-time" />
                					</p>
                				</div>
                			</ListGroup.Item>
                		</ListGroup>
                		</Dropdown.Menu>
            			</Dropdown>	
						
						<Nav.Link href="#login" className="d-flex justify-content-between align-items-center enter-user-prof" onClick={(e)=>this.slideFrom(e)}>
							<div className="icon-container mr-1">
							<img src="/image/SVG/Log-in.svg" className="d-inline-block" alt=""/>
							</div>
							<p className="text-nowrap mb-0 color-white-text"><FormattedHTMLMessage id="header.tools-2"/></p>
						</Nav.Link>
					</div>
					</div>

					{this.state.search&&(
						<div className="position-absolute m-aut color-blue-bg" id="search-form">
						<Form inline className="d-flex flex-nowrap m-aut">
						<Button id="serch-btn-site" className="shadow-none"><img src="/image/SVG/Search.svg" className="mr-1 d-inline-block" alt=""/></Button>
      					<FormControl type="text" placeholder="Search" className="mr-sm-2 w-100" ref={this.searchInp}/>
      					<Button id="close-btn-search" className="shadow-none" onClick={()=>this.setState({search: false})}>X</Button>
    					</Form>
    					</div>
						)}
					
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="justify-content-start justify-content-lg-between flex-row d-lg-none spec-tools position-lg-relative">
							
							<Nav.Link href="#search" onClick={(e)=>{
								e.preventDefault();
								self.setState({search: !self.state.search});
							}}>
								<div className="icon-container" style={{width:'20px'}}>
									<img src="/image/SVG/Search.svg" className="mr-1 d-inline-block" alt=""/>
								</div>
							</Nav.Link>
							<Link to={`/${lang}/location`} className="nav-link d-flex justify-content-between align-items-center">
								<div className="icon-container">
								<img src="/image/SVG/Location.svg" className="mr-1 d-inline-block h-auto" alt=""/>
								</div>
								<p className="text-nowrap mb-0 color-white-text"><FormattedHTMLMessage id="header.tools-1"/></p>
							</Link>
							

							<Dropdown className="position-relative dropdown-container-lang">
								<Dropdown.Toggle id="toggle-glass" className="d-flex shadow-none" style={{background:'transparent', border:'none'}}>
									<div className="icon-container">
									<img src="/image/Icons/Glass.svg" className="mr-1 d-inline-block" alt=""/>
									</div>
					
								</Dropdown.Toggle>
								<Dropdown.Menu className="position-absolute color-white-bg dropdown-lang-list" style={{width:'170px'}}>
									<ul className="d-column justify-content-between align-items-center w-100" style={{padding:'10px'}}>
										<li>
											<p className="color-grey-text mb-0 text-left"><FormattedHTMLMessage id="glass.title-text" /></p>
											<ul className="pl-0">
												<li className="color-blue-text text-left"><span className="font-weight-bold" style={{fontSize:'1.1rem', padding:'0px 10px'}}>-</span><FormattedHTMLMessage id="glass.text-1" /></li>
												<li className="color-blue-text text-left"><span className="font-weight-bold" style={{fontSize:'1.1rem', padding:'0px 10px'}}>+</span><FormattedHTMLMessage id="glass.text-2" /></li>
											</ul>
										</li>
										<li>
											<p className="color-grey-text mb-0 text-left"><FormattedHTMLMessage id="glass.title-text2" /></p>
											<ul className="pl-0" style={{padding:'5px 10px'}}>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/eye-blue-1.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-3" /></li>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/eye-blue-2.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-4" /></li>
											</ul>
										</li>
										<li>
											<p className="color-grey-text mb-0 text-left"><FormattedHTMLMessage id="glass.title-text3" /></p>
											<ul className="pl-0" style={{padding:'5px 10px'}}>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/contrast.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-5" /></li>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/circle.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-6" /></li>
											</ul>
										</li>
									</ul>
								</Dropdown.Menu>
							</Dropdown>
							
							<Dropdown className="position-relative dropdown-container-lang">
								<Dropdown.Toggle id="toggle-language" className="d-flex shadow-none">
									<div className="icon-container">
									<img src="/image/SVG/Globus.svg" className="mr-1 d-inline-block" alt=""/>
									</div>
									<span className="d-block color-white-text ml-1" style={{paddingTop:'3px'}}>{this.state.lang}</span>
								</Dropdown.Toggle>
								<Dropdown.Menu className="position-absolute w-100 color-white-bg dropdown-lang-list">
									<ul className="d-column justify-content-between align-items-center pt-l-0 w-100">
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Uzb'})}><Link to={`/uz/${url}`} className="text-center color-blue-text">Uzb</Link></li>
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Узб'})}><Link to={`/oz/${url}`} className="text-center color-blue-text">Узб</Link></li>
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Рус'})}><Link to={`/ru/${url}`} className="text-center color-blue-text">Рус</Link></li>
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Eng'})}><Link to={`/en/${url}`} className="text-center color-blue-text">Eng</Link></li>
									</ul>
								</Dropdown.Menu>
							</Dropdown>

							<Nav.Link href="#login" className="d-lg-flex d-none justify-content-between align-items-center">
								<div className="icon-container mr-1">
								<img src="/image/SVG/Log-in.svg" className="d-inline-block" alt=""/>
								</div>
								<p className="text-nowrap mb-0 color-white-text"><FormattedHTMLMessage id="header.tools-2"/></p>
							</Nav.Link>
						</Nav>
						{this.state.search===false&&(
							<Nav className="mr-auto " >{this.state.getList}</Nav>
							)}
						{this.state.search===false&&(
							<Nav className={`justify-content-md-start justify-content-between d-lg-flex d-none spec-tools position-lg-relative`}>
							
							<Nav.Link href="#search" onClick={(e)=>{
								e.preventDefault();
								self.setState({search: !self.state.search});
							}}>
								<div className="icon-container" style={{width:'20px'}}>
									<img src="/image/SVG/Search.svg" className="mr-1 d-inline-block" alt=""/>
								</div>
							</Nav.Link>
							<Link to={`/${lang}/location`} className="nav-link d-flex justify-content-between align-items-center">
								<div className="icon-container">
								<img src="/image/SVG/Location.svg" className="mr-1 d-inline-block h-auto" alt=""/>
								</div>
								<p className="text-nowrap mb-0 color-white-text"><FormattedHTMLMessage id="header.tools-1"/></p>
							</Link>
							<Dropdown className="position-relative dropdown-container-glass">
								<Dropdown.Toggle id="toggle-glass" className="d-flex shadow-none" style={{background:'transparent', border:'none'}}>
									<div className="icon-container">
									<img src="/image/Icons/Glass.svg" className="mr-1 d-inline-block" alt=""/>
									</div>
					
								</Dropdown.Toggle>
								<Dropdown.Menu className="position-absolute color-white-bg dropdown-lang-list" style={{width:'170px'}}>
									<ul className="d-column justify-content-between align-items-center w-100" style={{padding:'10px'}}>
										<li>
											<p className="color-grey-text mb-0 text-left"><FormattedHTMLMessage id="glass.title-text" /></p>
											<ul className="pl-0">
												<li className="color-blue-text text-left"><span className="font-weight-bold" style={{fontSize:'1.1rem', padding:'0px 10px'}}>-</span><FormattedHTMLMessage id="glass.text-1" /></li>
												<li className="color-blue-text text-left"><span className="font-weight-bold" style={{fontSize:'1.1rem', padding:'0px 10px'}}>+</span><FormattedHTMLMessage id="glass.text-2" /></li>
											</ul>
										</li>
										<li>
											<p className="color-grey-text mb-0 text-left"><FormattedHTMLMessage id="glass.title-text2" /></p>
											<ul className="pl-0" style={{padding:'5px 10px'}}>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/eye-blue-1.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-3" /></li>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/eye-blue-2.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-4" /></li>
											</ul>
										</li>
										<li>
											<p className="color-grey-text mb-0 text-left"><FormattedHTMLMessage id="glass.title-text3" /></p>
											<ul className="pl-0" style={{padding:'5px 10px'}}>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/contrast.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-5" /></li>
												<li className="color-blue-text text-left d-flex"><span className="font-weight-bold" style={{width:'25px', height:'20px', paddingRight:'10px'}}><img src={`${window.location.origin}/image/Icons/circle.svg`} alt="" /></span><FormattedHTMLMessage id="glass.text-6" /></li>
											</ul>
										</li>
									</ul>
								</Dropdown.Menu>
							</Dropdown>
							
							<Dropdown className="position-relative dropdown-container-lang">
								<Dropdown.Toggle id="toggle-language" className="d-flex shadow-none">
									<div className="icon-container">
									<img src="/image/SVG/Globus.svg" className="mr-1 d-inline-block" alt=""/>
									</div>
									<span className="d-block color-white-text ml-1" style={{paddingTop:'3px'}}>{this.state.lang}</span>
								</Dropdown.Toggle>
								<Dropdown.Menu className="position-absolute w-100 color-white-bg dropdown-lang-list" >
									<ul className="d-column justify-content-between align-items-center pt-l-0 w-100">
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Uzb'})}><Link to={`/uz/${url}`} className="text-center color-blue-text">Uzb</Link></li>
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Узб'})}><Link to={`/oz/${url}`} className="text-center color-blue-text">Узб</Link></li>
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Рус'})}><Link to={`/ru/${url}`} className="text-center color-blue-text">Рус</Link></li>
										<li style={{padding:'5px'}} onClick={()=>this.setState({lang: 'Eng'})}><Link to={`/en/${url}`} className="text-center color-blue-text">Eng</Link></li>
									</ul>
								</Dropdown.Menu>
							</Dropdown>

							<Nav.Link href="#login" className="d-lg-flex d-none justify-content-between align-items-center" onClick={(e)=>this.slideFrom(e)}>
								<div className="icon-container mr-1">
								<img src="/image/SVG/Log-in.svg" className="d-inline-block" alt=""/>
								</div>
								<p className="text-nowrap mb-0 color-white-text"><FormattedHTMLMessage id="header.tools-2"/></p>
							</Nav.Link>
						</Nav>
						)}
						
					</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	}
}
