import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState2 } from "../../../../commons/stores";
import CommunityDetailUIPage from "./CommunityDetail.presenter";
import {
  ATTEND_LIST,
  FETCH_BOARD,
  PICK_BOARD,
} from "./CommunityDetail.queries";

export default function CommunityDetailPage(props) {
  const [ModalOpen, setModalOpen] = useRecoilState(modalState2);
  const [pick, setPick] = useState(false);
  const router = useRouter();
  // 참여하기

  const [attendBoard] = useMutation(ATTEND_LIST);
  const [attend, setAttend] = useState(false);
  const onClickAttend = async () => {
    try {
      const result = await attendBoard({
        variables: {
          boardId: String(props.boardId),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: { boardId: String(props.boardId) },
          },
        ],
      });
      setAttend((prev) => !prev);
      if (attend === false) {
        Modal.success({ content: "참여완료" });
      } else if (attend === true) {
        Modal.error({ content: "참가취소" });
      }
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: "에러" });
    }
  };

  const [pickBoard] = useMutation(PICK_BOARD);
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: String(props.boardId),
    },
  });

  const onClickClose = () => {
    setModalOpen((prev) => !prev);
  };
  const onClickPick = async () => {
    try {
      const result = await pickBoard({
        variables: {
          boardId: String(props.boardId),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: { boardId: String(props.boardId) },
          },
        ],
      });
      setPick((prev) => !prev);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error });
    }
  };
  return (
    <CommunityDetailUIPage
      data={data}
      pick={pick}
      onClickClose={onClickClose}
      onClickPick={onClickPick}
      onClickAttend={onClickAttend}
      attend={attend}
    />
  );
}
