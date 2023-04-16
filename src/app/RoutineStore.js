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

// class RoutineStore {
//     constructor() {
//       this.routine = [];
//       this.listeners = [];
//     }

//     addExercise(exercise) {
//       this.routine.push(exercise);
//       this.notifyListeners();
//     }

//     removeExercise(id) {
//       this.routine = this.routine.filter((exercise) => exercise.id !== id);
//       this.notifyListeners();
//     }

//     notifyListeners() {
//       this.listeners.forEach((listener) => listener());
//     }

//     subscribe(listener) {
//       this.listeners.push(listener);
//       // Return a function that removes the listener from the list of listeners
//       return () => {
//         const index = this.listeners.indexOf(listener);
//         if (index !== -1) {
//           this.listeners.splice(index, 1);
//         }
//       };
//     }
//   }

//   const routineStore = new RoutineStore();

//   export default routineStore;
