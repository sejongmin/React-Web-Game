import React, {useState, useCallback, useContext, memo} from "react";
import { TableContext, START_GAME } from './MineSearch';

const Form = memo(() => {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(20);
    const {dispatch} = useContext(TableContext);

    const onChangeRow = useCallback((e)=>{
        setRow(e.target.value);
    }, [row]);

    const onChangeCol = useCallback((e)=>{
        setCol(e.target.value);
    }, [col]);

    const onChangeMine = useCallback((e)=>{
        setMine(e.target.value);
    }, [mine]);
    
    const onClickBtn = useCallback(() => {
        dispatch({type:START_GAME, row, col, mine});
    }, [row, col, mine]);

    return(
        <div>
            <input type="number" value={row} onChange={onChangeRow}/>
            <input type="number" value={col} onChange={onChangeCol}/>
            <input type="number" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </div>
    );
});

export default Form;