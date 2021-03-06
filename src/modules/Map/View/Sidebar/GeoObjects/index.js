import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';

import SideBarBlock from 'src/modules/map-sidebar-react/src/components/Block';

import SideBarCompany from './Company';

import Paper from 'material-ui/Paper';

import {
  mapGeoObjectsConnection,
} from '../../../../../components/App/constants/queries';

import { compose, graphql } from 'react-apollo';


export class SideBarGeoObjects extends Component {

  static propTypes = {
    // items: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
  }

  render() {

    const {
      // items,
      className,
      data: {
        loading,
        mapData,
      },
    } = this.props;

    const {
      objects: items = [],
    } = mapData || {};

    // let items = [];

    return (
      <SideBarBlock
        style={{
          maxHeight: "100%",
          height: "100%",
          overflow: "hidden",
          // width: "60vw",
          // maxWidth: "800px",
        }}
        className={className}
      >

        <Paper 
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
            padding: 15,
          }}
        >

          <Grid
            container
          >

            {items.filter(n => n._type === "Company").map(n => {

              const {
                id,
                _type,
              } = n;

              return <SideBarCompany
                key={id}
                id={id}
              />

            })}

          </Grid>

        </Paper>

      </SideBarBlock>
    )
  }
}

export default graphql(mapGeoObjectsConnection, {
  options: props => {


    const {
      first = 10,
      where,
    } = props;

    return {
      variables: {
        first,
        where,
      },
    };
  },
})(SideBarGeoObjects);
