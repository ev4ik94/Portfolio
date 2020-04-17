

export default function News(state = [], action){


  	if(action.type==='GET_News') {
  		return action.payload;
  	};
  	
  	return state;	
}