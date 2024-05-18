import { makeObservable, action } from "mobx";
import { observable } from "mobx";

class UserStore {
  @observable user = null;
  @observable profile = null;
  @observable savedRoutines = null;
  @observable numSharedRoutines = 0;
  @observable numSavedRoutines = 0;
  @observable pendingRequests = [];
  @observable isLoadingFriendRequests = false;
  @observable friends = [];

  constructor() {
    makeObservable(this);
  }

  @action setUser(user) {
    this.user = user;
  }

  @action setProfile(profile) {
    this.profile = profile;
  }

  @action setPendingRequests(requests) {
    this.pendingRequests = requests;
    console.log("Pending requests in userStore:", this.pendingRequests);
  }

  @action setFriends(newFriends) {
    this.friends = newFriends;
  }

  @action setIsLoadingFriendRequests(state) {
    this.isLoadingFriendRequests = state;
  }

  @action setSavedRoutines(savedRoutines) {
    this.savedRoutines = savedRoutines;
    this.updateNumSharedRoutines();
    this.updateNumSavedRoutines();
  }

  @action updateNumSharedRoutines() {
    this.numSharedRoutines = 0; // Reset the count
    if (this.savedRoutines) {
      Object.values(this.savedRoutines).forEach((routine) => {
        if (routine.sharedWith && routine.sharedWith.length > 0) {
          this.numSharedRoutines++; // Increment if shared
        }
      });
    }
  }

  @action updateNumSavedRoutines() {
    this.numSavedRoutines = 0;
    if (this.savedRoutines) {
      this.numSavedRoutines = Object.keys(this.savedRoutines).length;
    }
  }

  @action addRoutine(routineName, routineData) {
    if (!this.savedRoutines) {
      this.savedRoutines = {};
    }
    this.savedRoutines[routineName] = routineData;
    this.updateNumSavedRoutines();
    if (routineData.sharedWith) {
      this.numSharedRoutines++;
    }
  }

  @action removeRoutine(routineName) {
    if (this.savedRoutines && this.savedRoutines[routineName]) {
      if (this.savedRoutines[routineName].sharedWith) {
        this.numSharedRoutines--;
      }
      delete this.savedRoutines[routineName];
      this.updateNumSavedRoutines();
    }
  }
}

const userStore = new UserStore();
export default userStore;
