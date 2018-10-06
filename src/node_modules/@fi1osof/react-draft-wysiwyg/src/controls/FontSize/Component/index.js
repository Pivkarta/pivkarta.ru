/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

export default class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    defaultFontSize: undefined,
  };

  componentDidMount() {
    const editorElm = document.getElementsByClassName('DraftEditor-root');
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0]);
      let defaultFontSize = editorStyles.getPropertyValue('font-size');
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        defaultFontSize,
      });
    }
  }

  render() {
    const {
      config: { icon, className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
      translations,
    } = this.props;
    let { currentState: { fontSize: currentFontSize } } = this.props;
    let { defaultFontSize } = this.state;

    // defaultFontSize = Number(defaultFontSize);
    defaultFontSize = defaultFontSize;

    currentFontSize = currentFontSize ||
      (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize);

    console.log("currentFontSize", currentFontSize);

    // currentFontSize = currentFontSize && typeof currentFontSize === "object" ? currentFontSize.title : currentFontSize;

    if (currentFontSize) {
      const option = options.find(n => n.size === currentFontSize);

      if (option) {
        currentFontSize = option.title;
      }
      console.log("currentFontSize2", currentFontSize, option);
    }


    return (
      <div className="custom-rdw-fontsize-wrapper" aria-label="custom-rdw-font-size-control">
        <Dropdown
          className={classNames('custom-rdw-fontsize-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations['components.controls.fontsize.fontsize']}
        >
          {currentFontSize ?
            <span>{currentFontSize}</span> :
            <img src={icon} alt="" />
          }
          {
            options.map(({
              title,
              size,
            }, index) =>
              (<DropdownOption
                className="custom-rdw-fontsize-option"
                active={currentFontSize === size}
                value={size}
                key={index}
              >
                {title}
              </DropdownOption>),
            )
          }
        </Dropdown>
      </div>
    );
  }
}
