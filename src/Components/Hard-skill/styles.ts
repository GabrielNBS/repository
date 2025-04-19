import styled, { css } from 'styled-components';
import { centralize } from '../../keyframes/Centralize';

export const skillItemStyles = css`
  ${centralize}
  height: 50px;
  width: 100px;
  border-radius: 8px;
  margin: 0 auto;

  p {
    font-size: 16px;
    color: ${(props) => props.theme.color.primary};
  }
`;

const skillListItemStyles = css`
  display: flex;
  width: 150px;
  padding: 8px;
  color: ${(props) => props.theme.color.primary};
  border-radius: 8px;
  position: relative;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  span {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 50%;
    left: 0;
    margin: 4px 0 0 4px;
    box-shadow: unset 0 4px 8px rgba(0, 0, 0, 0.8);
  }
`;

export const SkillContainer = styled.div`
  width: 100%;
  align-self: flex-end;
  position: relative;
  padding: 2rem;

  &::before,
  &::after {
    content: '{';
    position: absolute;
    font-size: 5rem;
    color: rgba(${(props) => props.theme.shadow.tertiary});
  }

  &::before {
    top: 0;
    left: 18%;
  }

  &::after {
    bottom: 0;
    right: 18%;
    transform: rotate(180deg);
  }

  ul {
    ${centralize}
    gap: 1rem;
    max-width: 940px;
    flex-wrap: wrap;
    justify-self: center;

    li {
      ${skillListItemStyles}
    }
  }

  ${[
    'react',
    'javascript',
    'typescript',
    'redux',
    'styled',
    'sass',
    'html',
    'css',
    'cypress',
    'bootstrap'
  ].map(
    (skill) => css`
      .${skill} {
        background-color: ${(props) => props.theme.stackColor[skill]};

        span {
          background-color: ${(props) => props.theme.stackColor[skill]};
          filter: brightness(0.7);
        }
      }
    `
  )}
`;
