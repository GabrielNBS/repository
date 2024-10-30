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
    left: 40%;
    width: 50%;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    border-radius: 8px;
    background-color: white;
    box-shadow:
      0 0 0 10px rgba(255, 255, 255, 1),
      -10px 6px 0 10px rgba(100, 255, 255, 1),
      -20px 15px 0 10px rgba(0, 0, 0, 1);
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

export const IconsCard = styled.div`
  position: absolute;
  right: 49%;
  bottom: 0;
  padding: 1rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  i {
    padding: 0.5em;
  }
`
