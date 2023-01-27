import { useMutation, useQuery } from "@apollo/client";
import { MouseEvent } from "react";
import {
  IMutation,
  IMutationDeleteReviewCommentArgs,
  IQuery,
  IQueryFetchReviewCommentsArgs,
} from "../../../../commons/types/generated/types";
import ReviewCommentListUI from "./ReviewCommentList.presenter";
import {
  DELETE_REVIEW_COMMENT,
  FETCH_REVIEW_COMMENTS,
} from "./ReviewCommentList.query";

export default function ReviewCommentList(props: any) {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchReviewComments">,
    IQueryFetchReviewCommentsArgs
  >(FETCH_REVIEW_COMMENTS, {
    variables: { reviewBoardId: String(props.id) },
  });

  const [deleteReviewComment] = useMutation<
    Pick<IMutation, "deleteReviewComment">,
    IMutationDeleteReviewCommentArgs
  >(DELETE_REVIEW_COMMENT);



  const onClickDelete =
    (reviewCommentId) => async (event: MouseEvent<HTMLElement>) => {
      try {
        await deleteReviewComment({
          variables: {
            reviewCommentId: String(reviewCommentId),
          },
          refetchQueries: [
            {
              query: FETCH_REVIEW_COMMENTS,
              variables: { reviewBoardId: String(props.id) },
            },
          ],
        });
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    };

  return (
    <ReviewCommentListUI
      onClickDelete={onClickDelete}

      data={data}
    />
  );
}
