import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { appointment } from "../../../commons/library/appointment";
import { modalDetailState } from "../../../commons/stores";
import { OneEllipsis } from "../../../commons/styles/commonStyles";
import {
  IMutation,
  IMutationPickBoardArgs,
} from "../../../commons/types/generated/types";
import CommunityDetailPage from "../CommunityPage/detail/CommunityDetail.container";

export const FETCH_MY_PICK_BOARDS = gql`
  query fetchMyPickBoards($page: Int) {
    fetchMyPickBoards(page: $page) {
      id
      board {
        id
        title
        content
        attendCount
        appointment
        user {
          id
          nickname
          image {
            id
            imgUrl
          }
        }
      }
      user {
        id
        email
        nickname
        image {
          id
          imgUrl
        }
      }
    }
  }
`;
export const PICK_BOARD = gql`
  mutation pickBoard($boardId: String!) {
    pickBoard(boardId: $boardId)
  }
`;

export default function MyPickList() {
  // 리스트 클릭시 디테일 로 넘어가게
  const [ModalOpen, setModalOpen] = useRecoilState(modalDetailState);
  const [boardId, setBoardId] = useState("");
  const [pick, setPick] = useState(true);

  const [pickBoard] = useMutation<
    Pick<IMutation, "pickBoard">,
    IMutationPickBoardArgs
  >(PICK_BOARD);

  const onClickDetail = (boardId) => () => {
    setModalOpen((prev) => !prev);
    setBoardId(boardId);
  };

  const onClickPick = (boardId) => async (e: any) => {
    e.stopPropagation();
    setPick((prev) => !prev);
    try {
      const result = await pickBoard({
        variables: {
          boardId: String(boardId),
        },
        refetchQueries: [
          {
            query: FETCH_MY_PICK_BOARDS,
          },
        ],
      });

      if (pick === false) {
        Modal.success({ content: "찜하기" });
      } else if (pick === true) {
        Modal.error({ content: "찜취소" });
      }
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: "에러" });
    }
  };
  const { data } = useQuery(FETCH_MY_PICK_BOARDS);

  const sanitizeHtml = require("sanitize-html");

  return (
    <>
      <ModalCustom centered open={ModalOpen} width={900}>
        <CommunityDetailPage boardId={boardId} />
      </ModalCustom>
      {data?.fetchMyPickBoards?.map((el: any) => (
        <BoardListWrapper key={el.id} onClick={onClickDetail(el.board.id)}>
          <BoardList>
            <ImageListProfileBox>
              <ImageListProfile
                src={el.board.user?.image?.imgUrl || "/profile.png"}
              />
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
                <ReviewBtn onClick={onClickPick(el.board.id)}>
                  {!pick ? (
                    <HeartOutlined onClick={onClickPick(el.board.id)} />
                  ) : (
                    <HeartFilled
                      onClick={onClickPick(el.board.id)}
                      style={{
                        color: "#C71515",
                      }}
                    />
                  )}
                </ReviewBtn>
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
export const Title = styled.div`
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
export const MeetTime = styled.div`
  width: 170px;
  /* text-align: center; */
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
export const Content = styled.div`
  width: 100%;
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height */

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
export const ReviewBtn = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background: none;
  border-radius: 8px;
  padding-bottom: 4px;
  color: white;
  font-size: 14px;
  border: none;
`;
export const ThumbnailBox = styled.div`
  width: 120px;
  height: 90px;
  width: 118px;
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
