import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateReviewNestedCommentArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_REVIEW_NESTED_COMMENTS } from "../ReviewCommentAnswerList/AnswerList.query";
import AnswerWriteUI from "./AnswerWrite.presenter";
import { CREATE_REVIEW_NESTED_COMMENT } from "./AnswerWrite.query";

export default function CommentAnswerWriter(props: any) {
  const [isActive, setIsActive] = useState(true);
  const [contents, setContents] = useState("");

  const [createReviewNestedComment] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationCreateReviewNestedCommentArgs
  >(CREATE_REVIEW_NESTED_COMMENT);

  const onChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    if (contents) {
      const result = await createReviewNestedComment({
        variables: {
          reviewCommentId: String(props.el.id),
          reviewNestedComment: String(contents),
        },
        refetchQueries: [
          {
            query: FETCH_REVIEW_NESTED_COMMENTS,
            variables: { reviewCommentId: String(props.el.id) },
          },
        ],
      });
      setContents("");
      props.setMore(true);
      setIsActive((prev) => !prev);
    } else if (!contents) {
      alert("내용을 입력해주세요.");
    }
  };
  return (
    <AnswerWriteUI
      isActive={isActive}
      contents={contents}
      onChangeAnswer={onChangeAnswer}
      onClickWrite={onClickWrite}
    />
  );
}
