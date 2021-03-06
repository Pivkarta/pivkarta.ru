import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SideBarBlock from 'src/modules/map-sidebar-react/src/components/Block';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Clear';
import SearchIcon from 'material-ui-icons/Search';

import YandexSearch from 'src/modules/YandexMap/Search';


import Autocomplete from 'src/modules/autocomplete'

import ItemsPanel from './ItemsPanel';

import { compose, graphql } from 'react-apollo'
import { withStyles } from 'material-ui/styles/';
import gql from 'graphql-tag';

import URI from 'urijs';

// import {
//   // company,
//   mapGeoObjectsConnection as mapSearchGeoObjectsConnection,
// } from 'src/modules/query';

const mapSearchGeoObjectsConnection = gql`
  query mapGeoObjectsConnection(
    $first: Int!
    $where: PlaceWhereInput
    $center: CoordsInput
  ){
    mapData: mapGeoObjectsConnection(
      first: $first
      where: $where
      center: $center
    ){
      aggregate{
        count
      }
      objects{
        id
        lat
        lng
        is_bar
        is_shop
        is_brewery
        uri
        minPrice
        maxPrice
        name
        image
        address
        url_name
        uri
      }
    }
  }

`;


const styles = {
  root: {

  },
  rootShadow: {
    // background: "rgba(0, 19, 25, 0.6)",
    // padding: 5,
  },
  icon: {
    color: "#ababab",
  },
  searchSubmit: {
    background: "#01a9d6",
    color: "#fff",
    paddingLeft: 3,
    paddingRight: 3,
    minWidth: 65,
  },
};


/**
 * При изменении значения поисковой строки, меняется и внешнее значение запроса,
 * и локальное значение стейта, так как prevContext больше нет в componentDidUpdate
 */

export class SidebarSearchBlock extends Component {

  static propTypes = {
    map: PropTypes.object.isRequired,
    maps: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
    mapSearch: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    mapSearchQuery: PropTypes.string.isRequired,
    mapBeerSearchQuery: PropTypes.string.isRequired,
    mapBeerIdSearchQuery: PropTypes.string.isRequired,
  };

  state = {
    suggestions: [],
    places: null,
  }


  constructor(props) {
    super(props);

  }



  componentDidMount() {

    this.setState({
      searchQuery: this.getSearchQuery(),
      beersSearchQuery: this.getSearchQuery("mapBeerSearchQuery"),
    });

    // this.search();

  }


  componentDidUpdate(prevProps, prevState) {

    const {
      lat: prevLat,
      lng: prevLng,
    } = prevProps;

    const {
      lat,
      lng,
    } = this.props;


    // const {
    //   searchQuery,
    // } = this.state;

    const searchQuery = this.getSearchQuery();
    const mapBeerSearchQuery = this.getSearchQuery("mapBeerSearchQuery");


    const {
      searchQuery: prevSearchQuery,
      mapBeerSearchQuery: prevMapBeerSearchQuery,
    } = prevState;




    let needSearch = false;


    if (
      ((searchQuery || prevSearchQuery) && searchQuery !== prevSearchQuery)
    ) {
      // this.setState({
      //   searchQuery,
      // }, () => {
      //   this.search();
      // });
      this.state.searchQuery = searchQuery;
      // this.search();
      needSearch = true;
    }

    if (
      ((mapBeerSearchQuery || prevMapBeerSearchQuery) && mapBeerSearchQuery !== prevMapBeerSearchQuery)
    ) {
      // this.setState({
      //   searchQuery,
      // }, () => {
      //   this.search();
      // });
      this.state.mapBeerSearchQuery = mapBeerSearchQuery;
      // this.search();
      needSearch = true;
    }

    if (
      ((lat || prevLat) && lat !== prevLat)
      ||
      ((lng || prevLng) && lng !== prevLng)
    ) {
      // this.search();
      needSearch = true;
    }

    needSearch && this.search();

  }



