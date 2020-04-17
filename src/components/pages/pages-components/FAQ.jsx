import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";

import './css/FAQ.css';


var obj = [
	{
		id: 1,
		question: 'Заполните заявку и получите консультацию',
		desc: '1 Рабочий день',
		answer:`<p>Заполните вышеуказанное заявление на получение Автокредита. В течение одного рабочего дня наш сотрудник свяжется с Вами и проконсультирует по вопросам:</p>
		<ul>
			<li>Какие документы необходимы?</li>
			<li>Как будет рассчитываться сам кредит?</li>
			<li>Как будет оформляться кредит?</li>
			<li>Как будет погашаться кредит?</li>
		</ul>
		<p><strong>А также вопросы, которые Вас интересуют.</strong>
		</p>`,
		files:[]
	},
	{
		id: 2,
		question: 'Предоставьте необходимые документы.',
		desc: '13 Рабочих дней',
		answer:`<p><strong>Что бы получить Автокредит, Вам будет необходимо предоставить:</strong>
		</p>`,
		files:[]
	},
	{
		id: 3,
		question: 'Предоставьте необходимые документы.',
		desc: '13 Рабочих дней',
		answer:`<p><strong>Что бы получить Автокредит, Вам будет необходимо предоставить:</strong>
		</p>
		<ul>
			<li> Паспорт </li>
			<li> Копию ИНПС </li>
			<li> Справка о Заработной Плате за последние 12 месяцев </li>
			<li> Договор на приобретение Автомобильного средства </li>
			<li> Справка о Заработной Плате за последние 12 месяцев </li>
			<li> Договор на приобретение Автомобильного средства </li>
			<li> Справка о Заработной Плате за последние 12 месяцев </li>
			<li> Договор на приобретение Автомобильного средства </li>
			<li> Справка о Заработной Плате за последние 12 месяцев </li>
			<li> Договор на приобретение Автомобильного средства </li>
		</ul>`,
		files:[]
	},
	{
		id: 4,
		question: 'Предоставьте необходимые документы.',
		desc: '',
		answer:`<p><strong>Что бы получить Автокредит, Вам будет необходимо предоставить:</strong>
		</p>
		<ul>
			<li> Паспорт </li>
			<li> Копию ИНПС </li>
			<li> Справка о Заработной Плате за последние 12 месяцев </li>
			<li> Договор на приобретение Автомобильного средства </li>
		</ul>`,
		files:[]
	}
];


export default class FAQ extends Component{

	constructor(props){
		super(props);

		this.state = {
			data: obj,
			lastId: 0
		}
	}

	toggleClick(id){

		let idEl = 'item-'+id,
		idLast = 'item-'+this.state.lastId;
		let elemClick = document.getElementById(idEl),
		elemLast = document.getElementById(idLast);

		if(elemClick.classList.contains('show-blck')&&this.state.lastId===id){
			elemClick.classList.remove('show-blck');
			elemClick.classList.add('hidden-blck');
		}else if(!elemClick.classList.contains('show-blck')&&(this.state.lastId!==0&&this.state.lastId!==id)){
			elemClick.classList.remove('hidden-blck');
			elemClick.classList.add('show-blck');
			elemLast.classList.add('hidden-blck');
			elemLast.classList.remove('show-blck');
		}else{
			elemClick.classList.remove('hidden-blck');
			elemClick.classList.add('show-blck');
		}
		this.setState({lastId:id});
		
	}


	render(){
		return(
			<div className="pt-40">
				<div className="container"><h2 className="font-weight-bold color-blue-text pb-20 pt-20"><FormattedHTMLMessage id="faq.title-credit" /></h2></div>
				<ul className="pl-0 list-faq-items">
				{
					this.state.data.map((item, index)=>{
					 
						return(
							<li key={item.id} className="items-faq" id={`item-${item.id}`}>
								
									<div className="title-question position-relative">
									
										<div className="color-white-bg position-absolute rect-qst" style={{width:'25px', height:'25px'}}>
											<div className="color-red-rect position-absolute" style={{width:'15px', height:'15px'}}></div>
										</div>
									
										<div className="container d-flex">
										<div className="color-blue-bg color-white-text font-weight-bold numb-qst" style={{width:'35px', height:'35px', padding:'5px'}}>
											<p className="mb-0 text-center" style={{fontSize:'1.2rem'}}>{index+1}</p>
										</div>
										<div className="col-lg-6 col-md-6 col-9 qst-title">
											<p className="mb-0 color-blue-text font-weight-bold" style={{lineHeight:'2.4'}}>
												{item.question}
											</p>
										</div>
										<div className="color-grey-text font-weight-bold col-lg-4 col-5 desc-title">
											<p className="mb-0 text-uppercase" style={{lineHeight:'2.4', fontSize:'.9rem'}}>{item.desc}</p>
										</div>
										<div className="toggle-btn position-relative col-lg-1 col-1" onClick={(id)=>this.toggleClick(item.id)}>
											<p className="mb-0 font-weight-bold position-absolute" style={{fontSize:'2rem', cursor:'pointer'}}>+</p>
										</div>
										</div>
									
								</div>
								<div className="answer-item container">
									<div className="">
										<div dangerouslySetInnerHTML={{__html: item.answer}} />
									</div>
								</div>
								<div className="color-grey-bg m-aut line-bot" style={{height:'1px', width:'90%'}}></div>
							</li>
						)
					})
				}
				</ul>
				
			</div>
		)
	}
}


