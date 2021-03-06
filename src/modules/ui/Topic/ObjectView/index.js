import React from 'react'

import PropTypes from "prop-types";

import EditableView from 'apollo-cms/lib/DataView/Object/Editable';

import Grid from 'material-ui/Grid';

// import SingleFileUploader from 'src/modules/ui/FileUploader/SingleUploader';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

// import { Link } from 'react-router-dom';

import TopicLink from "src/modules/ui/Link/Topic";

import DefaultView from './default';

// import Button from 'material-ui/Button/Button';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import Editor from './Editor';


export default class TopicView extends EditableView {


  static propTypes = {

    /**
     * Так как этот шаблон вызывается не только со страницы топика, 
     * то обновляем заголовок страницы только с учетом этой переменной
     */
    updatePageTitle: PropTypes.bool.isRequired,

    // Флаг того, что рендерится как отдельная страница
    isPage: PropTypes.bool.isRequired,
    cutText: PropTypes.bool.isRequired,
  };


  static defaultProps = {
    ...EditableView.defaultProps,
    updatePageTitle: false,
    isPage: false,
    cutText: false,
  };


  static contextTypes = {
    ...EditableView.contextTypes,
    setPageMeta: PropTypes.func.isRequired,
  }


  setPageMeta() {

    const {
      updatePageTitle,
    } = this.props;

    if (updatePageTitle !== true) {
      return;
    }

    const {
      setPageMeta,
    } = this.context;


    const {
      name,
      description,
    } = this.getObjectWithMutations() || {};

    name && setPageMeta({
      title: name,
      description,
    });

  }



  componentWillMount() {

    this.setPageMeta();

    super.componentWillMount && super.componentWillMount();
  }


  componentDidUpdate() {

    this.setPageMeta();

    super.componentDidUpdate && super.componentDidUpdate();
  }


  canEdit() {

    // return true;

    const {
      user: currentUser,
    } = this.context;

    const object = this.getObjectWithMutations();

    const {
      id,
      created_by,
    } = object || {};

    return !id || (currentUser && (currentUser.sudo === true || (created_by && created_by.id && currentUser.id === created_by.id))) ? true : false;

  }

  getButtons() {


    const inEditMode = this.isInEditMode();

    const {
      user: currentUser,
    } = this.context;

    const {
      sudo,
    } = currentUser || {};

    // const isDirty = this.isDirty();


    let buttons = super.getButtons() || [];

    if (this.canEdit() && inEditMode) {

      const object = this.getObjectWithMutations();

      const {
        published,
      } = object;

      sudo === true && buttons.push(<FormControlLabel
        key="published"
        control={
          <Switch
            checked={published}
            onChange={(event, checked) => {
              this.updateObject({
                published: !published,
              });
            }}
          />
        }
        label={published ? "Опубликован" : "Черновик"}
      />);

    }

    return buttons && buttons.length ? buttons : null;
  }


  getTitle() {

    const object = this.getObjectWithMutations();

    if (!object) {
      return null;
    }

    const {
      // id,
      // topic_id,
      // url_name,
      name,
    } = object;

    // const url = url_name ? `/topics/${url_name}/` : topic_id ? `/blog/show/${topic_id}/` : null;

    return object ? <TopicLink
      object={object}
    >
      {name}
    </TopicLink> : name;
  }



  renderHeader() {

    const {
      isPage,
    } = this.props;


    return <Typography
      variant={isPage ? "headline" : "title"}
      className="pagetitle"
    >
      {this.getTitle()}

      {this.getButtons()}

    </Typography>
  }


  renderDefaultView() {

    const object = this.getObjectWithMutations();

    const {
      data,
      ...other
    } = this.props;

    return <DefaultView
      object={object}
      updateObject={data => this.updateObject(data)}
      // cutText={cutText}
      renderWrapper={this.renderWrapper}
      {...other}
    />

  }

  renderEditableView() {


    const object = this.getObjectWithMutations();


    const {
      id,
      coords,
    } = object;

    const inEditMode = this.isInEditMode();

    const {
      user: currentUser,
    } = this.context;

    const {
      sudo,
    } = currentUser || {};


    return this.renderWrapper(<Grid
      key={id}
      container
    >

      <Grid
        item
        xs={12}
      >

        {this.getTextField({
          label: "Название",
          name: "name",
        })}

      </Grid>

      {sudo === true ? <Grid
        item
        xs={12}
      >

        {this.getTextField({
          label: "Описание",
          name: "description",
          helperText: "meta-description",
        })}

      </Grid> : null
      }

      <Grid
        item
        xs={12}
      >

        <div
          style={{
            marginTop: 20,
          }}
        >
          <Editor
            object={object}
            inEditMode={inEditMode}
            updateObject={data => this.updateObject(data)}
          />
        </div>

      </Grid>


    </Grid>)

  }

  render() {

    const content = super.render();

    return content || null;

  }


  renderWrapper(content) {

    return <Paper
      style={{
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
      }}
    >
      {content}
    </Paper>
  }

}
