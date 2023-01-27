import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  attendListModalState,
  AttendState,
  confirmModalState,
  EditBoardId,
  modalDetailState,
  modalEditState,
  okModalState,
  PickState,
  ToggleState,
} from "../../../../commons/stores";
import {
  IMutation,
  IMutationAttendListArgs,
  IMutationDeleteBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
  IQueryFetchMyPickBoardsArgs,
} from "../../../../commons/types/generated/types";

import { FETCH_ATTEND_LIST } from "../../MyPageA/AttendList";
import { FETCH_MY_PICK_BOARDS } from "../../MyPageA/MyPickList";

import { FETCH_ALL_BOARDS } from "../list/CommunityList.queries";

import CommunityDetailUIPage from "./CommunityDetail.presenter";
import {
  ATTEND_LIST,
  FETCH_BOARD,
  FETCH_USER_LOGGED_IN,
  PICK_BOARD,
} from "./CommunityDetail.queries";

export default function CommunityDetailPage(props: any) {
  const [pickBoard] = useMutation(PICK_BOARD);

  const { data, loading } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: {
      boardId: String(props.boardId),
    },
  });

  const [ModalOpen, setModalOpen] = useRecoilState(modalDetailState);
  const [EditModalOpen, setEditModalOpen] = useRecoilState(modalEditState);
  const [editBoardId, setEditBoardId] = useRecoilState(EditBoardId);
  const [attendList, setAttendList] = useRecoilState(attendListModalState);
  const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(okModalState);
  const [Toggle, setToggle] = useRecoilState(ToggleState);
  const [pick, setPick] = useRecoilState(PickState);
  const [attend, setAttend] = useRecoilState(AttendState);
  const router = useRouter();

  const { data: AttendList } = useQuery(FETCH_ATTEND_LIST);
  const { data: PickList } = useQuery<
    Pick<IQuery, "fetchMyPickBoards">,
    IQueryFetchMyPickBoardsArgs
  >(FETCH_MY_PICK_BOARDS);

  const [attendBoard] = useMutation(ATTEND_LIST);

  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    for (let i = 0; i < PickList?.fetchMyPickBoards.length; i++) {
      if (PickList.fetchMyPickBoards[i].board.id === props.boardId) {
        setPick(true);
        return;
      } else {
        setPick(false);
      }
    }
  }, [PickList?.fetchMyPickBoards, data, props.boardId, setPick]);
  useEffect(() => {
    for (let i = 0; i < AttendList?.fetchAttendList.length; i++) {
      if (AttendList.fetchAttendList[i].board.id === props.boardId) {
        setAttend(true);
        return;
      } else {
        setAttend(false);
      }
    }
  }, [AttendList?.fetchAttendList, data, props.boardId, setAttend]);

  const onClickAttend = (boardId) => async () => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      void router.push("/login");
      setModalOpen(false);
      return
    } 
    try {
      const result = await attendBoard({
        variables: {
          boardId: String(props.boardId),
        },
        refetchQueries: [
          {
            query: FETCH_ATTEND_LIST,
          },
          { query: FETCH_ALL_BOARDS },
          {
            query: FETCH_BOARD,
            variables: { boardId: String(props.boardId) },
          },
        ],
      });
      setAttend((prev) => !prev);
      if (attend === false) {
        setModalOpen((prev) => !prev);
        Modal.success({ content: "참여완료" });
      } else if (attend === true) {
        setModalOpen((prev) => !prev);
        Modal.error({ content: "참가취소" });
      }
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: "에러" });
    }
  };
  const onClickNoAtt = () => {
    alert("참가 인원이 가득 찼습니다.");
  };

  const onClickClose = () => {
    setModalOpen((prev) => !prev);
  };
  const onClickDelete = () => {
    setConfirmModal(true);
  };
  const onClickPick = (boardId) => async () => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      void router.push("/login");
      setModalOpen(false);
      return
    } 
    try {
      const result = await pickBoard({
        variables: {
          boardId: String(boardId),
        },
        refetchQueries: [
          { query: FETCH_MY_PICK_BOARDS },
          {
            query: FETCH_BOARD,
            variables: { boardId: String(boardId) },
          },
        ],
      });
      setPick((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error });
    }
  };

  const onClickEdit = (boardId) => () => {
    setEditModalOpen((prev) => !prev);
    setModalOpen((prev) => !prev);
    setEditBoardId(boardId);
  };
  const onClickAttendList = () => {
    setAttendList(true);
  };

  return (
    <CommunityDetailUIPage
      loading={loading}
      attendList={attendList}
      userData={userData}
      data={data}
      pick={pick}
      confirmDel={confirmModal}
      EditModalOpen={EditModalOpen}
      onClickAttendList={onClickAttendList}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      onClickNoAtt={onClickNoAtt}
      onClickClose={onClickClose}
      onClickPick={onClickPick}
      onClickAttend={onClickAttend}
      attend={attend}
    />
  );
}
