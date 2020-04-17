import React, {Component} from 'react';
import {FormattedHTMLMessage} from 'react-intl';

import './css/deposite-calc.css';
import {CALCULATOR} from './wigets/API.js';
import {costRepl, sortArr} from './wigets/secondaryFunc.jsx';
import LoanApplication from './LoanApplication';


    

export default class Deposite extends Component{

	constructor(props){
		super(props);

		this.state = {
			activeCalc: true,
			nameDeposite: '',
			dataApply:{}	
		}

	}

	getApply(data){
		this.setState({dataApply: data});
	}

	render(){
		return(
			<>
			<div className="container deposite-calc-wrap pb-100 position-relative">
				<Calculate getApply={(data)=>this.getApply(data)}/>
				<div className="massege-inf color-blue-text d-flex position-absolute col-lg-8 col-10" style={{bottom:'15px', backgroundColor:'rgba(238, 238, 238,1)'}}>
					<img src={`${window.location.origin}/image/Icons/info.svg`} alt="" style={{width:'20px', height:'20px', marginRight:'10px'}}/>
					<p className="color-blue-text mb-0"><FormattedHTMLMessage id="info-mess.text1" /></p>
				</div>
			</div>
			<LoanApplication data={this.state.dataApply} name={this.state.nameDeposite} formGroup={['communication', 'statement']} type="deposite"/>
			</>
		)
	}
}




class Calculate extends Component{

	constructor(props){
		super(props);

		this.depositeCost = React.createRef();
		this.depositeTerm = React.createRef();
		this.part1 = React.createRef();
		this.part2 = React.createRef();
		this.piece = React.createRef();

		

		this.state = {
			currency: 'UZS',
			prepayment: 0,
			deposite: 0,
			term: 0,
			termArr: [],
			tarif: '',
			rate: 0,
			payments_month: 0,
			payments_year: 0,
			accumulation: 0,
			income: 0,
			contribution: false,
			replenishment: false,
			value1: 0,
			value2: 0,
			showRd: true,
			showBg: false,
			showPic:false,
			data: {}
			
		}

		this.getData();
	
		this.inputRange = this.inputRange.bind(this);
		this.toggleCrrency = this.toggleCrrency.bind(this);
		this.contribution = this.contribution.bind(this);
	}


	async getData(){
		
		let request = await fetch(CALCULATOR, {method:'GET'});
		let response = await request.json();
      	this.setData(response);
      
	}

	async setData(data){ 
		
		let arrDeposite =  (data || []).filter((item)=>item.type==='deposit');
		await this.setState({data: arrDeposite});		
		
		let termCount = await (this.state.data || []).filter(item=>item.currency===this.state.currency)
 		.map(item=>item.term).filter((e,i,a)=>a.indexOf(e)==i);

		let dataArr = await this.state.data.filter(item=>item.term===termCount[0])[0];

 		await this.setState({prepayment: dataArr.prepayment, 
 			term: dataArr.term,
 			tarif: dataArr.title,
 			rate: dataArr.percent,
 			deposite: dataArr.prepayment, 
 			termArr: termCount, 
 			replenishment: dataArr.replenishment});
 		
 		this.setValuesRange(this.depositeTerm.current, this.depositeTerm.current.value, 'term');
		
	}


	inputRange(element){

 		let type = element.getAttribute('data-type');
 		
 		this.trackerChange(element, element.value, type);
 		this.setValuesRange(element.value, type, element);
	
	}

	trackerChange(elem=null, value=0, type=null){
		
 		let valTrack = value*11;
		
 		if(type==='cost'){
 			this.setState({value1: value});
 		}else if(type==='term'){
 			this.setState({value2: value});
 		}else{
 			if(elem==null) this.setState({value2: value, value1: value});
 			
 		}
 		
 		if(elem&&elem!==null){
 			
 			elem.style.background = '-webkit-linear-gradient(left ,rgba(227, 30, 36, 1) 0%,rgba(227, 30, 36, 1) '+value+'%,rgba(33, 38, 64, .8) '+value+'%, rgba(33, 38, 64, .8) 100%)';
 		}else{
 			this.depositeCost.current.style.background = '-webkit-linear-gradient(left ,rgba(227, 30, 36, 1) 0%,rgba(227, 30, 36, 1) '+value+'%,rgba(33, 38, 64, .8) '+value+'%, rgba(33, 38, 64, .8) 100%)';
 			this.depositeTerm.current.style.background = '-webkit-linear-gradient(left ,rgba(227, 30, 36, 1) 0%,rgba(227, 30, 36, 1) '+value+'%,rgba(33, 38, 64, .8) '+value+'%, rgba(33, 38, 64, .8) 100%)';
 		}
 		
 		
	}

