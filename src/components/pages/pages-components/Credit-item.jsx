import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import {Container} from "react-bootstrap";
import Calculate from './Calculate';

class CreditItem extends Component{

	constructor(props){
		super(props);

		this.state = {
			creditData: []
		}

		this.getData(this.props.data); //----- Пока не забираю с API (временно)
	}

	componentDidUpdate(prevProps) {
    
    if (this.props.data !== prevProps.data) 
          this.getData(this.props.data);
    }

    async getData(data){
    	let id = this.props.match.params.id;
    	let dataC = await data.filter(item=>item.id===Number(id));

    	this.setState({creditData: dataC});
    }

	render(){
		
		let banner = this.state.creditData.length>0&&this.state.creditData[0].images.banner!==undefined?this.state.creditData[0].images.banner:'';
		return(
			<>
			<Banner img={banner}/>
			
			<InfoCredit />
			<Calculate dataCredit={this.state.creditData} />
			
			</>
		)
	}
}



function Banner({img}){

	return(
		<div className="position-relative" style={{minHeight:'400px', height:'500px'}}>
			<picture>
       			<source srcSet={img}  
        		media="(max-width: 600px)" className="img-cover w-100 h-100 position-absolute" />
       			<img src={img} alt="" className="img-cover w-100 h-100 position-absolute" />
    		</picture>
		</div>
	)
}


function InfoCredit({data}){

	return(
		<Container style={{minHeight:'400px'}}>
			
		</Container>
	)
}


export default CreditItem;