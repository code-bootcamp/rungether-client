import { useMutation } from "@apollo/client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { checkValidationImage } from "./Uploads01.validation";
import Uploads01UI from "./Uploads01.presenter";
import { UPLOAD_FILE } from "./Uploads01.queries";
import { Modal } from "antd";

interface IImage {}

export default function Uploads01(props: any) {
  console.log(props, "==============");
  const [image, setImage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    if (props.data) {
      setImage(props.data.fetchBoard.image?.imgUrl);
    }
  }, [props.data]);
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0]);
    if (!file) return;

    try {
      const result = await uploadFile({ variables: { file } });
      setImage(result.data.uploadFile);
      props.onChangeImage(result.data.uploadFile);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };
  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.image}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}
