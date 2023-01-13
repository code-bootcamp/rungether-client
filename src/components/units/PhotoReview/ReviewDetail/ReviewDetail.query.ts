import { gql } from "@apollo/client";

export const FETCH_REVIEW_BOARD = gql`
  query fetchReviewBoard($reviewBoardId: String!) {
    fetchReviewBoard(reviewBoardId: $reviewBoardId) {
      id
      content
      like
      user {
        id
        email
        nickname
        image {
          id
          imgUrl
        }
      }
      createdAt
    }
  }
`;

export const FETCH_ALL_REVIEW_BOARD_IMAGE = gql`
  query fetchReviewBoardImage($reviewBoardId: String!) {
    fetchReviewBoardImage(reviewBoardId: $reviewBoardId) {
      id
      imgUrl
      isMain
      reviewBoard {
        id
      }
    }
  }
`;

export const LiKE_REVIEW_BOARD = gql`
  mutation likeReviewBoard($reviewBoardId: String!) {
    likeReviewBoard(reviewBoardId: $reviewBoardId)
  }
`;
export const DELETE_REVIEW_BOARD = gql`
  mutation deleteReviewBoard($reviewBoardId: String!) {
    deleteReviewBoard(reviewBoardId: $reviewBoardId)
  }
`;
