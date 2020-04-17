import React, {Component, useState, useRef, useEffect} from 'react';
import { YMaps, Map, Placemark, MarkerLayout, Marker, GeolocationControl,FullscreenControl,ZoomControl } from 'react-yandex-maps';
import {FormattedHTMLMessage}from "react-intl";

import {SEARCH_LOCATION} from './wigets/API.js';
import {dataFilial, dataBankomat} from './wigets/dataApp.js';

import './css/Location.css';
import {PanelToolsBl, PanelView} from './LocationItems.jsx';





export default class Location extends Component{

	constructor(props){
		super(props);

		this.state = {
			
			bankomatState: true,
			filialState: true,
			currentLocation: [],
			zoomLocation: null	

		}
	}

	toggleState(data){

		this.setState({bankomatState:data.bankomat, filialState: data.filial});
	}

	async setCurrentLocation(location=null){

		if(location!==null){
			this.setState({currentLocation: location});
		}
		
	}

	zoomLocal(location){
		if(location || location!==null){
			this.setState({zoomLocation:location});
		}else{
			this.setState({zoomLocation:null});
		}
	}



	render(){
		
		return(
			<div className="d-flex flex-lg-row flex-column flex-md-row flex-sm-column" style={{minHeight: '500px'}}>
				<PanelTools eventToggle={(data)=>this.toggleState(data)} setCurrentLocation={(location)=>this.setCurrentLocation(location)} currentLocation={this.state.currentLocation} zoomLocalEvent={(location)=>this.zoomLocal(location)}/>
				<Maps bankomatState={this.state.bankomatState} filialState={this.state.filialState} setCurrentLocation={(location)=>this.setCurrentLocation(location)} currentLocation={this.state.currentLocation} zoomLocation={this.state.zoomLocation} zoomLocalEvent={(location)=>this.zoomLocal(location)}/>
			</div>
  			
		)
	}

}


class PanelTools extends Component {

	constructor(props){
		super(props);

		this.state = {
			bankomatState: true,
			filialState: true,
			listLocationItems: [],
			valueSearch: '',
			resultSearch: [],
			targetLocal: null,
			typeView: '',
			bankomat: dataBankomat.map(item=>item.location),
			filial: dataFilial.map(item=>item.location),
			panelViewState: false,
			dataView: []

		}

		
	}

	async toggleClick(type){

		 if(type==='filial') await this.setState({filialState:!this.state.filialState});
		 else await this.setState({bankomatState:!this.state.bankomatState});

		 this.props.eventToggle({bankomat: this.state.bankomatState, filial: this.state.filialState});
		 if(this.state.targetLocal!==null) this.searchSubmit();
	}

	

	async selectLocal(pos=null, name=null, elem){

		if(pos!==null){
			
			if(elem) elem.classList.add('d-none');
			let point = pos.split(' ');
			point = point.reverse();
			
			this.setState({listLocationItems: [], valueSearch: name, targetLocal: point});
		}else{
			navigator.geolocation.getCurrentPosition((position)=> this.setState({targetLocal: [position.coords.latitude, position.coords.longitude], valueSearch:''}));
			setTimeout(()=>this.searchSubmit(), 300);
		}

	}

