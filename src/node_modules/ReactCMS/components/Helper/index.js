
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import HelperPrototype from 'material-ui-components/src/Helper';

import Grid from 'material-ui/Grid';

import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Help from 'material-ui-icons/Help';

export default class Helper extends HelperPrototype{

	render(){

    let {closeIconProps, iconProps, contrastIcons, ...other} = this.props;

		return <IconButton
      onTouchTap={() => this.setState({
      	open: true,
      })}
      contrast={contrastIcons}
      {...iconProps}
    >
      <Help /> 
      <Dialog
          fullScreen
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="down" />}
        >

        	<div 
			      className="navbar navbar-default navbar-fixed-top"
			      style={{
			        marginBottom: 0,
			        color: '#fff',
			      }}
			    >

			    	<Grid
			    		container
			    		gutter={0}
			    		align="center"
			    	>

			    		<Grid
			    			item
			    			xs
			    		>

					    	<Typography type="title" colorInherit 
		            	style={{
    								padding: 14,
								  }}
		            >
		              Справка
		            </Typography>
			    			
			    		</Grid>

			    		<Grid
			    			item
			    		>

		            <Button 
		              onTouchTap={this.handleRequestClose}
		              contrast={contrastIcons || true}
		              {...closeIconProps}
		            >
		              Закрыть
		            </Button>
			    			
			    		</Grid>
			    		
			    	</Grid>
			    </div>

          {/*<AppBar 
          	style={{
					    position: 'relative',
					  }}
          >
            <Toolbar>
              <Typography type="title" colorInherit 
              	style={{
							    flex: 1,
							  }}
              >
                Справка
              </Typography>
              <Button 
                onTouchTap={this.handleRequestClose}
                contrast={contrastIcons || true}
                {...closeIconProps}
              >
                Закрыть
              </Button>
            </Toolbar>
          </AppBar>*/}
          
          <div
          	style={{
          		marginTop: 50,
          	}}
          >
          	{this.props.children}
          </div>

          <div
          	style={{
          		padding: 15,
          	}}
          >
          	
	          <p>
	          	Если у вас остались вопросы, вы можете задать нам их на почту <a href="mailto:info@pivkarta.ru">info@pivkarta.ru</a>
	          </p>

          </div>


        </Dialog>
    </IconButton> ;
	}

}
