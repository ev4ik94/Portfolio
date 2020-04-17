import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import {thunkList, getCurrency, articles, getNews, getBanner} from './actions/nestedCategories.js';
import {readCookie, setCookie} from './components/pages/pages-components/wigets/secondaryFunc.jsx';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Main from './components/Main';

class App extends Component {

    constructor(props){
      super(props);
        this.state={
          categories: props.categories,
          currency: props.currency,
          articlCat: [],
          currentIdCat: 0
        }

        props.getList();
        props.getCurrency();

        

       
    }

    componentDidUpdate(prevProps, prevState) {
     
    if (this.props.categories !== prevProps.categories || this.props.currency !== prevProps.currency) {
      
          this.setState({categories: this.props.categories, 
            currency: this.props.currency});
         
      }

    }


    render() {
     
        return (
          <BrowserRouter>
            <div className="App overflow-hidden position-relative">
              
              <span className="wrap-shad position-fixed" data-show='hide'></span>
              <Header data={this.state.categories} />
              
                <Main store={{
                  categories:this.state.categories, 
                  currency:this.state.currency, 
                  getArticle: this.props.getArticle, 
                  article:this.props.article, 
                  getNews:this.props.getNews, 
                  news:this.props.news,
                  banners: this.props.banner,
                  getBanner: this.props.getBanner }}/>

              <Footer data={this.state.categories}/>
            </div>
          </BrowserRouter>
        );
    }
}

export default connect (
    state=>({
        user: state.user,
        categories: state.Categories,
        currency: state.currency,
        article: state.Article,
        news: state.News,
        banner: state.Banner
    }),
    dispatch=>({
      getList: ()=>{
        dispatch(thunkList())
      },
      getCurrency: ()=>{
        dispatch(getCurrency())
      },
      getArticle: (id)=>{
         dispatch(articles(id))
      },
      getNews: ()=>{
        dispatch(getNews())
      },
      getBanner: ()=>{
        dispatch(getBanner())
      }
    })
)(App);
