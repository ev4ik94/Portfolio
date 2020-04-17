import React, {Component, useState, useEffect, useMemo } from 'react';
import {FormattedHTMLMessage}from "react-intl";
import {Container, Modal, Dropdown, Alert} from "react-bootstrap";
import PropTypes from "prop-types";

import {costRepl, sortArr} from './wigets/secondaryFunc.jsx';
import {dataCars, month} from './wigets/dataApp.js';
import LoanApplication from './LoanApplication';
import Deposite from './deposite-calc';


class Calculate extends Component{
	constructor(props){
		super(props);

		this.state = {
			type: '',
			data: []
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.dataCalculate!==prevProps.dataCalculate){
			this.setState({data: this.props.dataCalculate});
		}
			
		if(this.props.type!==prevProps.type){
			this.setState({type: this.props.type});
		}
	}

	componentDidMount(){
		if(this.state.type===''){
			this.setState({type: this.props.type});
		}

		if(this.state.data.length===0){
			this.setState({data: this.props.dataCalculate});
		}
		
	}


	render(){
		
		return(
			<>
			{this.state.type==='credit' && (<CarCalculate match={this.props.match} dataCalculate={this.state.data} />)}
			{this.state.type==='deposite' && (<Deposite match={this.props.match} dataCalculate={this.state.data} />)}
			</>
		)	
	}
}


class CarCalculate extends Component{

	static propTypes = {
		match: PropTypes.object.isRequired,
		dataCalculate: PropTypes.array.isRequired
	};

	constructor(props){
		super(props);

		this.state = {
			
			selectProduct:false,
			dataCalculators: [],
			enterSum:false,
			currentProduct: [],
			engine: 0,
			cost: 0,
			amountCost: 0,
			prepaymentPercent: 0,
			term: 0,
			sum: 0,
			sendData: {},
			nameCredit: '',
			products: false,
			mount: true,
			calcGroup:false,
			dataGroupCalc: []

		}


		
	}

	componentDidUpdate(prevProps) {
   
    if (this.props.dataCalculate !== prevProps.dataCalculate) 
          this.setData(this.props.dataCalculate);
     

    }

    componentDidMount(){
    	if(this.props.dataCalculate.length>0&&this.state.mount){
    	    this.setData(this.props.dataCalculate);

    	    this.setState({mount:false});
    	  }
    	  
    }

    
    calculators(arr){
    	
    	let calculators = sortArr(arr, 'prepayment');

    	this.setState({
    		dataCalculators: calculators,
    		prepaymentPercent:calculators[0].prepayment?calculators[0].prepayment:0,
          	term: 12,
          	cost: calculators[0].amount?calculators[0].amount:0,
          	amountCost: calculators[0].amount?calculators[0].amount:0});
    }

    btnRend(){
    	if(this.state.calcGroup){
    		return this.state.dataGroupCalc.map((item, index)=>(
    			<div className="tab-item font-weight-bold col-md-6 text-center" key={index} data-id={item.id} data-type="cost-blk" data-active={index===0?true: false} onClick={(e)=>this.toggleTabs(e)}>
					{item.title}
				</div>
    		))
    	}else if(this.state.products){
    		
    		return (
    		<>
    			<div className="tab-item font-weight-bold col-md-6 text-center" data-type="cost-blk" data-active={this.state.enterSum} onClick={(e)=>this.toggleTabs(e)}>
					<FormattedHTMLMessage id="avtocredit.calc-text4" />
				</div>
				<div className="tab-item font-weight-bold col-md-6 text-center" data-type="avto-blk" data-active={this.state.selectProduct} onClick={(e)=>this.toggleTabs(e)}>
					<FormattedHTMLMessage id="avtocredit.calc-text5" />
				</div>
				</>
    		)
    	}else{
    		return(
    			<div className="tab-item font-weight-bold col-md-6 text-center" data-type="cost-blk" data-active={this.state.enterSum} onClick={(e)=>this.toggleTabs(e)}>
					<FormattedHTMLMessage id="avtocredit.calc-text4" />
				</div>
    		)
    	}
    }

