import React from "react";
import Td from './Td';

const Tr = (props) => {
    return(
        <tr>
            {Array(props.rowData.length).fill().map((td, i) => (<Td key={[props.rowIndex, i]} rowIndex={props.rowIndex} cellIndex={i} cellData={props.rowData[i]} dispatch={props.dispatch} />))}
        </tr>
    );
}

export default Tr;