import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editor from 'src/modules/ui/Editor';


import {
  // getSelectionText,
  getEntityRange,
  // getSelectionEntity,
} from 'draftjs-utils';


import Cut from "src/modules/ui/Editor/options/Cut";





export default class TopicEditor extends Component {

  static propTypes = {
    object: PropTypes.object.isRequired,
    updateObject: PropTypes.func,
    inEditMode: PropTypes.bool.isRequired,

    // Флаг того, что текст длинный надо резать
    cutText: PropTypes.bool.isRequired,
    cutTextLimit: PropTypes.number,
  }

  static defaultProps = {
    inEditMode: false,
    cutText: false,
    cutTextLimit: 1000,
  };

  render() {

    const {
      object,
      updateObject,
      inEditMode,
      // sdf: cutText = true,
      cutText,
      cutTextLimit,
      ...other
    } = this.props;

    const {
      editor_content,
    } = object;


    let value;

    const readOnly = inEditMode ? false : true;

    if (editor_content) {

      let {
        blocks: editorBlocks,
        entityMap,
      } = editor_content;



      let blocks = []

      const cutIndex = entityMap && Object.values(entityMap).findIndex(({ type }) => type === "CUT");




      /**
       * Режем длинные топики
       */

      let textLength = 0;

      if (!inEditMode && cutText) {

        editorBlocks.every((block, index) => {

          // if (index > 3) {
          //   return;
          // }


          /**
           * Если указан кат вручную, то режем по нему.
           * Если нет, то по кол-ву символов
           * 
           */
          if (cutIndex !== -1) {

            if (block.entityRanges.findIndex(i => i.key === cutIndex) !== -1) {
              return false;
            }

          }
          else if (cutTextLimit > 0) {

            textLength += block.text.length;

            /**
             * Важно: так как есть топики состоящие всего из одного блока,
             * то добавляем блок, если список еще пуст
             */
            if (!blocks.length) {
              blocks.push(block);
            }

            if (textLength >= cutTextLimit) {
              return false
            }

          }

          blocks.push(block);

          return true;

        });

        value = {
          blocks,
          entityMap,
        }
      }
      else {
        value = editor_content;
      }






    }



    return (
      <Editor
        // key={inEditMode}
        value={value || ""}
        readOnly={readOnly}
        onChange={(editorState, rawContent) => {



          updateObject && updateObject({
            editor_content: rawContent,
          });

        }}
        toolbarCustomButtons={[<Cut />]}
        customDecorators={[{
          strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges(
              (character) => {
                const entityKey = character.getEntity();
                return (
                  entityKey !== null &&
                  contentState.getEntity(entityKey).getType() === 'CUT'
                );
              },
              callback,
            );
          },
          component: () => {

            if (readOnly) {
              return null;
            }

            return <hr />
          },
        }
        ]}
        {...other}
      />
    )
  }
}
