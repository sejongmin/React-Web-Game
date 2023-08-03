import React from "react";
import Tr from './Tr';

const Table = (props) => {
    return(
        <table>
            {Array(props.tableData.length).fill().map((tr, i) => (<Tr key={i} rowIndex={i} rowData={props.tableData[i]} dispatch={props.dispatch}/>))}
        </table>
    );
}

export default Table;