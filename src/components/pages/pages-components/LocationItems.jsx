import React, {Component, useState, useRef, useEffect} from 'react';
import {FormattedHTMLMessage}from "react-intl";
import {Animated} from "react-animated-css";

import {SEARCH_LOCATION} from './wigets/API.js';
import {dataFilial, dataBankomat} from './wigets/dataApp.js';



export class PanelToolsBl extends Component{

	
	constructor(props){
		super(props);

		this.state = {
			filialState: this.props.filialStateG,
			bankomatState: this.props.bankomatStateG,
			resultSearch: [],
			target: this.props.targetL,
			listLocalItems: [],
			valueSearch: '',
			filial: this.props.filialObj,
			bankomat: this.props.bankomatObj
		}

		this.inputRef = React.createRef();
		this.listContainer = React.createRef();
		this.listLocation = this.listLocation.bind(this);
	}

	componentDidUpdate(prevProps){
		
		if(this.props.searchItems!==prevProps.searchItems){
			this.setState({resultSearch:this.props.searchItems})
		}
		if(this.props.filialStateG!==prevProps.filialStateG){
			this.setState({filialState:this.props.filialStateG})
		}
		if(this.props.bankomatStateG!==prevProps.bankomatStateG){
			this.setState({bankomatState:this.props.bankomatStateG})
		}
	}

	async searchControl (geocode, results, lng){

		
		this.setState({valueSearch: this.inputRef.current.value});
		let geoLocal = geocode.replace(' ', '+');

		let urlData = '&format=json&geocode='+geoLocal+'&results='+results+'&lng='+lng;
		
		if(geoLocal.length>4){
			this.listContainer.current.classList.remove('d-none');
			let response = await fetch(SEARCH_LOCATION+urlData, {method: 'GET'});
			let responseJSON = await response.json();
			if(responseJSON.response.GeoObjectCollection.featureMember.length>0){
				
				await this.setState({listLocalItems:responseJSON.response.GeoObjectCollection.featureMember});
			}else{
				await this.setState({listLocalItems:['not found']});
			}
		}else{
			this.listContainer.current.classList.add('d-none');
			if(this.state.listLocalItems.length>0){
				this.setState({listLocalItems:[]});
			}
		}
	}

	searchSubmitE(elem){
		
		this.props.searchEvent(elem);
	}

	

	listLocation(e){
		
		let location = this.inputRef.current.value;
		this.searchControl(location, 5, 'ru_RU');
	}

	selectLocal(pos=null, name='', elem){
		this.setState({valueSearch: name});
		this.props.selectLocalEvent(pos, name, elem);

	}

	toggleView(id){
		
		let result = {
			panelTools: false,
			itemView: true,
			data: null
		};

		
		let arr = dataFilial.filter(item=>item.id===id);
		if(arr.length>0){
			result.data = arr;
		}else{
			arr = dataBankomat.filter(item=>item.id===id);
			if(arr.length>0) result.data = arr;
		}

		this.props.toggleBlck(result);

	}


