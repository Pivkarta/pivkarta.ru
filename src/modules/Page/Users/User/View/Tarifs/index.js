import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  tarifs,
} from 'src/modules/query';
import { compose, graphql } from 'react-apollo';

import DoneIcon from 'material-ui-icons/Done';

import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import gql from 'graphql-tag';


const userTarifFragment = `
  fragment userTarif on UserTarif{
    id
    User{
      id
      username
    }
    Tarif{
      ...tarif
    }
    createdAt
    dateTill
  }
`;

const tarifFragment = `
  fragment tarif on Tarif{
    id
    name
    active
    price
    maxPriceItems
    allowIcon
    allowBanner
  }
`;

const userPlans = gql`
  query userTarifs (
    $userId:ID!
  ){
    userTarifs(
      where:{
        User:{
          id:$userId
        }
      },
    ){
      ...userTarif
    }
  }

  ${userTarifFragment}

  ${tarifFragment}

`;


const createUserTarif = gql`

  mutation createUserTarif(
    $tarifId: ID!
    $promoCode: String
  ){
    createUserTarif(
      data:{
        Tarif:{
          connect:{
            id: $tarifId
          },
        }
        User:{}
      }
      promoCode: $promoCode
    ){
      ...userTarif
    }
  }

  ${userTarifFragment}

  ${tarifFragment}

`;


const createTarifRequest = gql`
  mutation createTarifRequest(
    $tarifId:ID!
  ){
    createTarifRequest(
      data:{
        User:{
          connect:{
            id:""
          }
        }
        Tarif:{
          connect:{
            id:$tarifId
          }
        }
      }
    ) {
      id
      User{
        id
        user_id
        fullname,
        username,
        email,
      }
      Tarif{
        id
        name
      }
    }
  }
`;


const styles = {
  root: {
    maxWidth: 1000,
    overFlow: "auto",
    // margin: "0 auto",
    marginTop: 20,
  },
  title: {
    fontSize: "1.2rem",
  },
  table: {
    width: "100%",

    "& th, & td": {
      padding: "3px 5px",
    },

    "& thead th, & td": {
      textAlign: "center",
    },

    "& td, & th": {
      border: "1px solid #ddd",
    },
  },
  ok: {
    color: "green",
  },
  colorPrimary: {
    color: "#2196F3",
  },
}


