import styled from "@emotion/styled";

import { HeartFilled, HeartOutlined, UserAddOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARD } from "../../../units/CommunityPage/detail/CommunityDetail.queries";
import { Modal } from "antd";

import {
  IMutation,
  IMutationFollowUserArgs,
  IQuery,
  IQueryFetchFollowCountArgs,
  IQueryFetchFollowingArgs,
} from "../../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { LoggedInUserId } from "../../../../commons/stores";
import { FETCH_FOLLOWING } from "../../../units/PhotoReview/ReviewList/Review.query";
import { FETCH_USER_LOGGED_IN } from "../../layout/header/header";

export const FOLLOW_USER = gql`
  mutation followUser($userId: String!) {
    followUser(userId: $userId)
  }
`;
export const FETCH_FOLLOW_COUNT = gql`
  query fetchFollowCount($userId: String!) {
    fetchFollowCount(userId: $userId) {
      id
      followCount
      followerCount
      user {
        id
      }
    }
  }
`;
export const FETCH_USER = gql`
  query fetchUser($userId: String!) {
    fetchUser(userId: $userId) {
      id
      email
      nickname
      age
      gender
      region
      prefer
      grade
    }
  }
`;
export default function UserCard(props: any) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const [loggedInId, setLoggedInId] = useRecoilState(LoggedInUserId);
  const { data } = useQuery<
    Pick<IQuery, "fetchFollowCount">,
    IQueryFetchFollowCountArgs
  >(FETCH_FOLLOW_COUNT, {
    variables: { userId: props.el.id },
  });

  //   const { data: LoggedIn} =
  //   useQuery(FETCH_USER_LOGGED_IN);

  //   const { data:followingList ,fetchMore: followingMore } = useQuery<
  //   Pick<IQuery, "fetchFollowing">,
  //   IQueryFetchFollowingArgs
  // >(FETCH_FOLLOWING, {
  //     variables: { userId: String(LoggedIn?.fetchUserLoggedIn.id) },
  //   });

  // useEffect(() =>{
  //   props.result.forEach((el, index) =>{
  //     followingList?.fetchFollowing.forEach((el_F) =>{
  //       if(el.id === el_F.user2.id){
  //         setIsActive(true)
  //       }
  //     })
  //   })

  // },[props.result])

  const { data: userData } = useQuery(FETCH_USER, {
    variables: { userId: props.el.id },
  });
  const [followUser] = useMutation(FOLLOW_USER);

  const onClickAdd = (userId) => async () => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      void router.push("/login");
      return
    } 
    if (loggedInId === userId) {
      alert("자기 자신은 팔로우 할 수 없습니다 !");
      return;
    }
    setAddActive((prev) => !prev);
    const result = await followUser({
      variables: { userId: userId },
      refetchQueries: [
        {
          query: FETCH_FOLLOWING,
          variables: { userId: String(loggedInId) },
        },
        {
          query: FETCH_FOLLOW_COUNT,
          variables: { userId: userId },
        },
      ],
    });
    if (addActive === false) {
      Modal.success({ content: "팔로우 완료!" });
    } else if (addActive === true) {
      Modal.error({ content: "팔로우 취소!" });
    }
  };

  return (
    <Wrapper>
      <ImgBox>
        <Img src={props.el.image?.imgUrl || "/profile.png"} />
      </ImgBox>
      <Name>{props.el.nickname}</Name>
      <UserInfo>
        <Item>#{props.el.prefer}</Item>
        <Item>#{props.el.age}</Item>
        <Item>#{props.el.region}</Item>
      </UserInfo>
      <Item>#{props.el.grade}</Item>
      <HeartWrap>
        <Level>{data?.fetchFollowCount?.followerCount}팔로워</Level>
        <Level>{data?.fetchFollowCount?.followCount}팔로잉</Level>
      </HeartWrap>
      <ButtonWrap>
        {!addActive ? (
          <FollowButton
            onClick={onClickAdd(props.el.id)}
            style={{
              width: "160px",
              fontSize: "16px",
              height: "35px",
              borderRadius: "16px",
              border: "2px solid black",
              backgroundColor: "black",
              color: "White",
            }}
          >
            팔로우
          </FollowButton>
        ) : (
          <FollowButton
            onClick={onClickAdd(props.el.id)}
            style={{
              width: "160px",
              fontSize: "16px",
              height: "35px",
              border: "2px solid black",
              boxShadow:
                "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
              borderRadius: "16px",
              backgroundColor: "#f6f6f6",
              color: "black",
            }}
          >
            팔로우 취소
          </FollowButton>
        )}
      </ButtonWrap>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 30px;
  width: 237px;
  height: 351px;
  border-radius: 16px;
  background-color: #f6f6f6;
  border: none;
  box-shadow: 4px 4px 10px 0px #00000021;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 23px;
  cursor: pointer;
`;
const ImgBox = styled.div`
  width: 103px;
  height: 103px;
  border-radius: 100%;
`;
const Img = styled.img`
  width: 103px;
  height: 103px;
  border-radius: 100%;
`;
const Name = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: -0.47999998927116394px;
  text-align: left;
  padding-top: 18px;
`;
const UserInfo = styled.div`
  padding-top: 4px;
`;
const Item = styled.span`
  margin-right: 7px;
  color: #bbbbbb;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.47999998927116394px;
  text-align: left;
`;
const HeartWrap = styled.div`
  padding-top: 15px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #bbbbbb;
`;
const Level = styled.div`
  margin-left: 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: -0.47999998927116394px;
  text-align: left;
`;
const Button = styled.button`
  width: 75%;
  height: 35px;
  color: #fafafa;
  background-color: #0b0b0b;
  border-radius: 16px;
  cursor: pointer;
`;
const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FollowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
