import { RangePickerProps } from "antd/lib/date-picker";
import * as S from "../../../units/CommunityPage/write/CommunityWrite.styles";
import { DatePicker, Modal } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import {
  EditBoardId,
  mapCenterState,
  mapEditCenterState,
  mapEditPathState,
  mapPathState,
  modalEditState,
} from "../../../../commons/stores";
import { useRecoilState } from "recoil";
import { UPDATE_BOARD } from "../../../units/CommunityPage/write/CommunityWrite.queries";
import { useMutation } from "@apollo/client";
import Uploads01 from "../../uploads/01/Uploads01.container";
import dynamic from "next/dynamic";
import { FETCH_ALL_BOARDS } from "../../../units/CommunityPage/list/CommunityList.queries";
import { useRouter } from "next/router";
import { IUpdateUseditemInput } from "../../../units/CommunityPage/write/Community.type";
import KaKaoMapEdit from "../../map/mapsearch(edit)";

import {
  IMutation,
  IMutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import { IUpdateBoardInput } from "../../../units/CommunityPage/write/CommunityWrite.types";

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

export default function InModalEdit(props: any) {
  const router = useRouter();
  const [center, setCenter] = useRecoilState(mapEditCenterState);
  const [path, setPath] = useRecoilState(mapEditPathState);
  const [ModalOpen, setModalOpen] = useRecoilState(modalEditState);
  const [editBoardId, setEditBoardId] = useRecoilState(EditBoardId);
  const [recruitRegion, setRecruitRegion] = useState("서울특별시");
  const [recruitGrade, setRecruitGrade] = useState("Beginner");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [appointment, setAppointment] = useState("");
  const [recruitSports, setRecruitSports] = useState("");
  const [recruitPeople, setRecruitPeople] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (props.data) {
      setImage(props.data.fetchBoard.image?.imgUrl);
      setTitle(props.data.fetchBoard.title);
      setContent(props.data.fetchBoard.content);
      setAppointment(props.data.fetchBoard.appointment);
      setRecruitSports(props.data.fetchBoard.recruitSports);
      setRecruitPeople(props.data.fetchBoard.recruitPeople);
      setRecruitGrade(props.data.fetchBoard.recruitGrade);
      setRecruitRegion(props.data.fetchBoard.recruitRegion);
      if (
        props.data.fetchBoard.location?.center !== center ||
        props.data.fetchBoard.location?.path !== path
      ) {
        return;
      } else {
        setCenter(props.data.fetchBoard.location?.center);
        setPath(props.data.fetchBoard.location?.path);
      }
    }
  }, [props.data, path, center, setCenter, setPath]);
  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);
  console.log(props.data?.fetchBoard.image?.id);
  const onClickUpdate = async () => {
    const updateBoardInput: IUpdateBoardInput = {};
    if (props.data?.fetchBoard.title)
      updateBoardInput.title = props.data.fetchBoard.title;
    if (props.data?.fetchBoard.content)
      updateBoardInput.content = props.data.fetchBoard.content;
    if (props.data?.fetchBoard.recruitSports)
      updateBoardInput.recruitSports = props.data.fetchBoard.recruitSports;
    if (props.data?.fetchBoard.recruitGrade)
      updateBoardInput.recruitGrade = props.data.fetchBoard.recruitGrade;
    if (props.data?.fetchBoard.recruitRegion)
      updateBoardInput.recruitRegion = props.data.fetchBoard.recruitRegion;
    if (props.data?.fetchBoard.recruitPeople)
      updateBoardInput.recruitPeople = props.data.fetchBoard.recruitPeople;

    try {
      const result = await updateBoard({
        variables: {
          boardId: String(editBoardId),
          updateBoardInput: {
            title: title,
            content: content,
            recruitSports: recruitSports,
            recruitGrade: recruitGrade,
            recruitRegion: recruitRegion,
            recruitPeople: Number(recruitPeople),
            image: image,
            location: {
              path: path,
              center: center,
            },
          },
        },
        refetchQueries: [{ query: FETCH_ALL_BOARDS }],
      });
      setModalOpen(false);
      router.push(`/community/`);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error });
    }
  };

  const onToggleModal = () => {
    setModalOpen((prev) => !prev);
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
    setContent(value === "<p><br></p>" ? "" : value);
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
        <Uploads01
          image={image}
          onChangeImage={onChangeImage}
          data={props.data}
        />
        <S.InputWrap1>
          <S.InputWrap2>
            <S.InputWrapper>
              <S.Ctg_title>제목</S.Ctg_title>
              <S.InputBox
                defaultValue={props.data?.fetchBoard.title}
                type="text"
                onChange={onChangeTitle}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Ctg_title>모집운동</S.Ctg_title>
              <S.InputBox
                defaultValue={props.data?.fetchBoard.recruitSports}
                type="text"
                onChange={onChangeSports}
              />
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Ctg_title>모집인원</S.Ctg_title>
              <S.InputBox
                onChange={onChangePeople}
                defaultValue={props.data?.fetchBoard.recruitPeople}
                type="text"
              />
            </S.InputWrapper>
          </S.InputWrap2>
          <S.InputWrap3>
            <S.Category>
              <S.Ctg_title>지역</S.Ctg_title>
              <S.Selectbar>
                <S.SelectArea
                  defaultValue={props.data?.fetchBoard.recruitRegion}
                  onChange={onChangeLo}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    color: "black",
                  }}
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
                  borderRadius: "12px",
                  width: "100%",
                  color: "black",
                  height: "36px",
                  padding: "4px 11px 4px",
                  backgroundColor: "rgba(25, 29, 35, 0.05)",
                }}
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime
              />
            </S.InputWrapper>
            <S.Category>
              <S.Ctg_title>운동 레벨</S.Ctg_title>
              <S.Selectbar>
                <S.SelectArea
                  defaultValue={props.data?.fetchBoard.recruitGrade}
                  onChange={onChangeGrade}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    color: "black",
                  }}
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
          defaultValue={props.data?.fetchBoard.content}
          onChange={onChangeContent}
          style={{
            width: "100%",
            height: "200px",
            marginBottom: "40px",
            color: "black",
          }}
          // value={props.getValues("contents") || ""}
        />
      </S.InputWrapper1>
      <KaKaoMapEdit />
      <S.ButtonWrap>
        <S.Button1 type="button" onClick={onToggleModal}>
          취소하기
        </S.Button1>
        <S.Button2 onClick={onClickUpdate}>수정하기</S.Button2>
      </S.ButtonWrap>
    </S.Wrapper>
  );
}
