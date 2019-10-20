import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


import Editor from 'src/modules/ui/Editor';
import Image from 'src/modules/ui/Image';

import GalleryBlock from 'Gallery2';

// import Bitter from './Blocks/Bitter';


import BeersBlock from './Blocks/Beers';
import Map from './Blocks/Map';
import Schedules from './Blocks/Schedules';

import CustomComponent from 'Component';

// import {
// 	updatePlaceProcessor,
// } from "src/modules/query";

import { Link } from "react-router-dom";

import Comments from "src/modules/ui/Comments";

import WebSite from "src/modules/ui/fields/WebSite";
import Phone from "src/modules/ui/fields/Phone";
import withStyles from 'material-ui/styles/withStyles';


const styles = {

}

export class PlaceDefaultView extends CustomComponent {

	static propTypes = {
		...CustomComponent.propTypes,
		object: PropTypes.object.isRequired,
		inEditMode: PropTypes.bool.isRequired,
	}

	static contextTypes = {
		...CustomComponent.contextTypes,
		uri: PropTypes.object.isRequired,
	}


	render() {

		const {
			object,
			inEditMode,
		} = this.props;


		if (!object) {
			return null;
		}

		const {
			user: currentUser,
			uri: locationUri,
		} = this.context;


		const {
			id,
			place_id,
			name,
			image,
			address,
			website,
			phone,
			metro,
			content,
			is_bar,
			is_shop,
			is_brewery,
			email,
			active,
			schedules,
			lat,
			lng,
			beers,
			uri,
			Owner,
			Letters,
			gallery,
		} = object;


		const {
			id: currentUserId,
			sudo,
		} = currentUser || {};


		let types = [];

		is_bar && types.push("Бар");
		is_shop && types.push("Магазин");
		is_brewery && types.push("Пивоварня");


		let beersBlock;
		let blocksButtons = [];

		if (beers && beers.length) {

			blocksButtons.push(<div
				key="beersBlock"
			>
				<a
					href={locationUri.clone().hash("beersBlock").toString()}
					className="mui-btn mui-btn--primary"
				>
					<i className="fas fa-beer"></i>&nbsp;АССОРТИМЕНТ ПИВА
			</a>
			</div>)

			beersBlock = <Grid
				item
				xs={12}
			>
				<a name="beersBlock" />
				<h3 className="h3main">
					<i className="fas fa-beer"></i>&nbsp;АССОРТИМЕНТ ПИВА
				</h3>

				<BeersBlock
					place={object}
					inEditMode={inEditMode}
				/>
			</Grid>

		}

		if (gallery && gallery.length) {
			blocksButtons.push(<div
				key="gallery"
			>
				<a
					href={locationUri.clone().hash("gallery").toString()}
					className="mui-btn mui-btn--primary"
				>
					<i className="fas fa-camera"></i>&nbsp;ФОТОГРАФИИ
			</a>
			</div>)
		}

		blocksButtons.push(<div
			key="comments"
		>
			<a
				href={locationUri.clone().hash("comments").toString()}
				className="mui-btn mui-btn--primary"
			>
				<i className="fas fa-comments"></i>&nbsp;КОММЕНТАРИИ
			</a>
		</div>)


		return super.render(
			<Grid
				container
				spacing={16}
			>

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
							spacing={16}
						>

							{image
								?
								<Grid
									item
								>
									<Image
										src={image}
										alt={name}
										title={name}
									/>
								</Grid> : null
							}

							<Grid
								item
								xs
							>
								<h3 className="placeinfo__h3">
									<i className="fas fa-info"></i> {types.join(", ")}
								</h3>

								<table
									// style={{
									// 	width: "100%",
									// }}
									className="card-table"
								>
									<tbody>


										{(address) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>

												<i
													className="fas fa-map-marked-alt"
													title="Адрес"
												></i>
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
														{address}

													</Grid>

													{/* {!active ? <Grid
														item
													>
														<Typography
															style={{
																color: "red",
															}}
														>
															Не работает
														</Typography>
													</Grid> : null} */}

												</Grid>

											</td>
										</tr> || null}


										{(email && sudo === true) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												<i
													className="fas fa-envelope"
													title="Емейл"
												></i>
											</td>
											<td>
												{email}
											</td>
										</tr> || null}


										{(phone) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												<i
													className="fas fa-phone"
													title="Телефон"
												></i>
											</td>
											<td>
												<Phone
													object={object}
												/>
											</td>
										</tr> || null}


										{(metro) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												<i
													className="fas fa-subway"
													title="Метро"
												></i>
											</td>
											<td>
												{metro}
											</td>
										</tr> || null}


										{(website) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												<i
													className="fas fa-link"
													title="Веб-сайт"
												></i>
											</td>
											<td>
												<WebSite
													object={object}
												/>
											</td>
										</tr> || null}



										{(sudo === true) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Компред:
											</td>
											<td>
												{Letters && Letters.length ? "Отправлено" : email ? <Link
													to={`/letters/create/?placeId=${id}&email=${email}&placeUri=${uri}`}
												>
													Отправить
												</Link> : "Не заполнен емейл"}
											</td>
										</tr> || null}


									</tbody>
								</table>

							</Grid>

							{schedules ? <Grid
								item
							>
								<h3 className="placeinfo__h3">
									<i className="far fa-clock"></i> ВРЕМЯ РАБОТЫ
								</h3>

								<Schedules
									value={schedules || []}
								/>
							</Grid> : null}

						</Grid>

					</Paper>



					<Grid
						item
						xs={12}
						style={{
							marginTop: 30,
						}}
					>

						<Grid
							container
							spacing={16}
						>

							{content ? <Grid
								item
								xs
							>
								<Paper
									style={{
										padding: 15,
									}}
								>
									<Editor
										value={content}
										readOnly={true}
									/>
								</Paper>
							</Grid>
								:
								null
							}

							{blocksButtons.length ?
								<Grid
									item
								>
									{blocksButtons.reduce((curr, next, index) => [curr, <hr
										key={index}
									/>, next])}
								</Grid>
								:
								null
							}
						</Grid>

					</Grid>





					{lat && lng
						?
						<Grid
							item
							xs={12}
						>
							<Map
								item={object}
								inEditMode={inEditMode}
							/>
						</Grid>
						:
						null
					}

					{gallery && gallery.length
						?
						<Grid
							item
							xs={12}
							style={{
								marginTop: 30,
							}}
						>

							<a name="gallery" />

							<h3 className="h3main">
								<i className="fas fa-camera"></i>&nbsp;ФОТОГРАФИИ
            </h3>

							<GalleryBlock
								item={object}
								inEditMode={inEditMode}
								updateObject={data => this.updateObject(data)}
							/>

						</Grid>
						:
						null
					}

					{beersBlock}



				</Grid>

				{place_id
					?
					<Grid
						item
						xs={12}
						style={{
							// marginTop: 30,
						}}
					>
						<a name="comments" />
						<h3 className="h3main">
							<i className="far fa-comments"></i>&nbsp;КОММЕНТАРИИ
            </h3>

						<Comments
							where={{
								object_id: place_id,
								type_id: 3,
							}}
							object_id={place_id}
							type_id={3}
							object={object}
						/>

					</Grid>
					:
					null
				}

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

			</Grid>
		)
	}
}

export default withStyles(styles)(PlaceDefaultView);
