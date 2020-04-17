import React, {Component, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import {FormattedHTMLMessage}from "react-intl";
import {Container, Form, Dropdown, Modal, Alert, Col} from "react-bootstrap";
import MaskedInput from 'react-maskedinput';
import {Formik} from 'formik';
import * as Yup from "yup";

import './css/loanApplication.css';
import {costRepl} from './wigets/secondaryFunc.jsx';





export default class LoanApplication extends Component{
	constructor(props){

		super(props);

		this.state = {
			communication: this.props.formGroup[0]==='communication'?true:false,
			personal: this.props.formGroup[0]==='personal'?true:false,
			statement:this.props.formGroup[0]==='statement'?true:false,
			applicationType:this.props.type,
			data: {},
			client: {},
			personalData:{},
			name: '',
			calculator: false,
			dataGet: false,
			personalGet: false
		}

	}

	componentDidUpdate(prevProps) {
    
    if (this.props.data !== prevProps.data) 
          this.setState({data: this.props.data});

      if (this.props.name !== prevProps.name) 
          this.setState({name: this.props.name});

    }

    nextStep(step, data=null, client=null){
    	
    	let dataEmpty = (data)=>{return JSON.stringify(data)==='{}'};
    	
    	this.setState({client:client!==null?client:this.state.client});
    	

    	if(step==='communication'){

    		this.setState({communication:true, 
    			personal:false, 
    			statement:false, 
    			personalData: data!==null?data:this.state.personalData});
    	}
    	else if(step==='personal'){
    		this.setState({communication:false, 
    			personal:true, statement:false, 
    			data: data!==null?data:this.state.data, 
    			dataGet:data!==null||!dataEmpty(data)?true:false});
    	}
    	else if(step==='statement')
    		this.setState({communication:false, 
    			personal:false, 
    			statement:true, 
    			personalGet:data!==null&&client===null?true:false, 
    			personalData: data!==null&&client===null?data:this.state.personalData, 
    			data:client!==null?data:this.state.data, 
    			dataGet:data!==null&&client!==null?true:false});
    }

	render(){
		
		let currentStep = 1;
		if(this.state.personal)
			currentStep = 2;
		else if(this.state.statement)
			currentStep = this.props.formGroup.length;

	
		return(
			<div className="form-application-loan">
			<div className="header-form-app color-red-bg">
			<h4 className="color-white-text font-weight-bold text-center mb-0">{this.state.applicationType==='credit'?(<FormattedHTMLMessage id="loan-app.title" />):(<FormattedHTMLMessage id="deposite.apply-title" />)} (<FormattedHTMLMessage id="loan-app.title1" /> {currentStep} <FormattedHTMLMessage id="loan-app.title2" /> {this.props.formGroup.length})</h4>
			</div>
			<Container className="pt-30">
				{ this.state.communication && <Сommunication nxStep={this.props.formGroup[this.props.formGroup.length-(this.props.formGroup.length-1)]} data={this.state.data} name={this.state.name} getData={this.state.dataGet} client = {this.state.client} termMaxDef={36} eventStep={(step, data, client)=>this.nextStep(step, data, client)} type={this.state.applicationType}/>}
				{ this.state.personal && <PersonalData nxStep={this.props.formGroup[this.props.formGroup.length-(this.props.formGroup.length-2)]} prvStep={this.props.formGroup[0]} data={this.state.personalData} getData={this.state.personalGet} eventStep={(step, data, client)=>this.nextStep(step, data, client)}/>}
				{ this.state.statement && <Statement prvStep={this.props.formGroup[this.props.formGroup.length-2]} dataCredit={this.state.applicationType==='credit'?this.state.data:null} client={this.state.client} personal={this.state.personalData} eventStep={(step)=>this.nextStep(step)} dataDeposite={this.state.applicationType==='deposite'?this.state.data:null}/>}
			</Container>
			</div>
		)
	}
}





class Сommunication extends Component{
	constructor(props){
		super(props);

		this.state = {

			nameCredit: '',
			getData: this.props.getData,
			typeApply: this.props.type,
			data: this.props.getData?this.props.data:{
				term: 12,
				cost: 0,
				prepaymentPercent: 0,
				prepayment: 0,
				percent: 0,
				selectCar: [],
				engine: 0,
				amount: 0,
				nameCredit: '',
				costMonth: 0,
				calculator: [],
				products: false

			},
			
			type: 'Дифференцированный',
			clientBank: false,
			clientPhone: this.props.getData?this.props.client.phone:'',
			clientMail: this.props.getData?this.props.client.mail:'',
			acceptCondition:false,
			formValid: false
			
		}

		

		this.inputMail = React.createRef();
		this.inputPhone = React.createRef();

		this.cnt = 1;
		this.schemaValid = '';
		this.initVal = '';

		this.setValidationFormValue();

		
	}

	setValidationFormValue(){

		this.schemaValid = Yup.object().shape({
  			clientMail: Yup.string().required().email().min(4), 			
      	});

		this.initVal = {
			clientMail: this.state.clientMail
		}

		if(this.state.clientBank)
			this.setState({clientBank: false});

	}

	componentDidUpdate(prevProps) {
    
     
    if (this.props.data !== prevProps.data)
    	 this.setData(this.props.data);
    	
      if (this.props.name !== prevProps.name) 
          this.setState({nameCredit: this.props.name});

    }


	setData(data){
    	
    	let calc = {
    		
    		term: data.term,
    		cost: data.cost?data.cost:0,
    		prepaymentPercent: data.calculator?data.calculator[0].prepayment:0,
    		percent: data.calculator?data.calculator[0].percent:(data.percent?data.percent:0),
    		selectCar: data.selectProduct?data.selectProduct:'',
    		prepayment: data.prepaymentCost?data.prepaymentCost:0,
    		costMonth: data.costMonth?data.costMonth:0,
    		engine: data.products?(data.selectProduct[0].engine || []).filter(item=>item.id===data.engine):0,
    		amount: data.calculator?data.calculator[0].amount:0,
    		nameCredit: this.props.name!==''?this.props.name:(data.name),
    		currency: data.currency?data.currency:'UZS'

    	}
    	
    
    	this.setState({
    		getData:true,
    		data: calc

    	});
    	
    }

    toCalc(){
    	
    	if(this.state.getData===false){
    		
    		let elem = document.getElementsByClassName('calculator-loan-container')[0];
    		let elemDep = document.getElementsByClassName('deposite-calc-wrap')[0];
    		window.scrollTo({top:this.state.typeApply==='credit'?elem.offsetTop:elemDep.offsetTop, behavior: "smooth"});
    		alert('Для того чтобы заполнить заявление, воспользуйтесь калькулятором!');
    		
    	}
    }

    validationForm(values){
    	
    	
    	if(this.state.acceptCondition && values  && this.state.clientPhone.length>0 &&this.state.clientPhone.match(/[\_]/g)===null){
    		
    		if(this.state.getData){
    			this.props.eventStep(this.props.nxStep, this.state.data, {mail:values.clientMail, phone: this.state.clientPhone});
    			
    		}else{
    			this.toCalc();
    		}
    	}

    	
    }

    async authClient(values){

    	await this.setState({
    		clientPhone:values.phone?values.phone:'',
    		clientMail:values.mail?values.mail:''});

    	this.setValidationFormValue();
    }

	render(){
		

		return(
			<div className="calculator-item-loans">
			<h4 className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text2" /></h4>
				{this.state.type==='credit'&&(<>
				<div className="d-flex flex-lg-row flex-column justify-content-end pt-20">

				<div className="col-lg-4 col-md-10 item-form-inf">
				<p className="mb-0 font-weight-bold color-blue-text title-form"><FormattedHTMLMessage id="loan-app.text3" /></p>
				<div className="d-flex mt-10">
				<div className="pt-l-0 pt-r-0 d-flex color-blue-text font-weight-bold col-8 justify-content-between" style={{marginRight:'10px'}} onClick={()=>this.toCalc()}>
				
				<Form className="w-100">
					<Form.Control type="text" placeholder={costRepl(this.state.data.cost)} disabled={true} />
					<Form.Text className="text-muted"><FormattedHTMLMessage id="deposite.calc.it-3.1" /> {costRepl(this.state.data.cost)}</Form.Text>
					<span className="font-weight-bold color-grey-text form-it position-absolute">{this.state.data.currency}</span>
				</Form>
				</div>
				{
					this.state.data.cost>0 && <img src={`${window.location.origin}/image/Icons/Checked.svg`} alt="" style={{width:'20px', height:'20px', marginTop:'5px'}} />
				}
				</div>
				
				</div>

				<div className="col-lg-4 col-md-10 item-form-inf">
				<p className="mb-0 font-weight-bold color-blue-text title-form"><FormattedHTMLMessage id="loan-app.text4" /></p>
				<div className="d-flex mt-10">
				<div className="pt-l-0 pt-r-0 d-flex color-blue-text font-weight-bold item-app-calc col-8 justify-content-between position-relative" style={{marginRight:'10px'}} onClick={()=>this.toCalc()}>
				<p className="">{this.state.data.term} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></p>
								
				</div>
				{
					this.state.data.term && <img src={`${window.location.origin}/image/Icons/Checked.svg`} alt="" style={{width:'20px', height:'20px', marginTop:'5px'}} />
				}
				</div>
				<p className="mb-0 color-grey-text" style={{fontSize:'.9rem', marginTop:'5px'}}><FormattedHTMLMessage id="deposite.calc.it-3.1" /> {12} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></p>
				</div>

				<div className="col-lg-4 col-md-10 item-form-inf">
				<p className="mb-0 font-weight-bold color-blue-text title-form"><FormattedHTMLMessage id="loan-app.text5" /></p>
				<div className="d-flex mt-10">
				<div className="pt-l-0 pt-r-0 d-flex color-blue-text font-weight-bold col-8 justify-content-between" style={{marginRight:'10px'}} onClick={()=>this.toCalc()}>
				<Form className="w-100">
					<Form.Control type="text" placeholder={costRepl(this.state.data.prepayment)} disabled={true}/>
					<span className="font-weight-bold color-grey-text form-it position-absolute">{this.state.data.prepaymentPercent>0?this.state.data.prepaymentPercent:''}%</span>
				</Form>

				</div>
					{
						this.state.data.prepayment>0 && <img src={`${window.location.origin}/image/Icons/Checked.svg`} alt="" style={{width:'20px', height:'20px', marginTop:'5px'}} />
					}
				</div>
				</div>
				</div>
				</>)}

				{this.state.typeApply==='deposite'&&(<>
					<div className="d-flex flex-lg-row flex-column justify-content-end pt-20">

				<div className="col-lg-4 col-md-10 item-form-inf">
				<p className="mb-0 font-weight-bold color-blue-text title-form"><FormattedHTMLMessage id="deposite.apply-form1" /></p>
				<div className="d-flex mt-10">
				<div className="pt-l-0 pt-r-0 d-flex color-blue-text font-weight-bold col-8 justify-content-between" style={{marginRight:'10px'}} onClick={()=>this.toCalc()}>
				
				<Form className="w-100">
					<Form.Control type="text" placeholder={costRepl(this.state.data.cost)} disabled={true} />
					<span className="font-weight-bold color-grey-text form-it position-absolute">{this.state.data.currency}</span>
				</Form>
				</div>
				{
					this.state.data.cost>0 && <img src={`${window.location.origin}/image/Icons/Checked.svg`} alt="" style={{width:'20px', height:'20px', marginTop:'5px'}} />
				}
				</div>
				
				</div>

				<div className="col-lg-4 col-md-10 item-form-inf">
				<p className="mb-0 font-weight-bold color-blue-text title-form"><FormattedHTMLMessage id="deposite.apply-form2" /></p>
				<div className="d-flex mt-10">
				<div className="pt-l-0 pt-r-0 d-flex color-blue-text font-weight-bold item-app-calc col-8 justify-content-between position-relative" style={{marginRight:'10px'}} onClick={()=>this.toCalc()}>
				<p className="">{this.state.data.term} <FormattedHTMLMessage id="deposite.calc.it-5.3" /></p>
								
				</div>
				{
					this.state.data.term && <img src={`${window.location.origin}/image/Icons/Checked.svg`} alt="" style={{width:'20px', height:'20px', marginTop:'5px'}} />
				}
				</div>
				
				</div>

				<div className="col-lg-4 col-md-10 item-form-inf">
				<p className="mb-0 font-weight-bold color-blue-text title-form"><FormattedHTMLMessage id="deposite.apply-form3" /></p>
				<div className="d-flex mt-10">
				<div className="pt-l-0 pt-r-0 d-flex color-blue-text font-weight-bold col-8 justify-content-between" style={{marginRight:'10px'}} onClick={()=>this.toCalc()}>
				<Form className="w-100">
					<Form.Control type="text" placeholder={this.state.data.percent} disabled={true}/>
					<span className="font-weight-bold color-grey-text form-it position-absolute">%</span>
				</Form>

				</div>
					{
						this.state.data.percent>0 && <img src={`${window.location.origin}/image/Icons/Checked.svg`} alt="" style={{width:'20px', height:'20px', marginTop:'5px'}} />
					}
				</div>
				</div>
				</div>
					</>)}

				<div className="main-info-loan mt-30">
					
					<ul className='d-flex pt-l-0 flex-lg-row flex-column table-info'>
				
						<li className={`font-weight-bold title-tb-inf ${this.state.typeApply==='credit'?'col-lg-2 col-md-5':'col-lg-3 col-md-5'}`}>
							<FormattedHTMLMessage id="loan-app.text6" />
							<ul className="pt-l-0 pt-10"><li className="font-weight-bold color-blue-text">{this.state.data.nameCredit}</li></ul>
						</li>
						{this.state.typeApply==='credit' && (<><li className="font-weight-bold title-tb-inf col-lg-2 col-md-5">
							<FormattedHTMLMessage id="loan-app.text7" />
							<ul className="pt-l-0 pt-10"><li className="font-weight-normal color-blue-text">{this.state.type}</li></ul>
						</li>
						<li className="font-weight-bold title-tb-inf col-lg-2 col-md-5">
							<FormattedHTMLMessage id="loan-app.text8" />
							<ul className="pt-l-0 pt-10">
								<li className="font-weight-normal color-blue-text">
									{this.state.data.percent>0?this.state.data.percent:''}% <FormattedHTMLMessage id="loan-app.text12" />
								</li>
							</ul>
						</li>
						<li className="font-weight-bold title-tb-inf col-lg-2 col-md-5">
							<FormattedHTMLMessage id="loan-app.text9" />
							<ul className="pt-l-0 pt-10">
								<li className="font-weight-normal color-blue-text">
									<p className="mb-0"><FormattedHTMLMessage id="loan-app.text13" /></p>
									<p className="mb-0"><FormattedHTMLMessage id="loan-app.text14" /></p>
								</li>
							</ul>
						</li></>)}
						<li className={`font-weight-bold title-tb-inf ${this.state.typeApply==='credit'?'col-lg-4 col-md-5':'col-lg-7 col-md-5'}`}>
							<FormattedHTMLMessage id="loan-app.text10" />
							<ul className="pt-l-0 pt-10"><li className="font-weight-normal color-blue-text"><FormattedHTMLMessage id="loan-app.text15" /></li></ul>
						</li>

						
					</ul>
				</div>
				<div className="d-flex justify-content-between pt-30 flex-lg-row flex-column">
					{this.state.typeApply==='credit'&&(<><div className="tab-table-payment color-blue-bg color-white-text col-lg-4 col-md-5 col-10">
						<FormattedHTMLMessage id="loan-app.text16" />
					</div></>)}
					<div className="massege-inf color-blue-text d-flex col-lg-7 col-12" style={{backgroundColor:'#eeeeee'}}>
						<img src={`${window.location.origin}/image/Icons/info.svg`} alt="" style={{width:'20px', height:'20px'}} />
						<p className="color-blue-text mb-0 col-md-11"><FormattedHTMLMessage id="info-mess.text1" style={{lineHeight:'1.2'}}/></p>
					</div>
				</div>
				<div className="personal-data-form pt-30">
					<div className="header-personal-form d-flex justify-content-between flex-lg-row flex-column">
						<h4 className="font-weight-bold color-blue-text"><FormattedHTMLMessage id="loan-app.text17" /></h4>
					</div>
					
				
							<Formik validationSchema={this.schemaValid}  initialValues={this.initVal} onSubmit={(values)=>this.validationForm(values)} >

       						{({
        						handleSubmit,
        						handleChange,
        						handleBlur,
        						values,
        						touched,
        						isValid,
        						errors,
      						}) => (
							<Form className="col-lg-7 col-12 pt-30" style={{paddingLeft:'30px'}} noValidate onSubmit={handleSubmit}>
						
								<Form.Group className="d-flex flex-wrap justify-content-between">
									<div className="col-lg-6 col-12 pt-l-0 mb-10">
									<Form.Label className="font-weight-bold color-blue-text"><FormattedHTMLMessage id="loan-app.text19" /></Form.Label>
    								<Form.Control type="email" name="clientMail" placeholder="user@mail.ru" value={values.clientMail} ref={this.inputMail} onChange={handleChange} isValid={touched.clientMail && !errors.clientMail} isInvalid={!!errors.clientMail}/>
    								</div>
		
    								<div className="col-lg-6 col-12 pt-l-0">
    								<Form.Label className="font-weight-bold color-blue-text"><FormattedHTMLMessage id="loan-app.text20" /></Form.Label>
    								<MaskedInput mask="+111(11)111-11-11" size="18" placeholder='+998 (98) 012-34-56' value={this.state.clientPhone}  ref={this.inputPhone} style={{padding:'5px'}} onChange={()=>this.setState({clientPhone:this.inputPhone.current.mask.value.join('')})} className={this.state.clientPhone.match(/[\_]/g)===null&&this.state.clientPhone.length>0?'is-valid form-control':'is-invalid form-control'}/>
    								</div>

								</Form.Group>

							<div className="d-flex pt-30 flex-wrap">
							<div className='checkbox-form d-flex col-10 mb-10' style={{padding:'5px'}}>
								<div className="check-blck" onClick={()=>this.setState({acceptCondition: !this.state.acceptCondition})}>
									{ this.state.acceptCondition && <p className="mb-0 color-red-text text-center" style={{fontSize:'1.2rem'}}>✔</p>}
								</div>
								<p className="mb-0" style={{padding:'5px 10px'}}>
								<span className="color-blue-text">
								<FormattedHTMLMessage id="loan-app.text21" />
								</span>
								<span className="color-red-text">
								<FormattedHTMLMessage id="loan-app.text22" />
								</span>
							</p>
							</div>
							<button type="submit" className="col-lg-5 col-md-5 col-sm-5 col-10 color-red-bg color-white-text btn-next-step" data-active={this.state.acceptCondition} onClick={()=>this.validationForm()}>
							<FormattedHTMLMessage id="loan-app.text23" />
							</button>
							
						</div>
							</Form>
							)}
							</Formik>	
							
				</div>	
			</div>
		)
	}
}



class PersonalData extends Component {
	constructor(props){
		super(props);
	
		this.state = {
			female: true,
			male:false,
			dateBirth: this.props.getData&&this.props.data?this.props.data.dateBirth:'',
			INN: this.props.getData&&this.props.data?this.props.data.INN:'',
			documentDate: this.props.getData&&this.props.data?this.props.data.documentDate:'',
			validated: false
		}
	
		this.inpBirth = React.createRef();
		this.inpDateDocument = React.createRef();
		this.inpInn = React.createRef();

		this.formPlaceholder = {
			'ru': {
				country: 'Страна',
				city: 'Город',
				street: 'Улица, дом, квартира',
				seria: 'Серия',
				number: 'Номер',
				date: 'Дата выдачи',
				given: 'Кем выдан',
			},
			'en': {
				country: 'Страна',
				city: 'Город',
				street: 'Улица, дом, квартира',
			},
			'uz': {
				country: 'Страна',
				city: 'Город',
				street: 'Улица, дом, квартира',
			},
			'уз': {
				country: 'Страна',
				city: 'Город',
				street: 'Улица, дом, квартира',
			},
		}

		this.schema = Yup.object().shape({
        	firstName: Yup.string().required().min(4),
  			lastName: Yup.string().required().min(4),
  			addressCountry: Yup.string().required(),
  			addressCity: Yup.string().required(),
  			addressStreet: Yup.string().required(),
  			documentGiven: Yup.string().required(),
  			documentNumber: Yup.number().required(),
  			addressCountry: Yup.string().required(),
  			documentSeria: Yup.string().required()
  			
      });

     
	  let getData = this.props.getData&&this.props.data;

      this.initVal = {
        firstName: getData?this.props.data.firstName:'',
        lastName: getData?this.props.data.lastName:'',
        secondName: getData?this.props.data.secondName:'',
        dateBirth: getData?this.props.data.dateBirth:'',
        INN: getData?this.props.data.INN:'',
        addressCountry:getData?this.props.data.addressCountry:'',
        addressCity: getData?this.props.data.addressCity:'',
        addressStreet: getData?this.props.data.addressStreet:'',
        documentSeria: getData?this.props.data.documentSeria:'',
        documentGiven: getData?this.props.data.documentGiven:'',
        documentNumber: getData?this.props.data.documentNumber:'',
       

      }

		

		
	}

	setForm(data){		
		
		let dataForm = {
			firstName: data.firstName,
  			lastName: data.lastName,
  			addressCountry: data.addressCountry,
  			addressCity: data.addressCity,
  			addressStreet: data.addressStreet,
  			documentGiven: data.documentGiven,
  			documentNumber: data.documentNumber,
  			documentSeria: data.documentSeria,
  			dateBirth: this.state.dateBirth,
  			documentDate: this.state.documentDate,
  			INN: this.state.INN,
  			sex: this.state.female?'female':'male'
		}
		let emptyDate = (string)=>{

			return string.match(/[\_]/g)===null && string.length>0;
		}
		if(emptyDate(this.state.dateBirth)&&emptyDate(this.state.documentDate)&&emptyDate(this.state.INN)){
			this.props.eventStep(this.props.nxStep,dataForm,null);
		}

		
		
		
	}



	render(){
		
		return(
			<>
				<h5 className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text26" /></h5>
				<Formik validationSchema={this.schema}  initialValues={this.initVal} onSubmit={(values)=>this.setForm(values)} >

       {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
      			<Form className="col-lg-10 form-individual-info pt-30" noValidate onSubmit={handleSubmit}>
					<Form.Group>
					<Form.Row>
						<Form.Label className="col-lg-3 color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text27" />*</Form.Label>
						<Col>
						
							<Form.Control name="firstName" value={values.firstName} onChange={handleChange} isValid={touched.firstName && !errors.firstName} isInvalid={!!errors.firstName}></Form.Control>
						</Col>
						<Form.Label className="color-blue-text"><FormattedHTMLMessage id="loan-app.text34" /></Form.Label>
					</Form.Row>

					<Form.Row>
						<Form.Label className="col-lg-3 color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text28" />*</Form.Label>
						<Col>
							<Form.Control value={this.state.lastName} name="lastName" value={values.lastName} onChange={handleChange} isValid={touched.lastName && !errors.lastName} isInvalid={!!errors.lastName}></Form.Control>
						</Col>
						
						
					</Form.Row>

					<Form.Row>
						<Form.Label className="col-lg-3 color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text29" /></Form.Label>
						<Col>
							<Form.Control value={this.state.secondName} onChange={handleChange}></Form.Control>
						
						</Col>
						
						
					</Form.Row>
					<Form.Group style={{padding:'20px 0px 5px 0px'}}>
						
						<Form.Row>
						<Form.Label className="col-lg-3"></Form.Label>
      					<div className="check-sex d-flex" style={{marginRight:'20px'}}>
      						<p className="mb-0 color-blue-text" style={{marginRight:'5px'}}>Female</p>
      						<div className="check-blck" onClick={()=>this.setState({female: true, male: false})}>
								{ this.state.female && <p className="mb-0 color-red-text text-center" style={{fontSize:'.9rem'}}>✔</p>}
							</div>
      					</div>
      					<div className="check-sex d-flex">
      						<p className="mb-0 color-blue-text" style={{marginRight:'5px'}}>Male</p>
      						<div className="check-blck" onClick={()=>this.setState({male: true, female:false})}>
								{ this.state.male && <p className="mb-0 color-red-text text-center" style={{fontSize:'.9rem'}}>✔</p>}
							</div>
      					</div>
      					</Form.Row>
      				</Form.Group>
					</Form.Group>
					<Form.Group>
						<Form.Row>	
							<Form.Label className="col-lg-3 color-blue-text font-weight-bold" style={{padding: '5px 0px 0px 0px'}}><FormattedHTMLMessage id="loan-app.text30" /></Form.Label>
							<MaskedInput mask="11.11.1111" size="10" value={this.state.dateBirth} placeholder='01.01.1997' className={this.state.dateBirth.match(/[\_]/g)===null&&this.state.dateBirth.length>0?'col-lg-3 form-control is-valid':'col-lg-3 form-control is-invalid'} onChange={()=>this.setState({dateBirth: this.inpBirth.current.mask.value.join('')})} ref={this.inpBirth}  style={{padding:'5px'}}/>
						</Form.Row>
					</Form.Group>	
					<Form.Group>
						<Form.Row>
							<Form.Label className="col-lg-3 color-blue-text font-weight-bold" style={{padding: '5px 0px 0px 0px'}}>ИНН</Form.Label>
							<MaskedInput mask="111111111" size="9" value={this.state.INN} ref={this.inpInn}  style={{padding:'5px'}} onChange={()=>this.setState({INN: this.inpInn.current.mask.value.join('')})} className={this.state.INN.match(/[\_]/g)===null&&this.state.INN.length>0?'col-lg-3 form-control is-valid':'col-lg-3 form-control is-invalid'}/>
							<a href='https://my.gov.uz/ru/search-tin' style={{padding:'5px 10px'}} target='_blank' rel="nofollow" rel="noindex"><FormattedHTMLMessage id="loan-app.text33" /></a>
						</Form.Row>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Label className="col-lg-3 color-blue-text font-weight-bold" style={{padding: '10px 0px 0px 0px'}}><FormattedHTMLMessage id="loan-app.text31" /></Form.Label>
								<Col>
									<Form.Control placeholder={this.formPlaceholder['ru'].country} name="addressCountry" value={values.addressCountry} onChange={handleChange} isValid={touched.addressCountry && !errors.addressCountry} isInvalid={!!errors.addressCountry} style={{margin:'15px 0px'}}></Form.Control>
									<Form.Control placeholder={this.formPlaceholder['ru'].city} style={{margin:'15px 0px'}} name="addressCity" value={values.addressCity} onChange={handleChange} isValid={touched.addressCity && !errors.addressCity} isInvalid={!!errors.addressCity}></Form.Control>
									<Form.Control placeholder={this.formPlaceholder['ru'].street} style={{margin:'15px 0px'}}name="addressStreet" value={values.addressStreet} onChange={handleChange} isValid={touched.addressStreet && !errors.addressStreet} isInvalid={!!errors.addressStreet}></Form.Control>
								</Col>
						</Form.Row>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Form.Label className="col-lg-3 color-blue-text font-weight-bold" style={{padding: '10px 0px 0px 0px'}}><FormattedHTMLMessage id="loan-app.text32" /></Form.Label>
							<Col>
								<Form.Control placeholder={this.formPlaceholder['ru'].seria} style={{margin:'15px 0px'}} name="documentSeria" value={values.documentSeria} onChange={handleChange}  isValid={touched.documentSeria && !errors.documentSeria} isInvalid={!!errors.documentSeria}></Form.Control>
								<MaskedInput mask="11.11.1111" size="12" value={this.state.documentDate} placeholder='01.01.2014' style={{padding:'5px'}} ref={this.inpDateDocument} onChange={()=>this.setState({documentDate: this.inpDateDocument.current.mask.value.join('')})} className={this.state.documentDate.match(/[\_]/g)===null&&this.state.documentDate.length>0?'form-control is-valid':'form-control is-invalid'}/>
								<Form.Control placeholder={this.formPlaceholder['ru'].given} style={{margin:'15px 0px'}}  name="documentGiven" value={values.documentGiven} onChange={handleChange} isValid={touched.documentGiven && !errors.documentGiven} isInvalid={!!errors.documentGiven}></Form.Control>
							</Col>
							<Col>
								<Form.Control placeholder={this.formPlaceholder['ru'].number} style={{margin:'15px 0px'}} name="documentNumber" value={values.documentNumber} onChange={handleChange} isValid={touched.documentNumber && !errors.documentNumber} isInvalid={!!errors.documentNumber}></Form.Control>
																
							</Col>
						</Form.Row>
					</Form.Group>
					<div className="step-controls d-flex">
						<span style={{padding:'10px', cursor:'pointer'}} onClick={()=>this.props.eventStep(this.props.prvStep, null, null)}><FormattedHTMLMessage id="loan-app.text35" /></span>
						<button type='submit' className="col-lg-3 col-md-5 col-sm-5 col-10 color-red-bg color-white-text btn-next-step" data-active={this.state.acceptCondition}>
							<FormattedHTMLMessage id="loan-app.text23" />
						</button>
					</div>
					</Form>
					 )}
				</Formik>
				
			</>
		)
	}
}