  onInputChange = event => {

    const {
      value,
    } = event.target;

    const {
      mapSearch,
    } = this.context;

    mapSearch(value);

  }

  onBeerChange = event => {

    const {
      value,
    } = event.target;

    const {
      mapSearch,
    } = this.context;

    mapSearch(value, "beer");

  }


  search = async () => {


    const {
      searchQuery: value,
      mapBeerSearchQuery,
    } = this.state;


    const {
      client,
      mapBeerIdSearchQuery,
    } = this.context;

    // const value = this.getSearchQuery();



    let mapBeerSearchQueryAND = this.stringToArrayCondition(mapBeerSearchQuery);


    let words = [];

    let AND = [];

    if(mapBeerIdSearchQuery){
      mapBeerSearchQueryAND.push({
        beer_id: mapBeerIdSearchQuery,
      });
    }

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
    // else{
    //   return;
    // }



    let placesWhere = {};


    if(AND.length){

      Object.assign(placesWhere, {
        AND,
      });

    }


    if(mapBeerSearchQueryAND.length){

      Object.assign(placesWhere, {
        beers_some: {
          Beer: {
            AND: mapBeerSearchQueryAND,
          },
        },
      });

    }


    if (Object.keys(placesWhere).length > 0) {


      const {
        map,
      } = this.props;


      let {
        lat,
        lng,
      } = map.getCenter();


      lat = lat();
      lng = lng();

      /**
       * Поиск заведений
       */

      let result;


      let center;

      if (lat && lng) {
        center = {
          lat,
          lng,
        };
      }


      let variables = {
        first: 10,
        where: {
          ...placesWhere,
          // name_contains: value,
          // AND,
          // OR: {
          //   beers_some: {
          //     Beer: {
          //       AND,
          //     },
          //   },
          // },

          // OR: [
          //   {
          //     AND,
          //   },
          //   {
          //     beers_some: {
          //       Beer: {
          //         AND,
          //       },
          //     },
          //   },
          // ],
        },
        // type: "Company",
        center,
      };




      client.query({
        query: mapSearchGeoObjectsConnection,
        variables,
        fetchPolicy: "network-only",
      })
        .then(result => {

          const {
            mapData: places,
          } = result && result.data || {}

          // const {
          //   objects,
          // } = mapData || {};




          // objects && objects.map(n => {



          //   // const {
          //   //   id,
          //   //   name,
          //   //   // Company: {
          //   //   //   name,
          //   //   // },
          //   // } = n;

          //   // suggestions.push({
          //   //   value: id,
          //   //   label: name,
          //   // });
          //   // suggestions.push({
          //   //   value: id,
          //   //   label: name,
          //   // });

          // });

          // suggestions = objects && objects || [];




          this.setState({
            // suggestions,
            places,
          });
        })
        .catch(error => {
          console.error("onInputChange error", error);
        });




    }
    else {
      this.setState({
        places: {},
        // beersConnection: null,
      });
    }


    let beersWhere = {};

    if(mapBeerSearchQueryAND && mapBeerSearchQueryAND.length){
      beersWhere = {
        // name_contains: value,
        AND: mapBeerSearchQueryAND,
      }
    }




    if(Object.keys(beersWhere).length > 0){

      /**
       * Поиск пива
       */

      const beerQuery = gql`
        query beers (
          $first:Int = 10
          $where: BeerWhereInput
        ){
          beersConnection(
            first: $first
            where: $where
          ){
            aggregate{
              count
            }
            edges {
              node {
                id
                beer_id
                name
                image
                url_name
                uri
                region
                container
                container_str
              }
            }
          }
        } 
      `;


      let beersVariables = {
        where: beersWhere,
      };


      client.query({
        query: beerQuery,
        variables: beersVariables,
      })
        .then(result => {



          let beers;

          const {
            beersConnection,
          } = result && result.data || {};

          this.setState({
            beersConnection,
          });

        })
        .catch(console.error);
    }
    else{
      this.setState({
        beersConnection: null,
      });
    }

  }