	async setValuesRange(value, type, element){
		
		if(type==='cost'){
			let deposite = this.state.prepayment,
 			valD = Number(value)/5;
 			valD = this.state.currency==='UZS'?(valD * deposite)+deposite:(valD * 500)+deposite;
 			await this.setState({deposite: valD});

		}else if(type==='term'){
			let depositeTerm = this.state.termArr;
			let curNum, step;

			if(depositeTerm.length>1){
 				curNum =Math.floor(100/(depositeTerm.length-1));
 				step = 100%(depositeTerm.length-1)===0?100/(depositeTerm.length-1):curNum;
 				let count = value/step;
 				await this.setState({term: depositeTerm[count]});
 				this.changeTarif();
 			}else{
 				curNum =100;
 				step = 100;
 				this.depositeTerm.current.value = 100;
 				await this.setState({value2: 100});
 				this.trackerChange(element, value, type);
 			}

 			this.depositeTerm.current.setAttribute('step', step);
		}

		this.animationDiagram();
		this.payments();

	}

	
	toggleCrrency(e){


		let cur = e.target.getAttribute('id');
		let contribution = document.getElementsByClassName('contribution-cont')[0];
		
		contribution.setAttribute('data-active', cur==='USD'?'false':'true');
		
		this.changeTarif(cur);
			
	}

	
	async  changeTarif(currency=null){

		let self = this;
			
		if(currency!==null&&this.state.currency!==currency){
			
 			let termCount = await this.state.data.filter(item=>item.currency===currency)
 			.map(item=>item.term).filter((e,i,a)=>a.indexOf(e)==i);
 			termCount = sortArr(termCount);
 			await this.setState({currency: currency, termArr: termCount, term: termCount[0]});
 			
		}

		await this.state.data.forEach((item)=>{
			
			if(item.currency===self.state.currency&&item.term===self.state.term){
				
				self.setState({tarif: item.title,
					deposite: item.prepayment, 
					prepayment: item.prepayment,
					rate: item.percent,
					replenishment:item.replenishment});
				
				}
		});
		
		
		if(currency!==null){
			this.trackerChange();
			this.depositeCost.current.value = 0;
			this.depositeTerm.current.value = 0;
			this.payments();
		}else{
			this.trackerChange(this.depositeCost.current,this.depositeCost.current.value, 'cost');
		}
		
		
		
	}

	payments(){

		let deposite_cost = this.state.deposite;
		let rate = this.state.rate/100;

		let a = (deposite_cost*rate/365)*30;
		a = this.state.currency==='UZS'?Math.round(a):Number(a.toFixed(2));

		let b = a * 12;
		b = this.state.currency==='UZS'?Math.round(b):Number(b.toFixed(2));

		let income = a/deposite_cost;
		income = (income*100)+this.state.rate;
		income = Number(income.toFixed(2));

		let accumulation = deposite_cost+b;
		accumulation = this.state.currency==='UZS'?Math.round(accumulation):Number(accumulation.toFixed(2));
		
	
    	this.setState({payments_month: a, 
    		payments_year: b, 
    		income: income, 
    		accumulation:accumulation});

	}


	async contribution(e){
		
		let active = document.getElementsByClassName('contribution-cont')[0];		
		if(this.state.replenishment) this.setState({contribution: !this.state.contribution});
		
	}

