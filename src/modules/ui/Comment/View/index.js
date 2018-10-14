import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';


// import CommentAvatar from './Avatar';

import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

import ReplyIcon from 'material-ui-icons/Reply';
import SendIcon from 'material-ui-icons/Send';
import LinkIcon from 'material-ui-icons/Link';

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import PublicationLink from 'src/modules/ui/User/PublicationLink';

// import Editor from 'src/modules/ui/Editor';

import Editor from 'src/modules/ui/Comment/Editor';



import CommentTopic from './ObjectLink/Topic';
import CommentBeer from './ObjectLink/Beer';
import CommentPlace from './ObjectLink/Place';

import AuthorizedAction from "src/modules/authorized-action";


import {
  createCommentProcessor,
  updateCommentProcessor,
} from "src/modules/query";
import CustomComponent from 'Component';

// import URI from "urijs";

import { Link } from "react-router-dom";

export class CommentView extends EditableView {

  static propTypes = {
    ...EditableView.propTypes,
    showReplyButtons: PropTypes.bool.isRequired,
    showLink: PropTypes.bool.isRequired,
  }


  static defaultProps = {
    ...EditableView.defaultProps,
    showReplyButtons: false,
    showLink: false,
  }


  static contextTypes = {
    ...EditableView.contextTypes,
    loadApiData: PropTypes.func.isRequired,
    // router: PropTypes.object.isRequired,
  };

  // getTitle(){

  //   const draftObject = this.getObjectWithMutations();

  //   const {
  //     commentname,
  //     fullname,
  //   } = draftObject;

