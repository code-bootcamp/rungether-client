import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: String!) {
    fetchBoard(boardId: $boardId) {
      id
      title
      content
      attendCount
      pickCount
      appointment
      recruitRegion
      recruitGrade
      recruitSports
      createdAt
      recruitPeople
      user {
        id
        email
        nickname
        image {
        id
        imgUrl
      }
      }
      image {
        id
        imgUrl
      }
      location {
        id
        center
        path
      }
      attendList{
        user{
          id
          nickname
          prefer
          region
          gender
          image{
            id
            imgUrl
          }
        }
      }
    }
  }
`;
export const PICK_BOARD = gql`
  mutation pickBoard($boardId: String!) {
    pickBoard(boardId: $boardId)
  }
`;
export const ATTEND_LIST = gql`
  mutation attendList($boardId: String!) {
    attendList(boardId: $boardId)
  }
`;
export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      id
      email
      nickname
      age
      grade
      gender
      prefer
      region
      image{
        id
        imgUrl
      }
    }
  }
`;
