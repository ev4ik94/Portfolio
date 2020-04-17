import {CATEGORIES, CURRENCY, CB_CURRENCY, ARTICLE, NEWS, CALCULATOR, BANNERS} from './../components/pages/pages-components/wigets/API.js';



export const thunkList = () => {

    return async function (dispatch) {
      
      let response = await fetch(CATEGORIES, {method: 'GET'});
      let responseJSON = await response.json();     
    
       function dispatchLogin ( resp ) { 
        dispatch({type: 'GET_LIST', payload:resp});
      }
      
      return dispatchLogin( await responseJSON )
        
  }
  
}

export const articles = (id) => {
 
    return async function (dispatch) {
      let articl = `${ARTICLE}/${id}`;
      let response = await fetch(articl, {method: 'GET'});
      let responseJSON = await response.json();
      
      function dispatchLogin ( resp ) { 
        dispatch({type: 'GET_Article', payload:resp});
      }

      return dispatchLogin( await responseJSON )
        
  }
  
}


export const getCurrency = () => {

    return async function (dispatch) {
      
      let response = await fetch(CURRENCY, {method: 'GET'});
      let responseJSON = await response.json();
     
      function dispatchCurrency ( resp ) { 
        dispatch({type: 'GET_CURRENCY', payload:resp});
      }

      return dispatchCurrency( await responseJSON )
        
  }
  
}


export const getNews = () => {

    return async function (dispatch) {
      
      let response = await fetch(NEWS, {method: 'GET'});
      let responseJSON = await response.json();
    
      function dispatchCurrency ( resp ) { 
        dispatch({type: 'GET_News', payload:resp});
      }

      return dispatchCurrency( await responseJSON )
        
  }
  
}


export const getCalc = () => {

    return async function (dispatch) {
      
      let response = await fetch(CALCULATOR, {method: 'GET'});
      let responseJSON = await response.json();
      
      function dispatchCurrency ( resp ) { 
        dispatch({type: 'GET_News', payload:resp});
      }

      return dispatchCurrency( await responseJSON )
        
  }
  
}

export const getBanner = () => {

    return async function (dispatch) {
      
      let response = await fetch(BANNERS, {method: 'GET'});
      let responseJSON = await response.json();

      function dispatchCurrency ( resp ) { 
        dispatch({type: 'GET_Banner', payload:resp});
      }

      return dispatchCurrency( await responseJSON )
        
  }
  
}


