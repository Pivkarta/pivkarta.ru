import React, { Fragment } from 'react'

import EditableView from 'Editable';

import Grid from 'material-ui/Grid';


import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { Link } from 'react-router-dom';


import Button from 'material-ui/Button/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import DefaultView from './default';


import Editor from 'src/modules/ui/Editor';
// import Image from 'src/modules/ui/Image';
import BeerContainer from 'src/modules/ui/Select/Beer/Container';
import BeerColor from 'src/modules/ui/Select/Beer/Color';

import GalleryBlock from 'Gallery2';

import Bitter from './Blocks/Bitter';
import TextField from 'material-ui/TextField';

import SingleUploader from 'src/modules/ui/FileUploader/SingleUploader';


import BeerMapLink from 'src/modules/ui/Link/Beer/Map';

let { ...defaultProps } = EditableView.defaultProps;


export default class BeerView extends EditableView {

	static defaultProps = defaultProps;


	canEdit() {
		return true;
	}


	setPageMeta(meta) {

		let canonical;

		let metad;

		const {
			url_name,			
			beer_id,	
			description,
			name,		
		} = this.getObjectWithMutations() || {};

		if (url_name && beer_id) {

			canonical = `/beer/${beer_id}/${url_name}`;

		}

		if (description) {

			metad = description;

		}
		else {

			metad = `Пиво ${name}`;

		}
		
		return super.setPageMeta({
			canonical,
			// description: metad,
		});

	}


	renderHeader() {

		return <div
			style={{
				marginBottom: 20,
			}}
		>

			<h1 className="h1main">
				{this.getTitle()}
			</h1>

			{this.getButtons()}

		</div>
	}


	getButtons() {

		const object = this.getObjectWithMutations();

		let buttons = super.getButtons() || [];

		const inEditMode = this.isInEditMode();

		if (!inEditMode) {
			buttons.unshift(<BeerMapLink
				item={object}
			>
				НАЙТИ ПИВО НА КАРТЕ ГОРОДА
			</BeerMapLink>);
		}

		return buttons;
	}


	renderDefaultView() {

		const object = this.getObjectWithMutations();

		return <DefaultView
			object={object}
			updateObject={data => this.updateObject(data)}
			inEditMode={this.isInEditMode()}
		/>

	}


	renderEditableView() {

		const object = this.getObjectWithMutations();

		const inEditMode = this.isInEditMode();



		if (!object) {
			return null;
		}

		const {
			id,
			name,
			region,
			manufacturer,
			manufacture_years,
			container,
			alcohol,
			bitter,
			color,
			components,
			image,
			editor_content,			
			description,
		} = object;






		return (
			<Grid
				container
				spacing={8}
			>

			
				<Grid
					item
					xs={12}
				>

					{this.renderField(<TextField
						label="Наименование"
						name="name"
						value={name || ""}
						fullWidth
					/>)}

				</Grid>

				<Grid
					item
					xs={12}
				>
					{this.renderField(<TextField
						label="meta-description"
						name="description"
						value={description || ""}
						fullWidth
					/>)}
				</Grid>

				<Grid
					item
					xs={12}
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

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
													width: "100px",
												}}
											>
												Регион:
										</td>
											<td>
												{this.renderField(<TextField
													name="region"
													value={region || ""}
												/>)}
											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Производитель:
										</td>
											<td>
												{this.renderField(<TextField
													name="manufacturer"
													value={manufacturer || ""}
												/>)}
											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Годы выпуска:
										</td>
											<td>
												{this.renderField(<TextField
													name="manufacture_years"
													value={manufacture_years || ""}
												/>)}
											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Тара:
										</td>
											<td>
												<BeerContainer
													onChange={event => {

														const {
															value,
														} = event.target;

														this.updateObject({
															container: value && parseInt(value) || null,
														});

													}}
													value={container || ""}
												/>
											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Алкоголь:
										</td>
											<td>
												{this.renderField(<TextField
													name="alcohol"
													value={alcohol || ""}
												/>)}
											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Состав:
										</td>
											<td>
												{this.renderField(<TextField
													name="components"
													value={components || ""}
													fullWidth
												/>)}
											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Горечь:
											</td>
											<td>

												{this.renderField(<TextField
													name="bitter"
													value={bitter || ""}
													helperText={bitter ? <Bitter
														bitter={bitter}
													/> : "10, 20, 40 и более до 100"}
												/>)}

											</td>
										</tr> || null}

										{<tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Цвет:
										</td>
											<td>
												<BeerColor
													onChange={event => this.onChange(event)}
													value={color || ""}
												/>
											</td>
										</tr> || null}


									</tbody>
								</table>

							</Grid>

						</Grid>

					</Paper>

				</Grid>

				<Grid
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
							onChange={(data, rawContent) => {


								this.updateObject({
									editor_content: rawContent,
								});
							}}
						/>

					</Paper>

				</Grid>

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

	// render(){

	//   const content = super.render();


	//   return "Beer";

	// }

}
