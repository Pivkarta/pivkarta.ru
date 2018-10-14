import React from 'react'
// import PropTypes from 'prop-types'
// import { withStyles } from 'material-ui/styles';

// import {
//   styles,
//   TableView,
// } from 'apollo-cms/lib/DataView/List/Table';

import TableView from '../../../GridView/Table';

import {Link} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import TopicView from 'src/modules/ui/Topic/ListView/';

import Pagination from '../../../Pagination';


let {...propTypes} = TableView.propTypes;

let {...defaultProps} = TableView.defaultProps;


Object.assign(defaultProps, {
  // listName: "companiesConnection",
  title: "Заведения",
  limit: 5,
});


export default class TopicsPageView extends TableView {

  
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  
  render(){

    const {
      data: {
        objectsConnection,
        loading,
      },
      mutate,
    } = this.props;

    const {
      edges: topics,
    } = objectsConnection || {};

    if(!topics || !topics.length){

      if(loading){
        return null;
      }

      return <Typography>
        Нет ни одной публикации
      </Typography>
    }

    const items = topics.map(({node}) => {

      const {
        id,
      } = node;

      return <TopicView
        key={id}
        data={{
          object: node,
        }}
        mutate={mutate}
      />

    })

    return super.render(<div>
      {items}
    </div>);
  }

}


// export default withStyles(styles)(TopicsPageView);