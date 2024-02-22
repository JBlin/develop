import { defaultNav, Nav } from './../models/Nav';
import { defineStore } from 'pinia';
export const useNavStore = defineStore('nav', {
  state: () => ({
    nav: defaultNav as Nav
  }),
  actions: {
    setNav(updateNav: Nav) {
      this.nav = updateNav;
    }
  },
  getters: {
    getNav(): Nav {
      return this.nav;
    }
  },
  persist: true
});
