import { gql } from "@apollo/client";

export const FETCH_REVIEW_NESTED_COMMENTS = gql`
  query fetchReviewNestedComments($reviewCommentId: String!) {
    fetchReviewNestedComments(
        reviewCommentId: $reviewCommentId
    ) {
      id
      reviewNestedComment
      createAt
      user {
        id
        nickname
      }
    }
  }
`;

export const DELETE_REVIEW_NESTED_COMMENT = gql`
  mutation deleteReviewNestedComment($reviewNestedCommentId: String!) {
    deleteReviewNestedComment(
      reviewNestedCommentId: $reviewNestedCommentId
    )
  }
`;
