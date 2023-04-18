import { makeObservable, observable, action, runInAction, autorun } from "mobx";

class RoutineStore {
  routine = [];

  constructor() {
    makeObservable(this, {
      routine: observable,
      addExercise: action,
      clearRoutine: action,
      setRoutine: action,
      subscribeToRoutineChanges: action.bound,
    });
    this.addExercise = this.addExercise.bind(this);
    this.clearRoutine = this.clearRoutine.bind(this);
    this.setRoutine = this.setRoutine.bind(this);
    this.subscribeToRoutineChanges = this.subscribeToRoutineChanges.bind(this);
  }

  addExercise(exercise) {
    this.routine.push(exercise);
  }

  clearRoutine() {
    this.routine = [];
  }

  setRoutine(routine) {
    runInAction(() => {
      this.routine = routine;
    });
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
