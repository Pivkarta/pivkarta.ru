import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  // NavLink,
  // Link,
  // BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import URI from 'urijs';

import Grid from 'material-ui/Grid';

import { YMaps } from 'react-yandex-maps';

import UserMenu from '../../UserMenu';

import MapPage from '../../../modules/Page/MapPage';
import MainPage from '../../../modules/Page/MainPage';
import UsersPage from '../../../modules/Page/Users';
import UserPage from '../../../modules/Page/Users/User';
import TopicsPage from '../../../modules/Page/Topics';
import TopicPage from '../../../modules/Page/Topics/Topic';
import TopicCreatePage from '../../../modules/Page/Topics/Topic/Create';
import CommentsPage from '../../../modules/Page/Comments';
import CommentPage from '../../../modules/Page/Comments/Comment';
// import WalletPage from '../../../modules/Page/Wallet';
// import TransactionsPage from '../../../modules/Page/Wallet/Transactions';
// import TransactionPage from '../../../modules/Page/Wallet/Transactions/Transaction';

import BeersPage from '../../../modules/Page/Beers';
import BeerPage from '../../../modules/Page/Beers/Beer';
import BeerCreatePage from '../../../modules/Page/Beers/Beer/Create';
import PlacesPage from '../../../modules/Page/Places';
import PlacePage from '../../../modules/Page/Places/Place';
import PlaceCreatePage from '../../../modules/Page/Places/Place/Create';
import ContactsPage from '../../../modules/Page/Contacts';
import LettersPage from '../../../modules/Page/Letters';
import LetterPage from '../../../modules/Page/Letters/Letter';
import LetterCreatePage from '../../../modules/Page/Letters/Letter/Create';
import LandingPage from '../../../modules/Page/Landing';

import CitiesPage from '../../../modules/Page/Cities/Cities';
import CityPage from '../../../modules/Page/Cities/City';


// import PageNotFound from '../../../modules/Page/404';

// import Auth from 'Auth';
// import Auth from '@prisma-cms/front/lib/modules/Auth';

import PageNotFound from '@prisma-cms/front/lib/components/pages/404/';


import { Renderer as PrismaCmsRenderer } from "@prisma-cms/front";
import { withStyles } from 'material-ui';

// import ReactEncrypt from 'react-encrypt/src';

// const Web3 = require('web3');

import Context from "@prisma-cms/context";

export class Renderer extends PrismaCmsRenderer {

  // static propTypes = {
  //   // prop: PropTypes
  // }

  state = {
    // encryptKey: "asdasd",
    ...super.state,
    authOpen: false,
  }

  static defaultProps = {
    ...PrismaCmsRenderer.defaultProps,
    // googleMapApiKey: "AIzaSyDDC9hsFsRJxjsIWJpuuQrrQOt4QZ-xFKA",
    googleMapApiKey: "AIzaSyCLG6Pe_kuYiu7jquuCHBxO1fPo4-1dQfc",
  };

  static contextTypes = {
    ...PrismaCmsRenderer.contextTypes,
    router: PropTypes.object.isRequired,
    onAuthSuccess: PropTypes.func.isRequired,
    uri: PropTypes.object.isRequired,
  };



  static childContextTypes = {
    ...PrismaCmsRenderer.childContextTypes,
    location: PropTypes.object,
    web3: PropTypes.object,
    googleMapApiKey: PropTypes.string,
    ymaps: PropTypes.object,
    openLoginForm: PropTypes.func,
  }

  getChildContext() {

    const location = this.getLocation();

    const {
      googleMapApiKey,
    } = this.props;

    const {
      web3,
      ymaps,
    } = this.state;

    const context = super.getChildContext && super.getChildContext() || null;

    return {
      ...context,
      web3,
      location,
      ymaps,
      googleMapApiKey,
      openLoginForm: this.openLoginForm,
    }

  }


  openLoginForm = (event) => {
    this.setState({
      authOpen: true,
    });
  }


