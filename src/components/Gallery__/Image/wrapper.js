import React, {Component} from 'react';

import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import GalleryImage from './index';
import Grid from 'material-ui/Grid';

const defaultProps = {}

const imageTarget = {

	/*
		При каждом движении элемента-источника все таргет-элементы опрашиваются поочередно.
		Это не требует наведения элемента-источника конкретно на этот элемент-цель. Опрашиваются в принципе все элементы.
	*/
  canDrop(props) {



  	let {image} = props;

  	// return image.src == '/assets/images/upload/c8e19d4d9777d26cb6aa1df2fae1dab8.jpg';

    // return canMoveKnight(props.x, props.y);

    return true;
  },

  hover(props, monitor, component){


  	let {image, onDdHover} = props;

  	onDdHover(image);
  },

  drop(props) {


    // moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  


  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class ImageWrapper extends Component{

	constructor(props){

		super(props);

		this.state = {}
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

  componentDidUpdate(){

    if(this.props.debug){

    }
  }

	render(){
    const {connectDropTarget, isOver, canDrop } = this.props;

		let {...other} = this.props;

		return <Grid
			item
			xs={12}
			sm={6}
			md={3}
			lg={2}
			xl={1}
		>
			{connectDropTarget(<div>
				<GalleryImage 
					{...other}
				>
				</GalleryImage>
			</div>)}
		</Grid>;
	}
}

ImageWrapper.defaultProps = defaultProps;

ImageWrapper.propTypes = {
	onDdHover: PropTypes.func.isRequired,
};

export default DropTarget('GalleryImage', imageTarget, collect)(ImageWrapper);