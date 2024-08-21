import { Rowdies, Sree_Krushnadevaraya } from "next/font/google"

const SERVER_HOME: string = "http://127.0.0.1:5000"


export async function solveSudoku(board: Array<Array<string> >): Promise<string> {
    const newBoard:string = board.map((row) => row.join("")).join("").replaceAll(" ", "0")
    const response:any = await fetch( SERVER_HOME + '/sudoku', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            board: newBoard
        })
    })
    const data = await response.json()
    return data["board"]
}

export async function solveKiller(board: Array<Array<string> >, groups: Array<number>, groupVals: Array<Array<number> > ): Promise<string> {
    const newBoard: string = board.map((row) => row.join("")).join("").replaceAll(" ", "0");
    let newGroups: Array<any > = groups.map((groupVal) => [groupVal, []])

    groupVals.forEach((row, row_i) => {
        row.forEach((val, col_i) => {
            if(val > -1) {
                newGroups[val][1] = [...newGroups[val][1], row_i * 9 + col_i]
            }
        })
    })



    const response:any = await fetch( SERVER_HOME + '/killer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            board: newBoard,
            groups: newGroups
        })
    })

    const data = await response.json()
    return data["board"]
}

export async function solveKenken(board: Array<Array<string> >, groups: Array< {val:number, operation:string}>, groupVals: Array<Array<number> >, boardSize:number): Promise<string> {
    const newBoard: string = board.map((row) => row.join("")).join("").replaceAll(" ", "0")
    let newGroups: Array<any > = groups.map((group: {val:number, operation:string}) => [group["operation"],group["val"],  []])

    groupVals.forEach((row, row_i) => {
        row.forEach((val, col_i) => {
            if(val > -1) {
                newGroups[val][2] = [...newGroups[val][2], row_i * boardSize + col_i]
            }
        })
    })
    const response:any = await fetch( SERVER_HOME + "/kenken", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            board:newBoard,
            groups:newGroups,
            size:boardSize
        })
    })
    const data = await response.json()
    return data["board"]
}