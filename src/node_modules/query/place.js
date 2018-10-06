
import gql from 'graphql-tag';

// import {
//   userFieldsFragment,
// } from './user';

import {
  beerFieldsFragment,
} from './beer';


export const placeFieldsFragment = gql`
  fragment placeFields on Place{
    id
    place_id
    name
    description
    address
    lat
    lng
    latitude: lat
    longitude: lng
    phone
    url_name
    website
    metro
    content
    schedules
    image
    is_bar
    is_shop
    is_brewery
    active
    email
    uri
    best
    gallery
  }
`;


export const placeFragment = gql`

  fragment place on Place{
    ...placeFields
    beers{
      id
      price
      Beer{
        ...beerFields
      }
    }
  }

  ${placeFieldsFragment}
  ${beerFieldsFragment}
`;



export const places = gql`
  query places(
    $first:Int!
    $skip:Int
    $where: PlaceWhereInput
  ){
    objects:places(
      first: $first
      skip: $skip
      where: $where
    ){
      ...placeFields
    }
  }

  ${placeFieldsFragment}
`;


export const placesConnection = gql`
  query placesConnection(
    $first:Int!
    $skip:Int
    $where: PlaceWhereInput
    $orderBy: PlaceOrderByInput
  ){
    objectsConnection:placesConnection(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
    ){
      pageInfo{
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      aggregate{
        count
      }
      edges{
        node{
          ...place
        }
      }
    }
  }

  ${placeFragment}
`;


export const mapPlacesConnection = gql`
  query placesConnection(
    $first:Int!
    $skip:Int
    $type: [PlaceType!]
    $center: CoordsInput
    $orderBy: PlaceOrderByInput
  ){
    objectsConnection: mapPlacesConnection(
      first: $first
      skip: $skip
      type: $type
      center: $center
      orderBy: $orderBy
    ){
      aggregate{
        count
      }
      edges{
        node{
          ...place
        }
      }
    }
  }

  ${placeFragment}
`;



export const place = gql`

  query place(
    # $place_id:Int!
    $where: PlaceWhereUniqueInput!
  ){
    object: place(
      # where: {
      #   place_id: $place_id
      # }
      where: $where
    ){
      ...place
      Owner{
        id
      }
      Letters{
        id
      }
    }
  }

  ${placeFragment}
`;


export const placeByPlaceId = gql`

  query placeByPlaceId(
    $place_id:Int!
  ){
    object: place(
      where: {
        place_id: $place_id
      }
    ){
      ...place
    }
  }

  ${placeFragment}
`;



export const updatePlaceData = gql`
  mutation updatePlaceData(
    $where: PlaceWhereUniqueInput!
    $data: Json!
  ){
    object:updatePlaceData(
      where: $where
      object_data: $data
    ){
      ...place
    }
  }

  ${placeFragment}

`;


export const updatePlaceProcessor = gql`
  mutation updatePlaceProcessor(
    $data: PlaceUpdateInput!
    $where: PlaceWhereUniqueInput!
  ){
    response:updatePlaceProcessor(
      data: $data
      where: $where
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...place
      }
    }
  }

  ${placeFragment}

`;



export const createPlace = gql`
  mutation createPlace(
    $data: PlaceCreateInput!
  ){
    response: createPlaceProcessor(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...place
      }
    }
  }

  ${placeFragment}

`;

export const togglePlaceBeer = gql`
  mutation togglePlaceBeer(
    $placeId:ID!
    $beerId:ID!
    $active:Boolean!
  ){
    
    togglePlaceBeer (
      placeId:$placeId
      beerId: $beerId
      active:$active
    ){
      ...place
    }
  }

  ${placeFragment}
`;


export const fragmentPlaceBeerFields = `
  fragment placeBeerFields on PlaceBeer{
    id
    price
  }
`;

export const fragmentPlaceBeer = `
  fragment placeBeer on PlaceBeer{
    ...placeBeerFields
  }

  ${fragmentPlaceBeerFields}
`;

export const updatePlaceBeer = gql`
  mutation updatePlaceBeer(
    $data: PlaceBeerUpdateInput!
    $where: PlaceBeerWhereUniqueInput!
  ){
    updatePlaceBeerProcessor(
      data: $data
      where: $where
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...placeBeerFields
      }
    }
  }
  
  ${fragmentPlaceBeerFields}
`;


