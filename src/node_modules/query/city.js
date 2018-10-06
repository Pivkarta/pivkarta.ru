
import gql from 'graphql-tag';

 


export const cityFieldsFragment = gql`
  fragment cityFields on City{
    id
    city_id
    name
    alias
    lat
    lng
  }
`;


export const cityFragment = gql`

  fragment city on City{
    ...cityFields 
  }

  ${cityFieldsFragment} 
`;



export const citiesConnection = gql`
  query citiesConnection(
    $first:Int!
    $skip:Int
    $where: CityWhereInput
  ){
    objectsConnection:citiesConnection(
      first: $first
      skip: $skip
      where: $where
      orderBy: createdAt_DESC
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
          ...city
        }
      }
    }
  }

  ${cityFragment}
`;


export const cities = gql`
  query cities(
    $first:Int
    $skip:Int
    $where: CityWhereInput
    $orderBy: CityOrderByInput
  ){
    objects:cities(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
    ){ 
      ...city
    }
  }

  ${cityFragment}
`;



export const city = gql`

  query city(
    $where:CityWhereUniqueInput!
  ){
    object: city(
      where: $where
    ){
      ...city
    }
  }

  ${cityFragment}
`;



export const updateCityProcessor = gql`
  mutation updateCityProcessor(
    $id:ID!
    $data: CityUpdateInput!
  ){
    response:updateCityProcessor(
      id: $id
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...city
      }
    }
  }

  ${cityFragment}

`;



export const createCityProcessor = gql`
  mutation createCityProcessor(
    $data: CityUpdateInput!
  ){
    response:createCityProcessor(
      data: $data
    ){
      
      success
      message
      errors{
        key
        message
      }
      data{
        ...city
        created_by{
          id
          username
        }
      }

    }
  }

  ${cityFragment}

`;
