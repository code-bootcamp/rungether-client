import styled from "@emotion/styled";
import { globalContainer } from "../../../commons/styles/commonStyles";
import * as M from "../../../commons/styles/mediaQueries";

export const Wrapper = styled(globalContainer)`
  width: 100%;
  height: 100vh;
  display: flex;
  /* justify-content: center; */
`;
export const Container = styled.div`
  width: 100%;
  background-image: url("./images/main.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  /* @media only screen and (max-width: 1024px) {
    background-position-x: -130px;
  } */
  ${M.mediaL} {
  }
`;
export const MainTextBox = styled.div`
  padding-top: 20%;
  ${M.mediaL} {
    padding-top: 20%;
  }
`;
export const Title = styled.h1`
  color: white;
  display: flex;
  justify-content: center;
  font-size: 92px;
  font-weight: 600;
  line-height: 67px;
  letter-spacing: -0.011em;
  text-align: center;

  ${M.mediaL} {
    font-size: 82px;
  }
  ${M.mediaM} {
    font-size: 72px;
  }
`;
export const contents = styled.p`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.019em;
  text-align: center;
  color: white;

  ${M.mediaL} {
    font-size: 20px;
  }
  ${M.mediaM} {
    font-size: 18px;
  }
`;

export const Wrapper_2 = styled.div`
  margin: 0px auto;
  width: 1400px;
  height: 100vh;
`;

export const TitleBox = styled.div``;
export const Title_2 = styled.h1`
  font-size: 120px;
  font-weight: 850;
  line-height: 91px;
  letter-spacing: -0.011em;
  text-align: left;
  padding-top: 86px;
  padding-left: 76px;
  padding-bottom: 0px;

  ${M.mediaL} {
    font-size: 80px;
    padding-top: 61px;
    padding-bottom: 0px;
  }
  ${M.mediaM} {
    font-size: 60px;
    padding-top: 54px;
    padding-left: 78px;
  }
`;
export const MEMBERS = styled.div`
  font-size: 170px;
  font-weight: 850;
  line-height: 91px;
  letter-spacing: -0.011em;
  text-align: left;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #d3d3d3;
  position: relative;
  right: 200px;
  top: 10px;
  z-index: -1;

  ${M.mediaL} {
    font-size: 120px;
    right: 150px;
  }
  ${M.mediaM} {
    font-size: 90px;
    right: 110px;
  }
`;
export const MainContents = styled.div`
  display: flex;
  padding-right: 80px;
  padding: 0 80;
  /* justify-content: space-between; */

  ${M.mediaL} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  ${M.mediaM} {
    display: flex;
    flex-direction: row;
  }
`;
export const ImgBox = styled.div`
  width: 55%;
  height: 500px;
  background-position: center;
  background-size: cover;
  background-image: url("./images/landing.png");

  ${M.mediaL} {
    width: 40%;
    background-position-x: -109px;
    background-position-y: 0px;
    height: 458px;
  }
  ${M.mediaM} {
    width: 30%;
    height: 228px;
    background-position-x: -104px;
    background-position-y: 0px;
  }

  ${M.mediaM} {
    height: 458px;
    width: 33%;
    background-position-x: -128px;
  }
`;

export const ImgBox1 = styled.div`
  width: 55%;
  height: 500px;
  background-position: center;
  background-size: cover;
  background: url("./images/landing.png");

  ${M.mediaL} {
    /* width: 100%;
    background-position-x: -296px;
    background-position-y: -40px;
    height: 458px; */
    width: 27%;
    background-position-x: -187px;
    background-position-y: 0px;
    height: 458px;
  }
  ${M.mediaM} {
    width: 30%;
    background-position-x: -104px;
    background-position-y: 0px;
  }

  ${M.mediaM} {
    width: 23.5%;
    background-position-x: -249px;
  }
`;

export const ContentsBox = styled.div`
  margin: auto 0px;
  width: 35%;
  height: 294px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${M.mediaL} {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  ${M.mediaM} {
    display: flex;
    flex-direction: column;
  }
`;

export const ContentBox = styled.div`
  width: 126%;
  ${M.mediaL} {
    width: 51%;
  }
`;

export const ContentBox1 = styled.div`
  width: 126%;
  padding-left: 80px;
  ${M.mediaL} {
    width: 61%;
    padding-left: 0;
  }
  ${M.mediaM} {
    padding-left: 0;
  }
`;

