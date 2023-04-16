import { makeObservable, observable, action, autorun } from "mobx";

class RoutineStore {
  routine = [];

  constructor() {
    makeObservable(this, {
      routine: observable,
      addExercise: action,
    });
    this.addExercise = this.addExercise.bind(this);
    this.subscribeToRoutineChanges = this.subscribeToRoutineChanges.bind(this);
  }

  addExercise(exercise) {
    this.routine.push(exercise);
  }
  clearRoutine() {
    this.routine = [];
  }

  subscribeToRoutineChanges(callback) {
    return autorun(() => {
      if (typeof callback === "function") {
        callback(this.routine);
      }
    });
  }
}

const routineStore = new RoutineStore();
export default routineStore;
