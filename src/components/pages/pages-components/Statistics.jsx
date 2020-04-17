import React, {Component, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import Chart from 'react-apexcharts';

import './css/Statistics.css';
import {Animation} from './wigets/secondaryFunc.jsx';
import {RoundDiagramm, LineDiagramm} from './wigets/dataApp.js';

var labels = {
	uz: [''],
	oz: [''],
	ru: ['Физические лица', 'Юридические лица', 'Прочее'],
	en:[]
}

var labelsLineDgrm = {
	uz: [''],
	oz: [''],
	ru: ['Выполнено', 'В обработке', 'Отклонено'],
	en:[]
}

var dataDemo = [
		{
       		name: labelsLineDgrm['ru'][0],
       		data: [120, 50, 60, 115, 90, 90, 25]}, 
       {
       		name: labelsLineDgrm['ru'][1],
       		data: [300, 220, 390, 210, 230, 350, 200]
        }, 
        {
            name: labelsLineDgrm['ru'][2],
            data: [50, 20, 0, 0, 0, 30, 10]
}];

var obj = [85,75,65];

 

export default function Statistics({data}){

	return(
		<div className="wrap-statistic" style={{padding:'20px 15px'}}>
			<Container id="statistics" className="d-flex flex-lg-row flex-column">
				<div className="contain-description col-md-4">
					<h2 className="color-white-text font-weight-bold mb-30"><FormattedHTMLMessage id="statistics.title" /></h2>
					<p className="color-white-text text-site-sm mb-30"><FormattedHTMLMessage id="statistics.description" /></p>
					<Link to={'#'} className="color-white-text">
          				<div className="btn-statistic btn-arrow color-red-bg text-left"><FormattedHTMLMessage id="statistics.btn-read" /></div>
          			</Link>
				</div>
				<div className="round-diagramm col-md-4 pt-70" id="dt-3">
					<Diagramm data={RoundDiagramm} id='chart' series={obj} type='radialBar' elem='dt-3'/>
				</div>
				<div className="line-diagramm col-md-4 pt-30" id="dt-4">
					<Diagramm data={LineDiagramm} id='chart2' series={dataDemo} type='bar' elem='dt-4'/>
				</div>
			</Container>
		</div>
	)
}


    function Diagramm ({data, id, series, type,elem}){

    	const [seriesD, setSeries] = useState(type==='bar'?[
    				{
    					name: '',
    					data: [0,0,0,0,0,0,0]
    				},
    				{
    					name: '',
    					data: [0,0,0,0,0,0,0]
    				},
    				{
    					name: '',
    					data: [0,0,0,0,0,0,0]
    				}
    			]:[0,0,0]);

    	const [mount, setMount] = useState(true);
    	
    	let anima = ()=>{
    		let elemD = document.getElementById(elem);
    		if(Animation(elemD, mount)){
  				setSeries(series);
  				setMount(false);
  				console.log('set')
  						
  			}
    	}
		useEffect(()=>{

			if(mount){
					
				window.addEventListener('scroll', anima);
				return () => window.removeEventListener('scroll', anima);
			}

			
			
		}, [seriesD, mount])

		let windowWidth = window.innerWidth<380;
		
		return (
			<div id={id}>
			<Chart options={data} series={seriesD} type={type} height={windowWidth?200:300} />
			</div>
          )
    }

   