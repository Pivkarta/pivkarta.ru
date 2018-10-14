
import './styles/styles.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import BigCalendar from 'react-big-calendar';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

import moment from 'moment';
// import locale from 'moment/src/locale/ru';



let {
	default: messages,
} = require('react-big-calendar/lib/utils/messages');

messages = messages({
	allDay: "Весь день",
});

// if(typeof window !== "undefined"){
// 	window.moment = moment;
// }




// require('globalize/lib/cultures/globalize.culture.ru');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
// allViews = allViews.filter(n => n === "week");




export const objectToDate = function(object, toArray){

	let {
		// day,
		start,
		end,
	} = object;

	object = Object.assign({}, object, {
		start: toDate(start, toArray),
		end: toDate(end, toArray),
	});

	return object;

};


export const toDate = function(array, toArray){

	if(!array){
		return null;
	}

	let {
		year,
		month,
		day,
		hour,
		minute,
		second,
		weekDay,
	} = array;

	let date = moment().startOf('week');

	date.add("day", weekDay);
	date.set("hour", hour);
	date.set("minute", minute);
	date.set("second", second);

	if(toArray){
		date = date.toDate();
	}

	return date;

}


export class ReactSchedule extends Component{

	static propTypes = {
		days: PropTypes.array,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		days: [],
	};

	static contextTypes = {

	};

	constructor(props){

		super(props);

		const {
			// days,
		} = props;

		this.state = {
			// days,
			currentDate: moment(),
		};
	}


	onSelect = (event) => {

		if(window.confirm("Удалить этот элемент?")){;

			let {
				days: value,
			} = this.props;
			
			let days = value ? value.map(n => n) : [];

			const {
				start,
			} = event;

			if(!start){
				return false;
			}

			const day = moment(start).weekday();

			const index = days.findIndex(n => n && n.start && n.start.weekDay === day);

			if(index !== -1){

				days[index] = null;

			}




			// this.setState({
			// 	days,
			// });

			this.onChange(days);

		}

	}

	onSelectSlot = (slotInfo) => {

		// 	slotInfo,

	 //    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
	 //    `\nend: ${slotInfo.end.toLocaleString()}` +
	 //    `\naction: ${slotInfo.action}`
	 //  );

		let {
			start,
			end,
			action,
		} = slotInfo;

		// let {
		// 	days,
		// } = this.state;

		let {
			days: value,
		} = this.props;

		let days = value ? value.map(n => n) : [];

		start = moment(start);
		end = moment(end);

		let dayIndex = start.weekday();

		let prevDate = days && days[dayIndex];

		let prevDateObject = prevDate && objectToDate(prevDate);

		let yesderday;




		// let startHour = start.get('hour');
		// let startMinute = start.get('minute');

		// let endHour = end.get('hour');
		// let endMinute = end.get('minute');



		// Получаем предыдущую информацию за этот день, если она была,
		// то добавляем время к предыдущему таймеру

		switch(action){

			case 'click':

				if(
					!prevDate
					|| (prevDateObject && prevDateObject.start && prevDateObject.start > start)
				){

					yesderday = days && days[dayIndex - 1];

					if(yesderday){

						prevDate = yesderday;

					}
				}

				if(prevDate){



					prevDate = objectToDate(prevDate);



					let {
						start: prevStart,
						end: prevEnd,
					} = prevDate;

					// Если предыдущий день 
					if(
						start > prevEnd
						// Если длительность не более суток
						&& (end - prevStart) < (24*60*60*1000)
						// Если не отметка за сутки
						&& !(start.get("hour") === end.get("hour") && start.get("minute") === end.get("minute"))
					){
						start = prevStart;

						if(yesderday){

							dayIndex--;

						}

					}

					// const {
					// 	start: prevStart,
					// 	end: prevEnd,
					// } = prevDate;

					// const {
					// 	hour: prevStartHour,
					// 	minute: prevStartMinute,
					// } = prevStart || {};

					// const {
					// 	hour: prevEndHour,
					// 	minute: prevEndMinute,
					// } = prevEnd || {};

					
					// if(prevStartHour !== undefined){

					// 	if(prevStartHour * 60 + prevStartMinute < startHour * 60 + prevEndMinute){
					// 		startHour = prevStartHour;
					// 		startMinute = prevStartMinute;
					// 	}

					// }

				}

				break;

		}



		// let startArray = start && start.toArray();

		let newStart;

		if(start){

			let {
				0: year, 
				1: month, 
				2: day,
				3: hour,
				4: minute,
				5: second,
			} = {...start.toArray()}

			newStart = {
				year,
				month,
				day,
				hour,
				minute,
				second,
				weekDay: start.weekday(),
			};

		}


		let newEnd;


		if(end){

			let {
				0: year, 
				1: month, 
				2: day,
				3: hour,
				4: minute,
				5: second,
			} = {...end.toArray()};

			newEnd = {
				year,
				month,
				day,
				hour,
				minute,
				second,
				weekDay: end.weekday(),
			};

		}


		let newEvent = {
			start: newStart,
			end: newEnd,
		};

		// Устанавливаем данные дня
		days[dayIndex] = newEvent;



		this.onChange(days);

	}


	onChange(days){
		
		const {
			onChange,
		} = this.props;

		onChange && onChange(days);

		// this.setState({
		// 	days,
		// });
	}

  
  moveEvent = (event) => {


    this.onSelectSlot(event);
  }


	render(){

		const {
			days,
			...other
		} = this.props;


		const {
			// events,
			currentDate,
		} = this.state;

		let events = [];




		// Формируем дни недели

		const startDay = currentDate.clone().startOf('week');

		days.map((n, index) => {
			// events.push(day);

			if(!n){
				return;
			}

			// const {
			// 	start,
			// 	end,
			// } = n;

			// if(!start || !end){
			// 	return;
			// }

			// const {
			// 	hour: startHour,
			// 	minute: startMinute,
			// } = start;

			// const {
			// 	hour: endHour,
			// 	minute: endMinute,
			// } = end;



			// let newData = startDay.clone().add('day', index);
			// let newStart = newData.clone().add('hour', startHour).add('minute', startMinute);
			// let newEnd = newData.clone().add('hour', endHour).add('minute', endMinute);

			// // newStart = newStart.toArray();
			// // newStart[6] = 0;

			// // newEnd = newEnd.toArray();
			// // newEnd[6] = 0;

			// // let event = {
			// // 	start: new Date(newStart),
			// // 	end: new Date(newEnd),
			// // };

			// let event = {
			// 	start: newStart.toDate(),
			// 	end: newEnd.toDate(),
			// 	allDay: false,
			// };



			let event = objectToDate(n, true);

			events.push(event);



		});



		// events.push({
		// 	title: "SDfsdf",
	 //    'start': moment(new Date(2017, 10, 12, 7,0,0)).toDate(),
	 //    'end': moment(new Date(2017, 10, 12, 17,0,0)).toDate(),
	 //  });


		return <DragAndDropCalendar
      selectable
      toolbar={false}
      events={events}
      views={allViews}
      defaultView="week"
      // view="month"
      step={30}
      defaultDate={currentDate}
      culture={'ru'}
      onSelectEvent={this.onSelect}
      onSelectSlot={this.onSelectSlot}
      onEventDrop={this.moveEvent}
      // allDayAccessor="Весь день"
      messages={messages}
      showMultiDayTimes={true}
      // onDrillDown={() => {

      // }}
      formats={{
      	dayFormat: "dddd",
      }}
      {...other}
    />
	}
}

export default DragDropContext(HTML5Backend)(ReactSchedule);
