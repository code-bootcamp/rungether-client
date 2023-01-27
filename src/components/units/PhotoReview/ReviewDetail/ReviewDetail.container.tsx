import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  LoggedInUserId,
  reviewWriteModalState,
  ReviewDetailState,
} from "../../../../commons/stores";
import {
  IMutation,
  IMutationDeleteReviewBoardArgs,
  IMutationLikeReviewBoardArgs,
  IQuery,
  IQueryFetchAllReviewBoardsArgs,
  IQueryFetchReviewBoardArgs,
  IQueryFetchReviewBoardImageArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_ALL_REVIEW_BOARDS } from "../ReviewList/Review.query";
import ReviewWriteUI from "./ReviewDetail.presenter";
import {
  DELETE_REVIEW_BOARD,
  FETCH_ALL_REVIEW_BOARD_IMAGE,
  FETCH_REVIEW_BOARD,
  LiKE_REVIEW_BOARD,
} from "./ReviewDetail.query";

export default function ReviewDetail(props: any) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(ReviewDetailState);
  const [editModal, setEditModal] = useRecoilState(reviewWriteModalState);
  const [id, setId] = useRecoilState(LoggedInUserId);
  const router = useRouter()
  const image = [];

  const [deleteReviewBoard] = useMutation<
    Pick<IMutation, "deleteReviewBoard">,
    IMutationDeleteReviewBoardArgs
  >(DELETE_REVIEW_BOARD);

  const { data } = useQuery<
    Pick<IQuery, "fetchReviewBoard">,
    IQueryFetchReviewBoardArgs
  >(FETCH_REVIEW_BOARD, {
    variables: {
      reviewBoardId: String(props.reviewId),
    },
  });

  const { data: images } = useQuery<
    Pick<IQuery, "fetchReviewBoardImage">,
    IQueryFetchReviewBoardImageArgs
  >(FETCH_ALL_REVIEW_BOARD_IMAGE, {
    variables: { reviewBoardId: String(props.reviewId) },
  });

  const [likeReviewBoard] = useMutation<
    Pick<IMutation, "likeReviewBoard">,
    IMutationLikeReviewBoardArgs
  >(LiKE_REVIEW_BOARD);

  images?.fetchReviewBoardImage.forEach((el) => {
    if (el.isMain === true) {
      image.unshift(el.imgUrl);
    } else if (el.imgUrl !== "" && el.isMain === false) {
      image.push(el.imgUrl);
    }
  });

  const onClickHeart = async () => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      void router.push("/login");
      setIsModalOpen(false);
      return
    } 
    try {
      const result = await likeReviewBoard({
        variables: {
          reviewBoardId: props.reviewId,
        },
        refetchQueries: [
          {
            query: FETCH_REVIEW_BOARD,
            variables: { reviewBoardId: props.reviewId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickDelete = (reviewBoardId) => () => {
    try {
      void deleteReviewBoard({
        variables: {
          reviewBoardId: String(reviewBoardId),
        },
        refetchQueries: [{ query: FETCH_ALL_REVIEW_BOARDS }],
      });
      setIsModalOpen((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  const onClickEdit = () => {
    // setIsModalOpen(false)
    setEditModal(true);
  };
  const onCancel = () => {
    setEditModal(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <ReviewWriteUI
      id={id}
      onClickEdit={onClickEdit}
      onCancel={onCancel}
      editModal={editModal}
      onClickDelete={onClickDelete}
      onClickHeart={onClickHeart}
      settings={settings}
      image={image}
      data={data}
    />
  );
}
