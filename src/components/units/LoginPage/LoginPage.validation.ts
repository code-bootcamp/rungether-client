import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식에 적합하지 않습니다.")
    .required("이메일은 필수 입력입니다."),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
      "비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이상 16이하로 입력해주세요."
    )
    .required("비밀번호는 필수 입력힙니다."),
});
