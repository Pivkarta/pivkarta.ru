

import gql from 'graphql-tag';

export const userFieldsFragment = `
  fragment userFields on User {
    id
    user_id
    username
    fullname
    email
    image
    etherwallet
    created_at
    sudo
  }
`;


export const fragmentUser = `
  fragment user on User {
    ...userFields
  }

  ${userFieldsFragment}
`;


export const usersConnection = gql`
  query usersConnection(
    $first:Int!
    $skip:Int
    $orderBy: UserOrderByInput!
    $where:UserWhereInput
  ){
    objectsConnection:usersConnection(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where:$where
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
          ...user
        }
      }
    }
  }

  ${fragmentUser}
`;

export const users = gql`
  query usersConnection(
    $first:Int!
    $skip:Int
    $orderBy: UserOrderByInput
    $where:UserWhereInput
  ){
    objects:users(
      first: $first
      skip: $skip
      orderBy: $orderBy
      where:$where
    ){
      ...user
    }
  }

  ${fragmentUser}
`;


export const me = gql`
  query me{
    me{
      ...user
    }
  }

  ${fragmentUser}
`;


export const user = gql`
  query userByUsername(
    $where:UserWhereUniqueInput!
  ){ 
    object:user(
      where:$where
    ){
      ...user
    } 
  }

  ${fragmentUser}
`;


export const signin = gql`
  mutation signin(
    $where: UserWhereUniqueInput!
    $password: String!
  ){
    response:signin(
      where: $where
      password: $password
    ){
      success
      message
      errors{
        key
        message
      }
      token
      data{
        ...user
      }
    }
  }

  ${fragmentUser}
`;

export const signup = gql`
  mutation signup(
    $data: UserCreateInput!
  ){
    response:signup(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      token
      data{
        ...user
      }
    }
  }

  ${fragmentUser}
`;

export const updateUser = gql`


  mutation updateUser(
    $data: UserUpdateInput!
    # $updateUserWhere: UserWhereUniqueInput!
  ){
    response:updateUserProcessor(
      # id:ID!
      # where: $updateUserWhere
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...user
      }
    }
  }


  ${fragmentUser}

`;

export const resetPassword = gql`
  mutation resetPassword(
    $username: String!
  ){ 
    response: resetPassword(
      username: $username
    )
  }
 

`;