import { makeObservable, observable, action } from "mobx";

class UserStore {
  @observable user = null;
  @observable profile = null;

  constructor() {
    makeObservable(this);
  }

  @action setUser(user) {
    this.user = user;
  }

  @action setProfile(profile) {
    this.profile = profile;
  }
}

const userStore = new UserStore();
export default userStore;
