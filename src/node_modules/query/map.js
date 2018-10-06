

import gql from 'graphql-tag';

import {
  placeFragment,
} from './place';

// export const fragmentGeoObjectFields = `
//   fragment geoObjectFields on GeoObject {
//     _type
//     id
//     # name
//     lat
//     lng
//   }
// `;


// export const fragmentGeoObject = `
//   fragment geoObject on GeoObject {
//     ...geoObjectFields
//   }

//   ${fragmentGeoObjectFields}
// `;


export const mapGeoObjectsConnection = gql`
  query mapGeoObjectsConnection(
    $first: Int!
    $where: PlaceWhereInput
  ){
    mapData: mapGeoObjectsConnection(
      first: $first
      # type: [Company]
      where: $where
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
      }
    }
  }

`;