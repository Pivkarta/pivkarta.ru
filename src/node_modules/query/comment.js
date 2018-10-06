
import gql from 'graphql-tag';


export const commentFieldsFragment = gql`
  fragment commentFields on Comment{
    id
    comment_id
    object_id
    type_id
    createdAt
    editor_content
    is_checked
    name
    parent
  }
`;


export const commentFragment = gql`

  fragment comment on Comment{
    ...commentFields
    created_by @include(if:$commentGetAuthor)
    {
      id
      user_id
      username
      first_name
      middle_name
      last_name
      image
      email
    }
  }

  ${commentFieldsFragment}
`;



export const comment = gql`

  query comment(
    # $comment_id:Int!
    $where: CommentWhereUniqueInput!
    $commentGetAuthor:Boolean!
  ){
    object: comment(
      # where: {
      #   comment_id: $comment_id
      # }
      where: $where
    ){
      ...comment
    }
  }

  ${commentFragment}
`;



export const commentsConnection = gql`
  query commentsConnection(
    $first:Int
    $skip:Int
    $commentGetAuthor:Boolean!
    $orderBy: CommentOrderByInput!
    $where: CommentWhereInput
  ){
    objectsConnection:commentsConnection(
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
          ...comment
        }
      }
    }
  }

  ${commentFragment}
`;


export const createCommentProcessor = gql`
  mutation createCommentProcessor(
    $data: CommentCreateInput!
    $commentGetAuthor:Boolean!
  ){
    response:createCommentProcessor(
      data: $data
    ){
      success
      message
      errors{
        key
        message
      }
      data{
        ...comment
      }
    }
  }

  ${commentFragment}

`;


export const updateCommentProcessor = gql`
  mutation updateCommentProcessor(
    $data: CommentUpdateInput!
    $where: CommentWhereUniqueInput!
    $commentGetAuthor:Boolean!
  ){
    response:updateCommentProcessor(
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
        ...comment
      }
    }
  }

  ${commentFragment}

`;

