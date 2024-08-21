'use client'
import { ChangeEvent, FormEvent, useState } from "react";
import Board from "../components/grid/Board";
import SelectionRow from "../components/grid/SelectionRow";
import {solveKenken, solveKiller} from "../external/app"

const selectionVals = " 123456789".split("")


// const defaultBoards = {
//     3: Array(3).fill(null).map((val) => (Array(3).fill(" "))),
//     4: Array(4).fill(null).map((val) => (Array(4).fill(" "))),
//     5: Array(5).fill(null).map((val) => (Array(5).fill(" "))),
//     6: Array(6).fill(null).map((val) => (Array(6).fill(" "))),
//     7: Array(7).fill(null).map((val) => (Array(7).fill(" "))),
//     8: Array(8).fill(null).map((val) => (Array(8).fill(" "))),
// }
const defaultBoards: Array<Array<Array<string> > > = Array(10).fill(null).map((board, size) => (
    Array(size).fill(null).map((row) => (
        Array(size).fill(" ")
    ))
))
const defaultGroups: Array<Array<Array<number> > > = Array(10).fill(null).map((board, size) => (
    Array(size).fill(null).map((row) => (
        Array(size).fill(-2)
    ))
))
export default function Sudoku() {
    const [boardSize, setBoardSize] = useState(4);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedCol, setSelectedCol] = useState(-1);
    const [boardVals, setBoardVals] = useState<Array<Array<string> > >(
        Array(boardSize).fill(null).map((val) => (
            Array(boardSize).fill(" ")
        ))
    )
    const [solutionBoardVals, setSolutionBoardVals] = useState<Array<Array<string> > >(
        Array(boardSize).fill(null).map((val) => (
            Array(boardSize).fill(" ")
        ))
    )
    const [solutionGroupVals, setSolutionGroupVals] = useState<Array<Array<number > > >(
        Array(boardSize).fill(null).map((val) => (
            Array(boardSize).fill(-2)
        ))
    )

    const [groups, setGroups] = useState<Array<{val:number, operation:string}> >([{val:0, operation:"+"}]); //killer groups to display under "Groups"
    const [selectedGroup, setSelectedGroup] = useState<number>(-1);
    const [groupVals, setGroupVals] = useState<Array<Array<number > > >(
        Array(boardSize).fill(null).map((val) => (
            Array(boardSize).fill(-2)
        ))
    )


    async function getSolution() {
        try {
            const board_str = await solveKenken(boardVals, groups, groupVals, boardSize);
            let board_split = board_str.split("")
            let newArr: Array<Array<string > > = []
            while(board_split.length) {
                newArr.push(board_split.splice(0,boardSize))
            }
            setSolutionBoardVals(newArr)
            let newGroups = groupVals.map((val) => (
                [...val]
            ))
            setSolutionGroupVals(newGroups)
        }catch (error) {
                
        }
                
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
        let oldGroups = [...groups, {val:0, operation:"+"}]
        setGroups(oldGroups)
        setSelectedGroup(oldGroups.length-1)
    }

    function updateGroupValue(event: ChangeEvent<HTMLInputElement> , idx:number) {
        let newVal = event.target.value;
        try {
            let newValNumber = parseInt(newVal);
            let oldGroups = [...groups];
            oldGroups[idx]["val"] = newValNumber;
            setGroups(oldGroups);
        } catch (error) {
            let oldGroups = [...groups];
            oldGroups[idx]['val'] = 1;
            setGroups(oldGroups);
        }
    }
    function setSelectedOperation(idx: number, val: string) {
        let oldGroups = [...groups]
        oldGroups[idx]["operation"] = val;
        setGroups(oldGroups);
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

    function updateBoardSize(val:string) {
        try{
            let newSizeNum = parseInt(val);
            setBoardSize(newSizeNum);
            let newBoardVals: Array<Array<string> > = [...defaultBoards[newSizeNum]]
            let newGroupVals: Array<Array<number> > = [...defaultGroups[newSizeNum]]
            setBoardVals(newBoardVals)
            
            
            setGroupVals(newGroupVals)
            setSolutionBoardVals(newBoardVals)
            setSolutionGroupVals(newGroupVals)
            setGroups([{val:0, operation:"+"}])
            setSelectedGroup(-1);
        } catch(error) {

        }
    }

    return ( <>
        <div className=" flex flex-col md:flex-row">
            <div className="mx-5 my-1">
                <select value={boardSize} onChange={e => {updateBoardSize(e.target.value)}}>
                    <option value={3}>3x3</option>
                    <option value={4}>4x4</option>
                    <option value={5}>5x5</option>
                    <option value={6}>6x6</option>
                    <option value={7}>7x7</option>
                    <option value={8}>8x8</option>
                </select>
            </div>
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
                <SelectionRow values={selectionVals.slice(0, boardSize + 1)} onClick={(value:string) => updateVal(value)}/>
            </div>
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Groups:
                    </h6>
                    <div className="overflow-y-scroll h-80 overflow-x-hidden">
                        <ul>
                            {groups?.map((group, idx) => (
                                <li key={idx}>
                                    <input value={group['val']} onChange={e => updateGroupValue(e, idx)} onClick={() =>setSelectedGroup(idx)} />
                                    <select
                                        value={group['operation']}
                                        onChange={e => {setSelectedOperation(idx, e.target.value)}}>
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                        <option value="*">*</option>
                                        <option value="/">/</option>
                                    </select>
                                    <button onClick={() => deleteGroup(idx)}>X</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                <button onClick={() => {createNewGroup()}}>New Group</button>
                </div>
            </div>
            <div className="mx-5 my-1">
                <div className="mx-5 my-1">
                    <h6 className="my-1">
                        Solution:
                    </h6>
                    <Board squares={solutionBoardVals} onClick={() => {}} squareGroups={solutionGroupVals} />
                <br></br>
                <button className=" bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" onClick={() => getSolution()}>Solve</button>
                </div>
            </div>
        </div>
    </>
    );
}