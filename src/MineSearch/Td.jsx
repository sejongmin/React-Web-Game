import React, {useCallback, useContext} from "react";
import {TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL} from './MineSearch';

const getTdStyle = (code) => {
    switch(code){
        case CODE.NORMAL:
        case CODE.MINE:
            return{
                background: '#444',
            };
        case CODE.OPENED:
        case CODE.CLICKED_MINE:
            return{
                background:'white',
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow',
            };
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return{
                background:'red',
            };
        default:
            return{
                background:'white',
            };
    }
};

const getTdText = (code) => {
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || '';
    }
};

const Td = ({rowIndex, colIndex}) => {
    const {tableData, dispatch, halted} = useContext(TableContext);

    const onClickTd = useCallback(()=>{
        if (halted){
            return;
        }
        switch(tableData[rowIndex][colIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({type:OPEN_CELL, row:rowIndex, col:colIndex});
                return;
            case CODE.MINE:
                dispatch({type:CLICK_MINE, row:rowIndex, col:colIndex});
                return;
            default:
                return;
        }
    },[tableData[rowIndex][colIndex], halted]);

    const onRightClickTd = useCallback((e)=>{
        e.preventDefault();
        if (halted){
            return;
        }
        switch(tableData[rowIndex][colIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type:FLAG_CELL, row: rowIndex, col:colIndex});
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({type:QUESTION_CELL, row:rowIndex, col:colIndex});
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({type:NORMALIZE_CELL, row:rowIndex, col:colIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][colIndex], halted]);

    return(
        <td 
            style={getTdStyle(tableData[rowIndex][colIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}>
            {getTdText(tableData[rowIndex][colIndex])}
        </td>
    );
}

export default Td;