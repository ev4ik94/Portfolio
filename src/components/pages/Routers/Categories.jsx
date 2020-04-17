import React, {Component} from 'react';

import { Switch, Route, Redirect} from 'react-router-dom';
import CategoryContent from './../CategoryContent';
import FormIndividuals from './../pages-components/formIndividuals';
import Location from './../pages-components/Location';





function Categories({match, store}){

	
		if(match.params.slug==='location') return <Location />
			else return <CategoryContent match={match} store={store}/>
	
	
}

export default Categories;