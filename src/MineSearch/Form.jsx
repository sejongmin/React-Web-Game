import React, {useState, useCallback, useContext} from "react";
import { TableContext, START_GAME } from './MineSearch';

const Form = () => {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(10);
    const {dispatch} = useContext(TableContext);

    const onChangeRow = useCallback((e)=>{
        setRow(e.targat.value);
    }, []);

    const onChangeCol = useCallback((e)=>{
        setCol(e.targat.value);
    }, []);

    const onChangeMine = useCallback((e)=>{
        setMine(e.targat.value);
    }, []);
    
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
}

export default Form;