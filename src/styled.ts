import styled from "styled-components";

export const Container = styled.div`
  max-width: 1024px;
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

  .head-actions {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #251818;
    padding-bottom: 20px;
    .check-connection {
      display: flex;
      align-items: center;
      gap: 10px;
      button {
        background-color: #6564f1;
        border: none;
        color: white;
        font-family: "Roboto";
        border-radius: 10px;
        cursor: pointer;
        font-size: 1rem;
      }
      .connection {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        &.connection--connected {
          background-color: #0aaf4a;
        }
        &.connection--no-connection {
          background-color: #e71e7d;
        }
      }
    }
    .activate-hdm {
      display: flex;
      gap: 10px;
      input {
        border: 1px solid rgb(101, 100, 241);
        border-radius: 5px;
      }
      button {
        background-color: rgb(101, 100, 241);
        border: none;
        color: white;
        border-radius: 10px;
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    .form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 180px;
      .box {
        display: flex;
        gap: 5px;
        flex-direction: column;
        h1 {
          font-size: 30px;
          color: rgb(101, 100, 241);
        }
        label {
          font-size: 14px;
          font-family: "Roboto";
          margin-left: 10px;
        }
        input,
        select {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid rgb(101, 100, 241);
          margin-left: 10px;
        }
      }
      button {
        width: calc(100% - 15px);
        position: relative;
        left: 13px;
        background-color: #6564f1;
        border: none;
        color: white;
        padding: 10px;
        border-radius: 5px;
        &:disabled {
          background-color: rgb(173, 173, 254);
        }
      }
    }

    .items {
      h1 {
        font-size: 30px;
        margin-bottom: 10px;
        color: rgb(101, 100, 241);
      }
      flex: 0 0 250px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .item {
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        padding: 10px;
        color: white;
        background-color: #6564f1;
        display: flex;
        .name {
          margin-top: 2px;
        }
        .action {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          width: 20px;
          height: 20px;
          background-color: white;
          color: #6564f1;
          border-radius: 50%;
        }
      }
    }
  }

  .actions {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #251818;
    .files-container {
      display: flex;
      justify-content: space-between;
      gap: 50px;
      > div {
        flex: 0 0 200px;
      }
    }
    .submit-button {
      cursor: pointer;
      font-family: "Roboto";
      background-color: #6564f1;
      font-size: 16px;
      border: none;
      border-radius: 20px;
      color: white;
      height: 30px;
      width: 200px;
    }
  }
`;