export class UserTarifs extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    userPlans: PropTypes.object.isRequired,
  }


  static contextTypes = {
    // client: PropTypes.object.isRequired,
  };


  state = {
    promoOpened: false,
    promoCode: "BIGCRAFTDAY",
    promoCodeIntered: "",
  }


  onChange = event => {
    const {
      name,
      value,
    } = event.target;

    this.setState({
      [name]: value,
    });
  }


  async submit(tarifId) {

    // const {
    //   client,
    // } = this.context;

    // const result = await client.mutate

    const {
      promoCodeIntered: promoCode,
    } = this.state;

    const {
      createTarif,
    } = this.props;

    const result = await createTarif({
      variables: {
        tarifId,
        promoCode,
      },
    })
      .then(r => {

        const {
          userPlans,
        } = this.props;

        userPlans.refetch();

      })
      .catch(error => {
        console.error(error);

        alert(error);
      });



  }


  render() {

    const {
      data,
      userPlans,
      classes,
    } = this.props;

    const {
      objects,
    } = data;


    if (!objects || !objects.length) {
      return null;
    }

    const {
      userTarifs,
    } = userPlans;

    const {
      promoOpened,
      promoCode,
      promoCodeIntered,
    } = this.state;


    const allows = {
      maxPriceItems: "Количество ценовых позиций",
      allowIcon: "Фирменная иконка на карте",
      allowBanner: "Рекламный баннер на карте",
      price: "",
    };




    let output;


    if (userTarifs && userTarifs.length) {

      const userPlan = userTarifs[0]

      output = <Typography
        variant="subheading"
        className={[classes.title, classes.colorPrimary].join(" ")}
      >
        Ваш тарифный план: {userPlan.Tarif.name}
      </Typography>
    }
    else {


      let tbody = [];

      for (var i in allows) {

        const title = allows[i];

        tbody.push(<tr
          key={i}
        >
          <th>
            {title}
          </th>

          {objects.map(n => {

            let {
              id: tarifId,
              [i]: value,
            } = n;

            switch (i) {

              case "price":

                let buttons = [];


                buttons.push(<a
                  key="choise"
                  href="javascript:;"
                  onClick={event => {
                    if(window.confirm("Отправить запрос на подключение тарифного плана?")){


                      const {
                        createTarifRequest,
                      } = this.props;

                      createTarifRequest({
                        variables: {
                          tarifId,
                        },
                      })
                      .then(r => {
                        alert("Спасибо! Запрос успешно отправлен. Менеджер свяжется с вами по указанному в профиле емейлу.");
                      })
                      .catch(error => {
                        console.error(error);
                        alert(error.message);
                      });

                    }
                  }}
                >
                  Выбрать
              </a>);

                if (value === 1000) {

                  if (promoOpened) {

                    const valid = promoCodeIntered.toLowerCase() === promoCode.toLowerCase();

                    buttons = <form
                      onSubmit={event => {
                        event.preventDefault();

                        this.submit(tarifId);
                      }}
                    >
                      <Grid
                        container
                        spacing={8}
                        alignItems="baseline"
                      >

                        <Grid
                          item
                          xs
                        >
                          <TextField
                            label="Промо-код"
                            onChange={this.onChange}
                            value={promoCodeIntered || ""}
                            name="promoCodeIntered"
                            helperText="Введите промо-код"
                            fullWidth
                          />
                        </Grid>

                        <Grid
                          item
                        >
                          <Button
                            type="submit"
                            disabled={!valid}
                          >
                            {valid
                              ?
                              <DoneIcon
                                className={classes.ok}
                              /> : null
                            } Отправить
                              </Button>
                        </Grid>

                      </Grid>
                    </form>
                  }
                  else {
                  //   buttons.push(<span
                  //     key="code"
                  //   > или <a
                  //     href="javascript:;"
                  //     onClick={event => {
                  //       this.setState({
                  //         promoOpened: true,
                  //       });
                  //     }}
                  //   >
                  //       Ввести промо-код
                  //   </a> (только до 31.05.2018)
                  // </span>);
                  }


                }

                value = <div>
                  <div>
                    <span>{value} ₽</span>
                  </div>
                  <div>
                    {/* {buttons.reduce((prev, next) => [prev, " ", next])} */}
                    {buttons}
                  </div>
                </div>;

                break;

            }

            // if(value === true || value === false){
            if (value === true) {
              value = <DoneIcon
                className={classes.ok}
              />
            }



            return <td
              key={tarifId}
            >
              {value}
            </td>

          })}

        </tr>);

      }

      const table = <table
        className={classes.table}
      >
        <thead>
          <tr>
            <th></th>
            {objects.map(n => {
              const {
                id,
                name,
              } = n;

              return <th
                key={id}
              >
                {name}
              </th>
            })}
          </tr>
        </thead>

        <tbody>
          {tbody}
        </tbody>

      </table>

      output = <Fragment>
        <Typography
          variant="subheading"
          className={[classes.title, classes.colorPrimary].join(" ")}
        >
          Выберите свой тарифный план
        </Typography>

        {table}
      </Fragment>
    }

    return (
      <div
        className={classes.root}
      >

        {output}

      </div>
    )
  }
}

export default compose(
  graphql(tarifs, {
    name: "data",
  }),
  graphql(userPlans, {
    name: "userPlans",
    options: props => {


      const {
        user,
      } = props;

      const {
        id,
      } = user;

      return {
        variables: {
          userId: id,
        },
      }
    },
  }),
  graphql(createUserTarif, {
    name: "createTarif",
  }),
  graphql(createTarifRequest, {
    name: "createTarifRequest",
  }),
)(withStyles(styles)(UserTarifs));
