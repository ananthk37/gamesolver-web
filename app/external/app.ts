
export async function solveSudoku(board: Array<Array<string> >): Promise<string> {
    const newBoard:string = board.map((row) => row.join("")).join("").replaceAll(" ", "0")
    const response:any = await fetch('http://127.0.0.1:5000/sudoku', {
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
