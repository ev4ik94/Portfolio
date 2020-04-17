import React, {Component} from 'react';
import {
  Route,
  Link
} from "react-router-dom";
import Credit from './Credit';


function Corp({match, location, history}){

	return(
		<div>
		<Route path='/corp' component={Corporation}/>
		
		</div>
	)
}

function Corporation(){
	return(
		<div>
		<h1>Corporation </h1>
		</div>
	)
}





export default Corp;