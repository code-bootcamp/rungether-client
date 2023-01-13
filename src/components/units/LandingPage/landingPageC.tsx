import { useRouter } from "next/router";
import * as S from "./landingPage.styles";

export default function LandingPageC() {
  const router = useRouter();
  return (
    <S.Wrapper_2>
      <S.TitleBox2>
        <S.Title_3>COMMUNITY</S.Title_3>
      </S.TitleBox2>
      <S.MainContents2>
        <S.ContentsBox2>
          <S.ContentsBox3>
            <S.COMMUNITY>COMMUNITY</S.COMMUNITY>
            <S.Contents_title1>
              서로의 열정을 북돋아주는 커뮤니티
            </S.Contents_title1>
            <div>
              <S.Contents_3>
                <div> Rungether의 다양한 기능을 통해 </div>
                <div>멤버들과 즐겁게 소통해보세요! </div>
              </S.Contents_3>
            </div>
          </S.ContentsBox3>
          <S.BtnBox1>
            <S.MemberBtn>
              <S.Btn onClick={() => router.push("/community")}>COMMUNITY</S.Btn>
            </S.MemberBtn>
          </S.BtnBox1>
        </S.ContentsBox2>

        <S.ImgBox1></S.ImgBox1>
      </S.MainContents2>
    </S.Wrapper_2>
  );
}