    async setData(data){
    	
    	let calculatorGroup = data[0].calculators[0].group? true: false;
    	let calculators =  calculatorGroup? data[0].calculators[0].group: data[0].calculators;
    	
    	if(calculatorGroup){
    		this.calculators(calculators[0].calculators);
    	}else{
    		this.calculators(calculators);
    	}
    	
    	
    	await this.setState({
    		calcGroup: calculatorGroup,
    		dataGroupCalc: calculatorGroup?calculators:[],
          	nameCredit: data[0].title,
          	products: data[0].products,
          	currentProduct: data[0].products?[dataCars[0]]:[],
          	typeProduct:dataCars[0].engine[0].id,
          	selectProduct: data[0].products,

          	});
    	
    }

	toggleTabs(e){

		let elem = e.target.classList.contains('tab-item')?e.target:e.target.parentElement,
		typeBlck = elem!==null?elem.getAttribute('data-type'):false,
		tabsArr = document.getElementsByClassName('tab-item');

		if(typeBlck){
			
			if(typeBlck==='cost-blk'){
				if(this.state.calcGroup){
					var id = elem.getAttribute('data-id');
					for(var k=0; k<tabsArr.length; k++){
						if(tabsArr[k].getAttribute('data-active')==='true'){
							tabsArr[k].setAttribute('data-active', 'false');
							break;
						}
					}
					elem.setAttribute('data-active', 'true');
					let calc = this.state.dataGroupCalc.filter(item=>item.id===Number(id));

					this.calculators(calc[0].calculators);
					

				}else{
					this.setState({selectProduct:false, enterSum:true});
				}
			}else{
				this.setState({selectProduct:true, enterSum:false});
			}
		}

	}

	async selectProd(data, cost){

		await this.setState({currentProduct: data!==null&&this.state.products?data:this.state.currentProduct, 
			cost:cost===null&&this.state.products?data[0].engine[0].cost:cost.cost});
		if(this.state.products) this.setState({engine: cost!==null?cost.id:data[0].engine[0].id});
	
		
	}

	sendApply(data){

		let send = {
			calculator: (this.state.dataCalculators || []).filter(item=>item.prepayment===data.prepayment),
			term: data.term?data.term:'',
			cost: this.state.cost,
			prepaymentCost: data.prepaymentCost?data.prepaymentCost:0,
			costMonth: data.costMonth?data.costMonth:0,
			selectProduct: this.state.currentProduct,
			engine: this.state.engine,
			products: this.state.products
			
		}


		this.setState({sendData: send});
		let elem = document.getElementsByClassName('form-application-loan')[0];
    		window.scrollTo({top:elem.offsetTop, behavior: "smooth"});
    		
  
		
	}

	render(){
			
		return(
			<>
			<div className="calculator-avto color-blue-bg calculator-loan-container" style={{padding:'30px 0px'}}>
				<Container className="d-flex flex-column flex-lg-row justify-content-between position-relative pb-80">
					<div className="col-lg-4 col-12 m-aut">
						<p className="color-grey-text mb-20 font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-text1" /></p>
						<p className="color-white-text font-weight-bold mb-20" style={{fontSize:'1.2rem', lineHeight:1.2}}><FormattedHTMLMessage id="avtocredit.calc-text2" /></p>


						<div className="tabs-calc-avto d-flex mb-10">
							{this.btnRend()}
						</div>

						<div className="render-select-tab">
							{
								this.state.selectProduct?<ProductSelect dataProducts={dataCars} selectEvent={(data, cost)=>this.selectProd(data, cost)}/>:<Cost eventCost={(data, cost)=>this.selectProd(data, cost)} amountCost={this.state.amountCost}/>
							}
						</div>
						{this.state.selectProduct?(<div className="d-lg-block d-none" style={{height:'120px'}}></div>):''}
					</div>
					<LoanConditions calculator={this.state.dataCalculators} cost={this.state.cost} product={this.state.currentProduct} engine={this.state.engine} send={(data)=>this.sendApply(data)}/>
					<div className="massege-inf color-white-bg color-blue-text d-flex position-absolute col-lg-8 col-10" style={{bottom:'-15px'}}>
					<img src={`${window.location.origin}/image/Icons/info.svg`} alt="" style={{width:'20px', height:'20px', marginRight:'10px'}}/>
					<p className="color-blue-text mb-0"><FormattedHTMLMessage id="info-mess.text1" /></p>
					</div>
					{this.state.products && (
						<div className="icon-car-selected position-absolute d-none d-lg-block">
							<img src={this.state.currentProduct.length>0?this.state.currentProduct[0].image.large:''} alt={this.state.currentProduct.length>0?this.state.currentProduct[0].name:''} />
						</div>
					)}
				</Container>
			</div>
			<LoanApplication data={this.state.sendData} name={this.state.nameCredit} formGroup={this.state.deposite?['communication', 'statement']:['communication', 'personal', 'statement']} type="credit"/>
			</>
		)
	}
}