	async searchSubmit(elemContainer){

		var self = this;
		if(elemContainer) elemContainer.classList.add('d-none');
		

		if(this.state.targetLocal!==null||this.state.listLocationItems.length>0){

			this.setCurrentLocation(this.state.targetLocal);


		function sortArr (a,b){
			if(a.km>b.km) return 1;
			if(a.km<b.km) return -1;
		}


		if(this.state.filialState&&this.state.bankomatState){

			let dataAll = [];
			dataAll = dataAll.concat(dataFilial);
			dataAll = dataAll.concat(dataBankomat);
			let coordinate = [];
			coordinate = coordinate.concat(this.state.filial);
			coordinate = coordinate.concat(this.state.bankomat);
			let localArr = await nearLocal(dataAll, coordinate);
			let sortList = await localArr.sort(sortArr);
			
			this.setState({resultSearch: sortList});
		}else if(this.state.filialState){
			let localArr = await nearLocal(dataFilial, this.state.filial);
			let sortList = await localArr.sort(sortArr);
			this.setState({resultSearch: sortList});
		}else if(this.state.bankomatState){

			let localArr = await nearLocal(dataBankomat, this.state.bankomat);
			let sortList = await localArr.sort(sortArr);
			this.setState({resultSearch: sortList});
		}else{
			this.setState({resultSearch: []});
		}

	}

		function nearLocal(data, arr){
			let targetLocal = self.state.targetLocal!==null?self.state.targetLocal:(self.state.listLocationItems.length>0&&self.state.listLocationItems[0].GeoObject?self.state.listLocationItems[0].GeoObject.Point.pos.split(' ').reverse():[]);
				
				let localArr = arr.map((item,index)=>{
					let ln = targetLocal.length>0?Number(targetLocal[0]):0,
					tg = targetLocal.length>0?Number(targetLocal[1]):0;

					let km = Math.sqrt(Math.pow(item[0] - ln, 2) + Math.pow(item[1] - tg, 2))*100;

					return {
						id: data[index].id,
						name: data[index].title['ru'],
						address: data[index].address['ru'],
						img: data[index].img,
						km:Number(km.toFixed(1))
					};
					
			});
				
			
			return localArr;
		}
	}

	async resultView(result){
		if(result.data){
			this.props.zoomLocalEvent(result.data[0].location);
			await this.setState({typeView: result.data[0].type, panelViewState:true, dataView:result.data});
		}else{
			this.props.zoomLocalEvent(null);
			await this.setState({panelViewState:false});
		}
		
	}

	setCurrentLocation(location=null){
		this.props.setCurrentLocation(location);
		
	}

	clickPanel(){
		this.props.zoomLocalEvent(null);
		this.setState({panelViewState: false});
	}



	

	render(){
	
		return(
			<div className="col-lg-3 col-sm-12 col-md-4 position-relative lft-panel-location" >
				<PanelToolsBl toggleClick={(type)=>this.toggleClick(type)} filialStateG={this.state.filialState} 
				bankomatStateG={this.state.bankomatState} targetL={this.state.targetLocal!==null?this.state.targetLocal:[]} filialObj={this.state.filial} 
				bankomatObj={this.state.bankomat} selectLocalEvent={(name, pos,elem)=>this.selectLocal(name,pos,elem)} 
				searchEvent={(elemContainer)=>this.searchSubmit(elemContainer)} searchItems={this.state.resultSearch} toggleBlck={(result)=>this.resultView(result)} view={this.state.panelViewState}/>

				<PanelView toggleBlck={(result)=>this.resultView(result)} type={this.state.typeView} view={this.state.panelViewState} clickPanel={()=>this.clickPanel()} data={this.state.dataView} targetLocal={this.state.targetLocal}/>
				
			</div>
		)
	}
}







class Maps extends Component {
	constructor(props){
		super(props);

		this.state = {
			
			center: [41.309559, 69.274922],
			defaultCenter: [41.309559, 69.274922],
			zoom: 11,
			bankomatState: true,
			filialState: true,
			bankomat: dataBankomat.map(item=>item.location),
			filial: dataFilial.map(item=>item.location),
			localUser: [],
			localUserRoute: {}
			
		}

		this.createTemplateLayoutFactory = ymaps=>{
			if (ymaps && !this.state.template) {
        		this.setState({
          			mapData: {canter:this.state.center, zoom: this.state.zoom}
        		});     	

        		
      		}
		}

		this.map = React.createRef();
		
	}

	componentDidUpdate(prevProps){
		if(this.props.bankomatState!==prevProps.bankomatState){
			this.setState({bankomatState: this.props.bankomatState});
		}

		if(this.props.filialState!==prevProps.filialState){
			this.setState({filialState: this.props.filialState});
		}

		if(this.props.currentLocation!==prevProps.currentLocation){

			if(this.props.currentLocation.length>0){

				this.setState({
					localUser: this.props.currentLocation,
					localUserRoute: {lat: this.props.currentLocation[0], lng:this.props.currentLocation[1]},
					center: this.props.currentLocation,
					zoom: 13});				
				
			}
		}

		if(this.props.zoomLocation!==prevProps.zoomLocation){
			
			this.setState({
				center: this.props.zoomLocation!==null?this.props.zoomLocation:this.state.defaultCenter,
				zoom: this.props.zoomLocation!==null?16:11
			})
		}
	}

	
	async routeMaps(local=null){
		await navigator.geolocation.getCurrentPosition((position)=> this.setState({localUserRoute: {lat: position.coords.latitude, lng: position.coords.longitude}}));
	}

	

