


export default function Calculators(state = [], action){


  	if(action.type==='GET_Calculator') {
  		return action.payload;
  	};
  	
  	return state;	
}