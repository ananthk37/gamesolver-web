'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import Board from "../components/sudoku/Board";
import SelectionRow from "../components/sudoku/SelectionRow";
import {solveKiller} from "../external/app"


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
    
    const [groups, setGroups] = useState<Array<number> >([1]); //killer groups to display under "Groups"
    const [selectedGroup, setSelectedGroup] = useState<number>(-1);
    const [groupVals, setGroupVals] = useState<Array<Array<number > > >(
        Array(9).fill(null).map((val) => (
            Array(9).fill(-2)
        ))
    )


    async function getSolution() {
            const board_str = await solveKiller(boardVals, groups, groupVals)

            let board_split = board_str.split("")
            let newArr: Array<Array<string > > = []
            while(board_split.length) {
                newArr.push(board_split.splice(0,9))
            }
            setSolutionBoardVals(newArr)
                
    }

    function selectSquare(row:number, col:number) {
        setSelectedRow(row);
        setSelectedCol(col);
        if (selectedGroup != -1) {
            let newGroupVal = selectedGroup;
            if(groupVals[row][col] == selectedGroup) {
                newGroupVal = -2;
            }
            let newGroupVals = [...groupVals];
            newGroupVals[row][col] = newGroupVal;
            setGroupVals(newGroupVals);
        }
    }

    function updateVal(value: string) {
        if(selectedRow == -1) {
            return
        }
        const newArr = [...boardVals];
        newArr[selectedRow][selectedCol] = value;
        setBoardVals(newArr);
        console.log(boardVals[selectedRow][selectedCol])
    }

    function createNewGroup() {
        let oldGroups = [...groups, 1]
        setGroups(oldGroups)
        setSelectedGroup(oldGroups.length-1)
    }

    function updateGroupValue(event: ChangeEvent<HTMLInputElement> , idx:number) {
        let newVal = event.target.value;
        try {
            let newValNumber = parseInt(newVal);
            let oldGroups = [...groups];
            oldGroups[idx] = newValNumber;
            setGroups(oldGroups);
        } catch (error) {
            let oldGroups = [...groups];
            oldGroups[idx] = 1;
            setGroups(oldGroups);
        }
    }

    function deleteGroup(idx:number) {
        let oldGroups = [...groups];
        oldGroups.splice(idx, 1);
        setGroups(oldGroups);
        let oldGroupVals = [...groupVals].map((row) => (row.map((val) => (
            val < idx ? val: (val == idx? -2: val - 1)
        ))))
        setGroupVals(oldGroupVals);
        setSelectedGroup(-1);

    }

    return ( <>
        <div className=" flex flex-col md:flex-row">
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Selected square: ({selectedRow+1}, {selectedCol+1})
                        <br />
                        Selected group: {selectedGroup}
                    </h6>
                    <Board 
                    squares={boardVals} 
                    onClick={(row:number, col:number) => {selectSquare(row, col)}} 
                    selectedSquares={groupVals.map((val) => (
                        val.map((val2) => (val2 == selectedGroup))))}
                    squareGroups={groupVals}
                    />

                </div>
                <br></br>
                <SelectionRow values={selectionVals} onClick={(value:string) => updateVal(value)}/>
            </div>
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Groups:
                    </h6>
                    <ul>
                        {groups?.map((group, idx) => (
                            <li key={idx}>
                                <input value={group} onChange={e => updateGroupValue(e, idx)} onClick={() =>setSelectedGroup(idx)} />
                                 
                                 
                                 <button onClick={() => deleteGroup(idx)}>X</button>
                            </li>
                        ))}
                        <li>
                            <button onClick={() => {createNewGroup()}}>New Group</button>
                        </li>
                    </ul>

                </div>
            </div>
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Solution:
                    </h6>
                    <Board squares={solutionBoardVals} onClick={() => {}} />
                <br></br>
                <button className=" bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={() => getSolution()}>Solve</button>
                </div>
            </div>
        </div>
    </>
    );
}