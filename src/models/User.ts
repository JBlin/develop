import { Immutable } from 'immer';

export type User = Immutable<{
  snsId?: string;
  snsAuthToken?: string;
  userType?: string;
  email?: string;
  name?: string;
  phone?: string;
  point?: string;
  presidentName?: string;
  businessNumber?: string;
  businessName?: string;
}>;

export const defaultUser: User = {
  snsId: '',
  snsAuthToken: '',
  userType: '',
  email: '',
  name: '',
  phone: '',
  point: '',
  presidentName: '',
  businessNumber: '',
  businessName: ''
};

export class userImpl implements User {
  snsId?: string;
  snsAuthToken?: string;
  userType?: string;
  email?: string;
  name?: string;
  phone?: string;
  point?: string;
  presidentName?: string;
  businessNumber?: string;
  businessName?: string;

  constructor() {
    this.snsId = '';
    this.snsAuthToken = '';
    this.userType = '';
    this.email = '';
    this.name = '';
    this.phone = '';
    this.point = '';
    this.presidentName = '';
    this.businessNumber = '';
    this.businessName = '';
  }
}