function Statement({prvStep, dataCredit=null, client=null, personal=null, eventStep, dataDeposite}){
		
	let dataEmpty = (data)=>JSON.stringify(data)!=='{}'&& data!==null;
	let credit = dataEmpty(dataCredit)?dataCredit:false,
	dataClient = dataEmpty(client)?client:false,
	dataPersonal = dataEmpty(personal)?personal:false;
	console.log(dataDeposite)

	const [applyNumb, setNumb] = useState(0);
	const [dataSend, readyData] = useState(false);
	const [date, setDate] = useState();

	let sendData = ()=>{
		if((credit && dataClient && dataPersonal)||dataDeposite){
			
			let date = new Date();
			let day = date.getDate()<10?'0'+date.getDate():date.getDate(),
			month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1),
			year = date.getFullYear(),
			dateApply= day+'.'+month+'.'+year;
			setDate(dateApply);
			readyData(true);

		}
	}

	let print = ()=>{
		let windowPrint = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
		let contentPrint = document.getElementsByClassName('print-block-info')[0];
		windowPrint.document.write(contentPrint.innerHTML);
		windowPrint.document.close();
  		windowPrint.focus();
  		windowPrint.print();
  		windowPrint.close();	
	}

	useEffect(() => {
    	if(dataSend){
			let contentPrint = document.getElementsByClassName('print-block-info')[0];
			window.scrollTo({top:contentPrint.offsetTop, behavior: "smooth"});
		}
 	});

	

	return(
		<>
		<h4 className="color-blue-text d-none font-weight-bold text-center"><FormattedHTMLMessage id={dataCredit!==null?'loan-app.text36':'loan-app.text45'} /></h4>
		{
			dataSend ? (
				<>
				<div className="print-block-info d-none">
					{dataDeposite!==null&&(<>
						<table className="w-100 mt-20">
						<tbody>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="deposite.value.it-1" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataDeposite.nameCredit?dataDeposite.nameCredit:'---'}</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="deposite.apply-form4" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataDeposite.cost?costRepl(dataDeposite.cost):'0'} {dataDeposite.currency?dataDeposite.currency:''}</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="deposite.apply-form5" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataDeposite.percent?dataDeposite.percent:'---'} %</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="deposite.apply-form6" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataDeposite.term?dataDeposite.term:'---'} </td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="loan-app.text41" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{date} г.</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="loan-app.text40-1" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{applyNumb} </td>
							</tr>
			
						</tbody>
					</table>
						</>)}

						{dataCredit!==null&&(<>
						<table className="w-100 mt-20">
						<tbody>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="avtocredit.calc-table5" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataCredit.cost?costRepl(dataCredit.cost):'0'} сум</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="avtocredit.calc-table6" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataCredit.prepaymentPercent?dataCredit.prepaymentPercent:'0'} %</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="avtocredit.calc-table9" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataCredit.prepayment?costRepl(dataCredit.prepayment):'0'} сум</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="avtocredit.calc-table10" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataCredit.term?dataCredit.term:'---'} <FormattedHTMLMessage id="credit.item-list4" /></td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="avtocredit.calc-table11" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{dataCredit.percent?dataCredit.percent:'---'} %</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="loan-app.text41" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{date} г.</td>
							</tr>
							<tr>
								<td width="40%" className="font-weight-bold color-blue-text" style={{border:'1px solid'}}><FormattedHTMLMessage id="loan-app.text40-1" /></td>
								<td className="color-blue-text" align="center" style={{border:'1px solid'}}>{applyNumb} </td>
							</tr>

						</tbody>
					</table>
						</>)}
				</div>
				<Alert variant='success' className="mt-10">
    				<p className="color-blue-text mb-0"><FormattedHTMLMessage id="loan-app.text40" /> {credit?credit.nameCredit:'Кредит'}. <FormattedHTMLMessage id="loan-app.text40-1" /> <span className="font-weight-bold">{applyNumb}</span></p> 
    				<p className="color-blue-text mb-0"><FormattedHTMLMessage id="loan-app.text41" /> {date}</p>
    				<p className="color-blue-text"><FormattedHTMLMessage id="loan-app.text43" /></p>
    				<button className="color-blue-bg color-white-text d-block m-aut" style={{padding:'5px'}} onClick={()=>print()}><FormattedHTMLMessage id="loan-app.text42" /></button>
  				</Alert>
  				</>
				) : (  
		
						<>
							<Forms credit={credit} dataClient={dataClient} dataPersonal={dataPersonal} dataDeposite={dataDeposite}/>
							<button className="color-blue-bg color-white-text m-aut d-block" style={{padding:'5px'}} onClick={()=>sendData()}><FormattedHTMLMessage id="loan-app.text37" /></button>
							<span className="d-block" style={{padding:'10px', cursor:'pointer'}} onClick={()=>eventStep(prvStep)}><FormattedHTMLMessage id="loan-app.text35" /></span>
						</>
					)}
			

		</>
	)
}



