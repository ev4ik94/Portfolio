
/* -----  Красивые числа ------*/

export var costRepl = (n)=>{
	var parts = n.toString().split(".");
  	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");   
    return parts.join(".");
}


/*------ Find Get Parametr------*/


export var findGetParameter = (parameterName)=>{
	
	var result = null,
    tmp = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
           tmp = item.split("=");
           if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
         });
   return result;
}


/*----- TimesTamp to date-----*/
  
  export var timestampConverter = (timestamp)=>{
      
      if(timestamp&&timestamp!==''){
        let unix_timestamp = timestamp;
      
      let date = new Date(unix_timestamp*1000);
      let month  = (date.getMonth()+1)<10?`0${(date.getMonth()+1)}`:date.getMonth()+1;
      let day = date.getDate();
      let year = date.getFullYear();
      console.log(unix_timestamp)
      return `${day}.${month}.${year}г`;
    }

    return '- - - ';
      
      
  }


/*----- Animation Scroll ----*/

 
    
export var Animation = (elem, isAnim)=>{

  let bottom = elem.getBoundingClientRect().bottom;
 
  if(bottom<=window.innerHeight&&isAnim){
        return true;
    }

    return false;
}



/*----HTML scraping----*/

export function getInfoHtml(teg='', clss='', html=''){
  let container = document.createElement('div');
  container.innerHTML = html;
  let arrDiv = container.getElementsByTagName(teg);
  let elem = null;
 
  for(var k=0; k<arrDiv.length; k++){
    if(arrDiv[k].classList.contains(clss)){
      elem = arrDiv[k];
      break;
    }else if(arrDiv[k].classList.contains('card-img')){
      elem = arrDiv[k];
      break;
    }else if(arrDiv[k].classList.contains('img-fluid')){
      elem = arrDiv[k];
      break;
    }
  }
  return elem;
  
}




export let textEllipsis = (text, length)=>{

  let textAr = text;
  if(text.length>length) textAr = text.slice(0, length) + '...';

  return textAr;
  
}


export function scrollTop(){
  window.scrollTo({top:0, behavior: "smooth"});
}


export function readCookie(text){
  var arrCook = document.cookie.split(";");
  let arr = [];
  arrCook.map(item=>{
    arr.push(item.split('='));
  })
  let result = arr.filter(item=>item[0]===text);
  return result.length>0?result[0][1]:false;
}


export function setCookie(name, text){
  let date = new Date(Date.now() + 86400e3);
  date = date.toUTCString();
  document.cookie = name+"="+text+"; path=/; expires="+date;
}


export function sortArr(arr, param=null){

  return arr.sort((a,b)=>{
        if((param!==null?a[param]:a)>(param!==null?b[param]:b)) 
          return 1;
        if((param!==null?a[param]:a)<(param!==null?b[param]:b)) 
          return -1;
      });
}

