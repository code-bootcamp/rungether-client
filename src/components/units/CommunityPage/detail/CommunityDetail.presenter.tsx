import React, { useState } from "react";
import { Button, Modal } from "antd";
import { HeartFilled, RightOutlined } from "@ant-design/icons";
import * as S from "./CommunityDetail.styles";
import KakaoMapView from "../../../commons/map/mapview";
import styled from "@emotion/styled";
import { timeForToday } from "../../../../commons/library/utils2";


export default function CommunityDetailUIPage(props: any) {
  return (
    <>
    <S.Wrapper>
          <S.Header>
            <S.Img src="./images/example.png"></S.Img>
          </S.Header>
          <S.Head>
            <S.AvatarWrap>
              <S.Avatar src="./images/avatar.png" />
            </S.AvatarWrap>
            <S.UerInfo>
              <S.Left>
                <S.UserName>{props.data?.fetchBoard.user.nickname}</S.UserName>
                <S.MapWrap>
                  <S.MapIcon src="./images/list/map.png"></S.MapIcon>
                  <S.MapText>{props.data?.fetchBoard.recruitRegion}</S.MapText>
                </S.MapWrap>
              </S.Left>
              <S.Right>
                <HeartFilled style={{ marginRight: "10px" }} />
                {props.data?.fetchBoard.pickCount}
              </S.Right>
            </S.UerInfo>
          </S.Head>
          <S.Line />
          <S.Main>
            <S.Title>{props.data?.fetchBoard.title}</S.Title>
            <S.Detail>
              <S.Sports>{props.data?.fetchBoard.recruitSports}</S.Sports>
              <S.Com>・</S.Com>
              <S.Create>{timeForToday(props.data?.fetchBoard.createdAt)}</S.Create>
            </S.Detail>
            <S.Contents>
            {props.data?.fetchBoard.title}
            </S.Contents>
            <KakaoMapView />
          </S.Main>
        </S.Wrapper>
        </>
  );
}
