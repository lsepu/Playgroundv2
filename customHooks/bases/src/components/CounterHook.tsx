import { useCounter } from "../hooks/useCounter"

export const CounterHook = () => {

    const {counter, elementToAnimate, handleClick } = useCounter();

    return (
        <>
            <h1>CounterEffect:</h1>   
            <h2 ref={ elementToAnimate }>{ counter }</h2>

            <button onClick={ handleClick }>
                +1
            </button>
        </>
    )
}