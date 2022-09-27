import React, { FunctionComponent } from 'react'

type Props = {
    onclick: () => void
};

export const BotonRecolectar: FunctionComponent<Props> = (props) => {
    return (
        <button
            onClick={props.onclick ?? (()=>console.log("Prueba click"))}
            style={{ "position": "absolute", "bottom": "80px", "left": "10px", "zIndex": "1000" }}
        >
            .-Jam-.
        </button>
    )
}