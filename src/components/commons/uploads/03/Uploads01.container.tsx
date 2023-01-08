import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { checkValidationImage } from "./Uploads01.validation";
import { UPLOAD_FILE } from "./Uploads01.queries";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { boardImageState, ReviewImagesState} from "../../../../commons/stores";
import Uploads03UI from "./Uploads01.presenter";

export default function Uploads03(props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0]);
    if (!file) return;

      try {
        const result = await uploadFile({ variables: { file } });
        props.onChangeFileUrls(result.data.uploadFile, props.index);
        console.log(props.files)
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    
  };
  return (
    <Uploads03UI
      fileRef={fileRef}
      fileUrl={props.files}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
