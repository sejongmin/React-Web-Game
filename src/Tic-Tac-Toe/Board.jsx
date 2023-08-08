import React, {useContext} from "react";
import Square from "./Square";
import { TableContext } from "./Tictactoe";

const Board = () => {
    const {dispatch, squares, winner} = useContext(TableContext);
    console.log(squares);
    console.log(winner);
    return(
    <div>
        <div className="border-row">
            <Square index={0} />
            <Square index={1} />
            <Square index={2} />
        </div>
        <div className="border-row">
            <Square index={3} />
            <Square index={4} />
            <Square index={5} />
        </div>
        <div className="border-row">
            <Square index={6} />
            <Square index={7} />
            <Square index={8} />
        </div>
    </div>
    );
};

export default Board;