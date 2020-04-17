import React, {Component} from 'react'
import {Form} from "react-bootstrap";
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from "react-router-dom";
import {Formik} from 'formik';
import * as Yup from "yup";

import './css/FormIndividuals.css';





export default class FormIndividuals extends Component{
	constructor(props){
		super(props);

		this.state = {
			
		}

		this.Labels = {
			uz: {
				name: '',
				password: ''
			},
			ru: {
				name: 'Имя пользователя',
				password: 'Пароль'
			},
			en: {
				name: '',
				password: ''
			},
			oz: {
				name: '',
				password: ''
			},

		}
	}

	validationForm(values){
		console.log('values')

		
	}

	showPass(e){
		let input = e.target.parentElement.getElementsByTagName('input')[0];
		let show = input.getAttribute('type')==='password'?true:false;
		
		if(show){
			input.setAttribute('type', 'text');
			e.target.setAttribute('src', './image/Icons/eye-open.svg');
		}else{
			input.setAttribute('type', 'password');
			e.target.setAttribute('src', './image/Icons/eye.svg');
		}
	}


	render(){
			
			return (
				<>
				<FormMobile placeholder={this.Labels} validation={(values)=>this.validationForm(values)} showPass={this.showPass}/>
				</>
			)
		
		
	}
}

function FormDesctop({placeholder, validation, showPass}){

	let schemaValid =Yup.object().shape({
  		login: Yup.string().required().min(6),
  		password: Yup.string().required().min(6),		
     });
	let initVal = {
		login: '',
		password: ''
	};

	return(
		<div id='container-form-des' className='position-absolute'>
		<Formik validationSchema={schemaValid}  initialValues={initVal} onSubmit={(values)=>validation(values)} >

       	{({
        	handleSubmit,
        	handleChange,
        	handleBlur,
        	values,
        	touched,
        	isValid,
        	errors
      	}) => (
			<Form noValidate onSubmit={handleSubmit}>
				<p className="title-form mb-0 color-white-text mt-10 font-weight-bold text-uppercase text-center"><FormattedHTMLMessage id="form.title" /></p>
				<Form.Group controlId="formBasicNameDes" className="mt-20">
    				<Form.Label className="color-white-text"><FormattedHTMLMessage id="form.label-name" /></Form.Label>
    				<div className="position-relative">
    				<img src="./image/Icons/user.svg" alt="" className="position-absolute pic-user icon-from"/>
    				<Form.Control type="text"  placeholder={placeholder['ru'].name} name="login" value={values.login} onChange={handleChange} isValid={touched.login && !errors.login} isInvalid={!!errors.login} className="input-username"/>
    				</div>
  				</Form.Group>

  				<Form.Group controlId="formBasicPassDes">
    				<Form.Label className="color-white-text"><FormattedHTMLMessage id="form.label-pass" /></Form.Label>
    				<div className="position-relative">
    				<img src="./image/Icons/Password.svg" alt="" className="position-absolute pic-pass icon-from"/>
    				<img src="./image/Icons/eye.svg" alt="" className="position-absolute pic-eye icon-from" data-show="false" onClick={(e)=>showPass(e)}/>
    				<Form.Control type="password" placeholder={placeholder['ru'].password} name="password" className="input-pass"/>
    				</div>
    				
  				</Form.Group>

  				<p className="mb-0">
  				<Link to={'#'} className="color-white-text"><FormattedHTMLMessage id="form.label-forgot-pass" /></Link>
  				</p>
  				<p className="mb-0">
  				<Link to={'#'} className="color-white-text"><FormattedHTMLMessage id="form.mess-secure" /></Link>
  				</p>

  				<button type='submit' className="btn-enter" data-form="container-form-des">
  				<FormattedHTMLMessage id="form.btn-enter" />
  				</button>

			</Form>
			)}
			</Formik>	
			</div>
	)
}

function FormMobile({placeholder, validation, showPass}){

	let schemaValid =Yup.object().shape({
  		login: Yup.string().required().min(6),
  		password: Yup.string().required().min(6),		
     });
	let initVal = {
		login: '',
		password: ''
	};

	var close= (e)=>{
		let elem = document.getElementById('container-form-mob');
		let wrap = document.getElementsByClassName('wrap-shad')[0];
		
		if(elem.classList.contains('form-hide')===false){
			elem.classList.remove('form-show');
			elem.classList.add('form-hide');
			wrap.setAttribute('data-show', 'hide');
		}
		
	}

	let formSubmit = (e)=>{
		console.log('ff')
	}

	return(
		<div id='container-form-mob' className='slide-from-side position-absolute form-hide'>
			<Formik validationSchema={schemaValid}  initialValues={initVal} onSubmit={(e)=>formSubmit(e)} >

       	{({
        	handleSubmit,
        	handleChange,
        	handleBlur,
        	values,
        	touched,
        	isValid,
        	errors
      	}) => (
			<Form>
				<span className="color-white-text font-weight-bold position-absolute btn-close-form" onClick={()=>close()}>X</span>
				<p className="title-form mb-0 color-white-text mt-10 font-weight-bold text-uppercase text-left"><FormattedHTMLMessage id="form.title" /></p>
				<Form.Group controlId="formBasicNameMob" className="mt-20">
    				<Form.Label className="color-white-text"><FormattedHTMLMessage id="form.label-name" /></Form.Label>
    				<div className="position-relative">
    				<img src="./image/Icons/user.svg" alt="" className="position-absolute pic-user icon-from"/>
    				<Form.Control type="text" placeholder={placeholder['ru'].name} name="login" value={values.login} className="input-username" onChange={handleChange} isValid={touched.login && !errors.login} isInvalid={!!errors.login}/>
    				</div>
    				
  				</Form.Group>

  				<Form.Group controlId="formBasicPassMob">
    				<Form.Label className="color-white-text"><FormattedHTMLMessage id="form.label-pass" /></Form.Label>
    				<div className="position-relative">
    				<img src="./image/Icons/Password.svg" alt="" className="position-absolute pic-pass icon-from"/>
    				<img src="./image/Icons/eye.svg" alt="" className="position-absolute pic-eye icon-from" data-show="false" onClick={(e)=>showPass(e)}/>
    				<Form.Control type="password" placeholder={placeholder['ru'].password} name="password" value={values.password} className="input-pass" onChange={handleChange} isValid={touched.password && !errors.password} isInvalid={!!errors.password}/>
    				</div>
    				
  				</Form.Group>

  				<p className="mb-0">
  				<Link to={'#'} className="color-white-text"><FormattedHTMLMessage id="form.label-forgot-pass" /></Link>
  				</p>
  				<p className="mb-0">
  				<Link to={'#'} className="color-white-text"><FormattedHTMLMessage id="form.mess-secure" /></Link>
  				</p>

  				<button type='submit' className="btn-enter w-100" data-form="container-form-des" onClick={(e)=>e.preventDefault()}>
  				<FormattedHTMLMessage id="form.btn-enter" />
  				</button>

			</Form>
			)}
			</Formik>
			</div>
	)
}