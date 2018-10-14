import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SideBarBlock from 'src/modules/map-sidebar-react/src/components/Block';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Clear';
import SearchIcon from 'material-ui-icons/Search';

import YandexSearch from '../../../../../components/YandexMap/Search';

import {
  // company,
  mapSearchGeoObjectsConnection,
} from '../../../../../components/App/constants/queries';

import { compose, graphql } from 'react-apollo'
import { withStyles } from 'material-ui/styles/';

const styles = {
  root: {

  },
  rootShadow: {
    background: "rgba(0, 19, 25, 0.6)",
    padding: 5,
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

export class SidebarSearchBlock extends Component {

  static propTypes = {
    map: PropTypes.object.isRequired,
    maps: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    client: PropTypes.object.isRequired,
  };

  state = {
    suggestions: [],
  }

  onInputChange = async value => {



    let suggestions = [];


    if (value) {

      let result;

      const {
        client,
      } = this.context;

      result = await client.query({
        query: mapSearchGeoObjectsConnection,
        variables: {
          first: 10,
          where: {
            name_contains: value,
          },
          type: "Company",
        },
        // fetchPolicy: "network-only",
      })
        .catch(error => {
          console.error("onInputChange error", error);
        });

      const {
        mapData,
      } = result.data || {}

      const {
        objects,
      } = mapData || {};


      objects && objects.map(n => {



        const {
          id,
          Company: {
            name,
          },
        } = n;

        suggestions.push({
          value: id,
          label: name,
        });

      });




    }


    this.setState({
      suggestions,
      searchQuery: value,
    });

  }

  
  onSearch(){

    const {
      searchQuery,
    } = this.state;

    const {
      onSearch,
    } = this.props;

    return onSearch(searchQuery);

  }


  render() {

    const {
      map,
      maps,
      onSearchSelect,
      className,
      classes,
      ...other
    } = this.props;

    const {
      suggestions,
      searchQuery,
    } = this.state;


    return (
      <SideBarBlock
        className={[className].join(" ")}
      >
        <Grid
          container
          className={classes.rootShadow}
          spacing={0}
          alignItems="center"
        >
          <Grid
            item
            xs
          // md={8}
          // lg={6}
          >
            <Paper
              style={{
                padding: 3,
              }}
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();


                  this.onSearch();
                }}
              >

                <Grid
                  container
                  spacing={0}
                // alignItems="center"
                >

                  <Grid
                    item
                    xs
                  >
                    <YandexSearch
                      map={map}
                      maps={maps}
                      // value={"Эывавыа"}
                      suggestions={suggestions}
                      // suggestions={
                      //   [{
                      //     value: "Эывавыа",
                      //     label: "Эывавыа",
                      //   }]
                      // }
                      autoBlur={false}
                      clearable={false}
                      onBlurResetsInput={false}
                      // onSelectResetsInput={false}
                      // searchable={false}
                      placeholder=""
                      // inputProps={{
                      //   value: "Sdfdsf",
                      // }}
                      // inputRenderer={props => {

                      //   const {
                      //     ...other
                      //   } = props;
                      //   return <input 
                      //   {...other}
                      //     // placeholder="Поиск"
                      //     value={searchQuery || ""}
                      //   />
                      // }}
                      onSelect={(event, item, maps, map) => {



                        let {
                          coordinates: {
                            0: lat,
                            1: lng,
                          },
                        } = item;



                        const center = {
                          lat,
                          lng,
                        };

                        return onSearchSelect ? onSearchSelect(event, item, center, maps, map) : null;

                      }}
                      onInputChange={this.onInputChange}
                      style={{
                        // minWidth: 300,
                        // width: 400,
                        width: "100%",
                        // left: "-50%",
                      }}
                      {...other}
                      onChange={async value => {



                        // const item = suggestions.find(n => n.id === value);



                        // alert(suggestions.length);
                        // alert(this.state.suggestions.length);

                        const {
                          client,
                        } = this.context;

                        const response = await client.query({
                          query: mapSearchGeoObjectsConnection,
                          variables: {
                            first: 1,
                            where: {
                              id: value,
                            },
                          },
                        })
                          .catch(e => {
                            console.error(e);
                          });

                        const {
                          mapData,
                        } = response.data || {}


                        const {
                          objects,
                        } = mapData || {};

                        const object = objects ? objects[0] : null;

                        const {
                          lat,
                          lng,
                        } = object || {};

                        if (lat && lng) {

                          const coords = {
                            lat,
                            lng,
                          };

                          const LatLng = new maps.LatLng(coords)

                          map.setZoom(17);

                          map.panTo(LatLng);

                          // Сдвигаем так, чтобы получилось половина в видимой части

                          const {
                            offsetWidth,
                          } = global.document.body;

                          const halfWidth = offsetWidth / 2;

                          map.panBy(-halfWidth + 200, 0);

                        }



                      }}
                    />
                  </Grid>

                  <Grid
                    item
                  >
                    <Button
                      type="submit"
                      className={classes.searchSubmit}
                    >
                      <SearchIcon />
                    </Button>
                  </Grid>

                </Grid>

              </form>
            </Paper>
          </Grid>
          <Grid
            item
          // xs
          >

          </Grid>
          <Grid
            item
          >
            <IconButton>
              <CloseIcon
                className={classes.icon}
              />
            </IconButton>
          </Grid>
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