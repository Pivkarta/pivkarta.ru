/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';

import LayoutComponent from './Component';

export default class FontSize extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    expanded: undefined,
    currentFontSize: undefined,
  };

  componentWillMount() {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize:
          getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentFontSize:
          getSelectionCustomInlineStyle(properties.editorState, ['FONTSIZE']).FONTSIZE,
      });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent = () => {
    this.signalExpanded = !this.state.expanded;
  };

  expandCollapse = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  doExpand = () => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse = () => {
    this.setState({
      expanded: false,
    });
  };

  toggleFontSize = (fontSize) => {

    console.log("toggleFontSize", fontSize);

    const { editorState, onChange } = this.props;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSize,
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentFontSize } = this.state;
    const FontSizeComponent = config.component || LayoutComponent;
    // const fontSize = currentFontSize && Number(currentFontSize.substring(9));
    const fontSize = currentFontSize && currentFontSize.replace(/^\w*-/, '');
    return (
      <FontSizeComponent
        config={config}
        translations={translations}
        currentState={{ fontSize }}
        onChange={this.toggleFontSize}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
      />
    );
  }
}
