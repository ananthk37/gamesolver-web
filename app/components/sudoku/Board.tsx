import Square from "./Square";



function Board({squares, onClick, selectedSquares}: {squares: Array<Array<string>>, onClick: Function, selectedSquares?: Array<Array<boolean> > }) { 

    return (
        <>
            {
                squares.map((val, idx) => 
                    (
                        <div className="board-row" key="{val}">
                            {val.map((ex_val, ex_idx) => (
                                <Square key={" " + {idx}  + {ex_idx}} value={ex_val} onSquareClick={() => onClick(idx, ex_idx)} selected={selectedSquares? selectedSquares[idx][ex_idx]: false} />
                            ))}
                        </div>
                     ) 
                )
            }
        </>
    )
}

export default Board;