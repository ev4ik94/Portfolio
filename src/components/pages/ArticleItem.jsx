import React, {Component} from 'react';
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FormattedHTMLMessage}from "react-intl";
import dataJson from './../../VirtData/articles.json';

import Banner from './pages-components/Banner';
import Calculate from './pages-components/Calculate';
import HtmlArticleContent from './pages-components/HtmlArticleContent';
import {getInfoHtml} from './pages-components/wigets/secondaryFunc.jsx';
import {API_IMAGES_ARTICLE} from './pages-components/wigets/API.js';
import NotFound from './pages-components/NotFound';
import FAQ from './pages-components/FAQ';

export default class ArticleItem extends Component{

	constructor(props){
		super(props);

		this.state={
			banner: [],
			htmlContent: '',
			currentId: this.props.id,
			getContent: true,
			buttonBanner: null,
			titleBanner: '',
			textBanner: '',
			calculateData: [],
      notFound: false,
      typeCalc: '',
      cardsPage: false,
      dataItem: []
		}
	}

	componentDidUpdate(prevProps, prevState) {

    if (this.props.dataArticle !== prevProps.dataArticle){ 
              this.getData(this.props.dataArticle);
        }

        if (this.props.match.params.slug !== prevProps.match.params.slug){ 
              console.log(this.props.match)
        }
          
    }

    componentDidMount(){
     
    	if(this.state.getContent&&this.props.dataArticle.length>0){

    	    	this.getData(this.props.dataArticle);
    	    	this.setState({getContent:false});
    	 }

       if (this.props.match.params.slug === 'cards'&&!this.state.cardsPage){ 
              this.setState({cardsPage:true});
        }
    }

    
    async getData(data){
     
    	let dataArt = data.filter(item=>Number(item.id)===Number(this.props.id));
      
      if(dataArt.length>0){
        this.setState({notFound:false, dataItem:dataArt});
     	  let banner = await getInfoHtml('img', 'banner-arcticle', dataArt[0].translation&&dataArt[0].translation.text?dataArt[0].translation.text:'');
     	  banner = banner!==null?banner.getAttribute('src'):'';

     	  let button = await getInfoHtml('btn', 'btn-banner', dataArt[0].translation&&dataArt[0].translation.text?dataArt[0].translation.text:'');
     	  button = button!==null?button.innerText:'';
     
    	 let arr = 
    		  {
    			 desktop: dataArt[0].image?dataArt[0].image:'',
    			 mobile: dataArt[0].image?dataArt[0].image:''
    		  };

    	 let calc = dataJson.filter(item=>item.id===dataArt[0].id);
    	 calc = calc.length>0&&calc[0].calculators?calc:[];
      
    	this.setState({banner: [{desktop:banner, mobile:banner}], 
    		htmlContent: dataArt[0].translation?dataArt[0].translation.text:'',
    		buttonBanner: button,
    		textBanner: dataArt[0].translation?dataArt[0].translation.desc:'',
    		titleBanner: dataArt[0].translation?dataArt[0].translation.title:'',
    		calculateData: calc,
        typeCalc: calc.length>0&&calc[0].calculators[0].type?calc[0].calculators[0].type:''});
    }else{
      
      setTimeout(()=>{this.setState({notFound:true})}, 300);
    	
    }
    }

 

	render(){
	
		return(
			
     <>
        {this.state.notFound && (<div><h4>НИ чего не найдено</h4></div>)}

        {!this.state.notFound && (<div>
         
      <HtmlArticleContent content={this.state.htmlContent}/>
      {this.state.calculateData.length>0 && <Calculate type={this.state.typeCalc} dataCalculate={this.state.calculateData} match={this.props.match}/>}
      <FAQ />
      </div>

      )}
      </>
		)
	}
}