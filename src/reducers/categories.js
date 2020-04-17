 

export default function Categories(state = [], action){


  	if(action.type==='GET_LIST') {
  		let data = action.payload || [];
  		
  		return data;
  	};
  	

  	return state;


	
}



function nestedList(arr){

      let data = arr || [];
      var obj = {};
           
      console.log(arr)
      data.map(item => obj[item.lft] = item);
      var result = {children: []};
      
      function processLevel (parentObject, lft){
        var item = obj[lft];
        while (item) {
          var childObject = {
              title: item.title, id: item.id,
              depth: item.depth, slug: item.slug, image: item.images, children: []
          };
        parentObject.children.push(childObject);
        processLevel(childObject, item.lft + 1, obj);
        item = obj[item.rgt + 1];
      }
    }

    processLevel(result, 2);
    return result;
    
    }



  
 






