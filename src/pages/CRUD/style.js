import styled from "styled-components";

export const Div = styled.div`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    justify-start;
`;

export const Form = styled.form`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: start;
`;

export const Para = styled.p`
  margin-right: 10px;
  width: 80px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  line-height: 30px;
  padding-left: 5px;
  width: 200px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px 0 10px 5px;
  width: 210px;
`;

export const Button = styled.button`
  margin-top: 10px;
  width: 100px;
  height: 40px;
  background-color: #01b8aa;
  color: white;
  border: none;
  border-radius: 50%;
`;
