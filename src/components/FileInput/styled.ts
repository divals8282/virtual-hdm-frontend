import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    max-width: 135px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .action-button {
    cursor: pointer;
    height: 40px;
    background-color: #6564f1;
    color: white;
    font-family: "Roboto";
    border: none;
    border-radius: 10px;
  }
`