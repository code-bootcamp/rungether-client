import styled from "@emotion/styled";

import { HeartFilled, HeartOutlined, UserAddOutlined } from "@ant-design/icons";

import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Modal } from "antd";

import { IMutation, IMutationFollowUserArgs, IQuery, IQueryFetchFollowCountArgs } from "../../../../commons/types/generated/types";

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

export default function FollowingList(props: any) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [addActive, setAddActive] = useState(false);
  const { data: fetchUser } = useQuery(FETCH_USER_LOGGED_IN);
  const { data } = useQuery<
    Pick<IQuery, "fetchFollowCount">,
    IQueryFetchFollowCountArgs
  >(FETCH_FOLLOW_COUNT, {
    variables: { userId: props.el.id },
  });

  const [followUser] = useMutation(FOLLOW_USER);

  const onClickAdd = (userId) => async () => {
    setAddActive((prev) => !prev);
    const result = await followUser({
      variables: { userId: userId },
      refetchQueries: [
        {
          query: FETCH_FOLLOWING,
          variables: { userId: String(fetchUser.fetchUserLoggedIn.id) },
        },
      ],
    });
      Modal.error({ content: "팔로우 취소!" });

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
          팔로우 취소
        </FollowButton>
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
const FollowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ButtonWrap = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