  getLocation() {

    const {
      router,
    } = this.context;

    const {
      history: {
        location,
      },
    } = router;

    const {
      pathname,
      search,
    } = location;

    const uri = new URI(`${pathname}${search}`);

    // console.log('uri', uri);

    return {
      pathname,
      search: uri.query(true),
    }

  }


  // componentWillMount(){

  //   // var web3 = new Web3(new Web3.providers.HttpProvider("http://cryptobook.cloud:8545/"));

  //   const {
  //     protocol,
  //     hostname,
  //   } = window.location;

  //   const web3 = new Web3(new Web3.providers.HttpProvider(`${protocol}//${hostname}/geth/`));

  //   Object.assign(this.state, {
  //     web3,
  //   })

  //   window.web3 = web3;

  // }



  renderMap = props => {

    // const {
    //   uri,
    // } = this.context;

    // const {
    //   beer_id,
    // } = uri.query(true);

    let center;
    let zoom;

    const {
      params: {
        lat,
        lng,
        zoom: matchZoom,
      },
    } = props.match;

    if (lat && lng && matchZoom) {

      center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };

      zoom = matchZoom;

    }


    // Поисковая строка для карты
    const mapSearchQuery = this.getSearchQuery("src/modules/query");
    const mapBeerSearchQuery = this.getSearchQuery("beer");
    const mapBeerIdSearchQuery = parseInt(this.getSearchQuery("beer_id"));


    // Поиск по названию
    // const {
    //   searchQuery: value,
    // } = this.state;

    // const value = mapSearchQuery;

    let where = {};
    let words = [];
    let AND = this.stringToArrayCondition(mapSearchQuery);

    let BeersWhereAND = this.stringToArrayCondition(mapBeerSearchQuery);

    // if (value && value.length) {

    //   // Разбиваем на отдельные слова
    //   words = value.split(" ").filter(n => n.length > 1);

    //   if (words.length > 0) {

    //     words.map(n => {

    //       AND.push({
    //         name_contains: n,
    //       });

    //     });

    //   }

    // }




    if (AND.length) {

      where.AND = AND;

    }


    if (mapBeerIdSearchQuery) {
      BeersWhereAND.push({
        beer_id: parseInt(mapBeerIdSearchQuery),
      });
    }

    // console.log("BeersWhereAND", BeersWhereAND);

    if (BeersWhereAND.length) {
      Object.assign(where, {
        beers_some: {
          Beer: {
            AND: BeersWhereAND,
          },
        },
      });
    }

    // console.log("where", where);