function ProductSelect({dataProducts, selectEvent}){


	const [modal, setShow] = useState(false);
	const [cost, setCost] = useState(0);
	const [product, setProduct] = useState([]);
	const [data, getData] = useState(true);
	
	
	let setData = ()=>{
		setProduct(dataProducts[0]);
		getData(false);
	}

	useMemo(() => {
		if(dataProducts.length>0&&data)
			setData();
	})
	
	let select = (e)=>{
		let carId = e.target.classList.contains('cars-item-modal')?e.target:e.target.parentElement;
		
		carId = carId.classList.contains('cars-item-modal')?carId:carId.parentElement;
		carId = carId!==null?carId.getAttribute('data-id'):0;
		let carCur = dataProducts.filter(item=>item.id===Number(carId));
		selectEvent(carCur, null);
		setProduct(carCur[0]);
		setShow(false);

	}

	let costSelect = (e)=>{
		let carId = e.target.classList.contains('item-engine')?e.target:e.target.parentElement;
		carId = carId!==null?carId.getAttribute('data-id'):0;
		carId = product.engine.filter(item=>item.id===Number(carId));
		let parentEl = document.getElementsByClassName('engine-blck')[0];
		let el = parentEl.getElementsByTagName('div');

		el.forEach(item=>{
			if(item.getAttribute('data-active')==='false')
				item.setAttribute('data-active', 'true');
			else item.setAttribute('data-active', 'false');
		})

		
		selectEvent([product], carId[0]);


	}

		return(
			<div className="selectCar mt-20">
				<div className="cars-list d-flex justify-content-between" style={{minHeight: '10px'}} onMouseOver={(e)=>e.target.classList.contains('cars-list')?
						e.target.classList.add('anim-arrow'):e.target.parentElement.classList.add('anim-arrow')}
						onMouseOut={(e)=>e.target.classList.contains('cars-list')?
						e.target.classList.remove('anim-arrow'):e.target.parentElement.classList.remove('anim-arrow')} onClick={()=>setShow(true)}>
					<span className="d-block font-weight-bold color-white-text">{product.name}</span>
					<div className="arrow-pic d-flex">
						<img src={`${window.location.origin}/image/Icons/arrow-white.svg`} alt=""/>
						<img src={`${window.location.origin}/image/Icons/arrow-white.svg`} alt=""/>
						<img src={`${window.location.origin}/image/Icons/arrow-white.svg`} alt=""/>
					</div>
				</div>
				<div className="color-white-bg mt-20 engine-blck" style={{borderRadius:'5px'}}>
					{
						(product.engine ||[]).map((item,index)=>(
							<div className="item-engine d-flex justify-content-between"
							data-active={index===0?true:false} key={item.id} data-id={item.id} onClick={(e)=>costSelect(e)}>
							<p className="font-weight-bold mb-0">{item.name}</p>
							<p className="font-weight-bold mb-0">{costRepl(item.cost)}</p>
							</div>
						))
					}
				</div>
				<Modal show={modal} onHide={()=>setShow(false)} size="lg">
        			<Modal.Header closeButton>
          			<Modal.Title id="example-modal-sizes-title-sm">
            			Small Modal
          			</Modal.Title>
        			</Modal.Header>
        			<Modal.Body>
        				<ul className="d-flex flex-wrap justify-content-between pl-0">
        				 {
        					dataCars.map(item=>(
        						<li key={item.id} className="cars-item-modal col-md-4 mb-20" data-id={item.id} onClick={(e)=>select(e)}>
        							<div className="img-car-item">
        								<img src={item.image.large} alt={item.name} className="w-100 h-100 img-contain"/>
        							</div>
        							<p className="color-blue-text font-weight-bold mb-0 text-center mt-10" style={{fonSize:".9rem"}}>{item.name}</p>
        						</li>
        					))
        				}
        				</ul>
        			</Modal.Body>
      			</Modal>      
     
			</div>
		)
	
}

