import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles';

import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";

import Modal from 'src/modules/Modal';

import AuthorizedAction from 'src/modules/authorized-action';

import CustomComponent from 'Component';
import { updatePlaceProcessor } from 'src/modules/query';


const styles = {

};

export class PlaceOwnerer extends CustomComponent {

  static propTypes = {
    ...CustomComponent.propTypes,
    item: PropTypes.object.isRequired,
    confirmOwnering: PropTypes.func.isRequired,
		refetch: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...CustomComponent.contextTypes,
    user: PropTypes.object,
  }



  constructor(props) {

    super(props);

    this.state = {
      ...this.state,
      opened: false,
    }
  }


  confirmOwnering() {

    const {
      user: currentUser,
    } = this.context;


    const {
      item: object,
      refetch,
    } = this.props;

    const {
      id,
    } = object || {}

    if (!id || !currentUser) {
      return false;
    }

    const {
      id: currentUserId,
      username: currentUsername,
    } = currentUser;


    return this.mutate({
      mutation: updatePlaceProcessor,
      variables: {
        where: {
          id,
        },
        data: {
          Owner: {
            connect: {
              id: currentUserId,
            },
          },
        },
      },
    })
      .then(async r => {

        const {
          router: {
            history,
          },
        } = this.context;

        await refetch();

        setTimeout(() => {
          history.push(`/profile/${currentUsername}`);
        }, 2000)

        return r;
      });

  }


  render() {

    const {
      user: currentUser,
    } = this.context;

    const {
      opened,
    } = this.state;

    const {
      // confirmOwnering,
      item,
    } = this.props;


    if (!item) {
      return null;
    }

    const {
      id: currentUserId,
    } = currentUser || {};

    const {
      Owner,
    } = item;


    const {
      id: ownerId,
    } = Owner || {};

    let form = null;

    if (Owner) {

      if (ownerId && ownerId === currentUserId) {
        form = <Typography
          color="primary"
        >
          Это ваше заведение
        </Typography>
      }

    }
    else {

      form = <Fragment>
        <Modal
          open={opened}
          onClose={event => this.setState({
            opened: false,
          })}
        >
          <form
            onSubmit={async event => {
              event.preventDefault();
              await this.confirmOwnering()
                .then(r => {
                  this.setState({
                    opened: false,
                  });
                });
            }}
          >
            <Grid
              container
              spacing={8}
            >

              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="headline"
                >
                  Вы уверены, что это ваше заведение?
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
              >
                <Typography
                >
                  Подтвердив, что это ваше заведение, вы получите доступ к его управлению.
                </Typography>
                {/* <Typography 
            >
              Самостоятельно это можно сделать только один раз. Чтобы присвоить больше заведений
            </Typography> */}
              </Grid>

              {/* <Grid
            item
            xs={12}
          >
            <TextField 
              fullWidth
            />
          </Grid> */}

              <Grid
                item
                xs={12}
              >
                <Button
                  type="submit"
                  color="primary"
                >
                  Да, это мое заведение
                </Button>
                <Button
                  color="secondary"
                  onClick={event => this.setState({
                    opened: false,
                  })}
                >
                  Нет
            </Button>
              </Grid>
            </Grid>
          </form>
        </Modal>
        <AuthorizedAction
        >
          <Button
            onClick={event => this.setState({
              opened: true,
            })}
          >
            Это мое заведение
          </Button>
        </AuthorizedAction>
      </Fragment>;
    }


    return super.render(form);

    // return (
    //   <div>
    //     <a href="#" >

    //     </a>
    //   </div>
    // )
  }
}

export default withStyles()(PlaceOwnerer);
