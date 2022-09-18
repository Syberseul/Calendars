import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-height: calc(100vh - 40px);
`;

export const DateDiv = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const DetailDiv = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  margin: 10px 0;
`;

export const Circle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
`;
