

import Typography from 'material-ui/Typography';

// import Modal from './AuthModal';
import Button from 'material-ui/Button/Button';

import UserItem from './User';


import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import LoginIcon from 'material-ui-icons/PermIdentity';
import AddIcon from 'material-ui-icons/Add';
import AtentionIcon from 'material-ui-icons/ErrorOutline';

export default class MainMenu extends Component {

  static contextTypes = {
    logout: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
    user: PropTypes.object,
    openLoginForm: PropTypes.func.isRequired,
    cities: PropTypes.array,
    // router: PropTypes.object.isRequired,
    getGeoCoords: PropTypes.func.isRequired,
  };

  constructor(props) {

    super(props);

    this.state = {
      ratingsOpened: false,
      citiesOpened: false,
      opened: false,
      mobileMenuOpened: false,
    }

    // console.log("menu constructor");
  }



  // onStoreUpdate = payload => {

  //   switch (payload.type) {

  //     case "SET_DATA":

  //       this.loadData();
  //       break;

  //     default: ;

  //   }
  // }


  // loadData() {

  //   const {
  //     localQuery,
  //     coords,
  //   } = this.context;

  //   localQuery({
  //     operationName: "MainMenuData",
  //     variables: {
  //       limit: 0,
  //       resourcesCenter: coords,
  //     },
  //   })
  //     .then(r => {

  //       const {
  //         ratings,
  //         resources: cities,
  //       } = r.data;



