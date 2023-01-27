import { RangePickerProps } from "antd/lib/date-picker";
import * as S from "../../../units/CommunityPage/write/CommunityWrite.styles";
import { DatePicker, Modal } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import KakaoMapUI from "../../map/mapsearch";
import { useEffect, useState } from "react";
import {
  mapCenterState,
  mapPathState,
  modalWriteState,
} from "../../../../commons/stores";
import { useRecoilState } from "recoil";
import { CREATE_BOARD } from "../../../units/CommunityPage/write/CommunityWrite.queries";
import { useMutation } from "@apollo/client";
import Uploads01 from "../../uploads/01/Uploads01.container";
import dynamic from "next/dynamic";
import {
  FETCH_ALL_BOARDS,
  FETCH_ALL_BOARDS_WITH_PICK_BOARD,
} from "../../../units/CommunityPage/list/CommunityList.queries";
import { useRouter } from "next/router";
import KaKaoMapPage from "../../map/mapsearch";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../../commons/types/generated/types";

import { FETCH_USER_LOGGED_IN } from "../../layout/header/header";

import { FETCH_MY_All_BOARDS } from "../../../units/MyPageA/MyBoardList";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const AreaOption = [
  { value: "서울특별시", label: "서울특별시" },
  { value: "인천광역시", label: "인천광역시" },
  { value: "세종특별자치시", label: "세종특별자치시" },
  { value: "대전광역시", label: "대전광역시" },
  { value: "부산광역시", label: "부산광역시" },
  { value: "대구광역시", label: "대구광역시" },
  { value: "광주광역시", label: "광주광역시" },
  { value: "울산광역시", label: "울산광역시" },
  { value: "제주특별자치도", label: "제주특별자치도" },
];
const exOption = [
  { value: "Beginner", label: "Beginner" },
  { value: "Amateur", label: "Amateur" },
  { value: "Pro", label: "Pro" },
];

dayjs.extend(customParseFormat);

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

const { RangePicker } = DatePicker;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
};
export default function InModalWrite(props: any) {
  const router = useRouter();
  const [center, setCenter] = useRecoilState(mapCenterState);
  const [path, setPath] = useRecoilState(mapPathState);
  const [ModalOpen, setModalOpen] = useRecoilState(modalWriteState);
  const [recruitRegion, setRecruitRegion] = useState("서울특별시");
  const [recruitGrade, setRecruitGrade] = useState("Beginner");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [appointment, setAppointment] = useState("");
  const [recruitSports, setRecruitSports] = useState("");
  const [recruitPeople, setRecruitPeople] = useState(0);
  const [image, setImage] = useState("");

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  // 로그인 체크

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다!!!");
      void router.push("/login");
      setModalOpen(false);
    } else return;
  }, [router, setModalOpen]);

  const onClickSubmit = async () => {
    if (
      title &&
      content &&
      appointment &&
      recruitSports &&
      recruitGrade &&
      recruitRegion &&
      recruitPeople &&
      path &&
      center
    ) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              title,
              content,
              appointment,
              recruitSports,
              recruitGrade,
              recruitRegion,
              image,
              recruitPeople: Number(recruitPeople),
              location: {
                path,
                center,
              },
            },
          },
          refetchQueries: [
            { query: FETCH_ALL_BOARDS },
            { query: FETCH_MY_All_BOARDS },
            { query: FETCH_ALL_BOARDS_WITH_PICK_BOARD },
          ],
        });
        Modal.success({ content: "게시물 작성 완료!" });
        setModalOpen(false);
        router.push(`/community/`);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error });
      }
    } else {
      alert("이미지를 제외한 모든 정보는 필수입니다.");
    }
  };
  const onChangePeople = (e: any) => {
    setRecruitPeople(e.target.value);
  };
  const onChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const onChangeSports = (e: any) => {
    setRecruitSports(e.target.value);
  };
  const onChangeDate = (e: any) => {
    setAppointment(e?._d);
  };
  const onChangeContent = (value: any) => {
    // event가 들어오는 것이 아니다. html의 속성이 아닌 ReactQuill의 속성이기 때문이다. value가 바로 들어온다.
    setContent(value === "<p><br></p>" ? "" : value); // setValue를 사용하면 register로 등록하지 않고 강제로 값을 넣어줄 수 있다.
  };
  const onChangeLo = (e: any) => {
    setRecruitRegion(e);
  };
  const onChangeGrade = (e: any) => {
    setRecruitGrade(e);
  };
  const onChangeImage = (fileUrl: any) => {
    const newFile = fileUrl;
    setImage(newFile);
  };

  const defaultValue: dayjs.Dayjs = dayjs("00:00:00", "HH:mm:ss");
  let showTime = { defaultValue: dayjs("00:00:00", "HH:mm:ss") };

  return (
    <S.Wrapper>
      <S.Header>
        <S.ImgBox>
          {/* {" "} */}
          <Uploads01 image={image} onChangeImage={onChangeImage} />
        </S.ImgBox>
        <S.InputWrap1>
          <S.InputWrap2>
            <S.InputWrapper>
              <S.Ctg_title>제목</S.Ctg_title>
              <S.InputBox
                placeholder="한강 러닝🏃🏻 하실분 ~~!!"
                type="text"
                onChange={onChangeTitle}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Ctg_title>모집운동</S.Ctg_title>
              <S.InputBox
                placeholder="풋살"
                type="text"
                onChange={onChangeSports}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Ctg_title>모집인원</S.Ctg_title>
              <S.InputBox
                onChange={onChangePeople}
                placeholder="ex) 7"
                type="text"
              />
            </S.InputWrapper>
          </S.InputWrap2>
          <S.InputWrap3>
            <S.Category>
              <S.Ctg_title>지역</S.Ctg_title>
              <S.Selectbar>
                <S.SelectArea
                  onChange={onChangeLo}
                  defaultValue={AreaOption[0]}
                  style={{ width: "100%", borderRadius: "10px" }}
                  options={AreaOption}
                />
              </S.Selectbar>
            </S.Category>
            <S.InputWrapper>
              <S.Ctg_title>시간</S.Ctg_title>
              <DatePicker
                onChange={onChangeDate}
                style={{
                  border: "none",
                  borderRadius: "10px",
                  width: "100%",
                  height: "36px",
                  padding: "4px 11px ",
                  backgroundColor: "rgba(25, 29, 35, 0.05)",
                }}
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime
              />
            </S.InputWrapper>
            <S.Category>
              <S.Ctg_title>운동레벨</S.Ctg_title>
              <S.Selectbar>
                <S.SelectArea
                  onChange={onChangeGrade}
                  defaultValue={exOption[0]}
                  style={{ width: "100%", borderRadius: "10px" }}
                  options={exOption}
                />
              </S.Selectbar>
            </S.Category>
          </S.InputWrap3>
        </S.InputWrap1>
      </S.Header>
      <S.InputWrapper1>
        <S.Ctg_title2>내용</S.Ctg_title2>
        <ReactQuill
          onChange={onChangeContent}
          style={{
            width: "100%",
            height: "200px",
            marginBottom: "40px",
          }}
          // value={props.getValues("contents") || ""}
        />
      </S.InputWrapper1>
      <KaKaoMapPage />
      <S.ButtonWrap>
        <S.Button2 onClick={onClickSubmit}>작성하기</S.Button2>
        <S.Button1 type="button" onClick={() => setModalOpen(false)}>
          취소하기
        </S.Button1>
      </S.ButtonWrap>
    </S.Wrapper>
  );
}

// export default withAuth(InModalWrite);
