'use client'
import { useState } from "react";
import Board from "../components/sudoku/Board";
import SelectionRow from "../components/sudoku/SelectionRow";
import {solveSudoku} from "../external/app"

const selectionVals = "123456789 ".split("")
export default function Sudoku() {
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedCol, setSelectedCol] = useState(-1);
    const [boardVals, setBoardVals] = useState<Array<Array<string> > >(
        Array(9).fill(null).map((val) => (
            Array(9).fill(" ")
        ))
    )
    const [solutionBoardVals, setSolutionBoardVals] = useState<Array<Array<string> > >(
        Array(9).fill(null).map((val) => (
            Array(9).fill(" ")
        ))
    )

    function updateSquare(row:number, col:number) {
        setSelectedRow(row);
        setSelectedCol(col);
    }

    async function getSolution() {
            const board_str = await solveSudoku(boardVals)

            let board_split = board_str.split("")
            let newArr: Array<Array<string > > = []
            while(board_split.length) {
                newArr.push(board_split.splice(0,9))
            }
            setSolutionBoardVals(newArr)
                
        }

    function updateVal(value: string) {
        if(selectedRow == -1) {
            return
        }
        const newArr = boardVals;
        newArr[selectedRow][selectedCol] = value;
        setBoardVals(newArr);
    }

    return ( <>
        <div className=" flex flex-col md:flex-row">
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Selected square: ({selectedRow+1}, {selectedCol+1})
                    </h6>
                    <Board squares={boardVals} onClick={(row:number, col:number) => updateSquare(row, col)}/>

                </div>
                <br></br>
                <SelectionRow values={selectionVals} onClick={(value:string) => updateVal(value)}/>
            </div>
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Solution:
                    </h6>
                    <Board squares={solutionBoardVals} onClick={() => { } } />
                <br></br>
                <button className=" bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={() => getSolution()}>Solve</button>
                </div>
            </div>
        </div>
    </>
    );
}