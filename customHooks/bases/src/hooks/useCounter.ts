import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from 'gsap'

const MAXIMUN_COUNT = 10;

export const useCounter = () => {

    const [counter, setCounter] = useState(5)
    const elementToAnimate = useRef<any>(null);

    const tl = useRef(gsap.timeline());


    const handleClick = () => {
        setCounter(prev => Math.min(prev + 1, MAXIMUN_COUNT));
    }

    /*llamado de forma sincrona despues de todas las mutaciones del DOM (sucede antes que el componente sea mostrado en pantalla), lo uso
    si quiero mutar el dom antes de mostrarlo en pantalla, por lo general se usa en conjunto con useRef porque este sirve como un 
    queryselector */
    useLayoutEffect(() => {

        if (!elementToAnimate.current ) return;

        tl.current.to(elementToAnimate.current, { y: -10, duration: 0.2, ease: 'ease.out' })
            .to(elementToAnimate.current, { y: 0, duration: 1, ease: 'bounce.out' })
            .pause();

    }, [])

    useEffect(() => {

        // if ( counter <  MAXIMUN_COUNT ) return;

        // console.log('%cSe llego al valor máximo','color: red; background-color: black;')

        tl.current.play(0);


    }, [counter])

    return {
        counter,
        elementToAnimate,
        handleClick
    }

}