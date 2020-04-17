

export default function Article(state = [], action){


  	if(action.type==='GET_Article') {
  		return action.payload;
  	};
  	
  	return state;	
}