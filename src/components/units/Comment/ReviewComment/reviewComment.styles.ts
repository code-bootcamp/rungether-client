import styled from "@emotion/styled";

export const Wrapper = styled.form`
  width: 100%;
  height: 8%;
  display: flex;
  border-top: 1px solid #d3d3d3;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Input = styled.input`
  border: none;
  padding-left: 10px;
  width: calc(100% - 80px);
  :focus {
    outline: none;
  }
`;
export const Btn = styled.button`
  width: 100px;
  border: none;
  background-color: white;
  cursor: pointer;
`;
