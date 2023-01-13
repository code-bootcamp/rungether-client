import styled from "@emotion/styled";
import * as M from "../../../../src/commons/styles/mediaQueries";
import {
  globalContainer,
  OneEllipsis,
} from "../../../commons/styles/commonStyles";

export const Containerbox = styled(globalContainer)``;

export const Container = styled.div`
  /* overflow: hidden; */
  padding: 48px 0px;
  /* margin: 0px auto; */
  /* max-width: 1640px; */
  /* max-width: 1400px; */
  /* width: 100%; */
  /* @media only screen and (max-width: 1024px) {
    background-color: #ff0000;
  }
  @media only screen and (max-width: 768px) {
    background-color: blue;
  } */

  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  padding-bottom: 100px;
`;

export const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 80px;

  ${M.mediaL} {
    padding: 0 80px;
  }
  ${M.mediaM} {
    padding: 0 80px;
  }
`;

export const ProfileImageAvatarBox = styled.div``;

export const ImageAvatar = styled.img``;

export const ImageProfile = styled.img``;

export const ImageHeart = styled.img``;

export const InfoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  ${M.mediaM} {
    padding-left: 50px;
  }
`;

export const NickInfoBox = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 10px;
  padding-right: 80px;

  ${M.mediaM} {
    justify-content: space-between;
    padding-right: 0;
  }
`;

export const FriendHeartBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NickNameWrapper = styled.div`
  display: flex;
  flex-direction: row;

  ${M.mediaM} {
    /* height: calc(100% - 280px); */
  }
`;

export const Nickname = styled(OneEllipsis)`
  font-family: "Code Next-Trial";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 62px;
  /* identical to box height, or 141% */

  text-align: center;
  letter-spacing: -0.002em;
  padding-top: 23px;

  color: #0b0b0b;

  ${M.mediaM} {
    font-size: 24px;
    padding-top: 26px;
  }
`;

export const Modify = styled.div`
  font-family: "Code Next-Trial";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  width: 280px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #8b8b8b;
  padding: 45px 0 0 54px;
  ${M.mediaL} {
    padding: 45px 0 0 40px;
  }
  ${M.mediaM} {
    padding: 45px 0 0 0;
    width: 30%;
  }
  cursor: pointer;
`;

export const FriendBox = styled.div`
  display: flex;
  flex-direction: row;

  ${M.mediaL} {
    display: flex;
    flex-direction: row;
  }
  ${M.mediaM} {
    display: flex;
    flex-direction: row;
    padding-right: 10px;
  }
`;

export const HeartBox = styled.div`
  display: flex;
  flex-direction: row;

  ${M.mediaL} {
    display: flex;
    flex-direction: column;
  }
  ${M.mediaM} {
    display: flex;
    flex-direction: column;
  }
`;

export const FameText = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
  margin-left: 10px;
  padding-top: 7px;

  ${M.mediaL} {
    padding-right: 20px;
  }
  ${M.mediaM} {
  }
`;

export const FriendText = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
  margin-left: 10px;
  padding-top: 7px;

  ${M.mediaL} {
    margin-left: 3px;
    /* padding-right: 20px; */
  }
  ${M.mediaM} {
  }
`;

export const FriendTextBox = styled.div`
  ${M.mediaL} {
    margin-left: 10px;
  }
`;

export const FameTextBox = styled.div`
  color: #8b8b8b;
`;

export const BoardBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 80px;
  ${M.mediaL} {
    padding-left: 80px;
  }
  ${M.mediaM} {
    padding-left: 80px;
  }
`;

export const FriendList = styled.div`
  padding-right: 50px;
  ${M.mediaL} {
    padding-right: 0px;
  }
  ${M.mediaM} {
  }
`;

export const ChatList = styled.div``;

export const PickList = styled.div`
  margin-right: 50px;
  ${M.mediaL} {
    margin-right: 20px;
  }
  ${M.mediaM} {
    margin-right: 27px;
  }
`;

export const FriendListBox = styled.div`
  ${M.mediaL} {
    padding-right: 20px;
  }
  ${M.mediaM} {
    padding-right: 27px;
    padding-left: 0;
  }
`;

export const ChatListBox = styled.div`
  padding-right: 50px;
  ${M.mediaL} {
    padding-right: 20px;
  }
  ${M.mediaM} {
    padding-right: 28px;
  }
`;

export const PickListBox = styled.div``;

export const BoardCategoryWrapper = styled.div``;
export const Nim = styled.div`
  font-family: "Code Next-Trial";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #8b8b8b;
  padding-top: 45px;
`;

export const InformationBox = styled.div``;

export const FollowFollowingBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FollowingBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FollowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 0 0 60px;
`;

export const HeartBox1 = styled.div`
  display: flex;
  flex-direction: row;

  ${M.mediaL} {
    display: flex;
    flex-direction: row;
  }
  ${M.mediaM} {
    display: flex;
    flex-direction: row;
  }
`;
export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 200px;
`;

export const ListContainer = styled.div`
  padding-top: 20px;
`;

export const ReactIconBox = styled.div``;

