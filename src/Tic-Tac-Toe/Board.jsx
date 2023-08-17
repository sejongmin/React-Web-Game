import React, {useContext, memo} from "react";
import Square from "./Square";
import { TableContext } from "./Tictactoe";
import './tictactoe.css';

const Board = memo(() => {
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
});

export default Board;