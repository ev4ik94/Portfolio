import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import {Container} from "react-bootstrap";






class CreditList extends Component{

	constructor(props){
		super(props);

		this.state = {
			categoriesData: []
			
		}


	}

	componentDidUpdate(prevProps) {
    
    if (this.props.store.categories !== prevProps.store.categories) 
          this.getData(this.props.store.categories[0].children);
    }

	getData(data){
		let slug = this.props.match.params.slug;
		var dataH;
		
		for(var k=0; k<data.length; k++){
			dataH = data[k].children.filter(item=>item.slug===slug);
			if(dataH.length>0) break;
		}
		
		this.setState({categoriesData: dataH});		
	}

	toggleTab(e){
		let parent = document.getElementsByClassName('tabs-credit')[0],
		collection= parent.getElementsByTagName('span'),
		type = e.target.getAttribute('data-type');

		for(var k=0; k<collection.length; k++){
			if(collection[k].getAttribute('data-active')==='true'){
				collection[k].setAttribute('data-active', 'false');
				break;
			}
		}

		e.target.setAttribute('data-active', 'true');
		this.listFilter(type);

	}

	listFilter(type){
		let parent = document.getElementById('list-credit'),
		collection = parent.getElementsByTagName('li');
		
		for(var k=0; k<collection.length; k++){

			let elemType = collection[k].getAttribute('data-type');

			if(elemType!==type && type!=='all')
			collection[k].classList.add('d-none');	
			else
			collection[k].classList.remove('d-none');
			
		}
		
	}

	render(){
		
		let img = this.state.data.length>0?this.state.data[0].image:'';

		
		return(
			<div>
			<Banner img = {img}/>
			<Container>
			<div className="header-title-credits" style={{padding: '15px 0px'}}>
			<h3 className="color-blue-text font-weight-bold mb-30"><FormattedHTMLMessage id="credit.title-list" /></h3>
			<div className="tabs-credit d-flex justify-content-between col-md-7 pl-0">
			<div className="credit-types-list d-flex col-md-9 justify-content-start pl-0">
				{
					this.state.dataCredit.length>0 && this.state.dataCredit.map(item=>(
						<span className="font-weight-bold text-uppercase" 
						key={item.id} data-active="false" data-type={item.type} onClick={(e)=>this.toggleTab(e)}>{item.type}</span>
					))
				}
			</div>
			<span className="font-weight-bold text-uppercase" onClick={(e)=>this.toggleTab(e)} data-active="true" data-type="all">все</span>
			</div>
			</div>
			<ListCredit credits={this.state.dataCredit} link={this.props.match.url} />
			</Container>
			</div>
		)
	}
	
	
}

function Banner({img}){

	return(
		<div className="" style={{minHeight:'500px'}}>
			<picture>
       			<source srcSet={img.mobile}  
        		media="(max-width: 600px)" className="img-cover w-100 h-100" />
       			<img src={img.desktop} alt="" className="img-cover w-100 h-100" />
    		</picture>
		</div>
	)
}

function ListCredit({credits, link}){
	
	let list = credits.map(item=>{
		return (
			<li className='item-credit justify-content-between' data-type={item.type} key={item.id}>
				<div className="col-md-3 d-flex flex-column justify-content-between">
					<p className="mb-0 color-white-text category-credit-type text-center text-uppercase">{item.type}</p>
					<p className="title-credit mb-0 font-weight-bold color-white-text">{item.title}</p>
					<Link to={`${link}/${item.id}`} className="more-info-credit font-weight-bold d-block text-uppercase color-blue-text btn-arrow color-white-bg">
					<FormattedHTMLMessage id="btn.read-more" />
					</Link>
				</div>

				<div className="col-md-5 info-credit">
					<p className="color-white-text justify-content-between">{item.desc}</p>
					<div className="d-flex info-ltl-credit">
						<div className="col-md-5 justify-content-center" style={{paddingLeft:0}}>
							<p className="color-white-text text-left text-uppercase" style={{fontSize:'1rem'}}>
							<FormattedHTMLMessage id="credit.item-list5" />{item.calculators[0].percent} %
							</p>
							<p className="color-white-text text-left">
							<FormattedHTMLMessage id="credit.item-list1" />
							</p>
						</div>
						<div className="col-md-5 justify-content-center" >
							<p className="color-white-text text-left text-uppercase" style={{fontSize:'1rem'}}>
							<FormattedHTMLMessage id="credit.item-list3" />
							 {item.calculators[0].term}
							<FormattedHTMLMessage id="credit.item-list4" />
							</p>
							<p className="color-white-text text-left">
							<FormattedHTMLMessage id="credit.item-list2" />
							</p>
						</div>
					</div>
				</div>

				<div className="credit-item-image col-md-3">
				<img src={item.images.large} alt={item.title} className="w-100 h-100 img-contain"/>
				</div>
			</li>
		)
	});

	return(
		<ul className="m-aut pl-0" id="list-credit">
		{list}
		</ul>
	)
}


export default CreditList;