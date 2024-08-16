import Square from "./Square";



function Board({squares, onClick, selectedSquares, squareGroups}: {squares: Array<Array<string>>, onClick: Function, selectedSquares?: Array<Array<boolean> >, squareGroups?: Array<Array<number> > }) { 

    return (
        <>
            {
                squares.map((val, idx) => 
                    (
                        <div className="board-row" key="{val}">
                            {val.map((ex_val, ex_idx) => (
                                <Square 
                                key={" " + {idx}  + {ex_idx}} 
                                value={ex_val} onSquareClick={() => onClick(idx, ex_idx)} 
                                selected={selectedSquares? selectedSquares[idx][ex_idx]: false}
                                colorGroup={squareGroups? squareGroups[idx][ex_idx]: -1}
                                />
                            ))}
                        </div>
                     ) 
                )
            }
        </>
    )
}

export default Board;