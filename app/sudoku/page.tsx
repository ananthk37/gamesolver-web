'use client'
import { arrayBuffer } from "node:stream/consumers";
import { useState } from "react";

function Square({value, onSquareClick, setValue}: {value:string, onSquareClick:any, setValue: any}) {
    return (
        <button className="square" onKeyDown={setValue} onClick={onSquareClick}>
            {value}
        </button>
    )
}

function Board() {
    const [squares, setSquares] = useState<Array<Array<string> > >(
        Array(9).fill(null).map((val) => (
            Array(9).fill(" ")
        )
    )
    ) 
    const [selectedRow, setSelectedRow] =  useState(0);
    const [selectedCol, setSelectedCol] = useState(0);
    function handleUpdate(row: number, col:number) {
        // onPlay(nextSquares);
        setSelectedRow(row);
        setSelectedCol(col);
        console.log(selectedRow, selectedCol)
        const newArr = squares;
        // newArr[selectedRow][selectedCol] = "A";
        setSquares(newArr)
    }
    function setValue(event:any) {
        console.log("downkey");
        if(event.key >= "1" && event.key <= "9") {
            const newArr = squares;
            newArr[selectedRow][selectedCol] = event.key;
            setSquares(newArr)
        }
    }
    return (
        <>
            {
                squares.map((val, idx) => 
                    (
                        <div className="board-row">
                            {val.map((ex_val, ex_idx) => (
                                <Square value={ex_val} onSquareClick={() => handleUpdate(idx, ex_idx)} setValue = {(event:any ) => setValue(event)} />
                            ))}
                        </div>
                     ) 
                )
            }
        </>
    )
}


export default function Sudoku() {
    return (
        <div>
            <h1>
                Enter the board here:
            </h1>
            <Board />
        </div>
    );
}