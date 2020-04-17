import React , {useState} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';


function LazyImage ({ image }){

	
	var img = document.getElementsByClassName('lazy-load-image-background');

	function beforeLoad(){
		
		for(var k=0; k<img.length; k++){
			img[k].classList.add('imgBlur');
		}
	}

	function afterLoad(){
		for(var k=0; k<img.length; k++){
			img[k].classList.remove('imgBlur');
		}
	}



	return(
  <div>
    <LazyLoadImage
      alt={image.alt}
      height='100%'
      src={image.srcMain} 
      width='100%' 
      placeholderSrc ={image.srcDef}
      beforeLoad={()=>beforeLoad()}
      afterLoad={()=>afterLoad()}
      />
  </div>
	)
}
 
export default LazyImage;