	render(){

	let imgSelectFl = `${window.location.origin}/image/Icons/location/ATM_fill.svg`,
		imgUnselectFl = `${window.location.origin}/image/Icons/location/ATM.svg`,
		imgSelectBk = `${window.location.origin}/image/Icons/location/Branch_fill.svg`,
		imgUnselectBk = `${window.location.origin}/image/Icons/location/Branch.svg`,
		classNa = !this.props.view?'panel-maps-tools position-relative pt-50':'panel-maps-tools position-relative panel-hide pt-50';
		

	return(

		<div className={classNa} style={{zIndex:'3'}}>
			<div className="filtr-location" style={{padding:'0px 15px'}}>
				<p className="font-weight-bold color-blue-text mb-0" ><FormattedHTMLMessage id="map.filtr-title" /></p>
				<div className="d-flex w-100 justify-content-start" style={{paddingTop:'10px'}}>
					<div className="col-lg-4 col-sm-3 col-4 col-md-5 pl-0">
						<div className="icon-filtr-maps" onClick={()=>this.props.toggleClick('filial')} style={{width:'60%', paddingBottom:'5px'}}>
							<img src={this.state.filialState?imgSelectBk:imgUnselectBk} alt="" />
						</div>
						<p className="text-left color-blue-text" style={{fontSize:'.8rem'}}><FormattedHTMLMessage id="map.filtr-filial" /></p>
					</div>
					<div className="col-lg-4 col-4 col-sm-3 col-md-5 pl-0">
						<div className="icon-filtr-maps" onClick={(type)=>this.props.toggleClick('bankomat')} style={{width:'60%', paddingBottom:'5px'}}>
							<img src={this.state.bankomatState?imgSelectFl:imgUnselectFl} alt="" />
						</div>
						<p className="text-left color-blue-text" style={{fontSize:'.8rem'}}><FormattedHTMLMessage id="map.filtr-bankomat" /></p>
					</div>
					</div>
				</div>

				<div className="search-location" style={{padding:'0px 15px'}}>
				<p className="text-left font-weight-bold color-blue-text mb-0" style={{fontSize:'.95rem'}}><FormattedHTMLMessage id="map.search" /></p>
					
					<div className="position-relative w-100 mt-10">
					<img src={`${window.location.origin}/image/Icons/location/Target.svg`} alt="" className="position-absolute" style={{width:'20px', left:'5px', cursor:'pointer'}} onClick={()=>this.selectLocal()}/>
					<input type='text' className="w-100" value={this.state.valueSearch} onChange={this.listLocation} ref={this.inputRef}></input>
					<img src={`${window.location.origin}/image/Icons/location/Search_location.svg`} alt="" className="position-absolute" style={{width:'20px', right:'10px', cursor: 'pointer'}} onClick={()=>this.searchSubmitE(this.listContainer.current)}/>
					</div>
					<ul className="pl-0 d-none" ref={this.listContainer}>
						{
							(this.state.listLocalItems || []).map((item, index)=>{
								
								return(
									<li key={index} style={{padding:'5px', cursor:'pointer'}} onClick={()=>this.selectLocal(item.GeoObject?item.GeoObject.Point.pos:null, item.GeoObject?item.GeoObject.name:'', this.listContainer.current)}>
										<p className="mb-0">{!item.GeoObject?item:''}</p>
										<p className="mb-0 font-weight-bold" style={{fontSize: '.8rem'}}>{item.GeoObject?item.GeoObject.name:''}</p>
										<p className="mb-0" style={{fontSize: '.8rem'}}>{item.GeoObject?item.GeoObject.description:''}</p>
									</li>
								)
							})
						}
					</ul>
				</div>

				<div className="result-of-search mt-10" >
					<div className="title-reault-head color-red-bg color-white-text text-left font-weight-bold" style={{padding:'5px'}}>
						<FormattedHTMLMessage id="map.result" />
					</div>
					<ul className="container-result" style={{padding:'20px 5px 0px 5px'}}>
						{
							(this.state.resultSearch || []).map((item,index)=>{

								return(
									<li key={index} className="d-flex item-srch-rslt" style={{cursor:'pointer'}} onClick={()=>this.toggleView(item.id)}>
										<div className="col-lg-3 col-md-3 col-sm-2 col-3 position-relative" style={{padding:'0 10px 10px 10px'}}>
											<img src={`${window.location.origin}${item.img}`} alt="" className="" style={{top:0, left:0}}/>
										</div>
										<div className="col-9 color-blue-text text-left pl-0">
											<p className="font-weight-bold mb-0 d-block text-truncate" style={{fontSize: '.9rem'}}>{item.name}</p>
											<p className="mb-0" style={{lineHeight: '1.2', fontSize:'.8rem'}}>{item.address}</p>
											<p className="font-weight-bold color-grey-text" style={{fontSize:'.85rem'}}>{item.km} km</p>
										</div>
									</li>
								)
							})
						}
					</ul>
				</div>
				</div>
		)
	}
}



export class PanelView extends Component{

	constructor(props){
		super(props);

		this.state = {
			type: this.props.type,
			view: false,
			data: [],
			targetLocation: [],
			mount: false
		}

		
	}

	componentDidUpdate(prevProps){
		if(this.props.type!==prevProps.type){
			this.setState({type: this.props.type});
		}
		

		if(this.props.view!==prevProps.view){
			this.setState({view: this.props.view});
			
		}

		if(this.props.data!==prevProps.data){
			this.setState({data: this.props.data});
		}

		if(this.props.targetLocal!==prevProps.targetLocal){
			if(this.props.targetLocal!==null) this.setState({targetLocation: this.props.targetLocal});
		}
	}



