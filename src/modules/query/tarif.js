
import gql from 'graphql-tag';

// import {
//   userFieldsFragment,
// } from './user';


export const tarifFieldsFragment = gql`
  fragment tarifFields on Tarif {
    id
    name
    active
    maxPriceItems
    price
    allowIcon
    allowBanner 
  }
`;


export const tarifFragment = gql`

  fragment tarif on Tarif{
    ...tarifFields
  }

  ${tarifFieldsFragment}
  
`;



export const tarifs = gql`
  query tarifs(
    $first:Int
    $skip:Int
  ){
    objects:tarifs(
      first:$first
      skip:$skip
      orderBy: price_ASC
    ){
      ...tarif
    }
  }

  ${tarifFragment}
`;
