import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { ReviewDetailState } from "../../../../commons/stores";
import {
  IMutation,
  IMutationCreateReviewCommentArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_REVIEW_BOARD } from "../../PhotoReview/ReviewDetail/ReviewDetail.query";
import { FETCH_REVIEW_COMMENTS } from "../ReviewCommentList/ReviewCommentList.query";
import ReviewCommentWriteUI from "./reviewComment.presenter";
import { CREATE_REVIEW_COMMENT } from "./reviewComment.query";
import { schema } from "./reviewComment.validation";

export default function ReviewCommentWrite(props: any) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(ReviewDetailState);
  const router = useRouter()

  const [createReviewComment] = useMutation<
    Pick<IMutation, "createReviewComment">,
    IMutationCreateReviewCommentArgs
  >(CREATE_REVIEW_COMMENT);

  const { register, handleSubmit, formState, setValue, trigger, getValues } =
    useForm({
      resolver: yupResolver(schema),
    });

  const onClickSubmit = async (data: any) => {
  if (localStorage.getItem("accessToken") === null) {
    alert("로그인 후 이용 가능합니다!!!");
    void router.push("/login");
    setIsModalOpen(false);
    return
  } 
    if (data.content) {
      const result = await createReviewComment({
        variables: {
          reviewComment: data.content,
          reviewBoardId: String(props.id),
        },
        refetchQueries: [
          {
            query: FETCH_REVIEW_COMMENTS,
            variables: { reviewBoardId: String(props.id) },
          },
          {
            query: FETCH_REVIEW_BOARD,
            variables: { reviewBoardId: props.id },
          },
        ],
      });
      setValue("content", "");
    }
  };
  return (
    <ReviewCommentWriteUI
      register={register}
      handleSubmit={handleSubmit}
      onClickSubmit={onClickSubmit}
    />
  );
}
