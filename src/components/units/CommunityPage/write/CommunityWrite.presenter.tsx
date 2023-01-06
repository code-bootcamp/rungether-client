import React, { useState } from "react";
import { Button, Modal } from "antd";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import styled from "@emotion/styled";
import InModalWrite from "../../../commons/modal(write)";
import { modalWriteState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";


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


//========================================

export default function CommunityWriteUI(props: any) {
  const [ModalOpen, setModalOpen] = useRecoilState(modalWriteState);
  
  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalOpen(true)}
        style={{
          padding: "0px 15px 10px 15px",
          fontSize: "17px",
          fontWeight: "400",
          lineHeight: "22px",
          textAlign: "center",
          color: "rgba(0, 0, 0, 0.85)",
          backgroundColor: "#fff",
          border: "1px solid #fff"
        }}
      >
        작성하기
      </Button>
      <ModalCustom
        title="게시물 작성"
        centered
        open={ModalOpen}
        width={1100}
      >
        <InModalWrite />
      </ModalCustom>
    </>
  );
}