function Forms({credit, dataClient, dataPersonal, dataDeposite}){
console.log(dataDeposite)
	return(
		<>
			{dataPersonal && <PersonalF personal={dataPersonal}/>}
			{dataClient && <CommunF client={dataClient}/>}
			{credit && <CreditF credit={credit}/>}
			{dataDeposite && <DepositeF deposite={dataDeposite}/>}
		</>
	)
}


function CreditF({credit}){

	return(
		<>
		<h5 className="text-left color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text39" /></h5>
		<ul className="info-credit-client">
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="avtocredit.calc-table5" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{credit.cost?costRepl(credit.cost):'-'} сум</p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="avtocredit.calc-table6" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{credit.prepaymentPercent?credit.prepaymentPercent:'-'}%</p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="avtocredit.calc-table9" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{credit.prepayment?costRepl(credit.prepayment):'-'} сум</p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="avtocredit.calc-table10" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{credit.term?credit.term:'-'}<FormattedHTMLMessage id="credit.item-list4" /></p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="avtocredit.calc-table11" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{credit.percent?credit.percent:'-'}%</p>
			</li>
		</ul>
		</>
	)
}


function DepositeF({deposite}){
	
	return(
		<>
		<h5 className="text-left color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text44" /></h5>
		<ul className="info-credit-client">
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="deposite.apply-form7" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{deposite.nameCredit?deposite.nameCredit:'-'}</p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="deposite.apply-form4" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{deposite.cost?costRepl(deposite.cost):'-'} {deposite.currency?deposite.currency:''}</p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="deposite.apply-form5" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{deposite.percent?deposite.percent:'-'} %</p>
			</li>
			<li className="d-flex">
				<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="deposite.apply-form6" />:</p>
				<p className="color-blue-text" style={{paddingLeft:'10px'}}>{deposite.term?deposite.term:'-'}<FormattedHTMLMessage id="credit.item-list4" /></p>
			</li>
			
		</ul>
		</>
	)
}


