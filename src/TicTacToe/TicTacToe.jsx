import React, {useState, useEffect, useReducer, useRef, useCallback} from "react";
import './tictactoe.css';
import Table from './Table';

const initialState =  {
    winner : '',
    turn : 'O',
    tableData : [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell : [-1, -1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const GAME_RESET = 'GAME_RESET';


const reducer = (state, action) => {
    switch(action.type){
        case SET_WINNER:
            return{
                ...state,
                winner : action.winner
            };
        case CLICK_CELL:{
            if (state.winner === ''){
                const tableData = [...state.tableData];
                tableData[action.row] = [...tableData[action.row]];
                tableData[action.row][action.cell] = state.turn;
                return{
                    ...state,
                    tableData,
                    recentCell : [action.row, action.cell],
                }
            }
        }
        case CHANGE_TURN:{
            return{
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case GAME_RESET:{
            return{
                ...state,
                winner : '',
                trun : 'O',
                tableData : [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell : [-1, -1],
            }
        }
    }
};

const TTT = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [restart, setRestart] = useState(0);
    const setTime = useRef();
    
    const restartTimer = useCallback(() => {
        setRestart(3);
        setTime.current = setInterval(()=>{
            setRestart((prevState)=>prevState - 1);
        }, 1000)
        setTimeout(()=>{
            setRestart(0);
            dispatch({type:GAME_RESET});
            clearInterval(setTime.current);
        }, 3000);
    }, [state.winner]);

    useEffect(()=>{
        const [row, col] = state.recentCell;
        if (row < 0){
            return
        }
        let win = false;

        if (state.tableData[row][0] === state.turn && state.tableData[row][1] === state.turn && state.tableData[row][2] === state.turn){
            win = true;
        } else if (state.tableData[0][col] === state.turn && state.tableData[1][col] === state.turn && state.tableData[2][col] === state.turn){
            win = true;
        } else if (state.tableData[0][0] === state.turn && state.tableData[1][1] === state.turn && state.tableData[2][2] === state.turn){
            win = true;
        } else if (state.tableData[2][0] === state.turn && state.tableData[1][1] === state.turn && state.tableData[0][2] === state.turn){
            win = true;
        }

        let all = true;
        state.tableData.forEach((row)=>{
            row.forEach((cell)=>{
                if (!cell){
                    all = false;
                }
            })
        })

        if (win){
            dispatch({type:SET_WINNER, winner: state.turn});
            restartTimer();
        } else if (all){
            dispatch({type:SET_WINNER, winner:'DRAW'});
            restartTimer();
        } else {
            dispatch({type:CHANGE_TURN})
        }
    }, [state.recentCell]);

    return(
        <div>
            <Table tableData={state.tableData} dispatch={dispatch}/>
            {state.winner && <div>Winner : {state.winner}</div>}
            {restart > 0 && <div>{`${restart}초 후에 재시작 합니다.`}</div>}
        </div>
    );
}

export default TTT;