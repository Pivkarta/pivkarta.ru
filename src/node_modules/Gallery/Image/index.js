import React, { Component } from 'react';

import PropTypes from 'prop-types';

// import { DragSource } from 'react-dnd';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui-icons/Clear';

import Image from '../../fields/image';

const defaultProps = {}


const knightSource = {
	beginDrag(props) {



		let { onStartDrag, image } = props;

		onStartDrag(image);

		// this.setState({
		// 	dragging: true,
		// });
		return {};
	},

	endDrag(props) {



		let { onEndDrag, image } = props;

		onEndDrag(image);

		// this.setState({
		// 	dragging: true,
		// });
		return {};
	},
};

// function collect(connect, monitor) {



//   return {
//     connectDragSource: connect.dragSource(),
//     connectDragPreview: connect.dragPreview(),
//     isDragging: monitor.isDragging()
//   }
// }

export default class GalleryImage extends Component {

	constructor(props) {

		super(props);

		this.state = {}
	}

	componentWillMount() {

	}

	componentDidMount() {

	}

	componentDidUpdate() {

		if (this.props.debug) {

		}
	}

	render() {

		let {
			image,
			checked,
			onSelectImage,
			handleDelete,
			isDragging,
			isDragging2,
			...other
		} = this.props;

		let { dragging } = this.state;

		let style = {};

		// if(isDragging){
		if (isDragging2) {
			Object.assign(style, {
				// display: 'none',
				border: '2px dashed #ddd',
			});
		}

		return (<div
			style={style}
			{...other}
		>
			<div>
				{/*<Checkbox 
					checked={checked}
					onChange={(event, checked) => {
						onSelectImage(event, checked, image);
					}}
				/>*/}

				{handleDelete && <IconButton
					onClick={handleDelete}
				>
					<DeleteIcon
					/>
				</IconButton> || null}

			</div>

			{/* {connectDragSource(<div
				style={{
					// opacity: isDragging ? 0.5 : 1,
					opacity: isDragging2 ? 0.5 : 1,
					// cursor: dragging ? 'move' : 'default',
					cursor: 'move',
				}}
			>
				<Image
					path={image.src}
				/>
			</div>)} */}

			{(<div
				style={{
					// opacity: isDragging ? 0.5 : 1,
					opacity: isDragging2 ? 0.5 : 1,
					// cursor: dragging ? 'move' : 'default',
					cursor: 'move',
				}}
			>
				<Image
					path={image.src}
				/>
			</div>)}

		</div>);
	}
}

GalleryImage.defaultProps = defaultProps;

GalleryImage.propTypes = {
	image: PropTypes.object.isRequired,
	onSelectImage: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	// connectDragSource: PropTypes.func.isRequired,
	// onStartDrag: PropTypes.func.isRequired,
	// onEndDrag: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	// isDragging: PropTypes.bool.isRequired
}

// export default DragSource('GalleryImage', knightSource, collect)(GalleryImage);
// export default DragSource('GalleryImage', knightSource, collect)(GalleryImage);