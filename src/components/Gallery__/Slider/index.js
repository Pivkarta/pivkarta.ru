
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Slider from 'react-slick';

import Image from 'ui/Image';

export default class GallerySlider extends Component{

	static propTypes = {
		gallery: PropTypes.array.isRequired,
		// galleryExpanded: PropTypes.bool.isRequired,
	};

	
	static defaultProps = {
		// galleryExpanded: false,
	};

	
	static contextTypes = {

	};


	constructor(props){

		super(props);

		this.state = {
			galleryExpanded: false,
		};
	}


	componentWillMount(){
	
	}


	componentDidMount(){

	}

	
	render(){

		const {
			gallery,
			...other
		} = this.props;

		const {
			galleryExpanded,
		} = this.state;

		if(!gallery || !gallery.length){
			return null;
		}

		let galleryItems = [];

		let galleryThumbs = [];


		gallery.map((image, index) => {

			// if(index === 0){
			// 	return;
			// }

			// const {
			// 	imageFormats: image,
			// } = n;

			if(!image){
				return;
			}

			// const {
			// 	original,
			// 	thumb,
			// 	slider_thumb,
			// 	slider_dot_thumb,
			// 	big,

			// } = image;

			const slider_thumb = image;
			const slider_dot_thumb = image;
			const big = image;

			galleryThumbs.push(slider_dot_thumb);

			// if(galleryItem && galleryItem === n.image){

				

			// 	return;
			// }

			galleryItems.push(<Image 
				key={index}
				// key={original}
				src={galleryExpanded ? big : slider_thumb}
				// src={original}
				style={{
					// cursor: !galleryExpanded ? 'pointer' : undefined,
					// cursor: 'pointer',
					height: "auto",
				}}
				type="slider_thumb"
				// onClick={event => {
				// 	this.setState({
				// 		galleryExpanded: !galleryExpanded,
				// 	});
				// }}
				// onClick={event => {
				// 	this.setState({
				// 		galleryItem: big,
				// 	});
				// }}
			/>);
		});

		// console.log("galleryItems", galleryItems);

		let responsive;

		if(gallery.length  === 1){

			responsive = [ 
      	{ breakpoint: 768, settings: { slidesToShow: 1 } }, 
      	// { breakpoint: 1024, settings: { slidesToShow: galleryExpanded ? 1 : 2 } }, 
      	// { breakpoint: 1200, settings: { slidesToShow: galleryExpanded ? 1 : 3 } }, 
      	// { breakpoint: 100000, settings: { slidesToShow: galleryExpanded ? 1 : 5 } } ,
      ];

		}
		else if(gallery.length  === 2){

			responsive = [ 
      	{ breakpoint: 768, settings: { slidesToShow: 1 } }, 
      	{ breakpoint: 1024, settings: { slidesToShow: galleryExpanded ? 1 : 2 } }, 
      	{ breakpoint: 1200, settings: { slidesToShow: galleryExpanded ? 1 : 2 } }, 
      	{ breakpoint: 100000, settings: { slidesToShow: galleryExpanded ? 1 : 2 } } ,
      ];

		}
		else{

			responsive = [ 
      	{ breakpoint: 768, settings: { slidesToShow: 1 } }, 
      	{ breakpoint: 1024, settings: { slidesToShow: galleryExpanded ? 1 : 2 } }, 
      	{ breakpoint: 1200, settings: { slidesToShow: galleryExpanded ? 1 : 3 } }, 
      	{ breakpoint: 100000, settings: { slidesToShow: galleryExpanded ? 1 : 5 } } ,
      ];

		}

		return <div
			{...other}
			className={typeof window === "undefined" ? "no-js" : ""}
		>
			<Slider {
				...{
		      dots: true,
		      // lazyLoad: typeof window === "undefined" ? false : true,
		      // adaptiveHeight: true,
		      adaptiveHeight: galleryExpanded ? true : false,
		      dotsClass: "slick-dots slick-paging",
		      infinite: true,
		      // centerMode: true,
		      speed: 2000,
		      slidesToShow: 1,
		      slidesToScroll: 1,
		      // lazyLoad: true,
		      responsive: responsive,
		      customPaging: function(i) {
		        // return <a><img src={`${baseUrl}/abstract0${i+1}.jpg`}/></a>

						// console.log(galleryThumbs);

		        const thumb = galleryThumbs[i];
		        return <a>
							<Image 
								src={thumb}
								type="dot_thumb"
							/>
						</a>
					},
		    }}
	      className={[
	      	galleryExpanded ? "" : "no-expanded",
	      ].join(" ")}
      >
        {galleryItems}
      </Slider> 
		</div>
	}
}
