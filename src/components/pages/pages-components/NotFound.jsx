import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {readCookie} from './wigets/secondaryFunc.jsx';


export default function NotFound({match}){

	const langArr = [['Рус', 'ru'], ['Узб', 'oz'], ['Eng', 'en'], ['Uzb', 'uz']];
	let lang = readCookie('lang')?langArr.filter(item=>item[0]===readCookie('lang'))[0][1]:'ru';
	
	


	return(
		<div className="position-relative w-100" style={{minHeight:'600px'}}>
			<span className="w-100 h-100 position-absolute color-blue-bg" style={{opacity:'.97'}}></span>
			<img src={`${window.location.origin}/image/picture/page-404.jpg`} alt="" className="position-absolute img-cover" style={{zIndex:'-1'}}/>
			<Container className="position-relative pt-90" style={{zIndex:2}}>
				<p className="color-white-text font-weight-bold text-center mb-0" style={{fontSize:'6.5rem'}}>404</p>
				<p className="color-white-text font-weight-bold text-center" style={{fontSize:'2.5rem'}}>Page Not Found</p>
				<Link to={`/${lang?lang:'ru'}/individuals`}>
				<div className="color-red-bg color-white-text btn-arrow m-aut font-weight-bold" style={{width:'150px', padding:'5px 10px'}}>Go Back</div>
				</Link>
			</Container>
		</div>
	)
}