
import gql from 'graphql-tag';

import {
  userFieldsFragment,
} from './user';


export const topicFieldsFragment = gql`
  fragment topicFields on Topic{
    id
    topic_id
    created_at
    name
    editor_content
    url_name
    type_id
    published
    description
  }
`;


export const topicFragment = gql`

  fragment topic on Topic{
    ...topicFields
    created_by
    {
      ...userFields
    }
  }

  ${topicFieldsFragment}
  ${userFieldsFragment}
`;



export const topicsConnection = gql`
  query topicsConnection(
    $first:Int!
    $skip:Int
    $where: TopicWhereInput
  ){
    objectsConnection:topicsConnection(
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
          ...topic
        }
      }
    }
  }

  ${topicFragment}
`;



export const topic = gql`

  query topic(
    $where:TopicWhereUniqueInput!
  ){
    object: topic(
      where: $where
    ){
      ...topic
    }
  }

  ${topicFragment}
`;



export const updateTopicProcessor = gql`
  mutation updateTopicProcessor(
    $data: TopicUpdateInput!
    $where: TopicWhereUniqueInput!
  ){
    response:updateTopicProcessor(
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
        ...topic
      }
    }
  }

  ${topicFragment}

`;



export const createTopicProcessor = gql`
  mutation createTopicProcessor(
    $data: TopicCreateInput!
  ){
    response:createTopicProcessor(
      data: $data
    ){
      
      success
      message
      errors{
        key
        message
      }
      data{
        ...topic
        created_by{
          id
          username
        }
      }

    }
  }

  ${topicFragment}

`;
