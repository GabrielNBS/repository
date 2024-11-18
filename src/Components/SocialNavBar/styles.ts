import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .wrapper {
    display: inline-flex;
    position: relative;
    list-style: none;
    height: 120px;
    width: 100%;
    padding-top: 40px;
    font-family: 'Poppins', sans-serif;
    justify-content: center;
    color: black;
  }

  .icon {
    position: relative;
    background: transparent;
    border-radius: 50%;
    margin: 10px;
    width: 50px;
    height: 50px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .tooltip {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #fff;
    color: #fff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .tooltip::before {
    position: absolute;
    content: '';
    height: 8px;
    width: 8px;
    background: #fff;
    bottom: -3px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .wrapper .icon:hover .tooltip {
    top: -45px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .github {
    background-color: #181717;
    color: #fff;
    font-size: 1.2em;
  }

  .linkedin {
    background-color: #0a66c2;
    color: #fff;
    font-size: 1.2em;
  }

  .whatsapp {
    background-color: #25d366;
    color: #fff;
    font-size: 1.2em;
  }

  .wrapper .icon:hover span,
  .wrapper .icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
  }

  .wrapper .linkedin:hover,
  .wrapper .linkedin:hover .tooltip,
  .wrapper .linkedin:hover .tooltip::before {
    background: #0a66c2;
    color: #fff;
  }

  .wrapper .github:hover,
  .wrapper .github:hover .tooltip,
  .wrapper .github:hover .tooltip::before {
    background: #181717;
    color: #fff;
  }
  .wrapper .whatsapp:hover,
  .wrapper .whatsapp:hover .tooltip,
  .wrapper .whatsapp:hover .tooltip::before {
    background: #25d366;
    color: #fff;
  }
`
