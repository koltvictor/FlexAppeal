import { makeObservable, observable, action } from "mobx";

class RoutineStore {
  routine = [];

  constructor() {
    makeObservable(this, {
      routine: observable,
      addExercise: action,
    });
    this.addExercise = this.addExercise.bind(this);
  }

  addExercise(exercise) {
    this.routine.push(exercise);
  }
}

const routineStore = new RoutineStore();
export default routineStore;
