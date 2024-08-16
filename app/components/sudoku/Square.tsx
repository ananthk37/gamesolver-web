import { useState } from "react";

function Square({value, onSquareClick, selected, colorGroup}: {value:string, onSquareClick:Function, selected: boolean, colorGroup: number}) {
    const colorMatrix: Array<Array< string> > = [
        ["square bg-color0-100", "square bg-color0"],
        ["square bg-color1-300", "square bg-color1-100"],
        ["square bg-color2-300", "square bg-color2-100"],
        ["square bg-color3-300", "square bg-color3-100"],
        ["square bg-color4-300", "square bg-color4-100"],
        ["square bg-color5-300", "square bg-color5-100"],
        ["square bg-color6-300", "square bg-color6-100"],
    ]
    return (
        <button className={selected? colorMatrix[colorGroup > -1? 1+  (colorGroup % 6): 0][0]: colorMatrix[colorGroup > -1? 1 + (colorGroup % 6): 0][1]} onClick={() => onSquareClick()}>
            {value}
        </button>
    )
}
export default Square;