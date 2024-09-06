import styled from 'styled-components'

export const Box = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: red;
  border-radius: 12px;
  color: #fff;
`

export const ImgBox = styled.div`
  background-image: url();
  background: black;
  width: 50%;
  height: 100%;
`

export const TextBox = styled.div`
  width: 50%;
  height: 100%;
  background-color: blue;
  gap: 16px;

  h3 {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 2rem;
    margin-top: 3rem;
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
