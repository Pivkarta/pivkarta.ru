import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import { Link } from 'react-router-dom';
import moment from 'moment';

import Editor from './Editor';

import UserLink from 'src/modules/ui/User/Link';

import Comments from "./Comments";

export default class TopicDefaultView extends Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
    updateObject: PropTypes.func,
    renderWrapper: PropTypes.func.isRequired,
    showComments: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    showComments: false,
  }

  static contextTypes = {
    user: PropTypes.object,
  };


  render() {

    const {
      object,
      cutText,
      // updateObject,
      renderWrapper,
      showComments,
    } = this.props;

    const {
      id,
      topic_id,
      name,
      created_by,
      created_at,
      description,
    } = object;


    const {
      user: currentUser,
    } = this.context;


    const {
      sudo,
    } = currentUser || {};


    let footerItems = [];



    if (created_by) {
      footerItems.push(

        <Grid
          key="created_by"
          item
        >
          <UserLink
            user={created_by}
          />
        </Grid>

      );
    }


    if (created_at) {
      footerItems.push(

        <Grid
          key="created_at"
          item
        >
          {moment(created_at).format("LL HH:mm:ss")}
        </Grid>

      );
    }

    return (

      <div>

        {renderWrapper(<Grid
          container
          spacing={8}
        >

          <Grid
            item
            xs={12}
            style={{
              marginTop: 20,
            }}
          >
            <Editor
              object={object}
              cutText={cutText}
            />
          </Grid>

          {sudo === true && description ?
            <Grid
              item
              xs={12}
            >
              <div
              >
                <hr />
                <b>Description:</b> {description}
              </div>
            </Grid>
            : null
          }


          {footerItems.length ? <Grid
            item
            xs={12}
          >
            <Grid
              container
              alignItems="center"
              spacing={0}
            >

              {footerItems.reduce((current, next, index) => [current, <span
                key={`index_${index}`}
                style={{
                  padding: "0 5px",
                }}
              >|</span>, next])}

            </Grid>
          </Grid> : null}


          {topic_id && showComments
            ?
            <Grid
              item
              xs={12}
            > <Comments
                where={{
                  object_id: topic_id,
                  type_id: 1,
                }}
                type_id={1}
                object_id={topic_id}
                object={object}
              />
            </Grid>
            : null
          }

        </Grid>)}


      </div>


    )
  }
}