  // onSearch() {

  //   const {
  //     searchQuery,
  //   } = this.state;

  //   const {
  //     onSearch,
  //   } = this.props;

  //   return onSearch(searchQuery);

  // }


  getSearchQuery(field = "mapSearchQuery") {

    const {
      [field]: value,
    } = this.context;

    return value || "";


    // const {
    //   router: {
    //     history: {
    //       location: {
    //         pathname,
    //         search,
    //       },
    //     }
    //   },
    // } = this.context;


    // let uri = new URI(pathname);
    // uri.query(search);



    // return uri.query(true).query || "";
  }




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


  render() {

    const {
      map,
      maps,
      onSearchSelect,
      className,
      classes,
      lat,
      lng,
      ...other
    } = this.props;

    const {
      suggestions,
      // searchQuery,
      places,
      beersConnection,
    } = this.state;


    const searchQuery = this.getSearchQuery();
    const mapBeerSearchQuery = this.getSearchQuery("mapBeerSearchQuery");
    const mapBeerIdSearchQuery = this.getSearchQuery("mapBeerIdSearchQuery");



    return (
      <SideBarBlock
        className={[className].join(" ")}
        style={{
          overflow: "auto",
        }}
      >
        <Grid
          container
          className={classes.rootShadow}
          spacing={0}
          alignItems="center"
          style={{
            // border: "1px solid red",
          }}
        >
          <Grid
            item
            xs
            style={{
              display: "flex",
              // border: "1px solid blue",
              overflow: "hidden",
              flexFlow: "column",
              maxHeight: "100%",
            }}
          >
            <Paper
              style={{
                padding: 3,
                flex: "0 0  auto",
                // border: "1px solid green",
              }}
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();


                  // this.onSearch();
                }}
              >

                <Grid
                  container
                  spacing={8}
                  alignItems="baseline"
                >

                  <Grid
                    item
                    xs={6}
                  >


                    <Autocomplete
                      onChange={this.onInputChange}
                      value={searchQuery || ""}
                      onSelect={() => { }}
                      inputProps={{
                        label: "Заведение",
                        // placeholder: "Минимум 2 символа",
                        placeholder: "Поиск заведений",
                        // helperText: "Поиск заведений по названию",
                      }}
                    />


                  </Grid>

                  <Grid
                    item
                    xs={6}
                  >

                    <Autocomplete
                      onChange={this.onBeerChange}
                      value={mapBeerSearchQuery || ""}
                      onSelect={() => { }}
                      inputProps={{
                        label: "Пиво",
                        // placeholder: "Минимум 2 символа",
                        placeholder: "Поиск пива",
                        // helperText: "Поиск пива по названию",
                      }}
                    />


                  </Grid>

                  {/* <Grid
                    item
                  >
                    <IconButton
                      type="submit"
                    // className={classes.searchSubmit}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Grid> */}

                </Grid>

              </form>
            </Paper>

            <ItemsPanel
              places={places}
              beersConnection={beersConnection}
              lat={lat}
              lng={lng}
              map={map}
              maps={maps}
              style={{
                overflow: "auto",
                flex: "1 1 auto",
                // border: "1px solid blue",
              }}
            />

          </Grid>
          <Grid
            item
          // xs
          >

          </Grid>

          {/* <Grid
            item
          >
            <IconButton>
              <CloseIcon
                className={classes.icon}
              />
            </IconButton>
          </Grid>
        */}
        </Grid>

      </SideBarBlock>
    )
  }
}

// export default graphql(mapGeoObjectsConnection, {
//   options: props => {

//     return {
//       variables: {
//         first: 10,
//       },
//     };
//   },
// })(SidebarSearchBlock);

export default withStyles(styles)(SidebarSearchBlock);