import { Immutable } from 'immer';

export type Other = Immutable<{
  value?: string;
}>;

export const defaultOther: Other = {
  value: ''
};
