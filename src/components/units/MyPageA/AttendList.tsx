import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { appointment } from "../../../commons/library/appointment";
import {
  attendListIdState,
  modalDetailState,
  reviewWriteModalState,
} from "../../../commons/stores";
import {
  globalContainer,
  OneEllipsis,
} from "../../../commons/styles/commonStyles";
import CommunityDetailPage from "../CommunityPage/detail/CommunityDetail.container";
import { FETCH_BOARD } from "../CommunityPage/detail/CommunityDetail.queries";
import ReviewWrite from "../PhotoReview/ReviewWrite/ReviewWrite.container";
import { CusModal } from "../PhotoReview/ReviewWrite/ReviewWrite.styles";

export const FETCH_ATTEND_LIST = gql`
  query fetchAttendList {
    fetchAttendList {
      id
      user {
        id
        email
        nickname
        age
        gender
        image{
          id
          imgUrl
        }
      }
      board {
        id
        title
        content
        appointment
        user{
          id
          image{
            id
            imgUrl
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const ATTEND_LIST = gql`
  mutation attendList($boardId: String!) {
    attendList(boardId: $boardId)
  }
`;

export default function AttendList() {
  const { data } = useQuery(FETCH_ATTEND_LIST);
  // 리스트 클릭시 디테일 로 넘어가게
  const [ModalOpen, setModalOpen] = useRecoilState(modalDetailState);
  const [attendListId, setAttendListId] = useRecoilState(attendListIdState);
  const [boardId, setBoardId] = useState("");
  const [isModalOpen, setIsModalOpen] = useRecoilState(reviewWriteModalState);
  const onClickMore = () => {};

  const onClickDetail = (boardId) => () => {
    setModalOpen((prev) => !prev);
    setBoardId(boardId);
  };
  const [attend, setAttend] = useState(true);

  const onClickWriteReview = (attendListId) => async (e) => {
    e.stopPropagation();
    setAttendListId(attendListId);
    setIsModalOpen(true);
  };
  const sanitizeHtml = require("sanitize-html");
  return (
    <>
      {isModalOpen && (
        <CusModal width="1000px" open={true}>
          <ReviewWrite />
        </CusModal>
      )}
      {ModalOpen && (
        <ModalCustom centered open={true} width={900}>
          <CommunityDetailPage boardId={boardId} />
        </ModalCustom>
      )}
      {data?.fetchAttendList?.map((el: any) => (
        <BoardListWrapper key={el.id}>
          <BoardList key={el.id} onClick={onClickDetail(el.board.id)}>
            <ImageListProfileBox>
              <ImageListProfile src={el.board.user?.image?.imgUrl || "/profile.png"} />
            </ImageListProfileBox>
            <InfoTextWrapper>
              <InfoTextBox>
                <Title>{el.board.title}</Title>
                <MeetTime>{appointment(el.board.appointment)}</MeetTime>
              </InfoTextBox>
              <Content>
                <ContentText
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(
                      el.board.content.replace(/(?:\r\n|\r|\n|)/g, ""),
                      {
                        allowedTags: ["n"],
                      }
                    ),
                  }}
                />
                <BtnBox>
                  <ReviewBtn onClick={onClickWriteReview(el.id)}>
                    리뷰쓰기
                  </ReviewBtn>
                </BtnBox>
              </Content>
            </InfoTextWrapper>
            <ThumbnailBox>
              <ThumbnailImage
                style={{
                  backgroundImage: el.image?.imgUrl
                    ? `url(${el.image.imgUrl})`
                    : `url(/images/basic.png)`,
                }}
              ></ThumbnailImage>
            </ThumbnailBox>
          </BoardList>
        </BoardListWrapper>
      ))}
    </>
  );
}

export const BoardListWrapper = styled.div`
  padding: 0 80px 0 80px;
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #8b8b8b;
`;
export const ImageListProfileBox = styled.div`
  padding: 25px 35px 25px 0;
`;

export const ImageListProfile = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 100px;
`;

export const InfoTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 25px 0 15px 0;
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const Title = styled(OneEllipsis)`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 30px;
  width: calc(100% - 190px);
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
`;
export const MeetTime = styled(OneEllipsis)`
  width: 170px;
  display: flex;
  justify-content: flex-end;
  padding-right: 27px;
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
`;
export const Content = styled(OneEllipsis)`
  width: calc(100% - 6px);
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.0024em;

  padding-top: 15px;
  padding-right: 20px;

  color: #0b0b0b;
`;
export const ContentText = styled(OneEllipsis)`
  padding-right: 20px;
  width: calc(100% - 10px);
`;

export const BtnBox = styled.div`
  padding-left: 20px;
`;

export const ReviewBtn = styled.button`
  background: black;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  border: none;
  width: 100px;
  padding: 4px 0px;
`;

export const ThumbnailBox = styled.div`
  width: 118px;
  height: 90px;
  padding-top: 20px;
  border-radius: 12px;
`;
export const ThumbnailImage = styled.div`
  border-radius: 12px;
  height: 90px;
  width: 118px;
  background-size: cover;
  background-position: center;
`;
export const ModalCustom = styled(Modal)`
  .ant-modal-header {
    padding: 0px 24px 16px 24px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 2px 2px 0 0;
    height: 80px;
  }
  .ant-modal-body {
    padding-top: 10px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
  }
  .ant-modal-title {
    color: #fff;
  }
  .ant-modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
  }
  .ant-modal-footer > .ant-btn-primary {
    display: none;
  }
  .ant-modal-footer > .ant-btn-default {
    display: none;
  }
  .ant-modal-close-x {
    display: none;
  }
`;
