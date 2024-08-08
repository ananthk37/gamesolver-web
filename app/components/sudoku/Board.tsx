import Square from "./Square";



function Board({squares, onClick}: {squares: Array<Array<string>>, onClick: Function}) { 

    return (
        <>
            {
                squares.map((val, idx) => 
                    (
                        <div className="board-row" key="{val}">
                            {val.map((ex_val, ex_idx) => (
                                <Square key="{idx} {ex_idx}" value={ex_val} onSquareClick={() => onClick(idx, ex_idx) } />
                            ))}
                        </div>
                     ) 
                )
            }
        </>
    )
}

export default Board;