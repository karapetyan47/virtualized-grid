import styled from 'styled-components';

import { T_Position } from '@/core/types/virtualization';

export const StyledDiv = styled.div<T_Position>`
  position: absolute;
  top: ${(props) => (props.top ? props.top + 'px' : 0)};
  left: ${(props) => (props.left ? props.left + 'px' : 0)};
  width: ${(props) => (props.width ? props.width + 'px' : '100%')};
  height: ${(props) => (props.height ? props.height + 'px' : '100%')};
  transition: opacity 0.3s ease;
  will-change: transform;
`;
