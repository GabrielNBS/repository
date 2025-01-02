import styled from 'styled-components'

// Styled Components
export const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between; /* Ajustado para maior clareza */
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: #333;
  color: #fff;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  &.scrolled {
    height: 50px; /* Navbar encurtada */
    padding: 0 1rem;
    background: none;

    nav ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      li {
        opacity: 0; /* Esconde itens não ativos */
        visibility: hidden;
        pointer-events: none; /* Evita interação quando escondido */
        transition:
          opacity 0.3s,
          visibility 0.3s;
      }

      li.active {
        opacity: 1;
        visibility: visible;
        pointer-events: auto; /* Ativa interação */
        background-color: #444;
        border-radius: 20px;
        padding: 0.5rem 1rem;
        color: #00ff88;
        font-weight: bold;
        position: fixed;
        top: 10px;
        right: 10px; /* Aparece no canto direito */
        transition: all 0.3s;
      }
    }
  }

  &:hover {
    nav ul li {
      opacity: 1;
      pointer-events: auto; /* Ativa interação ao hover */
      background-color: transparent;
      padding: 0;
      top: unset;
      right: unset;
    }
  }

  nav ul {
    display: flex;
    gap: 1.5rem;

    li {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
        transition: color 0.3s;

        &:hover {
          color: #ff0044;
        }
      }
    }
  }
`

export const Section = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  &:nth-child(odd) {
    background: #f2f2f2;
  }

  &:nth-child(even) {
    background: #e2e2e2;
  }
`