	animationDiagram(){

		let arr = {'89.6': ['56.2', '60.2'],'88.6': ['60.5', '60.2'],'87.6': ['63.8', '63.2'],'86.6': ['66.2', '65.5'],'85.6': ['68.2', '67.7'],'84.6': ['70.1', '69.5'],'83.6': ['71.7', '71.2'],
	'82.6': ['73.2', '72.5'],'80.6': ['75.8', '74.9'],'79.6': ['76.9', '75.9'],'78.6': ['78.1', '76.8'],'77.6': ['78.9', '77.9'],'76.6': ['79.8', '78.9'],'75.6': ['80.7', '79.9'],
  '74.6': ['81.5', '80.6'],'73.6': ['82.2', '81.6'],'72.6': ['82.9', '82.5'],'71.6': ['83.6', '82.6'],'70.6': ['84.2', '83.2'],'69.6': ['84.9', '83.9'],'68.6': ['85.4', '84.4'],
  '67.6': ['85.9', '84.9'],'66.6': ['86.4', '85.4'],'65.6': ['86.9', '85.9'],'64.6': ['87.3', '86.3'],
	'63.6': ['87.6', '86.6'],'62.6': ['88.0', '87.0'],'61.6': ['88.3', '87.3'],'60.6': ['88.6', '87.6'],'59.6': ['88.9', '87.9'],'58.6': ['89.1', '88.1'],'57.6': ['89.3', '88.1'],
	'56.6': ['89.5', '88.3'],'55.6': ['89.7', '88.5'],'54.6': ['89.8', '88.4'],'53.6': ['89.9', '88.5'],'52.6': ['90.0', '88.9'],'51.6': ['90.0', '88.9'],'50.6': ['90.0', '88.9'],
	'49.6': ['90.0', '88.9'],'48.6': ['90.0', '88.9'],'47.6': ['90.0', '88.9'],'46.6': ['89.8', '88.5'],'45.6': ['89.8', '88.5'],'44.6': ['89.6', '88.7'],'43.6': ['89.4', '88.1'],
	'42.6': ['89.3', '88.0'],'41.6': ['89.1', '87.9'],'40.6': ['88.9', '87.9'],'39.6': ['88.6', '87.6'],'38.6': ['88.4', '87.4'],'37.6': ['88.0', '87.0'],'36.6': ['87.7', '86.7'],
	'35.6': ['87.3', '86.3'],'34.6': ['86.9', '85.9'],'33.6': ['86.5', '85.5'],'32.6': ['86.0', '85.0'],'31.6': ['85.5', '84.7'],'30.6': ['85.0', '84.0'],'29.6': ['84.4', '83.4'],
	'28.6': ['83.8', '82.8'],'27.6': ['83.1', '82.1'],'26.6': ['82.4', '81.4'],'25.6': ['81.7', '80.7'],'24.6': ['80.9', '79.9'],'23.6': ['80.1', '79.1'],'22.6': ['79.1', '78.1'],
	'21.6': ['78.1', '77.1'],'20.6': ['77.1', '76.1'],'19.6': ['75.9', '74.9'],'18.6': ['74.8', '73.8'],'17.6': ['73.5', '72.5'],'16.6': ['72.0', '71.0'],'15.6': ['70.4', '69.4'],
  '14.6': ['68.6', '67.6'],'13.6': ['66.6', '65.6'],'12.6': ['64.2', '63.2'],'11.6': ['61.2', '60.2'],'10.6': ['56.9', '55.9'],'9.9': ['49.8', '48.8']};

  		let value = this.depositeCost.current.value/5;
  		let termV = this.depositeTerm.current.value>0?this.depositeTerm.current.value/50:0;
  		let a = 88.6;
  		
  		let res = a - (value+termV);
  		let c = 0;
  		for(let key in arr){

  			if(key===res.toFixed(1)){

  				this.part2.current.setAttribute('d', 'M 90 50 A 40 40 0 0 1 '+res.toFixed(1)+' '+arr[key][0]);
 				
  				this.piece.current.setAttribute('d', 'M 50 50 H 89 A 40 40 0 0 1 '+(res-1)+' '+arr[key][1]);
  			}
  		}
  			
  
  }

  componentDidUpdate(){

  	if(this.state.showBg){
  		this.part2.current.classList.add('hover-main');
  	}else if(this.state.showPic){
  		this.part2.current.classList.add('hover-dgrm')
  	}else{
  		this.part2.current.classList.remove('hover-main');
  		this.part2.current.classList.remove('hover-dgrm');
  	}
  	
  }

  sendApply(){
  	let data = {
  		name: this.state.tarif,
  		cost: this.state.deposite,
  		term: this.state.term,
  		percent: this.state.rate,
  		currency: this.state.currency
  	}
  	this.props.getApply(data);
  	let elem = document.getElementsByClassName('form-application-loan')[0];
    		window.scrollTo({top:elem.offsetTop, behavior: "smooth"});
  }