	render(){
	
		let bankomat = {
            iconLayout: 'default#image',
    		iconImageHref: `${window.location.origin}/image/Icons/location/ATM_pin.svg`,
        };
        let filial = {
            iconLayout: 'default#image',
    		iconImageHref: `${window.location.origin}/image/Icons/location/Branch_pin.svg`,
        };

        

       if(!this.state.localUserRoute.lat && !this.state.localUserRoute.lng) this.routeMaps();
		

		return(

			<div className="col-lg-9 col-sm-12 col-md-8 pl-0">
			<YMaps onApiAvaliable={this.createTemplateLayoutFactory}>
    			<div>
      				<Map onLoad={this.createTemplateLayoutFactory} state={{ center: this.state.center, zoom: this.state.zoom, behaviors: 'disable' }} instanceRef={this.map} style={{width: '100%', height:window.innerWidth<=768?'200px':'500px', transition: 'all .5s ease'}} modules={['geocode', 'templateLayoutFactory']}>
      					
      					{this.state.bankomatState && this.state.bankomat.map((coordinate,index) => {
      						
      						
      						let lat = this.state.localUserRoute.lat?this.state.localUserRoute.lat:0,
      						lng = this.state.localUserRoute.lng?this.state.localUserRoute.lng:0,
      						punktLocal = dataBankomat[index].location;
      						
      						return(
      						
      						<Placemark key={index} geometry={coordinate} options={bankomat} 
      						properties={
      							{
      						hintContent: `${dataBankomat[index].baloon.name['ru']}`,
      						balloonContentHeader: `<div>
      						<p>${dataBankomat[index].baloon.name['ru']}</p>
      						<h4>${dataBankomat[index].baloon.title}</h4>
      						</div>`,
        					balloonContent: `${dataBankomat[index].baloon.content}`,
        					balloonContentFooter: `<a href=${`https://yandex.ru/maps/?rtext=${lat},${lng}~${punktLocal[0]},${punktLocal[1]}&rtt=avto`} 
        					class="col-6 color-red-bg color-white-text d-block btn-routing text-left mt-10" target="_blank">${dataBankomat[index].baloon.button}</button>`
        						}
        					} 
        				modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}/>)}
							)}
      					{this.state.filialState && this.state.filial.map((coordinate,index) => {

      						let lat = this.state.localUserRoute.lat?this.state.localUserRoute.lat:0,
      						lng = this.state.localUserRoute.lng?this.state.localUserRoute.lng:0,
      						punktLocal = dataFilial[index].location;

      						return(
      						<Placemark key={index} geometry={coordinate} options={filial} properties={
      							{
      						hintContent: `${dataFilial[index].baloon.name['ru']}`,
      						balloonContentHeader: `<div>
      						<p>${dataFilial[index].baloon.name['ru']}</p>
      						<h4>${dataFilial[index].baloon.title}</h4>
      						</div>`,
        					balloonContent: `${dataFilial[index].baloon.content}`,
        					balloonContentFooter: `<a href=${`https://yandex.ru/maps/?rtext=${lat},${lng}~${punktLocal[0]},${punktLocal[1]}&rtt=avto`} 
        					class="col-10 color-red-bg color-white-text d-block btn-routing text-left mt-10" target="_blank">${dataFilial[index].baloon.button}</button>`
        						}
        					}  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}/>)})}

      					{
      						this.state.localUser.length>0 && (<Placemark geometry={this.state.localUser}  />)
      					}
      					<FullscreenControl />
      					 <ZoomControl options={{ float: 'right' }} />
    				</Map>
    			</div>
  			</YMaps>
  			</div>
		)
	}
}


