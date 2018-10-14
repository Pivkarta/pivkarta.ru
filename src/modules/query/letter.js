
import gql from 'graphql-tag';



export const letterFieldsFragment = gql`
  fragment letterFields on Letter{
    id
    email
    subject
    message
    status
  }
`;


export const letterFragment = gql`

  fragment letter on Letter{
    ...letterFields
    Place{
      id
      name
      uri
    }
  }

  ${letterFieldsFragment}
`;



export const lettersConnection = gql`
  query lettersConnection(
    $first:Int!
    $skip:Int
    $where: LetterWhereInput
    $orderBy: LetterOrderByInput
  ){
    objectsConnection:lettersConnection(
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
          ...letter
        }
      }
    }
  }

  ${letterFragment}
`;



export const letter = gql`

  query letter(
    # $letter_id:Int!
    $where: LetterWhereUniqueInput!
  ){
    object: letter(
      # where: {
      #   letter_id: $letter_id
      # }
      where: $where
    ){
      ...letter
    }
  }

  ${letterFragment}
`;



export const updateLetterProcessor = gql`
  mutation updateLetterProcessor(
    $data: LetterUpdateInput!
    $where: LetterWhereUniqueInput!
  ){
    response:updateLetterProcessor(
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
        ...letter
      }
    }
  }

  ${letterFragment}

`;



export const createLetter = gql`
  mutation createLetter(
    $data: LetterCreateInput!
  ){
    response: createLetter(
      data: $data
    ){
      ...letter
    }
  }

  ${letterFragment}

`;


export const createLetterProcessor = gql`
  mutation createLetterProcessor(
    $data: LetterCreateInput!
  ){
    response: createLetterProcessor(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...letter
      }
    }
  }

  ${letterFragment}

`;


