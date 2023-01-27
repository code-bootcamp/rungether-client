import React, { useEffect, useState } from "react";

import {
  DeleteOutlined,
  EditOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import * as S from "./CommunityDetail.styles";
import { timeForToday } from "../../../../commons/library/utils2";
import { LoggedInUserId, modalEditState } from "../../../../commons/stores";
import { useRecoilState } from "recoil";
import InModalEdit from "../../../commons/Modal/modal(edit)";
import { Modal } from "antd";
import styled from "@emotion/styled";
import ConfirmModal, {
  ConfirmCus,
} from "../../../commons/Modal/confirmModal(community)";
import OkModal, {
  OkCus,
} from "../../../commons/Modal/okModal";
import Livechat from "../../../commons/livechat/LivechatContainer";
import AttendList from "../../../commons/Modal/Modal(attendList)";

declare const window: typeof globalThis & {
  kakao: any;
};

export default function CommunityDetailUIPage(props: any) {
  const [id, setId] = useRecoilState(LoggedInUserId);
  const [path, setPath] = useState([]);
  const [center, setCenter] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useRecoilState(modalEditState);

  const handleCancel = () => {
    setModalOpen(false);
  };

  const [whois, setWhois] = useState(1);

  useEffect(() => {
    if (props.data?.fetchBoard?.user?.id !== props.userData?.fetchLoginUser?.id)
      setWhois(1);
    if (props.data?.fetchBoard?.user?.id === props.userData?.fetchLoginUser?.id)
      setWhois(2);
    if (props.userData?.fetchLoginUser?.id) setWhois(3);
  }, [props.data, props.userData]);

  useEffect(() => {
    if (props.data) {
      if (
        props.data?.fetchBoard?.location.path === "[]" ||
        props.data?.fetchBoard?.location.center === "[]"
      ) {
        setPath([""]);
        setCenter([33.450701, 126.570667]);
      } else if (
        props.data?.fetchBoard?.location.path !== "[]" &&
        props.data?.fetchBoard?.location.center !== "[]"
      ) {
        setPath(JSON.parse(props.data?.fetchBoard?.location.path));
        setCenter(JSON.parse(props.data?.fetchBoard?.location.center));
      }
    }
  }, [props.data]);

  useEffect(() => {
    const script = document.createElement("script"); // <script></script> 랑 동일
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=b64e0417ea88d2dc43bf2b70b73cafae&libraries=services,drawing&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(function () {
        let mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOptions = {
            center: new window.kakao.maps.LatLng(center[0], center[1]), // 지도의 중심좌표
            level: 4, // 지도의 확대 레벨
          };
        var map = new window.kakao.maps.Map(mapContainer, mapOptions);

        var imageSrc = "";

        let distanceOverlay;
        let dots = {};

        const positions = [];
        for (let i = 0; i < path.length; i++) {
          const obj = {
            latlng: new window.kakao.maps.LatLng(),
          };
          obj.latlng.La = Object.values(path[i])[0];
          obj.latlng.Ma = Object.values(path[i])[1];
          positions.push(obj);
        }

        console.log(positions);

        let linePath;
        let lineLine = new window.kakao.maps.Polyline();
        let distance;

        for (let i = 0; i < positions.length; i++) {
          if (i != 0) {
            linePath = [positions[i - 1].latlng, positions[i].latlng];
          }

          lineLine.setPath(linePath);

          let drawLine = new window.kakao.maps.Polyline({
            map: map,
            path: linePath,
            strokeWeight: 3,
            StrokeColor: "#1b22ae",
            strokeOpacity: 1,
            strokeStyle: "dashed",
          });
          distance = Math.round(lineLine.getLength());
          displayCircleDot(positions[i].latlng, distance);
        }

        function displayCircleDot(position, distance) {
          if (distance > 0) {
            let distanceOverlay = new window.kakao.maps.CustomOverlay({
              position: position,
              yAnchor: 2,
              zIndex: 10,
            });
            distanceOverlay.setMap(map);
          }
        }
        for (let i = 0; i < positions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new window.kakao.maps.Size(
            i === 0 ? 24 : 0,
            i === 0 || i === positions.length - 1 ? 35 : 0
          );

          // 마커 이미지를 생성합니다
          var markerImage = new window.kakao.maps.MarkerImage(
            i === 0 ? "/start.png" : "",
            imageSize
          );

          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title: "", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });
        }

        function getTimeHTML(distance) {
          // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
          var walkkTime = (distance / 67) | 0;
          var walkHour = "",
            walkMin = "";

          // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
          if (walkkTime > 60) {
            walkHour =
              '<span class="number">' +
              Math.floor(walkkTime / 60) +
              "</span>시간 ";
          }
          walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

          // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
          var bycicleTime = (distance / 227) | 0;
          var bycicleHour = "",
            bycicleMin = "";

          // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
          if (bycicleTime > 60) {
            bycicleHour =
              '<span class="number">' +
              Math.floor(bycicleTime / 60) +
              "</span>시간 ";
          }
          bycicleMin =
            '<span class="number">' + (bycicleTime % 60) + "</span>분";

          // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
          var content = '<ul class="dotOverlay distanceInfo">';
          content += "    <li>";
          content +=
            '        <span class="label">총거리</span><span class="number">' +
            distance +
            "</span>m";
          content += "    </li>";
          content += "    <li>";
          content +=
            '        <span class="label">도보</span>' + walkHour + walkMin;
          content += "    </li>";
          content += "    <li>";
          content +=
            '        <span class="label">자전거</span>' +
            bycicleHour +
            bycicleMin;
          content += "    </li>";
          content += "</ul>";

          return content;
        }
      });
    };
  }, [path, center]);
  return (
    <>
      {/* <OkCus>
        <OkModal centered open={true} width={500} onCancel={handleCancel}/>
      </OkCus> */}
      {props.EditModalOpen && (
        <ModalCustom
          centered
          open={true}
          width={1000}
          onCancel={handleCancel}
        >
          <InModalEdit data={props.data} />
        </ModalCustom>
      )}

      {props.confirmDel && (
        <ConfirmCus centered open={true} width={500} onCancel={handleCancel}>
          <ConfirmModal data={props.data} />
        </ConfirmCus>
      )}
      {props.attendList && (
        <ConfirmCus centered open={true} width={500} onCancel={handleCancel}>
          <AttendList data={props.data} />
        </ConfirmCus>
      )}
      {props.loading ? ""
      :
      <S.Wrapper>
        <S.Header>
          <S.Img src={"./images/example.png"}></S.Img>
        </S.Header>
        <S.Head>
          <S.AvatarWrap>
            <S.Avatar
              src={
                props.data?.fetchBoard.user.image?.imgUrl ||
                "./images/avatar.png"
              }
            />
          </S.AvatarWrap>
          <S.UerInfo>
            <S.Left>
              <S.UserWrap>
                <S.UserName>{props.data?.fetchBoard.user.nickname}</S.UserName>
                <S.AttendListBtn onClick={props.onClickAttendList}>
                  현재 참가 인원
                </S.AttendListBtn>
              </S.UserWrap>
              <S.MapWrap>
                <S.MapIcon src="./images/list/map.png"></S.MapIcon>
                <S.MapText>{props.data?.fetchBoard.recruitRegion}</S.MapText>
              </S.MapWrap>
            </S.Left>
            <S.Right>
              {props.pick ? (
                <div>
                  <HeartFilled
                    onClick={props.onClickPick(props.data?.fetchBoard.id)}
                    style={{
                      marginRight: "10px",
                      lineHeight: "35px",
                      color: "#C71515",
                    }}
                  />
                  {props.data?.fetchBoard.pickCount}
                </div>
              ) : (
                <div>
                  <HeartOutlined
                    onClick={props.onClickPick(props.data?.fetchBoard.id)}
                    style={{ marginRight: "10px", lineHeight: "35px" }}
                  />
                  {props.data?.fetchBoard.pickCount}
                </div>
              )}
            </S.Right>
          </S.UerInfo>
        </S.Head>
        <S.Line />
        <S.Main>
          {props.data?.fetchBoard.user.id === id ? (
            <S.IconWarp>
              <EditOutlined
                onClick={props.onClickEdit(props.data?.fetchBoard.id)}
                style={{ marginRight: "20px", cursor: "pointer" }}
              />
              <DeleteOutlined
                onClick={props.onClickDelete}
                style={{ cursor: "pointer" }}
              />
            </S.IconWarp>
          ) : (
            ""
          )}

          <S.TitleDetail>
            <S.Title2>{props.data?.fetchBoard.title}</S.Title2>
            <S.Detail>
              <S.Sports>{props.data?.fetchBoard.recruitSports}</S.Sports>
              <S.Com>・</S.Com>
              <S.Create>
                {timeForToday(props.data?.fetchBoard.createdAt)}
              </S.Create>
            </S.Detail>
          </S.TitleDetail>

          <S.Contents>
            <div
              dangerouslySetInnerHTML={{
                __html: String(props.data?.fetchBoard.content),
              }}
            />
          </S.Contents>
          <S.Map_Chat>
            <div
              id="map"
              style={{ width: "68%", height: 400, marginTop: "20px" }}
            ></div>
            <Livechat userData={props.userData} data={props.data} />
          </S.Map_Chat>
          {props.data?.fetchBoard.user.id !== id ? (
            <S.BtnWrap>
              <S.Button3
                isActive={props.attend}
                onClick={
                  props.data?.fetchBoard.recruitPeople ===
                  props.data?.fetchBoard.attendCount
                    ? props.onClickNoAtt
                    : props.onClickAttend(props.data?.fetchBoard.id)
                }
              >
                {props.attend ? "참가취소" : "참여하기"}
              </S.Button3>
              <S.Button1 onClick={props.onClickClose}>닫기</S.Button1>
            </S.BtnWrap>
          ) : (
            <S.BtnWrap1>
              <S.Button1 onClick={props.onClickClose}>닫기</S.Button1>
            </S.BtnWrap1>
          )}
        </S.Main>
      </S.Wrapper>
      
      }
      
    </>
  );
}
const ModalCustom = styled(Modal)`
  padding-top: 60px;

  .ant-select-selection-item {
    color: black;
  }
  .ant-modal-title {
    font-size: 20px;
  }

  .ant-modal-content {
    width: 1000px;
    border-radius: 20px;
  }

  .ant-modal-header {
    padding: 16px 24px;
    padding-top: 28px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 20px 20px 0 0;
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

  .css-12sbnz6 {
    border-radius: 12px;
    font-size: 15px;
    background-color: #0b0b0b;
    color: white;
    width: 150px;
    height: 50px;
    border: none;
  }

  .css-3tc048 {
    border-radius: 12px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
  .css-1a8xmf3 {
    border-radius: 12px;
    font-size: 18px;
    color: #000;
    cursor: pointer;
  }
`;
