import React from "react";
import Tr from './Tr';

const Table = ({tableData, dispatch}) => {
    return(
        <table>
            <tbody>
                {Array(3).fill().map((tr, i) => (<Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch}/>))}
            </tbody>
        </table>
    );
}

export default Table;