function Cost({eventCost, amountCost}){

	const [cost, setCost] = useState(amountCost);
	const [error, setError] = useState(false);
	const [getData, setData] = useState(false);
	

	useEffect(()=>{
		if(!getData&&amountCost>0){
			setCost(amountCost);
			setData(true);
		}
		
	})
	
	let inputCost = (e)=>{

		let val = e.target.value;
		val = Number(val);
		
		if(/^[0-9]+$/.test(val)){
			setCost(val);
		}

				
	}

	let selectCost = ()=>{
		if(cost>=amountCost){
			setError(false);
			console.log(cost)
			eventCost(null, {cost: cost});
		}else{
			setError(true);
		}
		
	}
	
	

	return(
		<div className="enter-cost position-relative mt-20 pb-90">

			<input className="input-cost color-white-text w-100" onChange={(e)=>inputCost(e)}  placeholder={costRepl(cost)}/>
			<div className="arrow-pic d-flex position-absolute" style={{top:'10px', right:0}} onClick={()=>selectCost()}>
				<img src={`${window.location.origin}/image/Icons/arrow-white.svg`} alt=""/>
				<img src={`${window.location.origin}/image/Icons/arrow-white.svg`} alt=""/>
				<img src={`${window.location.origin}/image/Icons/arrow-white.svg`} alt=""/>
			</div>

			{error && (<Alert variant='danger'><FormattedHTMLMessage id="avtocredit.calc-error" /> {costRepl(amountCost)}</Alert>)}
		</div>
	)
}




class LoanConditions extends Component{
	
	constructor(props){
		super(props);
		
		this.state = {
			term: 0,
			arrTerm: [],
			prepaymentArr: [],
			minTerm: 12,
			maxTerm: 0,
			prepayment: 0,
			cost: 0,
			prepaymentCost:0,
			costMonth:0,
			calculator: [],
			percent: 0,
			value1: 0,
			value2:0,
			value1Step:0,
			value2Step:0,
			showModal:false,
			showTab1: true,
			showTab2: false

		}

		this.rengePay = React.createRef();
		this.rengeTerm = React.createRef();
	}

	async componentDidUpdate(prevProps) {
    	
    	
    if (this.props.calculator !== prevProps.calculator) {
    	
    	let step = Math.floor(100/this.props.calculator.length);
			
		
         await this.setState({calculator: this.props.calculator,
          	term: this.props.calculator[0].term,
          	percent: this.props.calculator[0].percent,
          	prepayment:this.props.calculator[0].prepayment,
          	value1: this.props.calculator[0].prepayment>0?step:0,
          	prepaymentArr: this.props.calculator.map(item=>item.prepayment).filter((e,i,a)=>a.indexOf(e)==i)});

			
          	this.trackerChange(this.rengePay, this.props.calculator[0].prepayment>0?step:0, 'prepayment');
          	this.trackerChange(this.rengeTerm, 0, 'term');
    	}
    	if(this.props.cost !== prevProps.cost){
    		 await this.setState({cost: this.props.cost});
    		 this.prepaymentSum();

    	}

    }

    inputRange(element){
		let type = element.getAttribute('data-type');
 		this.trackerChange(element, element.value, type);
	}

	async trackerChange(elem=null, val=0, type=''){
		
		let valTrack = val*11,
		exTermArr = this.state.calculator.map(item=>item.term).filter((e,i,a)=>a.indexOf(e)==i).sort(),
		maxTerm = exTermArr[exTermArr.length-1],
		minTerm = exTermArr[0];
		

		let stepPrep = Math.ceil(100/(this.state.prepaymentArr.length>1?this.state.prepaymentArr.length:1));
		let countPrep = val>0?Math.ceil(val/stepPrep)-1:0;
		let stepTerm = Math.ceil(100/exTermArr.length);
		let countTerm = val>0?Math.ceil(val/stepTerm)-1:0;	
		
		
		
		this.setState({maxTerm: maxTerm, minTerm:minTerm});
		

 		if(type==='prepayment'){
			
			let calc = (this.state.calculator || []).filter(item=>item.prepayment===this.state.prepayment);
 			await this.setState({value1: val,
 				value1Step: stepPrep,
 				prepayment: this.state.prepaymentArr[countPrep>0?countPrep:0]});
			
 		}else if(type==='term'){
 			let termVal = (val/Math.floor(100/(exTermArr.length-1>0?exTermArr.length-1:1)));
 			this.setState({value2: val,
 				value2Step: Math.ceil(100/(exTermArr.length-1>0?exTermArr.length-1:1)),
 				term: exTermArr[exTermArr.length>1?termVal:0]
 			
 			});
 			
 		}
 		
 		if(elem){
 			elem.current.style.background = '-webkit-linear-gradient(left ,rgba(227, 30, 36, 1) 0%,rgba(227, 30, 36, 1) '+val+'%,rgba(33, 38, 64, .8) '+val+'%, rgba(33, 38, 64, .8) 100%)';
 		}

 		this.prepaymentSum();
	}

