import React, {useCallback} from "react";
import { CLICK_CELL, CHANGE_TURN } from "./TicTacToe";
import './tictactoe.css';

const Td = (props) => {
    const onClickTd = useCallback(() => {
        console.log(props.rowIndex, props.cellIndex, props.cellData);
        if (props.cellData){
            return;
        }
        props.dispatch({type:CLICK_CELL, row : props.rowIndex, cell : props.cellIndex});
    }, [props.cellData]);

    return(
        <td onClick={onClickTd}>{props.cellData}</td>
    );
}

export default Td;