	directionEvent(){

		let link = '',
		targetLocal = this.state.targetLocation;

		let lat = targetLocal.length>0?targetLocal[0]:'',
		lng = targetLocal.length>0?targetLocal[1]:'',
		punktLat = this.state.data.length>0?this.state.data[0].location[0]:'',
		punkLng = this.state.data.length>0?this.state.data[0].location[1]:'';
		if(this.state.data.length>0){
			link = `https://yandex.ru/maps/?rtext=${lat},${lng}~${punktLat},${punkLng}&rtt=avto`;
			window.open(link, '_blank');
		}
	}


	render(){

		let imgBranch = `${window.location.origin}/image/picture/Location-office.png`,
		imgATM = `${window.location.origin}/image/picture/ATM.png`;
		let imgBan = this.state.type==='branch'?imgBranch:imgATM,
		classNa = this.state.view?'panel-view-srch-item position-absolute w-100 h-100 color-white-bg':'panel-view-srch-item position-absolute w-100 h-100 color-white-bg panel-hide';
		
		return(
			<Animated  animationIn="fadeInLeft" animationOut="fadeOutLeft"  animationInDuration ={500} isVisible={this.state.view} 
			className={classNa} style={{pointerEvents: 'auto'}} animateOnMount ={false}>
			
				<span className="font-weight-bold color-white-text position-absolute" onClick={()=>this.props.clickPanel()} style={{cursor:'pointer', zIndex:'100', top:'10px', left:'10px'}}>X</span>
				<div className="img-pic w-100">
					<img src={imgBan} alt="" className="w-100 h-100 img-cover"/>
				</div>

				<div className="title-location-info d-flex flex-md-column flex-lg-row position-relative" style={{padding:'20px 5px 10px', botderBottom:'1px solid #9E9E9E'}}>
					<div className="col-lg-9 col-md-12">
					<p className="font-weight-bold color-blue-text" style={{fontSize: '.9rem', lineHeight:'1.4'}}>{this.state.data.length>0?this.state.data[0].address['ru']:''}</p>
					<div className="d-flex justify-content-start">
						<span className="col-1 pl-0 position-relative" style={{height:'20px', paddingRight:'0'}}><img src={`${window.location.origin}/image/Icons/phone.svg`} alt="" className="position-absolute"/></span>
						<p className="color-blue-text col-11 mb-0" style={{fontSize:'.85rem'}}>{this.state.data.length>0?this.state.data[0].phone:''}</p>
					</div>
					<div className="d-flex justify-content-start pt-10">
						<span className="col-1 pl-0 position-relative" style={{height:'20px', paddingRight:'0'}}><img src={`${window.location.origin}/image/Icons/Time.svg`} alt="" className="position-absolute"/></span>
						<p className="color-blue-text col-11 mb-0" style={{fontSize:'.85rem'}}>{this.state.data.length>0?this.state.data[0].timeWork:''}</p>
					</div>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-2 col-3 pl-0 d-flex justify-content-center pt-10" style={{cursor:'pointer'}} onClick={()=>this.directionEvent()}>
						<img src={`${window.location.origin}/image/Icons/location/Direction.svg`} alt="" style={{width:'60%', height:'60%'}} className="m-aut"/>
						
					</div>
					<div className="position-absolute color-grey-bg bott-line" ></div>
				</div>
				<div className="position-relative" style={{padding: '10px 15px'}}>
				<p className="color-blue-text font-weight-bold mb-10" style={{fontSize:'.9rem'}}><FormattedHTMLMessage id="map.view-service" /></p>
				<ul className="pl-0 color-blue-text d-flex flex-column">
					{
						this.state.data.length>0?this.state.data[0].services['ru'].map((item,index)=>{
							return(
								<li style={{fontSize:'.9rem'}} key={index}>{item}</li>
							)
						}):''
					}
				</ul>
				<div className="position-absolute color-grey-bg bott-line" ></div>
				</div>

				<div style={{padding: '10px 15px'}}>
					<p className="color-blue-text font-weight-bold mb-10" style={{fontSize:'.9rem'}}><FormattedHTMLMessage id="map.view-recvizit" /></p>
					<ul className="pl-0 color-blue-text d-flex flex-column">
						{
							this.state.data.length>0?this.state.data[0].recvizites['ru'].map((item, index)=>{
								return(
									<li style={{fontSize:'.9rem'}} key={index}>{item}</li>
								)
							}):''
						}
					</ul>
				</div>
			
			</Animated >
		)
	}
}