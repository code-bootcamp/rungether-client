import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalEditState } from "../../../commons/stores";
import UserEditUI from "./userEdit.presenter";
import { CHECK_NICK_NAME, UPDATE_USER } from "./userEdit.query";

export default function UserEdit() {
  const [ModalOpen, setModalOpen] = useRecoilState(modalEditState);
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [NicknameAct, setNickNameAct] = useState(false);
  const [gender, setGender] = useState("");
  const [genderAct, setGenderAct] = useState(false);
  const [clickLeft, setClickLeft] = useState(false);
  const [clickRight, setClickRight] = useState(false);
  const [level1, setLevel1] = useState(false);
  const [level2, setLevel2] = useState(false);
  const [level3, setLevel3] = useState(false);
  const [levelAct, setLevelAct] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);

  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("10대");
  const [region, setRegion] = useState("서울특별시");
  const [prefer, setPrefer] = useState("런닝");

  const [checkNickName] = useMutation(CHECK_NICK_NAME);
  const [updateUser] = useMutation(UPDATE_USER);

  const onChangeNickName = (e) => {
    setNickname(e.target.value);
    if (e.target.value !== "") {
      setNickNameAct(true);
    } else {
      setNickNameAct(false);
    }
  };
  const onClickLeft = (e) => {
    setGenderAct(true);
    if (!clickLeft) {
      if (clickRight) {
        setGender(e.target.innerText);
        setClickLeft((prev) => !prev);
        setClickRight((prev) => !prev);
      } else {
        setClickLeft((prev) => !prev);
        setGender(e.target.innerText);
      }
    }
  };

  const onClickRight = (e) => {
    setGenderAct(true);
    if (!clickRight) {
      if (clickLeft) {
        setGender(e.target.innerText);
        setClickLeft((prev) => !prev);
        setClickRight((prev) => !prev);
      } else {
        setGender(e.target.innerText);
        setClickRight((prev) => !prev);
      }
    }
  };

  const onClickLevel1 = (e) => {
    setLevelAct(true);
    if (!level1) {
      if (level2) {
        setGrade(e.target.innerText);
        setLevel1((prev) => !prev);
        setLevel2((prev) => !prev);
      } else if (level3) {
        setGrade(e.target.innerText);
        setLevel1((prev) => !prev);
        setLevel3((prev) => !prev);
      } else {
        setGrade(e.target.innerText);
        setLevel1((prev) => !prev);
      }
    }
  };
  const onClickLevel2 = (e) => {
    setLevelAct(true);
    if (!level2) {
      if (level1) {
        setGrade(e.target.innerText);
        setLevel1((prev) => !prev);
        setLevel2((prev) => !prev);
      } else if (level3) {
        setGrade(e.target.innerText);
        setLevel2((prev) => !prev);
        setLevel3((prev) => !prev);
      } else {
        setGrade(e.target.innerText);
        setLevel2((prev) => !prev);
      }
    }
  };
  const onClickLevel3 = (e) => {
    setLevelAct(true);
    if (!level3) {
      if (level1) {
        setGrade(e.target.innerText);
        setLevel1((prev) => !prev);
        setLevel3((prev) => !prev);
      } else if (level2) {
        setGrade(e.target.innerText);
        setLevel2((prev) => !prev);
        setLevel3((prev) => !prev);
      } else {
        setGrade(e.target.innerText);
        setLevel3((prev) => !prev);
      }
    }
  };
  const onChangeAge = (e) => {
    setAge(e);
  };
  const onChangeLo = (e) => {
    setRegion(e);
  };
  const onChangeFav = (e) => {
    setPrefer(e);
  };

  const onClickCheckNickname = async () => {
    const result = await checkNickName({
      variables: {
        nickname,
      },
    });
    if (result.data.checkNickName === "false") {
      alert("중복된 닉네임입니다.");
    } else {
      setNickNameCheck(true);
      alert("사용 가능한 닉네임입니다.");
    }
  };
  const onClickSubmit = async () => {
    try {
      const result = await updateUser({
        variables: {
          updateUserInput: {
            nickname,
            grade,
            region,
            prefer,
            age,
            gender,
          },
        },
      });
      setModalOpen((prev) => !prev);
      router.push(`/`);
      console.log(result);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error });
    }
  };

  return (
    <UserEditUI
      NicknameAct={NicknameAct}
      genderAct={genderAct}
      levelAct={levelAct}
      clickLeft={clickLeft}
      clickRight={clickRight}
      level1={level1}
      level2={level2}
      level3={level3}
      nickNameCheck={nickNameCheck}
      onClickCheckNickname={onClickCheckNickname}
      onChangeAge={onChangeAge}
      onChangeLo={onChangeLo}
      onChangeFav={onChangeFav}
      onClickLevel1={onClickLevel1}
      onClickLevel2={onClickLevel2}
      onClickLevel3={onClickLevel3}
      onClickRight={onClickRight}
      onClickLeft={onClickLeft}
      onChangeNickName={onChangeNickName}
      onClickSubmit={onClickSubmit}
    />
  );
}
