import { useReducer, useState } from 'react'
import { CounterState } from './interfaces/interfaces';
import { counterReducer } from './state/counterReducer';

const INITIAL_STATE: CounterState = {
    counter: 0,
    previous: 0,
    changes: 0
}

export const CounterReducerComponent = () => {

    const [{ counter }, dispatch] = useReducer(counterReducer, INITIAL_STATE)

    const handleReset = () => {
        dispatch({ type:'reset' })
    }

    const increaseBy = ( value:number ) => {
        dispatch({type: 'increaseBy', payload: { value }});
    }

    return (
        <>
            <h1>Counter Reducer Segmentado: {counter}</h1>
            <button onClick={() => increaseBy(1)}>
                +1
            </button>
            <button onClick={() => increaseBy(5)}>
                +5
            </button>
            <button onClick={() => increaseBy(10)}>
                +10
            </button>
            <button onClick={handleReset}>
                Reset
            </button>
        </>
    )