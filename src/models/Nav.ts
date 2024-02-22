import { Immutable } from 'immer';

export type Nav = Immutable<{
  navTitle?: string;
}>;

export const defaultNav: Nav = {
  navTitle: ''
};
