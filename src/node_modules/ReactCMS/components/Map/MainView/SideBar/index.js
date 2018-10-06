import './styles/styles.less';

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Checkbox, {LabelCheckbox} from 'material-ui/Checkbox';
 
export default class SideBar extends Component{

	static contextTypes = {
		connector_url: PropTypes.string.isRequired,
		user: PropTypes.object.isRequired,
		userActions: PropTypes.object.isRequired,
		classes: PropTypes.object.isRequired,
		mapShowContacts: PropTypes.bool.isRequired,
		mapShowContactsToggle: PropTypes.func.isRequired,
		mapShowGeoObjects: PropTypes.bool.isRequired,
		mapShowGeoObjectsToggle: PropTypes.func.isRequired,
	};

	static propTypes = {
		map: PropTypes.object.isRequired,
		maps: PropTypes.object.isRequired,
	};

	constructor(props){

		super(props);

		this.state = {
			sideBarFullHeight: true,
		}
	}

	render(){

		let {
			map,
			maps,
			position,
			// createPlace,
			...other
		} = this.props;

		let {
			classes,
			connector_url,
			user,
			userActions,
			mapShowContacts,
			mapShowContactsToggle,
			mapShowGeoObjects,
			mapShowGeoObjectsToggle,
		} = this.context;

		const {
			sideBarFullHeight,
		} = this.state;

		let content = null;

		let icons = [];

		// icons.push(<div
		// 	key={icons.length}
		// 	className="icon-block"
		// >
		// 	<LabelCheckbox 
		// 		label="Компании"
		// 		checked={mapShowContacts}
		// 		onChange={event => {
		// 			mapShowContactsToggle();
		// 		}}
		// 	/>	
		// </div>);

		// icons.push(<div
		// 	key={icons.length}
		// 	className="icon-block"
		// >
		// 	<LabelCheckbox 
		// 		label="ГеоОбъекты"
		// 		checked={mapShowGeoObjects}
		// 		onChange={event => {
		// 			mapShowGeoObjectsToggle();
		// 		}}
		// 	/>	
		// </div>);


		icons.push(<div
			key={icons.length}
			className="icon-block"
		>
			<Button>
				Клубы, школы, секции
			</Button>
		</div>);

		icons.push(<div
			key={icons.length}
			className="icon-block"
		>
			<Button>
				Спортивные объекты
			</Button>
		</div>);

		icons.push(<div
			key={icons.length}
			className="icon-block"
		>
			<Button>
				Спорт-бары
			</Button>
		</div>);

		icons.push(<div
			key={icons.length}
			className="icon-block"
		>
			<Button>
				Спорт-shop
			</Button>
		</div>);

		content = <div
			className={[
				"SideBar", 
				classes.SideBar, 
				sideBarFullHeight ? "fullHeigh" : "",
				"sidebar-xs-12", 
				"sidebar-md-4", 

			].join(" ")}
		>
			<div
				className="SideBar--local"
			>

				<div
					className="SideBar--panels"
				>
					
					{/*
					<div
						className="SideBar--block"
					>
						wqdwqdwq
					</div>
					<div
						className="SideBar--block"
					>
						<SearchBar 
							map={map}
							maps={maps}
						/>
					</div>
					*/}



					<div
						className="SideBar--block"
					>
						 
						<LabelCheckbox 
							label="Компании"
							checked={mapShowContacts}
							onChange={event => {
								mapShowContactsToggle();
							}}
						/>	

						<LabelCheckbox 
							label="ГеоОбъекты"
							checked={mapShowGeoObjects}
							onChange={event => {
								mapShowGeoObjectsToggle();
							}}
						/>

					</div>

 
					{icons
						?
							<div
								className="SideBar--block icons"
							> 
								<div
									style={{
										position: 'absolute',
										left: 0,
										bottom: 0,
										top: 0,
										width: '100%',
									}}
								>
									<div
										style={{
											display: 'flex',
											overflow: 'auto',
											// border: '1px solid red',
									    flexDirection: 'row',
									    flexWrap: 'wrap',
									    height: '100%',
									    alignContent: 'flex-start',
										}}
									>

										{icons}
									</div> 
								</div>
							</div>
						:
						null
					}

				</div>

			</div>

		</div>;

		return content;
	}
}
 
