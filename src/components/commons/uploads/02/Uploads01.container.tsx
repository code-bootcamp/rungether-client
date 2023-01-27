import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useRef } from "react";
import { checkValidationImage } from "./Uploads01.validation";
import Uploads01UI from "./Uploads01.presenter";
import { IUploads01Props } from "./Uploads01.types";
import { Modal } from "antd";
import { ReviewImagesState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";

export default function Uploads02(props: any) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0]);
    props.files.push(event.target.files?.[0]);
    if (!file) return;
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.files}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