	render(){

		let currency = this.state.currency,
		currency_val = currency==='UZS'?'сум':'$',
		deposite_cost = costRepl(this.state.deposite),
		deposite_term = this.state.term,
		termarr = sortArr(this.state.termArr),
		

		min_term = termarr[0],
		max_term = termarr[termarr.length-1],
		accumulation = costRepl(this.state.accumulation);
		
		
		return(
			<div className="blok-dp-cont d-flex flex-nowrap justify-content-between flex-lg-row flex-column">

				<div className="value-of-calc col-12 col-lg-4">
					<ul className="pl-0">
						<li style={{padding: '5px 0px'}}>
							<p className="mb-0 color-blue-text font-weight-bold" style={{fontSize:'1rem'}}><FormattedHTMLMessage id='deposite.calc.it-1' /></p>
						</li>
						<li style={{padding: '5px 0px'}} className="position-relative d-flex justify-content-start">
							<div className="radio-currency-item" id="UZS" data-state={currency==='UZS'?'active':'sleep'} onClick={this.toggleCrrency}>Узбекский СУМ</div>
							<div className="radio-currency-item" id="USD" data-state={currency==='USD'?'active':'sleep'} onClick={this.toggleCrrency}>Доллар США</div>
						</li>
						<li  className="position-relative" style={{padding: '5px 0px'}}>
							<p className="mb-0 font-weight-bold" style={{fontSize:'1rem', paddingBottom: '3px'}}><FormattedHTMLMessage id='deposite.calc.it-2' /></p>
							<div className="top-slider-cost position-relative" style={{padding: '10px 15px 10px', backgroundColor: 'rgba(238,238,238,1)', borderRadius:'4px 4px 0px 0px'}}>
								<p className="mb-0 color-blue-text font-weight-bold">{deposite_cost} {currency_val}</p>
								<div className="position-absolute w-100" style={{left:0, top:'30px'}}>
									<div className="slidecontainer w-100">
  										<input type="range" className="slider" id="myRange1" data-type="cost" min="0" max="100" ref={this.depositeCost} onChange={(element)=>this.inputRange(this.depositeCost.current)} step="5" value={this.state.value1}  />
									</div>
									<div className="bot-slider-cost" style={{padding: '3px 0px'}}>
										<p className="mb-0 color-grey-text" style={{fontSize:'.9rem'}}><FormattedHTMLMessage id='deposite.calc.it-3.1' /> {this.state.prepayment}</p>
									</div>
								</div>
							</div>
						</li>
						<li  className="position-relative" style={{padding: '35px 0px 50px'}}>
							<p className="mb-0 color-blue-text font-weight-bold" style={{fontSize:'1rem', paddingBottom: '3px'}}><FormattedHTMLMessage id='deposite.calc.it-4' /></p>
							<div className="top-slider-term position-relative" style={{padding: '10px 15px 15px', backgroundColor: 'rgba(238,238,238,1)', borderRadius:'4px 4px 0px 0px'}}>
								<p className="mb-0 color-blue-text font-weight-bold text-uppercase" style={{fontSize:'.8rem'}}>{deposite_term} <FormattedHTMLMessage id='deposite.calc.it-5.3' /></p>
								<div className="position-absolute w-100" style={{left:0, top:'30px'}}>
									<div className="slidecontainer w-100">
  										<input type="range" className="slider" id="myRange2" data-type="term" min="0" max="100" ref={this.depositeTerm} onChange={(element)=>this.inputRange(this.depositeTerm.current)} step='0' value={this.state.value2}  />
									</div>
									<div className="bot-slider-term d-flex justify-content-between" style={{padding: '3px 0px'}}>
										<p className="mb-0 color-grey-text" style={{fontSize:'.9rem'}}><FormattedHTMLMessage id='deposite.calc.it-3.1' /> {min_term} <FormattedHTMLMessage id='deposite.calc.it-5.3' /> </p>
										<p className="mb-0 color-grey-text" style={{fontSize:'.9rem'}}><FormattedHTMLMessage id='deposite.calc.it-3.2' /> {max_term} <FormattedHTMLMessage id='deposite.calc.it-5.3' /></p>

									</div>
								</div>
							</div>
							
						</li>
						<li  className="position-relative contribution-cont" style={{padding: '5px 0px'}} data-active={this.state.replenishment?'true':'false'}>
							<p style={{fontSize:'1rem'}} className="mb--5 color-blue-text font-weight-bold"><FormattedHTMLMessage id="deposite.calc.it-6" /></p>
							<div className="checkbox-add-val d-flex justify-content-between">
								<p style={{fontSize:'.9rem'}} className="mb-0 color-blue-text"><FormattedHTMLMessage id="deposite.calc.it-8" /></p>
								<div className="check-box-div position-relative" data-state={this.state.contribution?'active':'sleep'}
								onClick={this.contribution}></div>
							</div>
						</li>
					</ul>
				</div>
				<div className="value-of-tarif col-lg-3 col-12 color-blue-bg">
					<ul className="container-value-deposite mb-0 pl-0" style={{padding:'15px 10px'}}>
						<li>
							<p className="color-grey-text text-center mb-0"><FormattedHTMLMessage id='deposite.value.it-1' /></p>
							<p className="color-white-text text-center mb-0 font-weight-bold">{this.state.tarif}</p>
						</li>
						<li>
							<p className="color-grey-text text-center mb-0"><FormattedHTMLMessage id='deposite.value.it-2' /></p>
							<p className="color-white-text text-center mb-0 font-weight-bold">{this.state.rate}%</p>
						</li>
						<li>
							<p className="color-grey-text text-center mb-0"><FormattedHTMLMessage id='deposite.value.it-3' /></p>
							<p className="color-white-text text-center mb-0 font-weight-bold" style={{fontSize:'1.3rem'}}>{costRepl(this.state.payments_month)} {currency_val}</p>
						</li>
						<li>
							<p className="color-grey-text text-center mb-0"><FormattedHTMLMessage id='deposite.value.it-4' /></p>
							<p className="color-white-text text-center mb-15 font-weight-bold" style={{fontSize:'1.3rem'}}>{this.state.income}%</p>
							<button className="d-block color-white-bg color-blue-text font-weight-bold text-uppercase" style={{margin: '10px auto'}} onClick={()=>this.sendApply()}><FormattedHTMLMessage id="deposite.value.button-1" /></button>
						</li>
					</ul>
				</div>
				<div className="main-round col-lg-4 col-md-7 col-12">
					<div className="enter-rount-text round-slp position-absolute font-weight-bold w-50" data-show={this.state.showRd?'show':'hide'}>
						<p className="mb--5 text-center color-dark-text"><FormattedHTMLMessage id="deposite.text.round-1"/></p>
						<p className="mb-0 text-center color-dark-text">{accumulation} {currency_val}</p>
					</div>
					<div className="enter-rount-text bg-round-hover position-absolute font-weight-bold w-50" data-show={this.state.showBg?'show':'hide'}>
						<p className="mb--5 text-center color-dark-text"><FormattedHTMLMessage id="deposite.text.round-2"/></p>
						<p className="mb-0 text-center color-dark-text">{deposite_cost} {currency_val}</p>
					</div>
					<div className="enter-rount-text sml-piece-hover position-absolute font-weight-bold w-50" data-show={this.state.showPic?'show':'hide'}>
						<p className="mb--5 text-center color-dark-text"><FormattedHTMLMessage id="deposite.text.round-3"/></p>
						<p className="mb-0 text-center color-dark-text">{costRepl(this.state.payments_year)} {currency_val}</p>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="mt-30">
						<circle r="40" cx="50" cy="50" className="main-circ color-white-fill" id="main-crc" 
							onMouseOver={()=>this.setState({showBg: true, showRd:false})}
							onMouseOut={()=>this.setState({showBg: false, showRd:true})} 
							ref={this.part1} />
						<path className="Pie__part_24Z_t " id="pice" d="M 90 50 A 40 40 0 0 1 88.6 60.5" ref={this.part2} data-qa-file="Pie"></path>
						<svg viewBox="0 0 100 100">
							<path className="Pie__part_24Z_t color-white-fill" 
								d="M 50 50 H 89 A 40 40 0 0 1 87.6 60.2" id="klo" ref={this.piece} 
								onMouseOver={()=>this.setState({showPic: true, showRd:false})}
								onMouseOut={()=>this.setState({showPic: false, showRd:true})} 
								></path>
						</svg>
					</svg>
				</div>
			</div>
		)
	}
}

