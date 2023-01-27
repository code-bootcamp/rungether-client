import { DeleteOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { timeForToday } from "../../../../commons/library/utils2";
import { LoggedInUserId, ReviewCommentMore } from "../../../../commons/stores";
import * as S from "./AnswerList.styles";

export default function AnswerListItem(props: any) {
  const [id, setId] = useRecoilState(LoggedInUserId);
  return (
    <>
      <S.Wrap>
        <S.IconWrap>
        <S.ImageProfile
                  src={props.el.user.image?.imgUrl || "/profile.png"}
                />
        </S.IconWrap>
        <S.ContentWrap>
          <S.firstLine>
            <S.MainWrap>
              <S.user>{props.el.user.nickname}</S.user>
              <S.content>{props.el.reviewNestedComment}</S.content>
            </S.MainWrap>
            {props.el.user.id === id ? (
              <DeleteOutlined
                onClick={props.onClickDelete(props.el.id)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              ""
            )}
          </S.firstLine>
          <S.SecondLine>
            <S.Date>{timeForToday(props.el.createAt)}</S.Date>
            {/* <S.ReplyBtn onClick={onClickAnswer}>답글 달기</S.ReplyBtn> */}
          </S.SecondLine>
        </S.ContentWrap>
      </S.Wrap>
    </>
  );
}
