import { CounterAction } from "../actions/actions";
import { CounterState } from "../interfaces/interfaces";

export const counterReducer = (state: CounterState, action: CounterAction): CounterState=> {

    const {counter, changes} = state;

    switch (action.type) {
        case 'reset':
            return {
                counter: 0,
                previous: 0,
                changes: 0
            }
        
        case 'increaseBy':
            return {
                changes: changes + 1,
                counter: counter + action.payload.value,
                previous: counter
            }

        default:
            return state;
    }
}
