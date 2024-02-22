import { defaultOther, Other } from './../models/Other';
import { defineStore } from 'pinia';
export const useOtherStore = defineStore('other', {
  state: () => ({
    other: defaultOther as Other
  }),
  actions: {
    setOther(updateOther: Other) {
      this.other = updateOther;
    }
  },
  getters: {
    getOther(): Other {
      return this.other;
    }
  },
  persist: true
});