  //   return fullname || commentname;
  // }

  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      showEditor: false,
    }

  }

  async onSave(result) {

    // alert("onSave");

    // const {
    //   onSave,
    // } = this.props;

    // const {
    //   id,
    // } = this.getObjectWithMutations();

    result = await super.onSave(result);


    const {
      id,
    } = result && result.data && result.data.response && result.data.response.data || {};



    if (id) {

      // const {
      //   location,
      // } = global;

      // const uri = new URI(location);




      // const {
      //   router: {
      //     history,
      //   }
      // } = this.context;

      // history.push(uri.hash(hash).resource());


      // setTimeout(() => {

      //   const hash = `#comment_${id}`;
      //   global.location.hash = hash;

      // }, 250);

      const hash = `#comment_${id}`;
      global.location.hash = hash;

    }



    return result;
  }


  renderHeader() {
    return null;
  }

  // async saveObject(data) {

  //   // const {
  //   //   object,
  //   //   saveObject,
  //   // } = this.props;

  //   // if(saveObject){
  //   //   return saveObject(data);
  //   // }




  //   const {
  //     mutate,
  //   } = this.props;

  //   if (!mutate) {
  //     throw (new Error("Mutate not defined"));
  //   }

  //   const mutation = this.getMutation(data);

  //   const result = await mutate(mutation).then(r => r).catch(e => {

  //     // throw (e);
  //     return e;
  //   });



  //   return result;

  // }


  canEdit() {


    const {
      user: currentUser,
    } = this.context;

    const {
      id: currentUserId,
      sudo,
    } = currentUser || {};

    const {
      id,
      created_by,
    } = this.getObjectWithMutations() || {}

    const can = !id || sudo === true || (created_by && created_by.id === currentUserId);
    // return true;



    return can;
  }


  renderEditor(props = {}) {

    const inEditMode = this.isInEditMode();

    const {
      editor_content,
    } = this.getObjectWithMutations() || {};


    let {
      error,
      helperText,
      ...other
    } = props;


    // const {
    //   onSave,
    // } = this.props;

    return <div
    >
      {this.getEditor({
        Editor,
        name: "editor_content",
        readOnly: !inEditMode,
        onChange: (editorState, rawContent) => {



          this.updateObject({
            editor_content: rawContent,
          });

        },
        // onSave,
        ...other,
      })}
    </div>;

    // return <div
    // >
    //   {this.getEditor(<Editor
    //     value={editor_content}
    //     readOnly={!inEditMode}
    //     error={error || false}
    //     helperText={helperText || "Sdfsdfdsf"}
    //     onChange={(editorState, rawContent) => {



    //       this.updateObject({
    //         editor_content: rawContent,
    //       });

    //     }}
    //     {...other}
    //   />)}
    // </div>;
  }


  getButtons() {


    let buttons = super.getButtons() || [];

    const {
      showEditor,
    } = this.state;

    const {
      id,
    } = this.getObjectWithMutations() || {};

    const {
      showReplyButtons,
    } = this.props;

    if (id && showReplyButtons) {

      if (showEditor) {

        buttons.push(<CommentViewComponent
          key="comment"
          data={{
            object: {},
          }}
          // readOnly={false}
          _dirty={{
            parent: id,
          }}
          onSave={event => {
            this.setState({
              showEditor: false,
            })
          }}
        />);

      }
      else {
        buttons.push(<AuthorizedAction
          key="showEditor"
        >
          <Button
            onClick={event => {
              this.setState({
                showEditor: true,
              })
            }}
          >
            <ReplyIcon /> Ответить
          </Button>
        </AuthorizedAction>);
      }

    }



    return buttons;

  }


  renderDefaultView() {

    const {
      inEditMode,
      showLink,
    } = this.props;


    const {
      showEditor,
    } = this.state;

    const comment = this.getObjectWithMutations();

    const {
      id,
      comment_id,
      name: anonimUserName,
      createdAt,
      created_by,
      editor_content,
      type_id,
      object_id,
      is_checked,
      url_name,
    } = comment;


    const {
      comment: currentComment,
    } = this.context;

    const {
      etherwallet: currcommentEtherwallet,
    } = currentComment || {}


    let footer;

    // Получаем ссылку на связанный объект
    if (object_id) {

      switch (type_id) {

        // Публикации

        // Личные топики
        case 1:
        // Под вопросом. Вероятно тоже блоги 
        case 5:
        // Мероприятие/Событие/Приглашение
        case 6:


          if (showLink) {
            footer = <CommentTopic
              where={{
                topic_id: object_id,
              }}
            />
          }


          break;

        // Заведение
        case 3:

          footer = <CommentPlace
            place_id={object_id}
          />

          break;

        // Пиво
        case 4:

          footer = <CommentBeer
          />

          break;

      }

    }

    return this.renderWrapper(<div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >

      <div
        style={{
          flexGrow: 1,
        }}
      >

        <Grid
          container
        >

          {created_by
            ?
            <Fragment>
              <Grid
                item
                xs
              >

                <PublicationLink
                  user={created_by ? created_by : {
                    firstname: anonimUserName,
                  }}
                  date={createdAt}
                />

              </Grid>
              {comment_id && showLink
                ?
                <Grid
                  item
                >
                  <Link
                    to={`/comments/comment-${comment_id}.html`}
                  >
                    <LinkIcon />
                  </Link>
                </Grid>
                : null
              }
            </Fragment>
            : null
          }


          <Grid
            item
            xs={12}
          >

            {this.renderEditor()}

          </Grid>

          <Grid
            item
            xs={12}
          >



            <div
              style={{
                marginTop: 10,
              }}
            >

              {this.getButtons()}

            </div>

          </Grid>


          {/* {id ? <Grid
        item
        xs={12}
      >

        <CommentViewComponent
          parent={id}
            />

      </Grid> : null} */}

        </Grid>

      </div>


      {footer
        ?
        <div
        >

          {footer}

        </div>
        : null
      }

    </div>);

  }


  renderEditableView() {

    const object = this.getObjectWithMutations();

    const {
      id,
      text,
    } = object;

    const {
      _dirty,
    } = this.state;

    return this.renderWrapper(<div
      key={id}
    >

      {this.renderEditor()}

      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button
          color="secondary"
          onClick={event => {

            this.resetEdit();

            this.setState({
              showEditor: false,
            });

          }}
        >
          Отмена
        </Button>

        <Button
          color="primary"
          onClick={event => {
            this.save();
          }}
          disabled={!_dirty}
        >
          Отправить <SendIcon
            style={{
              marginLeft: 5,
            }}
          />
        </Button>
      </div>

    </div>);

  }


  renderWrapper(content) {

    const {
      id,
    } = this.getObjectWithMutations() || {};

    return <div
      style={{
        padding: "10px 0",
        height: "100%",
      }}
    >
      <a
        href="javascript:;"
        name={id ? `comment_${id}` : undefined}
      />

      <Paper
        style={{
          padding: 15,
          height: "100%",
        }}
      >

        {content}
      </Paper>
    </div>
  }


}



export default class CommentViewComponent extends CustomComponent {


  async mutate(options) {



    let {
      variables: {
        where,
        data,
      },
    } = options;

    const mutation = where ? updateCommentProcessor : createCommentProcessor;


    const result = await super.mutate({
      mutation,
      variables: {
        data,
        where,
        commentGetAuthor: true,
      }
    });

    return result;

  }


  render() {

    // const {
    //   errors,
    // } = this.state;

    return (<CommentView
      mutate={options => this.mutate(options)}
      {...this.props}
    />);
  }

}