import React, {useContext} from "react";
import { CLICK_CELL, TableContext } from "./Tictactoe";

const Square = ({index}) => {
    const {dispatch, squares, winner} = useContext(TableContext);
    const onClickSquare = () => {
        if (winner || squares[index]){
            return;
        }
        dispatch({type:CLICK_CELL, i:index});
        return;
    }

    return(
        <button className="square" onClick = {onClickSquare}>
            {squares[index]}
        </button>
    );
}

export default Square;