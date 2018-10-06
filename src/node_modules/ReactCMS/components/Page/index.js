import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';

import {Link} from 'react-router';

const defaultProps = {}

import PageLayout from 'modules/Sportpoisk/components/Pages';


export default class Page extends PageLayout{

	// static contextTypes = {
	// 	inited: PropTypes.bool.isRequired,
	// 	document: PropTypes.object.isRequired,
	// 	appExports: PropTypes.object.isRequired,
	// 	user: PropTypes.object.isRequired,
	// 	localQuery: PropTypes.func.isRequired,
	// 	remoteQuery: PropTypes.func.isRequired,
	// };

	// constructor(props){

	// 	super(props);

	// 	this.state = {};
	// }

	// componentWillMount(){

	// 	this.onWillMount();

	// 	this.setPageTitle();

	// }

	// onWillMount(){

	// 	const {
	// 		document,
	// 	} = this.context;

	// 	const {
	// 		resourceState,
	// 	} = document;

	// 	if(resourceState){

	// 		// Object.assign(this.state, resourceState);

	// 		const {
	// 			state: initialState,
	// 		} = resourceState;


	// 		this.initState(initialState, true);

	// 	}
	// 	else {

	// 		this.loadData();

	// 	}

	// }


	// componentWillUnmount(){

	// 	this.mounted = false;

	// 	const {
	// 	} = this.context;

	// }


	// componentDidMount(){

	// 	this.mounted = true;

	// 	this.clearInitialState();

	// }


	// // Удаляем инит-данные, чтобы при смене страницы и компонента было понятно, что данные надо подгрузить
	// clearInitialState(){

	// 	let {
	// 		document,
	// 	} = this.context;

	// 	// if(document){

	// 	// 	document.resourceState = null;

	// 	// }

	// }


 //  componentDidUpdate(prevProps, prevState, prevContext){

 //    const {
 //    	inited,
 //    } = this.context;

 //    const {
 //    	inited: prevInited,
 //    } = prevContext || {};


 //    if(
 //    	(prevContext !== undefined && !prevInited && inited)
 //    ){
    	
 //    	this.onInit();

 //    }
    	

 //    const {
 //      location,
 //    } = this.props;

 //    const {
 //      location: prevLocation,
 //    } = prevProps;

 //    if(location && prevLocation && location !== prevLocation){
 //    	this.onLocationChanged();
 //    }

 //  }


 //  onInit(){

 //  	this.reloadData();

 //  }


 //  onPageChange(){

 //  	this.reloadData();
    	
 //  }


 //  async onLocationChanged(){



 //  	this.setState({
 //  		pageReloading: true,
 //  	});

 //  	await this.reloadData();
    
 //  	this.setState({
 //  		pageReloading: false,
 //  	});

 //  }


 //  onStoreUpdated(store, payload){

 //  	this.reloadData();

 //  }


 //  getPage(){
  	
	// 	const {
	// 		location,
	// 	} = this.props;

	// 	const {
	// 		query,
	// 	} = location || {};

	// 	const {
	// 		page,
	// 	} = query || {};
	
	// 	return parseInt(page) || undefined;	
 //  }




 //  setPageTitle(title){

 //    if(
 //      title
 //      && typeof window !== "undefined"
 //      && (window.document.title != title)
 //    ){
 //      window.document.title = title;
 //    }

 //    return title;

 //  }

	
	// async loadData(options = {}){

	// 	if(typeof window === "undefined"){
			
	// 		return;

	// 	}

	// 	const {
	// 		remoteQuery,
	// 	} = this.context;

	// 	let {
	// 		provider,
	// 	} = options;

	// 	provider = provider || remoteQuery;

	// 	let result = await this.loadServerData(provider, options);

	// 	// if(result){

	// 	// 	this.initState(result.data);

	// 	// }

	// 	this.initState(result && result.data || {});

	// 	return;

	// }


	// reloadData(options = {}){

	// 	return this.loadData(options);

	// }


	// async loadServerData(provider, options = {}){

	// 	// Для всех страниц по умолчанию
	//   return {
	//   	data: {
	//   		title: "React-CMS",
	//   	},
	//   };

	// }


	// initState(newState, willMount){

	// 	if(!willMount && (this.mounted !== undefined && this.mounted !== true)){
	// 		return;
	// 	}

	// 	newState = newState || {};

	// 	if(willMount){

	// 		Object.assign(this.state, newState);
			
	// 	}
	// 	else{

	// 		this.setState(newState);

	// 	}

	// }


	// render(childContent){

	// 	return childContent || null;
		
	// }

}