export const IconBox = styled.div`
  color: #8b8b8b;
  ${M.mediaL} {
  }
  ${M.mediaM} {
  }
`;
export const RightIconUpBox = styled.div`
  padding-left: 30px;
  color: #8b8b8b;
  ${M.mediaL} {
    padding-left: 5px;
  }
  ${M.mediaM} {
  }
`;
export const RightIconDownBox = styled.div`
  padding-left: 30px;
  color: #8b8b8b;
  ${M.mediaL} {
    padding-left: 30px;
  }
  ${M.mediaM} {
  }
`;

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡ보드리스트 부분ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

export const BoardListWrapper = styled.div`
  padding: 0 200px 0 200px;
  background-color: red;
  ${M.mediaL} {
    padding: 0 80px 0 80px;
  }
  ${M.mediaM} {
    padding: 0 80px 0 80px;
  }
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

export const InfoTextWrapper = styled.div`
  width: calc(100% - 120px);
  display: flex;
  flex-direction: row;
  /* padding: 0 200px 0 200px;
  ${M.mediaL} {
    padding: 0 80px 0 80px;
  }
  ${M.mediaM} {
    padding: 0 80px 0 80px;
  } */

  /* padding: 25px 0 25px 0; */
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 8px;
  ${M.mediaL} {
    width: 100%;
  }
  ${M.mediaM} {
    width: 100%;
  }
`;

export const InfoTextBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const Title = styled(OneEllipsis)`
  width: 81%;
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
`;

export const InfoTextBox1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 22px;
`;

export const Nim1 = styled.div`
  padding-top: 5px;
  color: #8b8b8b;
`;

export const MeetTime = styled.div`
  width: 21%;
  padding-right: 20px;
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #0b0b0b;
`;

export const Section = styled.div`
  padding-right: 20px;
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #8b8b8b;
`;

export const Time = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  /* identical to box height, or 167% */

  letter-spacing: -0.002em;

  color: #8b8b8b;
`;

export const Content = styled(OneEllipsis)`
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
export const ContentText = styled(OneEllipsis)`
  width: 83%;
  /* padding-right: 20px; */
`;

export const Section1 = styled.div`
  padding-right: 20px;
`;

export const Sex = styled.div`
  padding-right: 20px;
`;

// export const BtnBox = styled.div``;

export const ReviewBtn = styled.button`
  background: black;
  border-radius: 8px;
  color: white;
  font-size: 14px;
`;

export const JoinBtn = styled.button`
  background: black;
  border-radius: 8px;
  color: white;
  font-size: 14px;
`;

export const ThumbnailBox = styled.div`
  width: 120px;
  height: 90px;
  /* padding-top: 20px; */
  border-radius: 12px;
`;
export const ThumbnailImage = styled.img`
  border-radius: 12px;
`;

export const FriendListText = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.002em;
  color: #0b0b0b;
  padding: 0 16px 10px 16px;
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "2px solid #C71515" : "none")};
  color: ${(props) => (props.isActive ? "#C71515" : "none")};
  /* identical to box height */
`;

export const PickListText = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.002em;
  padding: 0 16px 10px 16px;
  cursor: pointer;
  color: #0b0b0b;

  border-bottom: ${(props) => (props.isActive ? "2px solid #C71515" : "none")};
  color: ${(props) => (props.isActive ? "#C71515" : "none")};
`;

export const ChatListText = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.002em;
  padding: 0 16px 10px 16px;
  cursor: pointer;
  color: #0b0b0b;

  border-bottom: ${(props) => (props.isActive ? "2px solid #C71515" : "none")};
  color: ${(props) => (props.isActive ? "#C71515" : "none")};
`;

export const JoinCrewText = styled.div`
  font-family: "AppleSDGothicNeoM00";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.002em;
  padding: 0 16px 10px 16px;
  color: #0b0b0b;
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "2px solid #C71515" : "none")};
  color: ${(props) => (props.isActive ? "#C71515" : "none")};
`;

export const MyPageImageBox = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 90px;
`;

export const MyPageImage = styled.img``;

// 운동게시글

export const ExerciseBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 200px;
`;

export const ItemBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* :nth-of-type(4) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  } */
`;

export const Item = styled.div`
  width: 280px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 0px 9px rgba(153, 153, 151, 0.25);
  border-radius: 12px;
`;
export const Img = styled.img`
  background-size: cover;
  width: 100%;
  height: 204px;
  border-radius: 12px;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 18px;
`;
export const Title2 = styled.div`
  padding-top: 15px;
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 39px;
  /* identical to box height */

  letter-spacing: -0.0024em;

  color: #0b0b0b;
`;
export const Contents = styled.div`
  padding-top: 8px;
  font-weight: 400;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.0024em;

  color: #8b8b8b;
`;
export const Sports = styled.div`
  padding-top: 18px;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  letter-spacing: -0.0024em;

  color: #0b0b0b;
`;
export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 23px;
  padding-bottom: 20px;
  align-items: center;
`;
export const Location = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
export const LocaionText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 34px;
  /* identical to box height, or 283% */
  padding-left: 6px;
  letter-spacing: -0.48px;

  color: #8b8b8b;
`;

// 참가인원 부분

export const Profile1 = styled.div`
  width: 100%;
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
export const Exercise = styled.div`
  padding-right: 2%;
`;

export const Section2 = styled.div`
  padding-right: 2%;
`;
export const Sex1 = styled.div``;
