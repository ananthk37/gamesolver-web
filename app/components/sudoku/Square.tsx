function Square({value, onSquareClick}: {value:string, onSquareClick:Function}) {
    return (
        <button className="square" onClick={() => onSquareClick()}>
            {value}
        </button>
    )
}
export default Square;