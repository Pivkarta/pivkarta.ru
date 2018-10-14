
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {List} from 'immutable';

import moment from 'moment';

// import {objectToDate} from '';

export default class ScheduleField extends Component{

	static propTypes = {
		// item: PropTypes.object.isRequired,
		// field: PropTypes.string.isRequired,
		showOffDates: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		// field: "schedule",
 		showOffDates: true,				// Показывать выходные дни
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		this.state = {

		};
	}

	render(){

		const {
			// item,
			// field,
			showOffDates,
			value,
			...other
		} = this.props;

		// if(!item){
		// 	return null;
		// }

		// // let {
		// // 	schedule,
		// // } = item;

		// let schedule = item[field];

		// if(!schedule){
		// 	return null;
		// }

		let offDates = [];


		// schedule = List(schedule || []).map((n, index) => {

		// 	// Добавляем порядковый индекс дня
		// 	n && (n.day = index);

		// 	return n;

		// }).filter(n => n);

		// let schedule = [];

		let schedule = List(value || []).filter(n => n);

		showOffDates && [0,1,2,3,4,5,6].map(day => {

			if(schedule.findIndex(n => n && n.start && n.start.weekDay === day) === -1){
				offDates.push(day);
			}

		});



		// schedule = List([
		// 	{
		// 		id: 1,
		// 	},
		// 	{
		// 		id: 2,
		// 	},
		// 	{
		// 		id: 1,
		// 	},
		// 	{
		// 		id: 2,
		// 	},
		// 	{
		// 		id: 1,
		// 	},
		// ]);



		const scheduleGrouped = schedule.groupBy(n => {

			const {
				start,
				end,
			} = n;

			const {
				hour,
				minute,
			} = start;

			const {
				hour: endHour,
				minute: endMinute,
			} = end;



			// return JSON.stringify({start, end});

			return JSON.stringify({hour, minute, endHour, endMinute});

		});

		// schedule = schedule.groupBy(n => n.id);




		let days = [
			'Пн',
			'Вт',
			'Ср',
			'Чт',
			'Пт',
			'Сб',
			'Вс',
		];

		let daysList = [];

		scheduleGrouped.map((n, index) => {
		


			// let array = [];

			let daysArray = [];

			const first = n.get(0);

			const {
				start,
				end,
			} = first;

			if(!start || !end){
				return;
			}

			// n.map(i => {

			// 	const {
			// 		day,
			// 	} = i || {};

			// 	// array.push(<p
			// 	// 	key={array.length}
			// 	// >
			// 	// 	{JSON.stringify(i)}
			// 	// </p>);

			// 	daysArray.push(days[day]);

			// });

			const days2 = n && n.map(i => i && i.start && i.start.weekDay);



			// Проходим по каждому дню, и если дни соседние, то объединяем их через тире
			let daysArray2 = days2 && days2.reduce((prev, next) => {

				/*
					Если предыдущий вариант не массив,
					возвращаем массив
				*/



				let result;

				if(Array.isArray(prev)){
					result = prev;
					// result.push(next);
				}
				else{
					result = [prev];
					// result.push(next);
				}

				let prevValue = result[result.length - 1];


				if(Array.isArray(prevValue)){

					// prev.push(next);

					if(next - 1 === prevValue[prevValue.length - 1]){

						prevValue.push(next);
						result[result.length - 1] = prevValue;

					}
					else {

						result.push([next]);

					}

					// prevValue.push(next);

				}
				else{

					// if(next - 1 === prevValue){
					// 	result[result.length - 1] = [prev, next];
					// }
					// else{

					// 	result.push(next);

					// }

					if(next - 1 === prevValue){
						result[result.length - 1] = [prevValue, next];
					}
					else{

						result.push(next);

					}

					// prevValue = [prevValue];

					// prevValue.push(next);

					// result[result.length - 1] = prevValue;

					// if(next - 1 === prevValue){
					// 	result[result.length - 1] = [prev, next];
					// }
					// else{

					// 	result.push(next);

					// }

					// result.push(next);

					// prevValue = [prevValue];

					// result[result.length - 1] = prevValue;

				}





				// die();

				return result;

			});





			// daysArray2 = [[0], [1], [3,6]];

			if(daysArray2 !== undefined){

				if(Array.isArray(daysArray2)){

					daysArray2 = daysArray2.map(i => {

						// const {
						// 	day,
						// } = i || {};

						// if(Array.isArray(i)){

						// }
						// else{

						// 	daysArray.push(days[i]);

						// }



						if(Array.isArray(i)){

							const first = days[i[0]];
							const last = days[i[i.length - 1]];

							if(i.length > 2){
							

								return `${first}-${last}`;

							}
							else if(i.length === 2){
								
								// const first = days[i[0]];
								// const last = days[i[i.length - 1]];

								return [first,last].join(", ");

							}
							else{
								return first;
							}

						}
						else{
							
							return days[i];

						}

					});

					daysArray2.map(n => {
						daysArray.push(n);
					});



				}
				else{
					
					daysArray.push(days[daysArray2]);

				}

			}



			const {
				hour: startHour,
				minute: startMinute,
			} = start;

			const {
				hour: endHour,
				minute: endMinute,
			} = end;

			const from = moment(`${startHour}:${startMinute}`, "HH:mm").format("HH:mm");
			let till = moment(`${endHour}:${endMinute}`, "HH:mm").format("HH:mm");

			till = till === "23:59" ? "00:00" : till;

			let title;

			title = daysArray.join(", ");

			if(title === "Пн-Вс"){
				title = "Ежедневно";
			}
			else if(title === "Пн-Пт"){
				title = "Будни";
			}
			else if(title === "Сб, Вс" && !offDates.length && showOffDates){
				title = "Выходные";
			}
			else{

			}

			title = title && <span>{title}:</span> || null;

			daysList.push(<div
				key={daysList.length}
				style={{
					// margin: "5px 0",
					whiteSpace: "nowrap",
				}}
			>
				{title} {from === "00:00" && till === "00:00" ? <b>Круглосуточно</b> : <span>с <b>{from}</b> до <b>{till}</b></span>}

			</div>);

		});


		let schedulesList = [];


		let offDatesStr;

		if(offDates && offDates.length){

			offDatesStr = <div>
				<span
					style={{
						color: "red",
					}}
				>{offDates.length === 1 ? "Выходной" : "Выходные"}</span>: {offDates.map(day => (days[day])).join(", ")}
			</div>

		}

		return <div
			{...other}
		>

			{daysList}

			{offDatesStr}

		</div>
	}
}
