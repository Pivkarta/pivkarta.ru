import React, { Fragment } from 'react'

import EditableView from 'src/modules/GridView/Editable';

import Grid from 'material-ui/Grid';


// import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

// import { Link } from 'react-router-dom';


// import Button from 'material-ui/Button/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import DefaultView from './default';

import Editor from 'src/modules/ui/Editor';
// import Image from 'src/modules/ui/Image';
import SingleUploader from 'src/modules/ui/FileUploader/SingleUploader';

import Map from './Blocks/Map';
import BeersBlock from './Blocks/Beers';
import SchedulesEditor from './Blocks/Schedules/Editor';

import Tabs, { Tab } from 'material-ui/Tabs';

import GalleryBlock from 'Gallery2';

import Ownerer from "./Blocks/Ownerer";

let { ...defaultProps } = EditableView.defaultProps;


export default class PlaceView extends EditableView {

	static defaultProps = defaultProps;


	constructor(props) {

		super(props);

		this.state = {
			...this.state,
			tabIndex: 1,
		}

	}



	// renderHeader() {

	// 	const {
	// 		active,
	// 	} = this.getObjectWithMutations() || {};


	// 	return <Typography
	// 		variant="headline"
	// 		className="pagetitle"
	// 	>
	// 		{this.getTitle()} {active === false ? <span
	// 			style={{
	// 				color: "red",
	// 			}}
	// 		>(закрылось)</span> : null}

	// 		{this.getButtons()}

	// 	</Typography>
	// }


	renderHeader() {

		const {
			active,
		} = this.getObjectWithMutations() || {};


		return <div
			style={{
				marginBottom: 20,
			}}
		>

			<h1 className="h1main">
				{this.getTitle()}
				{active === false ? <span
					style={{
						color: "red",
					}}
				>(закрылось)</span> : null}

			</h1>

			{this.getButtons()}

		</div>
	}


	getButtons() {

		const object = this.getObjectWithMutations();

		const {
			id,
		} = object || {};

		const {
			data: {
				refetch,
			},
		} = this.props;

		let buttons = super.getButtons() || [];

		const inEditMode = this.isInEditMode();

		if (!inEditMode && id) {
			buttons.unshift(
				<Ownerer
					key="ownerer"
					item={object}
					confirmOwnering={event => this.confirmOwnering()}
					refetch={refetch}
				/>);
		}

		return buttons;
	}


	setPageMeta(meta) {




		// Надо сформировать каноникал

		if (meta === undefined) {

			let {
				uri,
			} = this.getObjectWithMutations() || {};

			meta = {
				canonical: uri,
			}
		}


		return super.setPageMeta(meta);

	}

	canEdit() {

		const {
			user: currentUser,
		} = this.context;

		const {
			data: {
				object,
			},
		} = this.props;


		const {
			id: currentUserId,
			sudo,
		} = currentUser || {}

		return object && currentUser && (
			(object.Owner && object.Owner.id === currentUserId)
			|| (!object.id)
			|| sudo
		) ? true : false;
	}


	renderDefaultView() {

		const object = this.getObjectWithMutations();

		const {
			data: {
				refetch,
			},
		} = this.props;

		return <DefaultView
			object={object}
			updateObject={data => this.updateObject(data)}
			inEditMode={this.isInEditMode()}
			refetch={refetch}
		/>

	}


	renderEditableView() {

		const object = this.getObjectWithMutations();

		const inEditMode = this.isInEditMode();

		const {
			id,
			name,
			image,
			address,
			website,
			metro,
			phone,
			content,
			is_bar,
			is_shop,
			is_brewery,
			email,
			active,
			schedules,
			best,
		} = object;

		const {
			user: currentUser,
		} = this.context;

		const {
			tabIndex,
		} = this.state;



		const {
			id: currentUserId,
			sudo,
		} = currentUser || {};





		let tabContent;

		switch (tabIndex) {

			case 1:

				tabContent = <Fragment>

					<Grid
						item
						xs={12}
						sm
					// style={{
					// 	flexGrow: 0,
					// }}
					>


						<Paper
							style={{
								padding: 15,
							}}
						>

							<Grid
								container
								spacing={8}
							>

								<Grid
									item
								>
									<SingleUploader
										value={image}
										onUpload={({ data }, b, c) => {



											const {
												singleUpload,
											} = data || {}



											if (singleUpload) {

												const {
													path,
												} = singleUpload;

												this.updateObject({
													image: path,
												});

											}

										}}
										onDelete={image ? event => {
											this.updateObject({
												image: null,
											});
										} : undefined}
									/>
								</Grid>

								<Grid
									item
									xs
								>

									<table
										style={{
											width: "100%",
										}}
									>
										<tbody>


											<tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Название:
												</td>
												<td>


													<Grid
														container
														spacing={8}
														alignItems="baseline"
													>

														<Grid
															item
															xs
														>
															{this.getTextField({
																name: "name",
															})}
														</Grid>

														{sudo
															?
															<Grid
																item
															>
																<FormControlLabel
																	control={
																		<Switch
																			checked={best ? true : false}
																			name="best"
																			// onChange={this.handleChange('checkedA')}
																			onChange={(event, checked) => {
																				this.onChangeSelectBoolable(event, checked);
																			}}
																		/>
																	}
																	label="Лучшее"
																/>
															</Grid>
															: null
														}

													</Grid>



												</td>
											</tr>

											<tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Адрес:
												</td>
												<td>
													<Grid
														container
														spacing={8}
														alignItems="baseline"
													>

														<Grid
															item
															xs
														>

															{this.getTextField({
																name: "address",
															})}

														</Grid>

														<Grid
															item
														>
															<FormControlLabel
																control={
																	<Switch
																		checked={active ? true : false}
																		name="active"
																		// onChange={this.handleChange('checkedA')}
																		onChange={(event, checked) => {
																			this.onChangeSelectBoolable(event, checked);
																		}}
																	/>
																}
																label="Статус заведения"
															/>
														</Grid>

													</Grid>

												</td>
											</tr>


											{(sudo === true) && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Емейл:
												</td>
												<td>
													{this.getTextField({
														name: "email",
													})}
												</td>
											</tr> || null}

											{<tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Телефон:
										</td>
												<td>
													{this.getTextField({
														name: "phone",
													})}
												</td>
											</tr> || null}


											{<tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Веб-сайт:
										</td>
												<td>
													{this.getTextField({
														name: "website",
													})}
												</td>
											</tr> || null}


											{<tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Метро:
										</td>
												<td>
													{this.getTextField({
														name: "metro",
													})}
												</td>
											</tr> || null}


											{<tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
														width: "100px",
													}}
												>
													Тип заведения:
										</td>
												<td>
													<FormGroup row>
														<FormControlLabel
															control={
																<Switch
																	checked={is_bar ? true : false}
																	name="is_bar"
																	// onChange={this.handleChange('checkedA')}
																	onChange={(event, checked) => {
																		this.onChangeSelectBoolable(event, checked);
																	}}
																/>
															}
															label="Бар"
														/>
														<FormControlLabel
															control={
																<Switch
																	checked={is_shop ? true : false}
																	name="is_shop"
																	// onChange={this.handleChange('checkedA')}
																	onChange={(event, checked) => {
																		this.onChangeSelectBoolable(event, checked);
																	}}
																/>
															}
															label="Магазин"
														/>
														<FormControlLabel
															control={
																<Switch
																	checked={is_brewery ? true : false}
																	name="is_brewery"
																	// onChange={this.handleChange('checkedA')}
																	onChange={(event, checked) => {
																		this.onChangeSelectBoolable(event, checked);
																	}}
																/>
															}
															label="Пивоварня"
														/>
													</FormGroup>
												</td>
											</tr> || null}

