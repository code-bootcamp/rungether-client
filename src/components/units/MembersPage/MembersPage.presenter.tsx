import { SearchOutlined } from "@ant-design/icons";
import { result } from "lodash";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import UserCard from "../../commons/userCard/01-userCard";
import * as S from "./MembersPage.styles";

const AreaOption = [
  {
    value: "",
    label: "모든 지역",
  },
  {
    value: "서울특별시",
    label: "서울특별시",
  },
  {
    value: "인천광역시",
    label: "인천광역시",
  },
  {
    value: "세종특별자치시",
    label: "세종특별자치시",
  },
  {
    value: "대전광역시",
    label: "대전광역시",
  },
  {
    value: "부산광역시",
    label: "부산광역시",
  },
  {
    value: "대구광역시",
    label: "대구광역시",
  },
  {
    value: "광주광역시",
    label: "광주광역시",
  },
  {
    value: "울산광역시",
    label: "울산광역시",
  },
  {
    value: "제주특별자치도",
    label: "제주특별자치도",
  },
];
const AgeOption = [
  {
    value: "",
    label: "모든 나이대",
  },
  {
    value: "10대",
    label: "10대",
  },
  {
    value: "20대",
    label: "20대",
  },
  {
    value: "30대",
    label: "30대",
  },
  {
    value: "40대",
    label: "40대",
  },
  {
    value: "50대",
    label: "50대",
  },
  {
    value: "60대 이상",
    label: "60대 이상",
  },
];
const FavOption = [
  {
    value: "",
    label: "모든 운동",
  },
  {
    value: "런닝",
    label: "런닝",
  },
  {
    value: "걷기",
    label: "걷기",
  },
  {
    value: "풋살",
    label: "풋살",
  },
  {
    value: "배드민턴",
    label: "배드민턴",
  },
  {
    value: "테니스",
    label: "테니스",
  },
  {
    value: "수영",
    label: "수영",
  },
  {
    value: "족구",
    label: "족구",
  },
  {
    value: "탁구",
    label: "탁구",
  },
  {
    value: "야구",
    label: "야구",
  },
];
const levelOption = [
  {
    value: "",
    label: "모든 레벨",
  },
  {
    value: "Beginner",
    label: "Beginner",
  },
  {
    value: "Amateur",
    label: "Amateur",
  },
  {
    value: "Pro",
    label: "Pro",
  },
];

export default function MembersUi(props: any) {
  const [menuAct, setMenuAct] = useState(true);
  const [menuAct1, setMenuAct1] = useState(false);
  const onClickMenu1 = () => {
    if (!menuAct) {
      if (menuAct1) {
        setMenuAct((prev) => !prev);
        setMenuAct1((prev) => !prev);
      } else {
        setMenuAct((prev) => !prev);
      }
    }
  };
  const onClickMenu2 = () => {
    if (!menuAct1) {
      if (menuAct) {
        setMenuAct((prev) => !prev);
        setMenuAct1((prev) => !prev);
      } else {
        setMenuAct1((prev) => !prev);
      }
    }
  };
  return props.loading ? (
    <></>
  ) : (
    <S.Wrapper>
      <S.SearchWrap>
        {/* <S.SelectSide> */}
        <S.Category>
          <S.Ctg_title>지역</S.Ctg_title>
          <S.Selectbar>
            <S.SelectArea
              onChange={props.onChangeLo}
              defaultValue={AreaOption[0]}
              style={{ width: "100%", borderRadius: "10px" }}
              options={AreaOption}
            />
          </S.Selectbar>
        </S.Category>
        <S.Category>
          <S.Ctg_title>최애 운동</S.Ctg_title>
          <S.Selectbar>
            <S.SelectArea
              onChange={props.onChangeFav}
              defaultValue={FavOption[0]}
              style={{ width: "100%", borderRadius: "10px" }}
              options={FavOption}
            />
          </S.Selectbar>
        </S.Category>
        <S.Category>
          <S.Ctg_title>나이</S.Ctg_title>
          <S.Selectbar>
            <S.SelectArea
              onChange={props.onChangeAge}
              defaultValue={AgeOption[0]}
              style={{ width: "100%", borderRadius: "10px" }}
              options={AgeOption}
            />
          </S.Selectbar>
        </S.Category>
        <S.Category>
          <S.Ctg_title1>운동 레벨</S.Ctg_title1>
          <S.Selectbar>
            <S.SelectArea
              onChange={props.onChangeLevel}
              defaultValue={levelOption[0]}
              style={{ width: "100%", borderRadius: "10px" }}
              options={levelOption}
            />
          </S.Selectbar>
        </S.Category>
        {/* </S.SelectSide> */}
        {/* <S.ButtonSide>
          <S.Button onClick={props.onClickBtn}>검색하기</S.Button>
        </S.ButtonSide> */}
      </S.SearchWrap>
      {props.isNo ? (
        <div>
          <S.NoSearch>
            <S.IconBox>
              <SearchOutlined style={{ color: "white", fontSize: "180px" }} />
            </S.IconBox>
            <S.H1>관련된 멤버가 없습니다.</S.H1>
            <S.P>다른 키워드로 검색해보세요!</S.P>
          </S.NoSearch>
        </div>
      ) : (
        <S.ResultWrap>
          <S.ResultTitle>검색결과</S.ResultTitle>
          <InfiniteScroll
            pageStart={0}
            loadMore={props.onLoadMore}
            hasMore={true}
          >
            <S.Items>
              {props.result?.map((el, index) => (
                <UserCard
                  key={index}
                  el={el}
                  result={props.result}
                  following={props.following}
                />
              ))}
            </S.Items>
          </InfiniteScroll>
        </S.ResultWrap>
      )}
    </S.Wrapper>
  );
}
