import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  attendListIdState,
  reviewWriteModalState,
} from "../../../../commons/stores";
import {
  IMutation,
  IMutationCreateReviewBoardArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_ALL_REVIEW_BOARDS } from "../ReviewList/Review.query";
import ReviewWriteUI from "./ReviewWrite.presenter";
import { CREATE_REVIEW_BOARD } from "./ReviewWrite.qurey";

export default function ReviewWrite() {
  const router = useRouter();
  const [reviewImage, setReviewImage] = useState(["", "", "", "", ""]);
  const [sideImg, setSideImg] = useState([]);
  const [imageStr, setImageStr] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [attendListId, setAttendListId] = useRecoilState(attendListIdState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(reviewWriteModalState);

  const [createReviewBoard] = useMutation<
    Pick<IMutation, "createReviewBoard">,
    IMutationCreateReviewBoardArgs
  >(CREATE_REVIEW_BOARD);

  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...reviewImage];
    newFileUrls[index] = fileUrl;
    setReviewImage(newFileUrls);
  };
  const onClickSubmit = async () => {
    if (!content) {
      alert("내용을 입력해주세요.");
    }
    if (!reviewImage) {
      alert("사진은 필수 입력 값입니다,");
    }
    try {
      const result = await createReviewBoard({
        variables: {
          attendListId: String(attendListId),
          createReviewBoardInput: {
            title,
            content,
            reviewImage,
          },
        },
        refetchQueries: [{ query: FETCH_ALL_REVIEW_BOARDS }],
      });
      setIsModalOpen(false);
      alert("리뷰등록이 완료되었습니다.");
      router.push(`/photoReview`);
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
      sideImg={sideImg}
      files={reviewImage}
      imageStr={imageStr}
      onChangeContent={onChangeContent}
      onClickSubmit={onClickSubmit}
      onChangeFileUrls={onChangeFileUrls}
      onClickCs={onClickCs}
    />
  );
}
