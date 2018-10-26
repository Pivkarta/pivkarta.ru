import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlaceView from "../Place/ObjectView";

import PlaceImage from 'src/modules/ui/Image/Place';

import { Link } from 'react-router-dom';

import Bitter from "src/modules/ui/Bitter";



export default class BeerView extends PlaceView {
   
  render() {

    const object = this.getObjectWithMutations();
    
    const {
			id,
      beer_id,
      name,
      url_name,
      image,
      manufacturer,
      bitter,
      color,      
    } = object;
    
    let url = `/beer/${beer_id}/${url_name}`;
    

    return <Link
			to={url}
			title={name}
			style={{
				height: "100%",
				display: "flex",
				// border: "1px solid",
				flexDirection: "column",
				flexBasis: "100%",
			}}
			className="barblock__card"
		>
			<PlaceImage
				src={image}
				type="place_avatar"
				alt={name}
				title={name}
				style={{
					width: "100%",
				}}
			/>
			<div
				className="barblock__nameblock"
				style={{
					flexGrow: 1,
				}}
			>
				<div className="barblock__name">
					{name}
				</div>
				<div className="barblock__address">
                {color
                  ?
                  <div>
                    <i className="fas fa-palette"></i> {color}
                  </div>
                  :
                  null
                }

                {bitter
                  ?
                  <div>
                    <i className="fab fa-hotjar"></i> <Bitter
                      bitter={bitter}
                    />
                  </div>
                  :
                  null
                }

              </div>
			</div>
			<div className="barblock__type">
              <span className="barblock__type__active">
                {manufacturer}
              </span>
			</div>
		</Link>


  }

}