    return <MapPage
      // key="map"
      first={0}
      where={where}
      center={center}
      zoom={zoom ? parseInt(zoom) : undefined}
      mapSearchQuery={mapSearchQuery || ""}
      mapBeerSearchQuery={mapBeerSearchQuery || ""}
      mapBeerIdSearchQuery={mapBeerIdSearchQuery || ""}
      {...props}
    />

  };


  stringToArrayCondition(value) {
    let words = [];
    let AND = [];

    if (value && value.length) {

      // Разбиваем на отдельные слова
      words = value.split(" ").filter(n => n.length > 1);

      if (words.length > 0) {

        words.map(n => {

          AND.push({
            name_contains: n,
          });

        });

      }
    }

    return AND;
  }


  renderPlaces = props => {

    const {
      match: {
        params,
      }
    } = props;

    const {
      type,
    } = params;


    return <PlacesPage
      key={type}
      type={type}
      // where={{
      //   OR: [{
      //     is_request: null
      //   }, {
      //     is_request: 0
      //   }],
      // }}
      {...props}
    />

  }


  renderPlace = props => {


    const {
      match: {
        params,
      }
    } = props;

    const {
      placeId,
    } = params;

    // return null;
    return <PlacePage
      key={placeId}
      where={{
        place_id: parseInt(placeId),
      }}
      {...props}
    />
  }


  renderCity = props => {


    const {
      match: {
        params,
      }
    } = props;

    const {
      cityAlias,
      type,
    } = params;

    // return null;
    return <CityPage
      key={`${cityAlias}-${type}`}
      type={type}
      where={{
        alias: cityAlias,
      }}
      {...props}
    />
  }

  getSearchQuery(field) {

    const {
      router: {
        history: {
          location: {
            pathname,
            search,
          },
        }
      },
    } = this.context;


    let uri = new URI(pathname);
    uri.query(search);

    // console.log("getSearchQuery", uri.query(true));

    return uri.query(true)[field] || "";
  }


  onAuthSuccess = data => {

    const {
      onAuthSuccess,
    } = this.context;

    onAuthSuccess(data);

  }


  renderBeer = props => {


    const {
      match: {
        params,
      }
    } = props;

    const {
      beerId,
    } = params;

    // return null;
    return <BeerPage
      key={beerId}
      beer_id={parseInt(beerId)}
      {...props}
    />
  }


  getRoutes() {

    let routes = super.getRoutes().filter(n => [
      "/",
      "/users",
      "/users/:userId",
      "*",
    ].indexOf(n.path) === -1);

    // console.log("routes", routes);

    return routes;
  }


  renderWrapper() {

    // return "renderWrapper2";

    const wrapper = <Context.Consumer>
      {context => <Context.Provider
        value={Object.assign(context, this.getChildContext())}
      >
        <div
          id="content"
          style={{
            // border: "1px solid red",
            overflow: "auto",
            flex: "1 1",
          }}
        >
          <Switch>


            <Route
              exact
              path={"/"}
              component={MainPage}
            // render={this.renderMap}
            />


            {this.getRoutes().map(n => {
              const {
                path,
              } = n;

              return <Route
                key={path}
                {...n}
              />
            })}


            <Route
              exact
              // path={"/:city/@:lat,:lng,:zoom"}

              path={"/map/"}
              // path={"/@:lat,:lng,:zoom"}
              render={this.renderMap}
            />

            <Route
              exact
              // path={"/:city/@:lat,:lng,:zoom"}

              path={"/map/@:lat,:lng,:zoom"}
              // path={"/@:lat,:lng,:zoom"}
              render={this.renderMap}
            />

            <Route
              exact
              // path={"/:city/@:lat,:lng,:zoom"}

              path={"/city/:city/@:lat,:lng,:zoom"}
              // path={"/@:lat,:lng,:zoom"}
              render={this.renderMap}
            />

            <Route
              exact
              // path={"/:city/@:lat,:lng,:zoom"}

              path={"/:city/@:lat,:lng,:zoom"}
              // path={"/@:lat,:lng,:zoom"}
              render={this.renderMap}
            />


            <Route
              path="/topics/create"
              component={TopicCreatePage}
            />

            <Route
              path="/topics/:url_name"
              render={props => {


                const {
                  match: {
                    params,
                  }
                } = props;

                const {
                  url_name,
                } = params;

                // return null;
                return <TopicPage
                  key={url_name}
                  where={{
                    url_name,
                  }}
                  {...props}
                />
              }}
            />

            <Route
              exact
              path="/blog/showlist"
              component={TopicsPage}
            />

            <Route
              path="/blog/show/:topicId"
              render={props => {

                const {
                  match: {
                    params,
                  }
                } = props;

                const {
                  topicId,
                } = params;

                // return null;
                return <TopicPage
                  key={topicId}
                  where={{
                    topic_id: parseInt(topicId),
                  }}
                  {...props}
                />
              }}
            />


            <Route
              exact
              path="/beer/showlist/"
              component={BeersPage}
            />

            <Route
              exact
              path="/:city/beer/showlist/"
              component={BeersPage}
            />

            <Route
              exact
              path="/:city/sort/showlist/"
              component={BeersPage}
            />

            <Route
              exact
              path="/beer/create/"
              component={BeerCreatePage}
            />

            <Route
              exact
              path="/beer/:beerId/:beerAlias"
              render={this.renderBeer}
            />

            <Route
              // exact
              path="/sort/show/:beerId"
              render={this.renderBeer}
            />

            <Route
              exact
              path="/:city/sort/show/:beerId"
              render={this.renderBeer}
            />

            <Route
              exact
              path="/:city/sort/show/:beerId/:beerAlias"
              render={this.renderBeer}
            />

            <Route
              exact
              path="/beer/:beerId"
              render={props => {


                const {
                  match: {
                    params,
                  }
                } = props;

                const {
                  beerId,
                } = params;

                // return null;
                return <BeerPage
                  key={beerId}
                  beer_id={parseInt(beerId)}
                  {...props}
                />
              }}
            />


            <Route
              path="/topics"
              component={TopicsPage}
            />



            <Route
              exact
              path="/places/create/"
              component={PlaceCreatePage}
            />

            <Route
              exact
              path={[
                "/place/index/type/:type/@:lat,:lng,:zoom",
              ]}
              render={this.renderPlaces}
            />

            <Route
              exact
              path={[
                "/place/index/type/:type/",
              ]}
              render={this.renderPlaces}
            />

            <Route
              exact
              path="/:city/place/showlist/"
              render={this.renderPlaces}
            />

            <Route
              exact
              path={[
                "/place/showlist",
                "/place/showlist/@:lat,:lng,:zoom",
              ]}
              component={PlacesPage}
            />


            {/* 
        Пока для заведений оставлю более жадные УРЛы, чтобы 404-ых меньше было
       */}
            <Route
              // exact
              path={[
                "/place/show/:placeId",
              ]}
              render={this.renderPlace}
            />

            <Route
              // exact
              path={[
                "/:city/place/show/:placeId",
              ]}
              render={this.renderPlace}
            />

            <Route
              // exact
              path={[
                "/:city/place/show/:placeId/:placeAlias",
              ]}
              render={this.renderPlace}
            />


            <Route
              exact
              path={[
                "/place/:placeId/:placeAlias/@:lat,:lng,:zoom",
              ]}
              render={this.renderPlace}
            />

            <Route
              exact
              path={[
                "/place/:placeId/:placeAlias",
              ]}
              render={this.renderPlace}
            />


            <Route
              exact
              path={[
                "/place/:placeId/",
              ]}
              render={props => {


                const {
                  match: {
                    params,
                  }
                } = props;

                const {
                  placeId,
                } = params;

                // return null;
                return <PlacePage
                  key={placeId}
                  where={{
                    place_id: parseInt(placeId),
                  }}
                  {...props}
                />
              }}
            />



            <Route
              path="/profile/showlist"
              component={UsersPage}
            />


            <Route
              path={[
                "/profile/show/:user_id",
                "/profile/:username",
              ]}
              render={(props) => {

                const {
                  params,
                } = props.match;

                const {
                  user_id,
                  username,
                } = params || {};

                return <UserPage
                  key={`${user_id}_${username}`}
                  where={{
                    user_id: parseInt(user_id),
                    username,
                  }}
                  {...props}
                />

              }}
            />


            <Route
              exact
              path="/letters"
              component={LettersPage}
            />


            <Route
              exact
              path="/letters/create"
              component={LetterCreatePage}
            />

            <Route
              exact
              path="/letters/:letterId"
              render={(props) => {

                const {
                  params,
                } = props.match;

                const {
                  letterId,
                } = params || {};

                return <LetterPage
                  key={letterId}
                  where={{
                    id: parseInt(letterId),
                  }}
                  {...props}
                />

              }}
            />


            <Route
              exact
              path="/contacts.html"
              component={ContactsPage}
            />

            <Route
              exact
              path="/comments"
              component={CommentsPage}
            />

            <Route
              exact
              path="/comments/comment-:comment_id.html"
              render={(props) => {

                const {
                  params,
                } = props.match;

                const {
                  comment_id,
                } = params || {};

                return <CommentPage
                  key={comment_id}
                  where={{
                    comment_id: parseInt(comment_id),
                  }}
                  {...props}
                />

              }}
            />


            {/* <Route
        path="/wallet/tx/:transactionHash"
        render={(props) => {

          const {
            params,
          } = props.match;

          const {
            transactionHash,
          } = params || {};

          return <TransactionPage
            key={transactionHash}
            transactionHash={transactionHash}
            {...props}
          />

        }}
      />
      <Route path="/wallet/tx" component={TransactionsPage} />
      <Route path="/wallet" component={WalletPage} /> */}



            <Route
              exact
              path="/city"
              component={CitiesPage}
            />


            <Route
              exact
              path={[
                "/:cityAlias/place/index/type/:type/@:lat,:lng,:zoom",
              ]}
              render={this.renderCity}
            />

            <Route
              exact
              path={[
                "/:cityAlias/place/index/type/:type",
              ]}
              render={this.renderCity}
            />


            <Route
              exact
              path="/:cityAlias"
              render={this.renderCity}
            />


            <Route path="*" component={PageNotFound} />

          </Switch>
        </div>
      </Context.Provider>}
    </Context.Consumer>


    const menu = <UserMenu
      key="menu"
    />


    let mainSwitch = <Fragment
    >


      <div
        // container
        // spacing={0}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <div
          // item
          // xs={12}
          style={{
            position: "sticky",
            top: 0,
            // marginBottom: 20,
            zIndex: 2,
          }}
        >

          {menu}

        </div>


        {wrapper}



        {/* </div> */}

      </div>

      {/* {errorsRender} */}


      <YMaps
        key="yaMap"
        children={(ymaps) => {
          if (ymaps && !this.state.ymaps) {
            this.state.ymaps = ymaps;
            this.setState({
              ymaps,
            });
          }
          return null;
        }}
      />

      {/* </ReactEncrypt> */}

      {/* <Auth
        open={authOpen}
        loginComplete={data => {
          this.setState({
            authOpen: false,
          });
          this.onAuthSuccess(data);
        }}
        loginCanceled={data => {
          this.setState({
            authOpen: false,
          });
        }}
      /> */}

    </Fragment>;


    return <Switch>

      <Route
        exact
        path="/landing"
        component={LandingPage}
      />

      <Route
        path="*"
        render={() => {
          return mainSwitch;
        }}
      />

    </Switch>

  }


  // render() {


  //   const {
  //     errors,
  //   } = this.context;

  //   const {
  //     // encryptKey,
  //     authOpen,
  //   } = this.state;


  //   let errorsRender;



  //   if (errors && errors.length) {

  //     errorsRender = (<div
  //       key="errors"
  //     >

  //       {errors.map((error, index) => {

  //         const {
  //           message,
  //         } = error;

  //         return <div
  //           key={index}
  //         >
  //           {message}
  //         </div>

  //       })}

  //     </div>);

  //   }

  //   const menu = <UserMenu
  //     key="menu"
  //   />


  //   let mainSwitch = <Fragment
  //   >


  //     <div
  //       // container
  //       // spacing={0}
  //       style={{
  //         height: "100%",
  //         display: "flex",
  //         flexDirection: "column",
  //       }}
  //     >

  //       <div
  //         // item
  //         // xs={12}
  //         style={{
  //           position: "sticky",
  //           top: 0,
  //           // marginBottom: 20,
  //           zIndex: 2,
  //         }}
  //       >

  //         {menu}

  //       </div>


  //       {this.renderWrapper()}



  //       {/* </div> */}

  //     </div>

  //     {errorsRender}


  //     <YMaps
  //       key="yaMap"
  //       children={(ymaps) => {
  //         if (ymaps && !this.state.ymaps) {
  //           this.state.ymaps = ymaps;
  //           this.setState({
  //             ymaps,
  //           });
  //         }
  //         return null;
  //       }}
  //     />

  //     {/* </ReactEncrypt> */}

  //     <Auth
  //       open={authOpen}
  //       loginComplete={data => {
  //         this.setState({
  //           authOpen: false,
  //         });
  //         this.onAuthSuccess(data);
  //       }}
  //       loginCanceled={data => {
  //         this.setState({
  //           authOpen: false,
  //         });
  //       }}
  //     />

  //   </Fragment>;






  //   return (

  //     <Switch>

  //       <Route
  //         exact
  //         path="/landing"
  //         component={LandingPage}
  //       />

  //       <Route
  //         path="*"
  //         render={() => {
  //           return mainSwitch;
  //         }}
  //       />

  //     </Switch>

  //   )
  // }
}

export default Renderer;