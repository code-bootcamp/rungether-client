import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { forIn } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ReviewDetailState,
  reviewWriteModalState,
} from "../../../../commons/stores";
import {
  IMutation,
  IMutationUpdateReviewBoardArgs,
  IQuery,
  IQueryFetchReviewBoardImageArgs,
} from "../../../../commons/types/generated/types";
import {
  FETCH_ALL_REVIEW_BOARDS,
  FETCH_ALL_REVIEW_BOARD_IMAGE,
} from "../ReviewList/Review.query";
import ReviewWriteUI from "./ReviewEdit.presenter";
import { UPDATE_REVIEW_BOARD } from "./ReviewEdit.qurey";

export default function ReviewEdit(props: any) {
  const router = useRouter();
  const [reviewImage, setReviewImage] = useState(["", "", "", "", ""]);
  const [sideImg, setSideImg] = useState([]);
  const [imageStr, setImageStr] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] =
    useRecoilState(ReviewDetailState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(reviewWriteModalState);
  const image = [];

  const [updateReviewBoard] = useMutation<
    Pick<IMutation, "updateReviewBoard">,
    IMutationUpdateReviewBoardArgs
  >(UPDATE_REVIEW_BOARD);

  useEffect(() => {
    if (props.image) {
      for (let i = 0; i < 5 - props.image.length; i++) {
        props.image.push("");
      }
    }
    if (props.data) {
      setContent(props.data?.fetchReviewBoard.content);
    }
    setReviewImage(props.image);
  }, [props.data, props.image]);

  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...reviewImage];
    newFileUrls[index] = fileUrl;
    setReviewImage(newFileUrls);
  };

  const onClickUpdate = async () => {
    if (!content) {
      alert("내용을 입력해주세요.");
    }
    if (!reviewImage) {
      alert("사진은 필수 입력 값입니다,");
    }
    try {
      const result = await updateReviewBoard({
        variables: {
          reviewBoardId: String(props.data.fetchReviewBoard.id),
          updateReviewBoardInput: {
            content,
            reviewImage,
          },
        },
        refetchQueries: [{ query: FETCH_ALL_REVIEW_BOARDS }],
      });

      setIsModalOpen(false);
      setIsDetailModalOpen(false);
      alert("리뷰수정이 완료되었습니다.");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
      setIsModalOpen(false);
    }
  };

  const onChangeContent = (e: any) => {
    setContent(e.target.value);
  };
  const onClickCs = () => {
    setIsModalOpen(false);
  };
  return (
    <ReviewWriteUI
      data={props.data}
      sideImg={sideImg}
      files={reviewImage}
      imageStr={imageStr}
      onChangeContent={onChangeContent}
      onClickUpdate={onClickUpdate}
      onChangeFileUrls={onChangeFileUrls}
      onClickCs={onClickCs}
    />
  );
}
