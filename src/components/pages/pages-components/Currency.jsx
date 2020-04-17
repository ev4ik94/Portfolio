import React, {Component} from 'react';
import {ListGroup, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";


import {timestampConverter} from './wigets/secondaryFunc.jsx';
import './css/Currency.css';


export default function Currency ({data}){
	
		let arrLocal = [],
		arrCb =[];

		var getData = (data)=>{
			
			if(data!==null){
				return data.sort((a,b)=>{
					if(a.created_at>b.created_at) return 1;
					if(a.created_at<b.created_at) return -1;
				})[data.length-1];
			}
			return '';
		}

		if(data.length>0&&(data[0].local&&data[0].cb)){
			
			var dataBank = data[0].local||[],
			dataCB = data[0].cb||[],
			lastDate = timestampConverter(data[0].cb.USD?data[0].cb.USD[0].created_at:'');
			arrLocal = [...arrLocal, getData(dataBank.EUR?dataBank.EUR:null), getData(dataBank.USD?dataBank.USD:null), getData(dataBank.RUB?dataBank.RUB:null)];
			arrCb = [...arrCb, getData(dataCB.EUR?dataCB.EUR:null), getData(dataCB.USD?dataCB.USD:null), getData(dataCB.RUB?dataCB.RUB:null)];
			
			
		}
		


		return(
			<div className="position-relative" id="currensy-block">
			<Container>
				<h2 className="font-weight-bold color-blue-text"><FormattedHTMLMessage id="currency.title-table" /></h2>
				<p className="color-grey-text text-site-sm">
					<FormattedHTMLMessage id="currency.text-table" /> 
					{lastDate?` ${lastDate}. `:' '} 
					<FormattedHTMLMessage id="currency.text-table2" />
				</p>
				<ListGroup className="currency-table-val position-relative" horizontal>
					<ListGroup horizontal className="col-md-6 col-lg-5 justify-content-between">
						<ListGroup.Item>
						<p className="text-left color-blue-text font-weight-bold mb-0 text-title-table"><FormattedHTMLMessage id="currency.text-list-title1" /></p>
							<ListGroup className="pt-10">
								{
									arrLocal.length>0?arrLocal.map(item=>{
										return(
											<ListGroup.Item key={item.id}>
												<p className={`color-blue-text text-left mb-0 position-relative cur-${item.indicator}`}>{item.currency}</p>
											</ListGroup.Item>
										)
									}):''
								}
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item>
						<p className="text-left color-blue-text font-weight-bold mb-0 text-title-table"><FormattedHTMLMessage id="currency.text-list-title2" /></p>
						<ListGroup className="pt-10">
								{
									arrCb.length>0?arrCb.map((item, index)=>{
										return(
											<ListGroup.Item key={index}>
												<p className="color-blue-text text-left mb-0">{item.buy}</p>
											</ListGroup.Item>
										)
									}):''
								}
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item>
						<p className="text-left color-blue-text font-weight-bold mb-0 text-title-table"><FormattedHTMLMessage id="currency.text-list-title3" /></p>
						<ListGroup className="pt-10">
								{
									arrLocal.length>0?arrLocal.map(item=>{
										return(
											<ListGroup.Item key={item.id}>
												<p className="color-blue-text text-left mb-0">{item.buy.toFixed(2)}</p>
											</ListGroup.Item>
										)
									}):''
								}
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item>
						<p className="text-left color-blue-text font-weight-bold mb-0 text-title-table"><FormattedHTMLMessage id="currency.text-list-title4" /></p>
						<ListGroup className="pt-10">
								{
									arrLocal.length>0?arrLocal.map(item=>{
										return(
											<ListGroup.Item key={item.id}>
												<p className="color-blue-text text-left mb-0">{item.sell.toFixed(2)}</p>
											</ListGroup.Item>
										)
									}):''
								}
							</ListGroup>
						</ListGroup.Item>
						<Link to='#' className="font-weight-bold color-blue-text 
						see-more-btn position-absolute"><FormattedHTMLMessage id="btn.see-all" /></Link>
					</ListGroup>
					<ListGroup.Item className="converter-form-block col-md-6 col-lg-4">
						<p className="text-left color-blue-text font-weight-bold mb-0 text-title-table">
						<FormattedHTMLMessage id="currency.text-list-title5" />
						</p>
						<Converter data={arrLocal}/>
					</ListGroup.Item>
					
				</ListGroup>

			</Container>
				<div className="position-absolute picture-money" style={{height:'95%'}}>
					<img src={`${window.location.origin}/image/picture/money.png`} alt="" className="img-contain" />
				</div>
			</div>
		)
	
}


class Converter extends Component{

	constructor(props){
		super(props);

		this.state = {
			
			activeCur: 'USD',
			isInvalid: false,
			usd_value:0,
			rub_value:0,
			eur_value:0
		}

		this.input = React.createRef();
	}

	validation(e){
		let value = e.target.value;
		let rex = new RegExp('[^0-9]');
		let validInp = rex.test(value)===false?true:false;
		
		if(value.length<10&&validInp){
			this.setState({isInvalid: false});
			this.calculate(value);
		}else{
			this.setState({isInvalid: true});
		}
		
	}

	calculate(value){

		value = Number(value)||0;
		let data = this.props.data,
		usd = data.filter(item=>item.currency==='USD')[0],
		eur = data.filter(item=>item.currency==='EUR')[0],
		rub = data.filter(item=>item.currency==='RUB')[0];

		switch(this.state.activeCur){
			case 'USD': 
			this.setState({
				usd_value: value,
				rub_value: (value*usd.buy)/rub.sell,
				eur_value: (value*usd.buy)/eur.sell
			});
			break;
			case 'UZS': 
			this.setState({
				usd_value: value/usd.sell,
				rub_value: value/rub.sell,
				eur_value: value/eur.sell
			});
			break
			case 'EUR': 
			this.setState({
				usd_value: (value*eur.buy)/usd.sell,
				rub_value: (value*eur.buy)/rub.sell,
				eur_value: value
			});
			break
			case 'RUB': 
			this.setState({
				usd_value: (value*rub.buy)/usd.sell,
				rub_value: value,
				eur_value: (value*rub.buy)/eur.sell
			});
			break
		}
	}

	async currencyClick(e){
		let cur = e.target.getAttribute('data-cur');
		await this.setState({activeCur: cur});
		this.calculate(this.input.current.value);
	}

	

	render(){
		
		return(
			<div className="pt-10">
			<ul className="d-flex title-convert-cur pl-0 justify-content-between">
				<li data-cur="USD" className={this.state.activeCur==='USD'?'active':''} onClick={(e)=>this.currencyClick(e)}>USD</li>
				<li data-cur="UZS" className={this.state.activeCur==='UZS'?'active':''} onClick={(e)=>this.currencyClick(e)}>UZS</li>
				<li data-cur="EUR" className={this.state.activeCur==='EUR'?'active':''} onClick={(e)=>this.currencyClick(e)}>EUR</li>
				<li data-cur="RUB" className={this.state.activeCur==='RUB'?'active':''} onClick={(e)=>this.currencyClick(e)}>RUB</li>
				<li data-cur="" data-currency="" className={this.state.activeCur==='-'?'active':''}>-</li>
			</ul>

			<div className="converter-form">
				<Form.Control type="text" maxLength="9" placeholder="Enter amount" ref={this.input}
				isInvalid = {this.state.isInvalid} onChange={(e)=>this.validation(e)}/>
				<div className="converter-value color-red-bg">
					<ul className="d-flex pl-0 justify-content-lg-center mb-0">
						<li className="color-white-text col-md-5">{this.state.usd_value.toFixed(2)} $</li>
						<li className="color-white-text col-md-5">{this.state.eur_value.toFixed(2)} €</li>
					</ul>
					<ul className="d-flex pl-0 justify-content-lg-center mb-0">
						<li className="color-white-text col-md-5">{`${this.state.rub_value.toFixed(2)} ք`}</li>
						<li className="color-white-text col-md-5">0.00 -</li>
					</ul>
				</div>
			</div>
			</div>
		)
	}
}