export const Contents_title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  letter-spacing: 0em;
  text-align: left;

  ${M.mediaL} {
    /* display: flex;
    flex-direction: row; */
    line-height: 50px;
    font-size: 36px;
    padding-left: 80px;
  }
  ${M.mediaM} {
    line-height: 40px;
    font-size: 30px;
    padding-left: 30px;
  }
`;

export const Contents_title1 = styled.h1`
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  letter-spacing: 0em;
  text-align: left;
  padding-top: 23px;

  ${M.mediaL} {
    /* display: flex;
    flex-direction: row; */
    line-height: 50px;
    font-size: 36px;
    padding-top: 5px;
  }
  ${M.mediaM} {
    line-height: 40px;
    font-size: 30px;
    padding-left: 30px;
    padding-top: 10px;
  }
`;
export const Btn = styled.button`
  background-color: #c71515;
  border: none;
  padding: 3px 7px;
  cursor: pointer;
  font-size: 20px;
  width: 160px;
  ${M.mediaL} {
    font-size: 14px;
    padding: 0 7px;
  }
  ${M.mediaM} {
    width: 16%;
  }
`;
export const Contents_2 = styled.p`
  font-size: 19px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 50px;
  ${M.mediaL} {
    padding-left: 80px;
    font-size: 14px;
    line-height: 30px;
  }
  ${M.mediaM} {
    padding-left: 30px;
  }
`;

export const Contents_3 = styled.p`
  font-size: 19px;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 50px;
  ${M.mediaL} {
    font-size: 14px;
    line-height: 26px;
  }
  ${M.mediaM} {
    padding-left: 30px;
    line-height: 30px;
  }
`;

export const BtnBox = styled.div`
  padding-left: 80px;
  ${M.mediaL} {
    display: flex;
    flex-direction: column;
    /* padding-top: 227px; */
  }
  ${M.mediaM} {
    padding-top: 0px;
    padding-left: 30px;
  }
`;

export const BtnBox1 = styled.div`
  ${M.mediaL} {
    display: flex;
    flex-direction: column;
    padding-top: 0px;
  }
  ${M.mediaM} {
    padding-top: 0;
    width: 145%;
  }
`;

export const MemberBtn = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  ${M.mediaL} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  ${M.mediaM} {
    justify-content: flex-start;
    padding-left: 30px;
  }
`;

export const MemberBtn1 = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  ${M.mediaL} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  ${M.mediaM} {
    justify-content: flex-start;
  }
`;

export const TitleBox2 = styled.div`
  display: flex;
  justify-content: flex-end;

  ${M.mediaL} {
    /* padding-left: 70px; */
  }

  ${M.mediaM} {
    display: flex;
    justify-content: flex-start;
  }
`;
export const Title_3 = styled.h1`
  font-size: 120px;
  font-weight: 850;
  line-height: 91px;
  letter-spacing: -0.011em;
  text-align: left;
  padding-right: 80px;
  padding-top: 86px;
  padding-bottom: 70px;

  ${M.mediaL} {
    font-size: 80px;
    padding: 61px 820px 0 0;
  }
  ${M.mediaM} {
    font-size: 60px;
    padding-left: 78px;
    padding-top: 55px;
  }
`;
export const MainContents2 = styled.div`
  display: flex;
  justify-content: space-between;
  ${M.mediaL} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
  ${M.mediaM} {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
`;
export const ContentsBox2 = styled.div`
  margin: auto 0px;
  width: 45%;
  height: 294px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 80px;

  ${M.mediaL} {
    width: 48%;
    display: flex;
    flex-direction: column
    padding-left: 130px;
  }
  ${M.mediaM} {
    font-size: 60px;
    display: flex;
    flex-direction: column;
    padding-left: 0%;
  }
`;

export const ContentsBox3 = styled.div``;

export const COMMUNITY = styled.div`
  font-size: 170px;
  font-weight: 850;
  line-height: 91px;
  letter-spacing: -0.011em;
  text-align: left;
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #d3d3d3;
  position: relative;
  right: 110px;
  top: 30px;
  z-index: -1;

  ${M.mediaL} {
    font-size: 110px;
    top: 20px;
    right: 10px;
  }
  ${M.mediaM} {
    font-size: 90px;
    right: 30px;
  }
`;
