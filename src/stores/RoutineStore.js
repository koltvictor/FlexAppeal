import { makeObservable, observable, action, runInAction, autorun } from "mobx";

class RoutineStore {
  routine = [];
  reps = [];
  time = [];

  constructor() {
    makeObservable(this, {
      routine: observable,
      reps: observable,
      time: observable,
      addExercise: action,
      clearRoutine: action,
      setRoutine: action,
      handleRepsChange: action,
      handleTimeChange: action,
      removeExercise: action,
      subscribeToRoutineChanges: action.bound,
    });
    this.addExercise = this.addExercise.bind(this);
    this.clearRoutine = this.clearRoutine.bind(this);
    this.setRoutine = this.setRoutine.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.subscribeToRoutineChanges = this.subscribeToRoutineChanges.bind(this);
  }

  addExercise(exercise) {
    this.routine.push(exercise);
  }

  removeExercise(index) {
    this.routine.splice(index, 1);
  }

  clearRoutine() {
    this.routine = [];
    this.reps = [];
    this.time = [];
  }

  setRoutine(routine) {
    runInAction(() => {
      this.routine = routine;
    });
  }

  handleRepsChange(index, value) {
    const exercise = this.routine[index];
    exercise.reps = value;
  }

  handleTimeChange(index, value) {
    const exercise = this.routine[index];
    exercise.time = value;
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
