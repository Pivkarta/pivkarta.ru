// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
// import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

import FormControl, {styleSheet} from 'modules/src/modules/ReactCMS/components/UI/Form/FormControl';

import PropTypes from 'prop-types';

import moment from 'moment';

import Button from 'material-ui/Button';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
// import {
// 	Editor, 
// 	EditorState,
// 	convertFromHTML,
// 	ContentState,
// } from 'draft-js';


import Editor from 'modules/src/modules/ReactCMS/components/Editor';

import customPropTypes from 'material-ui/utils/customPropTypes';

// import {stateToHTML} from 'draft-js-export-html';




export type Props = {
  /**
   * This property helps users to fill forms faster, especially on mobile devices.
   * The name can be confusion, it's more like an autofill.
   * You can learn about it with that article
   * https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
   */
  autoComplete?: string,
  /**
   * If `true`, the input will be focused during the first mount.
   */
  autoFocus?: boolean,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The default value of the `Input` element.
   */
  defaultValue?: string,
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean,
  /**
   * Properties applied to the `FormHelperText` element.
   */
  FormHelperTextProps?: Object,
  /**
   * If `true`, the input will take up the full width of its container.
   */
  fullWidth?: boolean,
  /**
   * The helper text content.
   */
  helperText?: string | Element<*>,
  /**
   * The CSS class name of the helper text element.
   */
  helperTextClassName?: string,
  /**
   * The id of the `input` element.
   */
  id?: string,
  /**
   * The CSS class name of the `input` element.
   */
  inputClassName?: string,
  /**
   * The CSS class name of the `Input` element.
   */
  InputClassName?: string,
  /**
   * Properties applied to the `InputLabel` element.
   */
  InputLabelProps?: Object,
  /**
   * Properties applied to the `input` element.
   */
  inputProps?: Object,
  /**
   * Properties applied to the `Input` element.
   */
  InputProps?: Object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef?: Function,
  /**
   * The label content.
   */
  label?: string | Element<*>,
  /**
   * The CSS class name of the label element.
   */
  labelClassName?: string,
  /**
   * If `true`, a textarea element will be rendered instead of an input.
   */
  multiline?: boolean,
  /**
   * Name attribute of the `Input` element.
   */
  name?: string,
  placeholder?: string,
  /**
   * If `true`, the label is displayed as required.
   */
  required?: boolean,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number,
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  rowsMax?: string | number,
  /**
   * Type attribute of the `Input` element. It should be a valid HTML5 input type.
   */
  type?: string,
  /**
   * The value of the `Input` element, required for a controlled component.
   */
  value?: string | number,
  /**
   * If `dense` | `normal`, will adjust vertical spacing of this and contained components.
   */
  margin?: 'none' | 'dense' | 'normal',
};

let classes;

export class TextField extends Component {

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

	constructor(props){
		

		super(props);

		const {
			value,
		} = props;

		// const blocksFromHTML = convertFromHTML(value);

		// const state = ContentState.createFromBlockArray(
		//   blocksFromHTML.contentBlocks,
		//   blocksFromHTML.entityMap
		// );

		this.state = {
  		// editorState: EditorState.createWithContent(state),
		};

	}


	// onEditorChange(editorState){

	// 	this.setState({
	// 		editorState,
	// 	});

	// 	let value = editorState && stateToHTML(editorState.getCurrentContent());

	// 	if(value === "<p><br></p>"){
	// 		value = "";
	// 	}

	// 	const {
	// 		onChange,
	// 	} = this.props;

	// 	const {
	// 		name,
	// 	} = this.props;

	// 	onChange && onChange({
	// 		target: {
	// 			name,
	// 			value,
	// 		},
	// 	});

	// }


	// componentWillMount(){

 //    classes = this.context.styleManager.render(styleSheet);

	// }


