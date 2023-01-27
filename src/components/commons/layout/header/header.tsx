import { MenuOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { LoggedInUserId } from "../../../../commons/stores";
import * as S from "./header.style";
import Sidebar from "./sidebar";

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
export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;
export default function LayoutHeader() {
  const [id, setId] = useRecoilState(LoggedInUserId);
  const router = useRouter();
  // 햄버거 메뉴
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
  };
  // 로그인시
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    setId(data?.fetchUserLoggedIn.id);
  }, [data, setId]);

  const onClickMoveToLogin = () => {
    if (!data) {
      router.push("/login");
    }
  };
  const onClcikMoveToUser = () => {
    if (data) {
      router.push("/mypage");
    } else {
      router.push("/join");
    }
  };
  // 로그아웃
  const [logout] = useMutation(LOGOUT_USER);
  const onClickLogOut = async () => {
    try {
      await logout();
      window.localStorage.removeItem("accessToken");
      router.push("/");
      location.reload();
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: "로그아웃 실패" });
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.LeftSide>
          <S.Logo onClick={() => router.push("/")} className="logo">
            Rungether
          </S.Logo>
        </S.LeftSide>
        <S.RightSide>
          <S.Menu onClick={() => router.push("/photoReview")} className="menu">
            <p style={{ marginBottom: "0em" }}>PhotoReview</p>
          </S.Menu>
          <S.Menu onClick={() => router.push("/members")} className="menu">
            <p style={{ marginBottom: "0em" }}>Members</p>
          </S.Menu>
          <S.Menu onClick={() => router.push("/community")} className="menu">
            Community
          </S.Menu>
          <S.Menu onClick={onClcikMoveToUser} className="menu">
            {data ? "Mypage" : "Sign up"}
          </S.Menu>
          <S.Menu
            onClick={data ? onClickLogOut : onClickMoveToLogin}
            className="menu"
          >
            {data ? "Logout" : "Login"}
          </S.Menu>

          <S.Menu2>
            <MenuOutlined className="sidemenu" onClick={toggleSide} />
          </S.Menu2>
        </S.RightSide>
      </S.Wrapper>
      <S.SidebarWrap>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </S.SidebarWrap>
    </>
  );
}
