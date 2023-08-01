import React from "react";
import Td from './Td';

const Tr = (props) => {
    return(
        <tr>
            {Array(props.rowData.length).fill().map((td, i)=><Td rowIndex={props.rowIndex} cellIndex={i} dispatch={props.dispatch} cellData={props.rowdata[i]}/>)}
        </tr>
    );
}

export default Tr;