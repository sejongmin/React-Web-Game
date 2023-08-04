import React, {useCallback, memo} from "react";
import { CLICK_CELL } from "./TicTacToe";
import './tictactoe.css';

const Td = memo(({rowIndex, cellIndex, cellData, dispatch}) => {
    const onClickTd = useCallback(() => {
        if (cellData){
            return;
        } else{
            dispatch({type:CLICK_CELL, row : rowIndex, cell : cellIndex});
        }
    }, [cellData]);

    return(
        <td onClick={onClickTd}>{cellData}</td>
    );
});

export default Td;