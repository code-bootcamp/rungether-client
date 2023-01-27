import * as S from "./MyPage.styles";
import { BiUserPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import AttendList from "./AttendList";
import MyPickList from "./MyPickList";
import MyBoardList from "./MyBoardList";
import { useRecoilState } from "recoil";
import { userEditState } from "../../../commons/stores";
import styled from "@emotion/styled";
import UserEdit from "../../commons/user(Edit)/userEdit.container";
import { Modal } from "antd";
import { useRouter } from "next/router";

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      id
      email
      nickname
      age
      gender
      region
      prefer
      grade
      image {
        id
        imgUrl
      }
    }
  }
`;
const FETCH_MY_FOLLOW_COUNT = gql`
  query fetchMyFollowCount {
    fetchMyFollowCount {
      id
      followCount
      followerCount
      user {
        id
      }
    }
  }
`;
export default function MyPageA(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useRecoilState(userEditState);
  const [color1, setColor1] = useState(true);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const [color4, setColor4] = useState(false);
  const router = useRouter();

  const { data, loading } = useQuery(FETCH_USER_LOGGED_IN);

  const { data: fetchMyFollowCount } = useQuery(FETCH_MY_FOLLOW_COUNT);

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      void router.push("/login");
    } else return;
  });


  const onClickEdit = () => {
    setModalOpen((prev) => !prev);
  };

  const onClickColorfirst = () => {
    if (!color1) {
      if (color2) {
        setColor1((prev) => !prev);
        setColor2((prev) => !prev);
      } else if (color3) {
        setColor1((prev) => !prev);
        setColor3((prev) => !prev);
      } else if (color4) {
        setColor1((prev) => !prev);
        setColor4((prev) => !prev);
      } else {
        setColor1((prev) => !prev);
      }
    }
  };

  const onClickColorSecond = () => {
    if (!color2) {
      if (color1) {
        setColor1((prev) => !prev);
        setColor2((prev) => !prev);
      } else if (color3) {
        setColor2((prev) => !prev);
        setColor3((prev) => !prev);
      } else if (color4) {
        setColor2((prev) => !prev);
        setColor4((prev) => !prev);
      } else {
        setColor2((prev) => !prev);
      }
    }
  };

  const onClickColorThird = () => {
    if (!color3) {
      if (color1) {
        setColor1((prev) => !prev);
        setColor3((prev) => !prev);
      } else if (color2) {
        setColor2((prev) => !prev);
        setColor3((prev) => !prev);
      } else if (color4) {
        setColor3((prev) => !prev);
        setColor4((prev) => !prev);
      } else {
        setColor3((prev) => !prev);
      }
    }
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <S.Containerbox>
      {ModalOpen && (
        <ModalCustom
          title="회원정보 수정"
          centered
          open={true}
          width={1000}
          onCancel={handleCancel}
        >
          <UserEdit data={data} />
        </ModalCustom>
      )}
      {loading ? (
        ""
      ) : (
        <S.Container>
          <S.Wrapper>
            <S.ProfileBox>
              <S.ProfileImageAvatarBox>
                <S.ImageAvatar
                  src={data?.fetchUserLoggedIn?.image?.imgUrl || "/profile.png"}
                />
              </S.ProfileImageAvatarBox>
              <S.InfoBox>
                <S.NickInfoBox>
                  <S.NickNameWrapper>
                    <S.Nickname>{data?.fetchUserLoggedIn?.nickname}</S.Nickname>
                    <S.Nim>님</S.Nim>
                  </S.NickNameWrapper>
                  <S.Modify onClick={onClickEdit}>회원정보수정</S.Modify>
                </S.NickInfoBox>
                <S.InformationBox>
                  <S.FriendHeartBox>
                    <S.FriendBox>
                      <S.IconBox>
                        <BiUserPlus style={{ fontSize: "40px" }} />
                      </S.IconBox>
                      <S.FriendTextBox>
                        <S.FriendText>
                          팔로워
                          {
                            fetchMyFollowCount?.fetchMyFollowCount
                              ?.followerCount
                          }
                        </S.FriendText>
                      </S.FriendTextBox>
                    </S.FriendBox>
                    <S.HeartBox1>
                      <S.RightIconDownBox>
                        <BiUserPlus style={{ fontSize: "40px" }} />
                      </S.RightIconDownBox>
                      <S.FameTextBox>
                        <S.FameText>
                          팔로잉
                          {fetchMyFollowCount?.fetchMyFollowCount?.followCount}
                        </S.FameText>
                      </S.FameTextBox>
                    </S.HeartBox1>
                  </S.FriendHeartBox>
                </S.InformationBox>
              </S.InfoBox>
            </S.ProfileBox>
          </S.Wrapper>
          <S.BoardCategoryWrapper>
            <S.BoardBox>
              <S.FriendListBox>
                <S.FriendList>
                  <S.FriendListText
                    isActive={color1}
                    onClick={onClickColorfirst}
                  >
                    내가 쓴 글
                  </S.FriendListText>
                </S.FriendList>
              </S.FriendListBox>
              <S.ChatListBox>
                <S.ChatList>
                  <S.ChatListText
                    onClick={onClickColorSecond}
                    isActive={color2}
                  >
                    내가 참가한 글
                  </S.ChatListText>
                </S.ChatList>
              </S.ChatListBox>
              <S.PickListBox>
                <S.PickList>
                  <S.PickListText onClick={onClickColorThird} isActive={color3}>
                    내가 찜한 글
                  </S.PickListText>
                </S.PickList>
              </S.PickListBox>
            </S.BoardBox>
          </S.BoardCategoryWrapper>
          <S.ListContainer>
            {color1 ? <MyBoardList /> : ""}
            {color2 ? <AttendList /> : ""}
            {color3 ? <MyPickList /> : ""}
          </S.ListContainer>
          {/* 보드리스트 게시글목록 할 때 부분 */}
        </S.Container>
      )}
    </S.Containerbox>
  );
}

const ModalCustom = styled(Modal)`
  .ant-modal-header {
    padding: 16px 24px;
    padding-top: 30px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
    height: 80px;
  }
  .ant-modal-title {
    color: #fff;
  }
  .ant-modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .ant-modal-footer > .ant-btn-primary {
    width: 161px;
    height: 63px;
    background-color: #000;
    color: #fff;
    border: none;
  }
  .ant-modal-footer > .ant-btn-default {
    width: 161px;
    height: 63px;
    background-color: #f6f6f6;
    color: #8b8b8b;
    border: none;
  }
  .ant-modal-footer {
    height: 0px;
    border: none;
  }
  .ant-btn {
    visibility: hidden;
  }
`;
