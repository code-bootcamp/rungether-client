import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteReviewNestedCommentArgs,
  IQuery,
  IQueryFetchReviewNestedCommentsArgs,
} from "../../../../commons/types/generated/types";
import AnswerListUI from "./AnswerList.presenter";
import {
  DELETE_REVIEW_NESTED_COMMENT,
  FETCH_REVIEW_NESTED_COMMENTS,
} from "./AnswerList.query";

export default function AnswerList(props: any) {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchReviewNestedComments">,
    IQueryFetchReviewNestedCommentsArgs
  >(FETCH_REVIEW_NESTED_COMMENTS, {
    variables: { reviewCommentId: String(props.el.id) },
  });

  const [deleteReviewNestedComment] = useMutation<
    Pick<IMutation, "deleteReviewNestedComment">,
    IMutationDeleteReviewNestedCommentArgs
  >(DELETE_REVIEW_NESTED_COMMENT);

  const onLoadMore = () => {
    if (!data) return;

    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchReviewNestedComments.length / 9) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchReviewNestedComments)
          return {
            fetchReviewNestedComments: [...prev.fetchReviewNestedComments],
          };
        return {
          fetchReviewNestedComments: [
            ...prev.fetchReviewNestedComments,
            ...fetchMoreResult.fetchReviewNestedComments,
          ],
        };
      },
    });
  };
  const onClickDelete = (reviewNestedCommentId: any) => async (event: any) => {
    try {
      await deleteReviewNestedComment({
        variables: {
          reviewNestedCommentId: reviewNestedCommentId,
        },
        refetchQueries: [
          {
            query: FETCH_REVIEW_NESTED_COMMENTS,
            variables: { reviewCommentId: String(props.el.id) },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <AnswerListUI
      onClickDelete={onClickDelete}
      data={data}
      onLoadMore={onLoadMore}
    />
  );
}
