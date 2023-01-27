import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import JoinPageA from "../../src/components/units/JoinPage/JoinPage.container";

// export const CREATE_USER = gql`
//   mutation createUser($createUserInput: CreateUserInput!) {
//     createUser(createUserInput: $createUserInput) {
//       id
//       email
//       password
//       nickName
//       region
//       gender
//       age
//       like
//     }
//   }
// `;

export default function Join() {
  // interface IFormData {
  //   email: string;
  //   password: string;
  //   rePassword: string;
  //   nickName: string;
  //   region: string;
  //   level: string;
  //   gender: string;
  //   age: string;
  // }

  // const [createUser] = useMutation(CREATE_USER);

  // const { register, handleSubmit, formState } = useForm<IFormData>({
  //   // resolver: yupResolver(schema),
  // });

  // const onClickSubmit = async (data: any) => {
  //   console.log(data);
  //   try {
  //     const result = await createUser({
  //       variables: {
  //         createUserInput: {
  //           email: data.email,
  //           password: data.password,
  //           rePassword: data.rePassword,
  //           nickName: data.nickName,
  //           level: data.level,
  //           age: data.age,
  //           gender: data.gender,
  //           region: data.region,
  //         },
  //       },
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     if (error instanceof Error) Modal.error({ content: error });
  //   }
  // };
  return (
    // <form onSubmit={handleSubmit(onClickSubmit)}>
    //   이메일 : <input type="text" {...register("email")} />
    //   비밀번호 : <input type="password" {...register("password")} />
    //   비밀번호 확인 : <input type="password" {...register("rePassword")} />
    //   닉네임 : <input type="text" {...register("nickName")} />
    //   Level : <input type="text" {...register("level")} />
    //   지역 : <input type="text" {...register("region")} />
    //   성별 : <input type="text" {...register("gender")} />
    //   나이 : <input type="text" {...register("age")} />
    //   <button>회원가입</button>
    // </form>
    <>
      <JoinPageA />
    </>
  );
}