  //       this.setState({
  //         ratings,
  //         cities,
  //       });

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });

  // }

  // addTopic() {

  //   const {
  //     localQuery,
  //   } = this.context;


  //   localQuery({
  //     operationName: "addTopic",
  //   })
  //     .then(r => {

  //     })
  //     .catch(e => {
  //       console.error(e);
  //     });

  // }

  closeMenu() {

    // $('#navbar-main').removeClass("in");

    this.setState({
      citiesOpened: false,
    });

  }


  triggerGoal(goal) {

    const {
      triggerGoal,
    } = this.context;

    triggerGoal(goal);

  }


  logout() {

    const {
      logout,
    } = this.context;

    logout();

  }

  handleClose = () => {

    this.setState({
      opened: false,
    });

  }


  getDistDiff(coords, coords2) {

    let {
      lat,
      lng,
    } = coords;

    let {
      lat: lat2,
      lng: lng2,
    } = coords2;

    const {
      sqrt,
      abs,
      pow,
    } = Math;


    lat = lat && parseFloat(lat) || 0;
    lng = lng && parseFloat(lng) || 0;

    lat2 = lat2 && parseFloat(lat2) || 0;
    lng2 = lng2 && parseFloat(lng2) || 0;

    // console.log("getDistDiff coords", coords);
    // console.log("getDistDiff coords2", coords2);

    return sqrt(pow(abs(parseFloat(lat) - parseFloat(lat2)), 2) + pow(abs(parseFloat(lng) - parseFloat(lng2)), 2))
  }

  render() {

    let {
      coords,
      user,
      userActions,
      cities,
      // router: {
      //   route: {
      //     match: {
      //       params: {
      //         city: locationCity,
      //       },
      //     },
      //   },
      // },
      getGeoCoords,
    } = this.context;

    // const {
    //   user: currentUser,
    // } = user || {};

    // const {
    //   username,
    // } = currentUser || {};

    let {
      // ratings,
      // ratingsOpened,
      citiesOpened,
      // opened,
      mobileMenuOpened,
    } = this.state;

    let base_url = "/";

    let coordsUrl = '';

    let importantPage;

    if (coords) {

      const {
        lat,
        lng,
        zoom,
      } = coords;

      if (lat && lng && zoom) {

        coordsUrl += "@" + [lat, lng, zoom].join(",");
        base_url += coordsUrl;

      }

    }

    let citiesList = [];


    let mainCity

    if (cities) {

      cities = cities.filter(({ lat, lng }) => lat && lng);

      /**
       * Пересортировываем
       */


      // const {
      //   lat: lat2,
      //   lng: lng2,
      // } = getGeoCoords() || {}

      const center = getGeoCoords();


      if (center) {

        cities = cities.sort((a, b) => {

          const aDiff = this.getDistDiff(a, center);
          const bDiff = this.getDistDiff(b, center);

          // console.log("Distance diff ", aDiff, bDiff, center);

          if (aDiff > bDiff) {
            return 1;
          }
          else if (aDiff < bDiff) {
            return -1;
          }
          else {
            return 0
          }

        });

      }


      cities.map((city, index) => {


        if (index > 100) {
          return null;
        }

        const {
          id,
          name,
          coords,
          alias,
          // uri,
          lat,
          lng,
        } = city;

        // if (!lat || !lng) {
        //   return;
        // }

        // const {
        // } = coords;

        const link = `/${alias}/@` + [lat, lng, 12].join(",");


        citiesList.push(<li
          key={id}
        >
          <Link
            to={link}
            // href={link}
            onClick={event => {

              const {
                map,
                maps,
              } = global;

              if (maps) {

                const LatLng = new maps.LatLng({
                  lat,
                  lng,
                })

                map.setZoom(12);

                map.panTo(LatLng);

              }

              this.closeMenu();
            }}
          >
            {name}
          </Link>
        </li>);

      });

      mainCity = cities && cities[0];
    }





    // let ratingsList = [];

    // ratings && ratings.map(item => {

    //   const {
    //     Type
    //   } = item;

    //   if (!Type) {
    //     return;
    //   }

    //   const {
    //     id,
    //     name,
    //     uri,
    //   } = Type;

    //   const link = `/${uri}`;

    //   ratingsList.push(<li
    //     key={id}
    //   >
    //     <Link
    //       to={link}
    //       href={link}
    //       onClick={event => {
    //         // this.setState({
    //         //   ratingsOpened: false,
    //         // });
    //         this.closeMenu();
    //       }}
    //     >
    //       {name}
    //     </Link>
    //   </li>);

    // });


    // const mainCity = cities && cities[0];
    // const mainCity = cities && cities.find(n => locationCity ? n.alias === locationCity : n.name === "Москва");
    // const mainCity = cities && cities.find(n => n.name === "Москва");
    // let mainCity

    // if(cities){

    //   mainCity = cities.find(n => n.name === "Москва");
    // }


    return <div
      // className="navbar navbar-default"
      // className="navbar navbar-default navbar-fixed-top"
      className="navbar navbar-default"
      style={{
        marginBottom: 0,
      }}
    >
      <div className="container">
        <div className="navbar-header">
          <Link
            href={base_url}
            to={base_url}
            className="navbar-brand"
            title="Пивная карта, главная страница"
          >
            <div className="logo">
              <i className="str leaf leaf-l"></i>
              <span className="str">Пивная карта</span>
            </div>
          </Link>
          <button
            className="navbar-toggle"
            type="button"
            //  data-toggle="collapse" 
            //  data-target="#navbar-main"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              this.setState({
                mobileMenuOpened: !mobileMenuOpened,
              });
            }}
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div
          id="navbar-main"
          className={["navbar-collapse navbar-right", mobileMenuOpened ? "" : "collapse"].join(" ")}
        >
          <ul
            className="nav navbar-nav flex align-center"
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {mainCity
              && citiesList && citiesList.length && <li>
                <a
                  href={`/city/${coordsUrl}`}
                  title="Пиво и пабы в городах"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  onClick={event => {
                    event.preventDefault()
                    event.stopPropagation();

                    this.setState({
                      citiesOpened: !citiesOpened,
                    });
                  }}
                >
                  {mainCity.name} <i className="fa fa-angle-down"></i>
                </a>
                <ul
                  className="dropdown-menu"
                  style={{
                    display: citiesOpened ? 'block' : undefined,
                    maxHeight: "70vh",
                    overflow: "auto",
                  }}
                >

                  {citiesList}

                </ul>
              </li> || null
            }

            {/* {ratingsList && ratingsList.length && <li>
              <Link
                to="/ratings/"
                href="/ratings/"
                title="Рейтинги заведений"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                Рейтинги <i className="fa fa-angle-down"></i>
              </Link>
              <ul
                className="dropdown-menu"
                style={{
                  display: ratingsOpened ? 'block' : undefined,
                }}
              >
                {ratingsList}
              </ul>
            </li> || null} */}

            {importantPage
              ?
              <li>
                <Link
                  to={importantPage}
                  href={importantPage}
                  title="Важная новость"
                  className="flex align-center"
                  style={{
                    display: 'flex',
                  }}
                  onClick={event => {

                    const cookies = {};

                    cookies.set("importantArticleReaded", "1", { expires: 15 });

                    this.triggerGoal("importantArticle");

                    this.closeMenu();

                  }}
                >
                  <AtentionIcon
                    color="red"
                    style={{
                      marginRight: 3,
                    }}
                  />
                  Важная новость
                    </Link>
              </li>
              :
              null
            }

            {/* <li>
              <Link
                to="/place/showlist/"
                href="/place/showlist/"
                title="Все заведения"
                className="dropdown-toggle"
                data-toggle="dropdown"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                Заведения <i className="fa fa-angle-down"></i>
              </Link>
              <ul
                className="dropdown-menu"
              >
                <li
                  className="first"
                >

                  <Link
                    to="/place/showlist/"
                    href="/place/showlist/"
                    title="Все заведения"
                    onClick={event => {
                      this.closeMenu();
                    }}
                    style={{
                      paddingLeft: 25,
                      paddingRight: 25,
                    }}
                  >
                    Все заведения
                    </Link>

                </li>

              </ul>
            </li> */}

            <li>
              <Link
                to="/place/index/type/shop/"
                href="/place/index/type/shop/"
                title="Магазины"
                onClick={event => {
                  this.closeMenu();
                }}
              // style={{
              //   paddingLeft: 25,
              //   paddingRight: 25,
              // }}
              >
                Магазины
                </Link>
            </li>
            <li >
              <Link
                to="/place/index/type/bar/"
                href="/place/index/type/bar/"
                title="Магазины"
                onClick={event => {
                  this.closeMenu();
                }}
              // style={{
              //   paddingLeft: 25,
              //   paddingRight: 25,
              // }}
              >
                Бары
                </Link>
            </li>
            <li >
              <Link
                to="/place/index/type/brewery/"
                href="/place/index/type/brewery/"
                title="Пивоварни"
                onClick={event => {
                  this.closeMenu();
                }}
              // style={{
              //   paddingLeft: 25,
              //   paddingRight: 25,
              // }}
              >
                Пивоварни
                </Link>
            </li>



            <li
            >
              <Link
                to="/beer/showlist/"
                href="/beer/showlist/"
                title="Все сорта пива"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                Пиво
              </Link>
            </li>

            <li
            >
              <Link
                to="/blog/showlist/"
                title="Все блоги"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                Блоги
              </Link>
            </li>

            {/* 


            <li
            >
              <Link
                to="/profile/showlist/"
                href="/profile/showlist/"
                title="Люди"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                Люди
              </Link>
            </li>

            <li
            >
              <Link
                to="/comments/"
                title="Комментарии"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                Комментарии
              </Link>
            </li> */}

            <li
            >
              <Link
                to="/contacts.html"
                href="/contacts.html"
                title="Контакты"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                Контакты и сотрудничество
                </Link>
            </li>

            {user && user.sudo === true ? <li
            >
              <Link
                to="/letters"
                onClick={event => {
                  this.closeMenu();
                }}
              >
                CRM
              </Link>
            </li>
              : null
            }

            {/* <UserItem
              user={currentUser}
            /> */}

            <li
              className="last"
            >
              <Grid
                container
                spacing={0}
                alignItems="center"
              >
                {user
                  ?
                  [
                    <Grid
                      key="user"
                      item
                      style={{
                        paddingLeft: 10,
                      }}
                    >
                      <UserItem
                        key={user.id}
                        user={user}
                      />
                    </Grid>,
                    <Grid
                      key="logout"
                      item
                    >
                      <Button
                        onClick={() => this.logout()}
                        style={{
                          color: "#fff",
                        }}
                      >
                        Выход
                      </Button>

                    </Grid>
                  ]
                  :
                  <Grid
                    key="login"
                    item
                  >
                    <Button
                      onClick={e => {
                        // this.setState({
                        //   opened: true,
                        // });
                        const {
                          openLoginForm,
                        } = this.context;

                        openLoginForm();

                      }}
                      style={{
                        color: "#fff",
                      }}
                    >
                      <LoginIcon /> Войти
                    </Button>

                  </Grid>
                }
              </Grid>
            </li>

          </ul>



        </div>

      </div>

      {/* <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={opened}
        onClose={this.handleClose}
      >


      </Modal> */}

    </div>;
  }
}

