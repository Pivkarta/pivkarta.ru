import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';


import Editor from 'src/modules/ui/Editor';
import Image from 'src/modules/ui/Image';

import GalleryBlock from 'Gallery2';

import Bitter from './Blocks/Bitter';

import Comments from "src/modules/ui/Comments";

import { Link } from "react-router-dom";

import PlacesBlock from "./Blocks/Places";

import Context from "@prisma-cms/context";

export default class BeerDefaultView extends Component {

	static contextType = Context;

	static propTypes = {
		object: PropTypes.object.isRequired,
		inEditMode: PropTypes.bool.isRequired,
	}

	render() {

		const {
			BeerFilteredField,
			BeerPasterField,
		} = this.context;

		const {
			object,
			inEditMode,
		} = this.props;


		if (!object) {
			return null;
		}

		const {
			id: beerId,
			name,
			beer_id,
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
			filtered,
			pasteurized
		} = object;



		let container_type;

		switch (container) {

			case 1:

				container_type = "Бутылка";

				break;

			case 2:

				container_type = "Банка";

				break;

			case 3:

				container_type = "Пластиковая бутылка";

				break;

			case 4:

				container_type = "Разливное";

				break;

		}



		return (



			<Fragment>


				<Paper
					className="placeinfo"
				>
					<div className="placeinfo__text">
						<div className="mui-panel">
							<Grid
								container
								spacing={16}
							>
								<Grid
									item
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

								</Grid>
								<Grid
									item
									xs={12}
									sm
								>
									<h3 className="placeinfo__h3">
										<i className="fas fa-beer"></i> О ПИВЕ
                        </h3>
									{/* <table className="mui-table placeinfo__table">
										<tbody>
											<tr>
												<td><span className="placeinfo__tdname">Регион</span></td>
												<td>Россия, Наро-Фоминск</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Производитель</span></td>
												<td>Wells & Young`s Ltd</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Тара</span></td>
												<td>Разливное</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Стиль пива</span></td>
												<td>Американский легкий лагер</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Цвет</span></td>
												<td>Темное</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Горечь</span></td>
												<td>Американский легкий лагер</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Алкоголь</span></td>
												<td>5,2</td>
											</tr>
											<tr>
												<td><span className="placeinfo__tdname">Состав</span></td>
												<td>Вода, ячменный солод, коричневый сахарный сироп, овёс, хмель, дрожжи, тёмный шоколад, натуральная шоколадная добавка.</td>
											</tr> 
										</tbody>
									</table> */}
									<table
										style={{
											width: "100%",
										}}
										className="beer-table card-table"
									>
										<tbody>

											{(region) && <tr>
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
													{region}
												</td>
											</tr> || null}

											{(manufacturer) && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Производитель:
										</td>
												<td>
													{manufacturer}
												</td>
											</tr> || null}

											{(manufacture_years) && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Годы выпуска:
										</td>
												<td>
													{manufacture_years}
												</td>
											</tr> || null}

											{(container_type) && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Тара:
										</td>
												<td>
													{container_type}
												</td>
											</tr> || null}

											{(alcohol) && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Алкоголь:
										</td>
												<td>
													{alcohol}
												</td>
											</tr> || null}

											{components && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Состав:
										</td>
												<td>
													<div
														dangerouslySetInnerHTML={{ __html: components }}
													/>
												</td>
											</tr> || null}

											{bitter && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Горечь:
											</td>
												<td>
													<Bitter
														bitter={bitter}
													/>
												</td>
											</tr> || null}

											{color && <tr>
												<td
													style={{
														paddingRight: 5,
														verticalAlign: "top",
													}}
												>
													Цвет:
										</td>
												<td>
													{color && /^#/.test(color) ? <div
														style={{
															width: 24,
															height: 24,
															backgroundColor: color,
														}}
													></div>
														: color
													}
												</td>
											</tr> || null}

											{filtered !== null ?
												<tr>
													<td
														style={{
															paddingRight: 5,
															verticalAlign: "top",
														}}
													>
														Фильтрованное:
												</td>
													<td>
														{filtered === true ? "Да" : filtered === false ? "Нет" : "Не указано"}
													</td>
												</tr>
												: null}

											{pasteurized !== null ?
												<tr>
													<td
														style={{
															paddingRight: 5,
															verticalAlign: "top",
														}}
													>
														Пастеризованное:
												</td>
													<td>
														{pasteurized === true ? "Да" : filtered === false ? "Нет" : "Не указано"}
													</td>
												</tr>
												: null}	


										</tbody>
									</table>
								</Grid>
								{/* <Grid
									xs={12}
									md={3}
									lg={2}
								>
									<h3 className="placeinfo__h3">
										<i className="fas fa-award"></i> РЕЙТИНГ
                        </h3>
									Сюда просится блок рейтинга пива
                    </Grid> */}
							</Grid>
						</div>
					</div>
				</Paper>


				{/* <div className=" beer_desc">
					<div className="mui-row">
						<div className="mui-col-md-9 mui-col-xs-12">
							<div className="mui-panel">
								<p>
									Откинув фешенебельный флер, присущий другим московским пабам, «Белфаст» стал отображением деревенских пивных, которые можно встретить везде у дорог между Корком и Лимериком, Дублином и Ферманой,  Слайго и Эннискилленом, где в буквальном смысле выросло не одно поколение посетителей. Об этом свидетельствуют фотографии и личные вещи завсегдатаев, развешанные на побеленных шершавых стенах и   расставленные на потемневшие от времени полки в баре, знамена и символика любимых здесь спортивных команд, совместное распевание давно полюбившихся песен.
                       </p>
								<p>
									Для посетителей, недавно присоединившихся к шумной, но дружной компании завсегдатаев паба, в баре есть не только легендарные сорта темного ирландского стаута, но и светлое немецкое пиво и шотландский эль.
									Немудреная, но поразительно вкусная ирландская кухня не оставит равнодушными тех, кто не сможет устоять перед ароматными запахами, доносящимися с кухни..
									Добро пожаловать!
                       </p>
							</div>
						</div>
						<div className="mui-col-md-3 mui-col-xs-12">
							<a href="#" className="mui-btn mui-btn--primary">
								<i className="fas fa-beer"></i>&nbsp;НАЙТИ ПИВО НА КАРТЕ ГОРОДА
               </a>

						</div>
					</div>

				</div> */}


				{editor_content ? <Grid
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

				</Grid> : null}






				<GalleryBlock
					item={object}
					inEditMode={inEditMode}
					renderer={content => <div className="">
						<h3 className="h3main">
							<i className="fas fa-camera"></i>&nbsp;ФОТОГРАФИИ
          </h3>
						{content}
					</div>}
				/>

				{beerId
					?
					<Grid
						item
						xs={12}
						style={{
							// marginTop: 30,
						}}
					>

						<PlacesBlock
							item={object}
						/>
					</Grid>
					:
					null
				}

				<div className="">
					<h3 className="h3main">
						<i className="far fa-comments"></i>&nbsp;КОММЕНТАРИИ
            </h3>

					{beerId
						?
						<Grid
							item
							xs={12}
							style={{
								// marginTop: 30,
							}}
						>

							<Comments
								where={{
									object_id: beer_id,
									type_id: 4,
								}}
								object_id={beer_id}
								type_id={4}
								object={object}
							/>

						</Grid>
						:
						null
					}

				</div>
			</Fragment>
		);



		return (
			<Grid
				container
				spacing={8}
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
							spacing={8}
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

								<table
									style={{
										width: "100%",
									}}
									className="beer-table"
								>
									<tbody>

										{(region) && <tr>
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
												{region}
											</td>
										</tr> || null}

										{(manufacturer) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Производитель:
										</td>
											<td>
												{manufacturer}
											</td>
										</tr> || null}

										{(manufacture_years) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Годы выпуска:
										</td>
											<td>
												{manufacture_years}
											</td>
										</tr> || null}

										{(container_type) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Тара:
										</td>
											<td>
												{container_type}
											</td>
										</tr> || null}

										{(alcohol) && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Алкоголь:
										</td>
											<td>
												{alcohol}
											</td>
										</tr> || null}

										{components && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Состав:
										</td>
											<td>
												<div
													dangerouslySetInnerHTML={{ __html: components }}
												/>
											</td>
										</tr> || null}

										{bitter && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Горечь:
											</td>
											<td>
												<Bitter
													bitter={bitter}
												/>
											</td>
										</tr> || null}

										{color && <tr>
											<td
												style={{
													paddingRight: 5,
													verticalAlign: "top",
												}}
											>
												Цвет:
										</td>
											<td>
												{/^#/.test(color) ? <div
													style={{
														width: 24,
														height: 24,
														backgroundColor: color,
													}}
												></div>
													: color
												}
											</td>
										</tr> || null}


									</tbody>
								</table>

							</Grid>

							{/* {beer_id && name ? <Grid
								item
							>
								<Link
									to={`/map/?beer_id=${beer_id}&beer=${name}`}
								>
									Показать на карте
								</Link>
							</Grid> : null} */}

						</Grid>

					</Paper>

				</Grid>

				{editor_content ? <Grid
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

				</Grid> : null}

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
					/>

				</Grid>

				{beerId
					?
					<Grid
						item
						xs={12}
						style={{
							// marginTop: 30,
						}}
					>

						<PlacesBlock
							item={object}
						/>
					</Grid>
					:
					null
				}

				{beerId
					?
					<Grid
						item
						xs={12}
						style={{
							// marginTop: 30,
						}}
					>

						<Comments
							where={{
								object_id: beer_id,
								type_id: 4,
							}}
							object_id={beer_id}
							type_id={4}
							object={object}
						/>

					</Grid>
					:
					null
				}

			</Grid>
		)
	}
}
