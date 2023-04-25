import { makeObservable, observable, action } from "mobx";

class UserStore {
  @observable user = null;
  @observable profile = null;
  @observable savedroutines = null;

  constructor() {
    makeObservable(this);
  }

  @action setUser(user) {
    this.user = user;
  }

  @action setProfile(profile) {
    this.profile = profile;
  }

  @action setSavedRoutines(savedroutines) {
    this.savedroutines = savedroutines;
  }
}

const userStore = new UserStore();
export default userStore;
