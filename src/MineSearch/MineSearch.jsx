import React, {useReducer, createContext, useMemo, useCallback} from "react";
import './minesearch.css';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE:-7,
    NORMAL:-1,
    QUESTION:-2,
    FLAG:-3,
    QUESTION_MINE:-4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED:0,
};

export const TableContext = createContext({
    tableData : [],
    halted:true,
    dispatch: ()=>{},
});

const initialState = {
    tableData:[],
    timer:0,
    result:'',
    halted: true,
};

const plantMine = (row, col, mine) => {
    console.log(row, col, mine)
    const candidate = Array(row * col).fill().map((arr, i)=>{
        return i;
    })
    const shuffle = [];
    while(candidate.length > row * col - mine){
        const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < col; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / col);
        const hor = shuffle[k] % col;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
    switch(action.type){
        case START_GAME:
            return{
                ...state,
                tableData:plantMine(action.row, action.col, action.mine),
                halted: false,
            }
        case OPEN_CELL:
            const tableData = [...state.tableData];
            tableData.forEach((row, i)=>{
                tableData[i] = [...row];
            });
            const checked = [];
            const checkAround = (row, col) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][col])){
                    return;
                }
                if (row < 0 || row > tableData.length || col < 0 || col > tableData[0].length){
                    return;
                }
                if (checked.includes(row + '.' + col)){
                    return;
                } else {
                    checked.push(row + '.' + col);
                }
                let around = [tableData[row][col - 1], tableData[row][col + 1]];
                if (tableData[row - 1]){
                    around = around.concat(
                        tableData[row - 1][col - 1],
                        tableData[row - 1][col],
                        tableData[row - 1][col + 1],
                    )
                }
                if (tableData[row + 1]){
                    around = around.concat(
                        tableData[row + 1][col - 1],
                        tableData[row + 1][col],
                        tableData[row + 1][col + 1],
                    )
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                if (count === 0){
                    const near = [];
                    if (row - 1 > -1){
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);
                    if (row + 1 < tableData.length){
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col + 1]);
                    }   
                    near.forEach((n)=>{
                        if (tableData[n[0]][n[1]] !== CODE.OPENED){
                            checkAround(near[0], near[1]);
                        }
                    })
                }
                tableData[row][col] = count;
            };
            checkAround(action.row, action.col);
            return{
                ...state,
                tableData:tableData,
            };
        case CLICK_MINE:
            const tableData_1 = [...state.tableData];
            tableData_1[action.row] = [...state.tableData[action.row]];
            tableData_1[action.row][action.col] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData:tableData_1,
                halted: true,
            };
        case FLAG_CELL:
            const tableData_2 = [...state.tableData];
            tableData_2[action.row] = [...state.tableData[action.row]];
            if (tableData_2[action.row][action.col] === CODE.NORMAL){
                tableData_2[action.row][action.col] = CODE.FLAG;
            } else if (tableData_2[action.row][action.col] === CODE.MINE){
                tableData_2[action.row][action.col] = CODE.FLAG_MINE;
            }
            return{
                ...state,
                tableData:tableData_2,
            };
        case QUESTION_CELL:
            const tableData_3 = [...state.tableData];
            tableData_3[action.row] = [...state.tableData[action.row]];
            if (tableData_3[action.row][action.col] === CODE.FLAG){
                tableData_3[action.row][action.col] = CODE.QUESTION;
            } else if (tableData_3[action.row][action.col] === CODE.FLAG_MINE){
                tableData_3[action.row][action.col] = CODE.QUESTION_MINE;
            }
            return{
                ...state,
                tableData:tableData_3,
            };
        case NORMALIZE_CELL:
            const tableData_4 = [...state.tableData];
            tableData_4[action.row] = [...state.tableData[action.row]];
            if (tableData_4[action.row][action.col] === CODE.QUESTION){
                tableData_4[action.row][action.col] = CODE.NORMAL;
            } else if (tableData_4[action.row][action.col] === CODE.QUESTION_MINE){
                tableData_4[action.row][action.col] = CODE.MINE;
            }
            return{
                ...state,
                tableData:tableData_4,
            };
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(()=>({tableData:state.tableData, halted:state.halted, dispatch}), [state.tableData, state.halted]);
    return(
        <div>
            <TableContext.Provider value={value}>
                <Form />
                <div>{state.timer}</div>
                <Table />
                <div>{state.result}</div>
            </TableContext.Provider>
        </div>
    );
};

export default MineSearch;