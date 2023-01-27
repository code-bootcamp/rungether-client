import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import {
  IQuery,
  IQueryFetchMyAllBoardsArgs,
} from "../../../commons/types/generated/types";

export const FETCH_MY_All_BOARDS = gql`
  query fetchMyAllBoards($page: Int) {
    fetchMyAllBoards(page: $page) {
      id
      user {
        id
        email
        nickname
        age
        gender
        region
        grade
        prefer
      }
      attendList {
        id
        user {
          id
          nickname
          region
          prefer
        }
      }
    }
  }
`;

export default function AttendPeople() {
  const { data } = useQuery(FETCH_MY_All_BOARDS);

  return (
    <>
      {data?.fetchMyAllBoards?.map((el: any, index: any) => (
        <BoardListWrapper key={el.id}>
          <BoardList>
            <ImageListProfileBox>
              <ImageListProfile src="/profile.png" />
            </ImageListProfileBox>
            <Profile1>
              <InfoTextBox1>
                <Title1>{el.user.nickname}</Title1>
                <Nim1>님</Nim1>
              </InfoTextBox1>
              <Content1>
                <Exercise>{el.user.prefer}</Exercise>
                <Section2>{el.user.region}</Section2>
                <Sex1>{el.user.gender}</Sex1>
              </Content1>
            </Profile1>
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
  width: 100%;
`;
export const ImageListProfileBox = styled.div`
  padding: 25px 35px 25px 0;
`;
export const ImageListProfile = styled.img`
  width: 64px;
`;
export const Profile1 = styled.div`
  width: 100%;
`;
export const InfoTextBox1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 22px;
`;
export const Title1 = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
`;
export const Nim1 = styled.div`
  padding-top: 5px;
  color: #8b8b8b;
`;
export const Content1 = styled.div`
  width: 100%;
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: -0.0024em;

  padding-top: 15px;
  padding-right: 20px;

  color: #0b0b0b;
`;
export const Exercise = styled.div`
  padding-right: 2%;
`;
export const Section2 = styled.div`
  padding-right: 2%;
`;
export const Sex1 = styled.div``;