											<tr>
												<td>
													Координаты
												</td>
												<td>
													{this.getTextField({
														name: "lat",
														label: "Широта (lat)",
														type: 'number'
													})}
												</td>
												<td>
													{this.getTextField({
														name: "lng",
														label: "Долгота (lng)",
														type: 'number'
													})}
												</td>
											</tr>

										</tbody>
									</table>

								</Grid>

							</Grid>

						</Paper>



					</Grid>

					<Grid
						item
						xs={12}
					>
						<Map
							item={object}
							inEditMode={inEditMode}
							onChildMouseMove={(key, marker, newCoords) => {

								if (!newCoords) {
									return false;
								}

								const {
									lat,
									lng,
								} = newCoords;

								// Object.assign(object, {
								//   coords: {
								//     lat: lat,
								//     lng: lng,
								//   },
								// });

								// this.updateObject({
								// });

								if (lat && lng) {

									let { ...coords } = object.coords || {}

									// Object.assign(coords, {
									//   lat,
									//   lng,
									// });

									this.updateObject({
										// coords,
										lat,
										lng,
									});

								}

								// this.forceUpdate();






							}}
							updateObject={data => {

								this.updateObject(data)
							}}
						/>
					</Grid>

				</Fragment>

				break;

			case 2:
				tabContent = <Grid
					item
					xs={12}
				>
					<BeersBlock
						place={object}
						inEditMode={inEditMode}
						exists={false}
					// refetch={this.props.data.refetch}
					/>
				</Grid>

				break;

			case 3:

				tabContent = <Grid
					item
					xs={12}
					style={{
						marginTop: 30,
					}}
				>
					<Editor
						value={content}
						onChange={(editorState, rawContent) => {


							if (!this.state._dirty || !this.state._dirty.content) {
								this.updateObject({
									content: rawContent,
								});
							}
							else {
								this.state._dirty.content = rawContent;
							}

						}}
					/>
				</Grid>

				break;

			case 4:

				tabContent = <Grid
					item
					xs={12}
				>
					<SchedulesEditor
						value={schedules || []}
						onChange={value => {
							this.updateObject({
								schedules: value,
							});
						}}
					/>
				</Grid>

				break;

			default: ;

		}


		return (
			<Grid
				container
				spacing={0}
			>

				<Grid
					item
					xs={12}
				>
					<Tabs
						// centered
						scrollable
						scrollButtons="auto"
						value={tabIndex}
						onChange={(event, value) => {
							this.setState({
								tabIndex: value,
							});
						}}
					>
						<Tab
							value={1}
							label="Основная информация"
						/>

						<Tab
							value={2}
							label="Ассортимент"
						/>

						<Tab
							value={3}
							label="О заведении"
						/>

						<Tab
							value={4}
							label="График работы"
						/>
					</Tabs>
				</Grid>


				{tabContent}



				{/* <Grid
					item
					xs={12}
					style={{
						marginTop: 30,
					}}
					>
					
					
					<Paper
					style={{
						padding: 15,
						}}
					>

						<Editor
							value={editor_content}
							readOnly={!inEditMode}
						/>

					</Paper>

				</Grid> */}

				<Grid
					item
					xs={12}
					style={{
						marginTop: 30,
					}}
				>

					<GalleryBlock
						item={object}
						inEditMode={inEditMode}
						updateObject={data => this.updateObject(data)}
					/>

				</Grid>

			</Grid>
		)


	}


}
