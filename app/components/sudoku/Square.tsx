import { useState } from "react";

function Square({value, onSquareClick, selected}: {value:string, onSquareClick:Function, selected: boolean}) {
    
    
    return (
        <button className={"square " + (selected ? "bg-blue-700": "bg-white")} onClick={() => onSquareClick()}>
            {value}
        </button>
    )
}
export default Square;