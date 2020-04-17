

export default function currency(state = [], action){


  	if(action.type==='GET_CURRENCY') {
  		let data = action.payload || [];
  		data = state.concat(data);

  		return data;
  	};
  	

  	return state;


	
}