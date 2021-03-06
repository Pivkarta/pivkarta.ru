import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SideBar from 'src/modules/map-sidebar-react/src/components/SideBar';
import SideBarBlock from 'src/modules/map-sidebar-react/src/components/Block';

import SearchBlock from './Search';
// import GeoObjectsBlock from './GeoObjects';
// import CompanyBlock from './Company';


import { withStyles } from 'material-ui/styles/';

import URI from 'urijs';

const styles = {
  wrapper: {
    width: "400px",
    maxWidth: "calc(100vw - 25px)",
  },
  wrapperExtended: {
    width: "60vw",
    maxWidth: "800px",
  },
};


const availableBlocks = {
  search: {
    extended: false,
  },
  objectsList: {

  },
  object: {},
};

export class MapMainSideBar extends Component {

  static propTypes = {
    map: PropTypes.object,
    maps: PropTypes.object,
    classes: PropTypes.object.isRequired,
  }

  static contextTypes = {
    mapItems: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired,
  }


  state = {
    /**
     * Блоки:
     */
    // blocks: [],
  }


  onSearch(query) {

    const {
      router,
    } = this.context;

    const {
      history,
    } = router;

    const {
      location,
    } = history;

    let {
      pathname,
      search,
    } = location;

    let uri = URI(pathname).query(search);

    // let params = uri.query(true);

    // let paths = pathname.split("/").filter(n => n);
    let paths = pathname.split("/");

    // Находим УРЛ-элемент для замены
    let index = paths.indexOf("search");

    if (index !== -1) {
      // paths.splice(index, 2);
      // paths.splice(index, 0, query);
    }
    else {
      paths.splice(2, 0, "search");
      index = 2;
    }

    paths[index + 1] = query;

    // paths.unshift("");
    uri = uri.directory(paths.join("/"));




    history.push(uri.toString());

  }

  render() {


    const {
      mapItems,
      router,
    } = this.context;

    const {
      map,
      maps,
      classes,
    } = this.props;


    const {
      route: {
        location,
        match: {
          params: {
            query,
            companyId,
          },
        },
      },
    } = router;


    let {
      lat,
      lng,
    } = map && map.getCenter() || {};

    lat = lat ? lat() : null;
    lng = lng ? lng() : null;






    let wrapperClass = classes.wrapper;

    if (query || companyId) {
      wrapperClass = classes.wrapperExtended;
    }

    // Выводимые блоки
    let blocks = [];

    let items = [];

    mapItems && mapItems.map(n => {

      const {
        item,
      } = n.properties;

      if (item) {
        items.push(item);
      }

    });


    if (map && maps) {

      blocks.push(<SearchBlock
        key="search"
        map={map}
        maps={maps}
        lat={lat}
        lng={lng}
        className={wrapperClass}
        onSearch={query => this.onSearch(query)}
        onSearchSelect={(event, element, coords, maps, map) => {



          const {
            lat,
            lng,
          } = coords || {};

          if (lat && lng) {


            const LatLng = new maps.LatLng(coords)

            map.setZoom(12);

            map.panTo(LatLng);




          }

        }}
      />);
    }

    // if (companyId) {

    //   blocks.push(<CompanyBlock
    //     key={`company-${companyId}`}
    //     // items={items}
    //     // where={{
    //     //   name_contains: query,
    //     // }}
    //     id={companyId}
    //     className={wrapperClass}
    //   />);

    // }
    // else 
    // if (query) {

    //   blocks.push(<GeoObjectsBlock
    //     key="objects"
    //     // items={items}
    //     where={{
    //       name_contains: query,
    //     }}
    //     className={wrapperClass}
    //   />);

    // }

    return (
      <SideBar
      >
        {blocks}
      </SideBar>
    )
  }
}

export default withStyles(styles)(MapMainSideBar);