	render(){




	  const {
	    autoComplete,
	    autoFocus,
	    className,
	    defaultValue,
	    disabled,
	    error,
	    id,
	    inputClassName,
	    InputClassName,
	    inputProps: inputPropsProp,
	    InputProps,
	    inputRef,
	    label,
	    labelClassName,
	    InputLabelProps,
	    helperText,
	    helperTextClassName,
	    FormHelperTextProps,
	    fullWidth,
	    required,
	    type,
	    multiline,
	    name,
	    placeholder,
	    rootRef,
	    rows,
	    rowsMax,
	    value,

	    onChange,
	    ...other
	  } = this.props;

		const {
			// editorState,
		} = this.state;

	  let inputProps = inputPropsProp;

	  if (inputClassName) {
	    inputProps = {
	      className: inputClassName,
	      ...inputProps,
	    };
	  }

	  return (
	    <FormControl
	      fullWidth={fullWidth}
	      ref={rootRef}
	      // className={[className, classes.root].join(" ")}
	      className={[className, "HtmlFormControl", label ? "with-label" : ""].join(" ")}
	      // className={className}
	      error={error}
	      required={required}
	      dirty={value ? true : false}
	      {...other}
	    >
	      {label &&
	        <InputLabel 
	        	htmlFor={id} 
	        	className={labelClassName} 
	        	{...InputLabelProps}
	        >
	          {label}
	        </InputLabel>}
	      {/*<Input
	        autoComplete={autoComplete}
	        autoFocus={autoFocus}
	        className={InputClassName}
	        defaultValue={defaultValue}
	        disabled={disabled}
	        multiline={multiline}
	        name={name}
	        rows={rows}
	        rowsMax={rowsMax}
	        type={type}
	        value={value}
	        id={id}
	        inputProps={inputProps}
	        inputRef={inputRef}
	        placeholder={placeholder}
	        {...InputProps}
	      />*/}
				
      	{/*<Editor 
      		{...other}
      		editorState={editorState} 
      		onChange={::this.onEditorChange}
      	/>*/}
				
      	<Editor 
      		{...other}
      		value={value || ""} 
      		name={name}
      		onChange={onChange}
      	/>

	      {helperText &&
	        <FormHelperText className={helperTextClassName} {...FormHelperTextProps}>
	          {helperText}
	        </FormHelperText>}
	    </FormControl>
	  );

	}

}

TextField.defaultProps = {
  required: false,
};

export default TextField;










// import './styles/styles.less';

// import React, { Component } from 'react';


// import TextField from 'material-ui/TextField';



// const date = moment(new Date().getTime() + (24*60*60*7*1000)).format("DD-MM-YYYY");

// const sampleMarkup = ``;


// export class HTMLEditor extends Component{

// 	static propTypes = {
// 		// user: PropTypes.object.isRequired,
// 		// onSuccess: PropTypes.func.isRequired,
// 	};


// 	static contextTypes = {
// 		// request: PropTypes.func.isRequired,
// 		// documentActions: PropTypes.object.isRequired,
// 	};


// 	constructor(props){

// 		super(props);


// 		const blocksFromHTML = convertFromHTML(sampleMarkup);
// 		const state = ContentState.createFromBlockArray(
// 		  blocksFromHTML.contentBlocks,
// 		  blocksFromHTML.entityMap
// 		);

// 		this.state = {
//   		editorState: EditorState.createWithContent(state),
// 		};
// 	}


// 	onEditorChange(editorState){

// 		this.setState({
// 			editorState,
// 		});

// 	}


// 	render(){

// 		const {
// 			editorState,
// 		} = this.state;



// 		const html = editorState && stateToHTML(editorState.getCurrentContent());



// 		return <Card>
			
// 			{/*<CardHeader 
// 				title="Отправка коммерческого предложения"
// 			/>*/}

// 			<CardContent>
				
//       	<Editor 
//       		editorState={editorState} 
//       		onChange={::this.onEditorChange}
//       		style={{
//       			border: "1px solid",
//       		}}
//       	/>

// 			</CardContent>

// 			{/*<CardContent>
				
// 				<div 
// 					dangerouslySetInnerHTML={{ __html: html }}
// 				/>
	 

// 			</CardContent>*/}

// 			{/*<CardContent>
				
// 				{html}

// 			</CardContent>*/}

// 			{/*<CardActions>

// 				<Button
// 					raised
// 					onClick={::this.send}
// 				>
// 					Отправить
// 				</Button>

// 			</CardActions>*/}

// 		</Card>
// 	}
// }


// export default TextField;

// export default class EditorField extends TextField{



// }
