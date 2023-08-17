import React, {useContext, memo, useCallback} from "react";
import { CLICK_CELL, SET_WINNER, TableContext } from "./Tictactoe";
import './tictactoe.css';

const Square = memo(({index}) => {
    const {dispatch, squares, winner} = useContext(TableContext);
    const onClickSquare = useCallback(() => {
        if (winner || squares.squares[index]){
            return;
        }
        dispatch({type:CLICK_CELL, i:index});
        dispatch({type:SET_WINNER})
        return;
    }, [squares, winner])

    return(
        <button className="square" onClick = {onClickSquare}>
            {squares.squares[index]}
        </button>
    );
});

export default Square;