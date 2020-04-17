

export default function Banner(state = [], action){


  	if(action.type==='GET_Banner') {
  		return action.payload;
  	};
  	
  	return state;	
}