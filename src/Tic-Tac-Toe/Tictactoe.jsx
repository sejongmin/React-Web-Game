import React, {useReducer, createContext, useMemo} from "react";
import './tictactoe.css';
import Board from './Board';

const initialState = {
    history : [{
        squares : Array(9).fill(null),
    }],
    stepNumber : 0,
    xIsNext : true,
    winner : '',
};

export const TableContext = createContext({
    squares : [],
    dispatch: ()=>{},
});

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const JUMP_TO = 'JUMP_TO';

const reducer = (state, action) => {
    switch(action.type){
        case SET_WINNER:
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++){
                const [a, b, c] = lines[i];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                    return {
                        ...state,
                        winner : squares[a],
                    }
                }
            }
            return ;
        case CLICK_CELL:
            const history_1 = state.history.slice(0, state.stepNumber + 1);
            const current_1 = history_1[history_1.length - 1];
            const squares_1 = current_1.squares.slice();
            squares_1[action.i] = state.xIsNext ? 'X' : 'O';
            
            return{
                ...state,
                history : history_1.concat([{
                    squares : squares_1,
                }]),
                stepNumber : state.stepNumber + 1,
                xIsNext : !state.xIsNext,
            }
        case JUMP_TO:
            return{
                ...state,
                stepNumber : action.step,
                xIsNext : (action.step % 2) === 0,
            }
        default:
            return state;
    }
};

const Tictactoe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(()=>({winner : state.winner, squares:state.history[state.stepNumber], dispatch}), [state.stepNumber, state.winner]);
    
    // const moves = state.history.map((step, move) => {
    //     const desc = move ? 
    //     'Go to move #' + move :
    //     'Go to game start';
    //     return (
    //         <li key={move}>
    //             <button onClick={dispatch({type : JUMP_TO, step:move})}>{desc}</button>
    //         </li>
    //     );
    // });

    const result = () => {
        let status;
        if (state.winner){
            status = `winner is ${state.winner}`;
        } else{
            status = `next is ${state.xIsNext}`;
        }
        return(
            <div>{status}</div>
        );
    }

    
    return(
        <div className="game">
            <TableContext.Provider value={value}>
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    {result}
                    {/* <ol>{moves}</ol> */}
                </div>
            </TableContext.Provider>
        </div>
    );
}

export default Tictactoe;