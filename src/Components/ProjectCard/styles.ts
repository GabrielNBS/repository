import styled from 'styled-components'

export const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  color: #fff;
  position: relative;
`

export const ImgBox = styled.div`
  background-image: url();
  background: black;
  width: 50%;
  height: 100%;
  border-radius: 12px;
  box-shadow: -15px 15px 25px -3px rgba(0, 0, 0, 0.7);
`

export const TextBox = styled.div`
  width: 50%;
  height: 100%;
  gap: 16px;

  > div {
    display: flex;
    position: absolute;
    left: 45%;
    top: 20%;
    width: 50%;
    flex-direction: column;
    gap: 2rem;
    background-color: green;
    padding: 1rem;
    border-radius: 10px;
  }

  ul {
    display: flex;
    gap: 1.5rem;
  }
`

export const ButtonBox = styled.div`
  display: flex;
  width: 30%;
  gap: 2rem;
`
