import Square from "./Square";

function SelectionRow({values, onClick}: {values: Array<string>, onClick: Function}) {
    return (
        <div className="selection-row" key="selection">
        {values.map((val, idx) => (
                <Square key={idx} value={val} onSquareClick={() => onClick(val)} selected={false} colorGroup={-2}/>
        ))}
        </div>
    )
}


export default SelectionRow;