	async prepaymentSum(){

		let prepayment = this.state.cost*(this.state.prepayment/100);
		prepayment = Math.ceil(prepayment);
		
		await this.setState({prepaymentCost:prepayment});
		await this.pymentMonth();
		
	}

	pymentMonth(){
		
		let balance = this.state.cost - this.state.prepaymentCost;
		balance = Math.ceil(balance/this.state.term);
		this.setState({costMonth: balance});
	}

	sendDataApp(){
		this.props.send({
			term: this.state.term,
			prepayment: this.state.prepayment,
			prepaymentCost: this.state.prepaymentCost,
			costMonth: this.state.costMonth

		})
	}



	
	render(){
		
		let calculator = {
			prepaymentPercent: this.state.prepayment,
			term: this.state.term,
			percent: this.state.calculator.length>0?this.state.calculator[0].percent:0

		};
		let self = this;
		console.log(this.state.cost)
		return(
		<>
			<div className="col-lg-5 col-12 m-aut item-blck-calc">
			<p className="color-grey-text mb-20 font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-text6" /></p>
			<div className="contribution-input">
			<div className="d-flex justify-content-between">
			<p className="color-white-text mb-10 font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-text7" /></p>
			<span className="d-lg-none d-block color-grey-text font-weight-bold">{this.state.prepayment} %</span>
			</div>
			<div className="input-cost-value color-white-bg color-blue-text position-relative" style={{padding:'10px 0px'}}>
			<div className="value-prepayment d-flex justify-content-between" style={{padding:'0px 10px'}}>
			<span className="d-block font-weight-bold">{costRepl(this.state.prepaymentCost)}</span>
			<span className="d-lg-block d-none color-grey-text font-weight-bold">{this.state.prepayment} %</span>
			<Dropdown className="position-static d-lg-none d-block">
				<Dropdown.Toggle>
					<img src={`${window.location.origin}/image/Icons/arrow-pro.svg`} alt="" />
				</Dropdown.Toggle>
				<Dropdown.Menu>
				<ul className="item-dropdown pl-0">
				{
					this.state.calculator.map((item, index)=>{
						return <li className="text-left" onClick={()=>{
							self.setState({prepayment: item.prepayment});
							self.prepaymentSum();
						}} key={index}>{item.prepayment}</li>
					})
				}
				</ul>
				</Dropdown.Menu>
			</Dropdown>
			</div>
			<div className="slidecontainer w-100 position-absolute d-none d-lg-block" style={{bottom:'-10px'}}>
  				<input type="range" className="slider" id="myRangePay" data-type="prepayment" ref={this.rengePay} min="0" max="100" onChange={(element)=>this.inputRange(this.rengePay.current)} step={this.state.value1Step} value={this.state.value1}  />
			</div>
			</div>
			<p className="color-white-text mb-10 font-weight-bold mt-30"><FormattedHTMLMessage id="credit.item-list2" /></p>
			<div className="input-term-value color-white-bg color-blue-text position-relative" style={{padding:'10px 0px'}}>
			<div className="value-term d-flex justify-content-between" style={{padding:'0px 10px'}}>
			<span className="d-block font-weight-bold">{this.state.term} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></span>
			<Dropdown className="position-static d-lg-none d-block">
				<Dropdown.Toggle>
					<img src={`${window.location.origin}/image/Icons/arrow-pro.svg`} alt="" />
				</Dropdown.Toggle>
				<Dropdown.Menu>
				<ul className="item-dropdown pl-0">
				{
					this.state.arrTerm.map((item, index)=>{
						return <li className="text-left" onClick={()=>{
							self.setState({term: item});
							self.prepaymentSum();
						}} key={index}>{item}</li>
					})
				}
				</ul>
				</Dropdown.Menu>
			</Dropdown>

			</div>
			<div className="slidecontainer w-100 position-absolute d-none d-lg-block" style={{bottom:'-10px'}}>
  				<input type="range" className="slider" id="myRangeTerm" data-type="term" ref={this.rengeTerm} min="0" max="100" onChange={(element)=>this.inputRange(this.rengeTerm.current)} step={this.state.value2Step} value={this.state.value2}  />
			</div>
			
			</div>
			<div className="d-flex justify-content-between mt-10">
				<p className="color-grey-text"><FormattedHTMLMessage id="deposite.calc.it-3.1" /> {this.state.minTerm} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></p>
				<p className="color-grey-text"><FormattedHTMLMessage id="deposite.calc.it-3.2" /> {this.state.maxTerm} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></p>
			</div>
			</div>

			</div>
			<div className="col-lg-4 col-12 m-aut item-blck-calc">
				<p className="color-white-text font-weight-bold" style={{fontSize:'1.1rem', lineHeight:1.2}}><FormattedHTMLMessage id="avtocredit.calc-text8" /> </p>
				<p className="font-weight-bold color-white-text" style={{fontSize:'1.5rem'}}>{costRepl(this.state.costMonth)} сум</p>
				<span className="btn-grafic-pay color-white-bg w-50 color-blue-text d-block text-center" onClick={()=>this.setState({showModal:true})}><FormattedHTMLMessage id="avtocredit.calc-text9" /></span>
				<span className="d-block color-red-bg color-white-text btn-create-statement mt-10" onClick={()=>this.sendDataApp()}><FormattedHTMLMessage id="avtocredit.calc-text10" /></span>
				<Modal show={this.state.showModal} onHide={()=>this.setState({showModal:false})} size="lg">
        			<Modal.Header closeButton className="color-blue-bg">
          			<Modal.Title id="example-modal-sizes-title-sm" className="w-100">
            			<p className="font-weight-bold color-white-text text-center mb-0"><FormattedHTMLMessage id="avtocredit.calc-text11" /></p>
          			</Modal.Title>
        			</Modal.Header>
        			<Modal.Body>
        				<p className="font-weight-bold color-blue-text text-center">
        				<FormattedHTMLMessage id="avtocredit.calc-text12" />
        				</p>
        				<div className="tabs-table-payment d-flex justify-content-center">
        				<div className="tab-btn-table col-md-3 text-center" data-active={this.state.showTab1} onClick={()=>this.setState({showTab1: true, showTab2: false})}>
        				<FormattedHTMLMessage id="avtocredit.calc-text13" />
        				</div>
        				<div className="tab-btn-table col-md-3 text-center" data-active={this.state.showTab2} onClick={()=>this.setState({showTab2: true, showTab1: false})}>
        				<FormattedHTMLMessage id="avtocredit.calc-text14" />
        				</div>
        				</div>
        				<div className="tablec-list-info">
        				{
        					this.state.showTab1 ? <Table1 product={this.props.product} engine={this.props.engine} calculator={calculator}/> : <Table2 product={this.props.currentProduct}/>
        				}
        				</div>
        			</Modal.Body>
      			</Modal> 
			</div>
			</>
		)
	}
}

