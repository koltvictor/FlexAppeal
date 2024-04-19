import { makeObservable, observable, action, runInAction, autorun } from "mobx";

class RoutineStore {
  routine = [];
  reps = [];
  time = [];
  rest = [];

  constructor() {
    makeObservable(this, {
      routine: observable,
      reps: observable,
      time: observable,
      rest: observable,
      addExercise: action,
      clearRoutine: action,
      setRoutine: action,
      handleRepsChange: action,
      handleTimeChange: action,
      handleRestTimeChange: action,
      removeExercise: action,
      updateRoutine: action,
      setNewRoutineOrder: action,
      subscribeToRoutineChanges: action.bound,
    });
    this.addExercise = this.addExercise.bind(this);
    this.clearRoutine = this.clearRoutine.bind(this);
    this.setRoutine = this.setRoutine.bind(this);
    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleRestTimeChange = this.handleRestTimeChange.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.updateRoutine = this.updateRoutine.bind(this);
    this.subscribeToRoutineChanges = this.subscribeToRoutineChanges.bind(this);
  }

  addExercise(exercise) {
    this.routine.push(exercise);
  }

  removeExercise(exerciseId) {
    const exerciseIndex = this.routine.findIndex((ex) => ex.id === exerciseId);
    if (exerciseIndex !== -1) {
      this.routine.splice(exerciseIndex, 1);
    }
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

  setNewRoutineOrder(newOrder) {
    this.routine = newOrder;
  }

  updateRoutine(updatedRoutine) {
    runInAction(() => {
      this.routine = updatedRoutine;
    });
  }

  handleRepsChange(exerciseId, value) {
    const exerciseIndex = this.routine.findIndex((ex) => ex.id === exerciseId);
    if (exerciseIndex !== -1) {
      this.routine[exerciseIndex].reps = value;
    }
  }

  handleTimeChange(exerciseId, value) {
    const exerciseIndex = this.routine.findIndex((ex) => ex.id === exerciseId);
    if (exerciseIndex !== -1) {
      this.routine[exerciseIndex].time = value;
    }
  }

  handleRestTimeChange(exerciseId, value) {
    const exerciseIndex = this.routine.findIndex((ex) => ex.id === exerciseId);
    if (exerciseIndex !== -1) {
      this.routine[exerciseIndex].rest = value;
    }
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
