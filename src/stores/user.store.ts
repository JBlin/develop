import { defaultUser, User, userImpl } from './../models/User';
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: defaultUser as User,
    token: '' as string,
    uuid: '' as string
  }),
  actions: {
    setUserInfo(updateUser: User) {
      const result = {
        userType: updateUser.userType
          ? updateUser.userType
          : this.user.userType,
        email: updateUser.email ? updateUser.email : this.user.email,
        name: updateUser.name ? updateUser.name : this.user.name,
        point: updateUser.point ? updateUser.point : this.user.point,
        presidentName: updateUser.presidentName
          ? updateUser.presidentName
          : this.user.presidentName,
        businessNumber: updateUser.businessNumber
          ? updateUser.businessNumber
          : this.user.businessNumber,
        businessName: updateUser.businessName
          ? updateUser.businessName
          : this.user.businessName
      };
      this.user = result;
    },
    setUser(updateUser: User, token: string) {
      this.user = updateUser;
      this.token = token;
    },
    resetUser() {
      this.user = new userImpl();
      this.token = '';
    },
    setUUID(uuid: string) {
      this.uuid = uuid;
    }
  },
  getters: {
    getUser(): User {
      return this.user;
    },
    getToken(): string {
      return this.token;
    },
    getUUID(): string {
      return this.uuid;
    }
  },
  persist: true
});
