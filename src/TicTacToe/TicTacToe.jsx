import React, {useEffect, useReducer} from "react";
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
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return{
                ...state,
                tableData,
                recentCell : [action.row, action.cell],
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

        if (win){
            dispatch({type:SET_WINNER, winner: state.turn});

        }
        let all = true;
        state.tableData.forEach((row)=>{
            row.forEach((cell)=>{
                if (!cell){
                    all = false;
                }
            })
        })
        if (all){
            dispatch({type:GAME_RESET});
        } else {
            dispatch({type:CHANGE_TURN})
        }
    }, [state.recentCell]);

    return(
        <>
            <Table tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>Winner : {state.winner}</div>}
        </>
    );
}

export default TTT;