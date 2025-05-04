import { I_Photo } from './pexels';

export type T_Dimension = {
  width: number;
  height: number;
};

export type T_Position = T_Dimension & {
  top: number;
  left: number;
};

export interface I_GridItem extends T_Position {
  photo: I_Photo;
}
