import styled from 'styled-components';

export const Container = styled.div`
  max-width: 512px;
  margin: 52px auto;
  border: 1px solid #251818;
  border-radius: 10px;
  padding: 10px;
  font-family: "Roboto";
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    .submit-button {
      cursor: pointer;
      font-family: "Roboto";
      background-color: #64f16f;
      font-size: 16px;
      border: none;
      border-radius: 20px;
      color: white;
      height: 30px;
      margin-top: 20px;
      width: 200px;
    }
  }
`