import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';

import SideBarBlock from 'src/modules/map-sidebar-react/src/components/Block';

// import SideBarCompany from './Company';

import Paper from 'material-ui/Paper';

import {
  company,
  updateCompany,
} from '../../../../../components/App/constants/queries';

import CompanyView from '../../../../../components/pages/Companies/Company/View';

import { compose, graphql } from 'react-apollo';


export class SideBarCompany extends Component {

  static propTypes = {
    // items: PropTypes.array.isRequired,
    // data: PropTypes.object.isRequired,
  }

  render() {

    const {
      // items,
      className,
      data,
      // data: {
      //   mapData,
      // },
      ...other
    } = this.props;

    // const {
    //   loading,
    // } = mapData || {};

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

          {data ? <CompanyView
            data={data}
            {...other}
          /> : null}

        </Paper>

      </SideBarBlock>
    )
  }
}

export default compose(
  graphql(company, {
    options: props => {


      const {
        id,
      } = props;

      return {
        variables: {
          id,
        },
      };
    },
  }),
  graphql(updateCompany),
)(SideBarCompany);
