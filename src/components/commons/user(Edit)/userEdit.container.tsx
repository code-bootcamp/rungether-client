import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalEditState, userEditState } from "../../../commons/stores";
import {
  IMutation,
  IMutationCheckNickNameArgs,
  IMutationUpdateUserArgs,
} from "../../../commons/types/generated/types";
import { FETCH_USER_LOGGED_IN } from "../layout/header/header";
import UserEditUI from "./userEdit.presenter";
import { CHECK_NICK_NAME, UPDATE_USER } from "./userEdit.query";

export default function UserEdit(props: any) {
  console.log(props.data);
  const [ModalOpen, setModalOpen] = useRecoilState(userEditState);
  const router = useRouter();
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

  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState("");
  const [age, setAge] = useState("");
  const [region, setRegion] = useState("");
  const [prefer, setPrefer] = useState("");
  const [image, setImage] = useState("/profile.png");
  useEffect(() => {
    if (props.data?.fetchUserLoggedIn.gender === "남성") {
      setClickLeft(true);
    } else {
      setClickRight(true);
    }
    if (props.data?.fetchUserLoggedIn.grade === "Beginner") {
      setLevel1(true);
    } else if (props.data?.fetchUserLoggedIn.grade === "Amateur") {
      setLevel2(true);
    } else {
      setLevel3(true);
    }
    if (props.data) {
      setGrade(props.data?.fetchUserLoggedIn.grade);
      setNickname(props.data?.fetchUserLoggedIn.nickname);
      setPrefer(props.data?.fetchUserLoggedIn.prefer);
      setRegion(props.data?.fetchUserLoggedIn.region);
      setGender(props.data?.fetchUserLoggedIn.gender);
      setAge(props.data?.fetchUserLoggedIn.age);
    }
  }, [props.data]);

  const [checkNickName] = useMutation<
    Pick<IMutation, "checkNickName">,
    IMutationCheckNickNameArgs
  >(CHECK_NICK_NAME);

  const [updateUser] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);

  const onChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value !== "") {
      setNickNameAct(true);
    } else {
      setNickNameAct(false);
    }
  };
  const onClickLeft = (e: any) => {
    console.log(e);
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

  const onClickRight = (e: any) => {
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

  const onClickLevel1 = (e: any) => {
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
  const onClickLevel2 = (e: any) => {
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
  const onClickLevel3 = (e: any) => {
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
  const onChangeAge = (e: MouseEvent) => {
    setAge(String(e));
  };
  const onChangeLo = (e: MouseEvent) => {
    setRegion(String(e));
  };
  const onChangeFav = (e: MouseEvent) => {
    setPrefer(String(e));
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
            image,
          },
        }, refetchQueries: [
          { query: FETCH_USER_LOGGED_IN }
        ],
      });
      setModalOpen(false);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error });
    }
  };
  const onClickClose = () => {
    setModalOpen((prev) => !prev);
  };
  const onChangeImage = (fileUrl) => {
    const newFile = fileUrl;
    setImage(newFile);
  };

  return (
    <UserEditUI
      data={props.data}
      NicknameAct={NicknameAct}
      genderAct={genderAct}
      levelAct={levelAct}
      clickLeft={clickLeft}
      clickRight={clickRight}
      level1={level1}
      level2={level2}
      level3={level3}
      nickNameCheck={nickNameCheck}
      image={image}
      onChangeImage={onChangeImage}
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
      onClickClose={onClickClose}
    />
  );
}