function Table1({product, engine, calculator}){
	console.log(product)
	console.log(engine)
	let dogSum = 0;
	let percent = calculator.percent?calculator.percent:0,
	term = calculator.term?calculator.term:12,
	prepayment = calculator.prepaymentPercent?calculator.prepaymentPercent:0,
	prepaymentSum = Math.floor(dogSum * (prepayment/100)),
	year = new Date().getFullYear(),
	balance = dogSum - prepaymentSum;
	
	let p = percent/(12*100),
	amountSum = (dogSum*p)/(1-Math.pow(1+p, -term)),
	totalAmount = amountSum*term;
	totalAmount = totalAmount.toFixed(2)
	amountSum = amountSum.toFixed(2);


	

	return(
	<>
		
		<table className="w-100 mt-20">
			<tbody>
			<tr>
				<td width="40%" className="border-btm-solid border-tp-solid"><FormattedHTMLMessage id="avtocredit.calc-table6" /></td>
				<td className="color-blue-text border-btm-solid border-tp-solid" align="center">{prepayment}</td>
				<td className="color-blue-text border-btm-solid border-tp-solid border-rgt-none" align="center">{costRepl(prepaymentSum)}</td>
			</tr>
			<tr>
				<td width="40%" className="border-btm-none font-weight-bold border-rgt-none"><FormattedHTMLMessage id="avtocredit.calc-table9" /></td>
				<td width="20%" align="center" className="border-btm-none border-rgt-none"></td>
				<td width="40%" align="center" className="border-rgt-none border-btm-none font-weight-bold">{costRepl(prepaymentSum)}</td>
			</tr>
			
			
			</tbody>
		</table>

		<table className="w-100 mt-20">
			<tbody>
			<tr>
				<td width="40%" bgcolor="#eeeeee" className="font-weight-bold border-btm-solid border-tp-solid border-rgt-none"><FormattedHTMLMessage id="avtocredit.calc-table16" /></td>
				<td bgcolor="#eeeeee" className="font-weight-bold color-blue-text border-btm-solid border-tp-solid border-rgt-none" align="center">{prepayment}%</td>
				<td bgcolor="#eeeeee" className="font-weight-bold color-blue-text border-btm-solid border-tp-solid border-rgt-none" align="center">{costRepl(prepaymentSum)}</td>
			</tr>
			<tr>
				<td  width="40%" className=""><FormattedHTMLMessage id="avtocredit.calc-table10" /></td>
				<td  width="20%" align="center" className=""></td>
				<td  width="40%" align="center" className="border-rgt-none">{term} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></td>
			</tr>

			<tr>
				<td bgcolor="#fefefe" width="40%" className="border-btm-none "><FormattedHTMLMessage id="avtocredit.calc-table11" /></td>
				<td bgcolor="#fefefe" width="20%" align="center" className="border-btm-none "></td>
				<td bgcolor="#fefefe" width="40%" align="center" className="border-rgt-none border-btm-none">{percent}%</td>
			</tr>
			
			</tbody>
		</table>

		<table className="w-100">
			<tbody>
				<tr>
				
				<td bgcolor="#eeeeee" align="center" width="30%" className="border-rgt-none font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-table12" /></td>
				<td bgcolor="#eeeeee" align="center" width="20%" className="border-rgt-none font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-table19" /></td>
				<td bgcolor="#eeeeee" align="center" width="20%" className="border-rgt-none font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-table13" /></td>

				<td bgcolor="#eeeeee" align="center" width="15%" className="border-rgt-none font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-table14" /></td>
				<td bgcolor="#eeeeee" align="center" width="15%" className="border-rgt-none font-weight-bold"><FormattedHTMLMessage id="avtocredit.calc-table15" /></td>
				</tr>
				{
					month['ru'].map((item, index)=>{
						
						let procent = (dogSum*(prepayment/100)/12);
						let mainDolg = Number(amountSum) - (procent);
						let b = dogSum - (mainDolg*index);
						
						return <tr key={index}>
							<td className="">{item} {year} ({index+1} <FormattedHTMLMessage id="deposite.calc.it-5.1" />)</td>
							<td  align="center" className="">{costRepl(b.toFixed(2))}</td>
							<td align="center" className="">{costRepl(mainDolg.toFixed(2))}</td>
							<td align="center" className="">{costRepl(procent.toFixed(2))}</td>
							<td  align="center" className="font-weight-bold border-rgt-none">{costRepl(amountSum)}</td>
						</tr>
					})
				}

				<tr>
				<td bgcolor="#fefefe" className="font-weight-bold border-btm-none"><FormattedHTMLMessage id="avtocredit.calc-table17" /></td>
				<td bgcolor="#fefefe" align="center">{0}</td>
				<td bgcolor="#fefefe" align="center">{0}</td>
				<td bgcolor="#fefefe" align="center" >{0}</td>
				<td  bgcolor="#fefefe" align="center"  className="font-weight-bold border-rgt-none">{costRepl(totalAmount)}</td>
				</tr>

			</tbody>
		</table>
		</>
	)
}

function Table2(){
	return(
		<>
		</>
	)
}


export default Calculate;
