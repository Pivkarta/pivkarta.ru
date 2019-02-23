
import gql from 'graphql-tag';

// import {
//   userFieldsFragment,
// } from './user';

import {
  BeerNoNestingFragment,
} from "../../schema/generated/api.fragments";


export const beerFieldsFragment = gql`
  fragment beerFields on Beer{
    ...BeerNoNesting
  }

  ${BeerNoNestingFragment}
`;


export const beerFragment = gql`

  fragment beer on Beer{
    ...beerFields
  }

  ${beerFieldsFragment}
`;



export const beersConnection = gql`
  query beersConnection(
    $first:Int
    $skip:Int
    $orderBy:BeerOrderByInput
    $where:BeerWhereInput
  ){
    objectsConnection:beersConnection(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where: $where
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
          ...beer
        }
      }
    }
  }

  ${beerFragment}
`;



export const beer = gql`

  query beer(
    $beer_id:Int!
  ){
    object: beer(
      where: {
        beer_id: $beer_id
      }
    ){
      ...beer
    }
  }

  ${beerFragment}
`;



export const updateBeer = gql`
  mutation updateBeer(
    $data: BeerUpdateInput!
    $where: BeerWhereUniqueInput!
  ){
    response:updateBeerProcessor(
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
        ...beer
      }
    }
  }

  ${beerFragment}

`;



export const createBeer = gql`
  mutation createBeer(
    $data:BeerCreateInput!
  ){
    response:createBeerProcessor(
      data:$data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...beer
      }
    }
  }

  ${beerFragment}

`;