function CommunF({client}){
	return(
	<ul className="personal-info-client mt-20">
		
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text19" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{client?client.mail:'-'}</p>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text20" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{client?client.phone:'-'}</p>
		</li>
		</ul>
		)
}



function PersonalF({personal}){

	let address = personal?`${personal.addressCountry}, ${personal.addressCity}, ${personal.addressStreet}`:'-';
	return(
		<ul className="personal-info-client mt-20">
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text27" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{personal?personal.firstName:'-'}</p>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text28" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{personal?personal.lastName:'-'}</p>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text29" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{personal?personal.secondName:'-'}</p>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold"><FormattedHTMLMessage id="loan-app.text38" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{personal?personal.sex:'-'}</p>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text30" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{personal?personal.dateBirth:'-'}</p>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text31" />:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{address}</p>
		</li>
		<li className="">
			<p className="color-blue-text font-weight-bold mb-0"><FormattedHTMLMessage id="loan-app.text32" />:</p>
			<div className="" style={{paddingLeft:'10px', paddingBottom:'10px'}}>
				<p className="color-blue-text mb-0">{personal?`${personal.documentSeria} ${personal.documentNumber}`:'-'}</p>
				<p className="color-blue-text mb-0">{personal?personal.documentDate:'-'}</p>
				<p className="color-blue-text mb-0">{personal?personal.documentGiven:'-'}</p>
			</div>
		</li>
		<li className="d-flex">
			<p className="color-blue-text font-weight-bold mb-0">ИНН:</p>
			<p className="color-blue-text" style={{paddingLeft:'10px'}}>{personal?personal.INN:'-'}</p>
		</li>
		</ul>
	)
}


LoanApplication.propTypes = {
	data: PropTypes.object,
	name: PropTypes.string,
	formGroup: PropTypes.array,
	type: PropTypes.string
}

LoanApplication.defaultProps = {
  	name: 'Кредит',
  	type: 'credit'
};


