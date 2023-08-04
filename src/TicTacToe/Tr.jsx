import React, {memo} from "react";
import Td from './Td';

const Tr = memo(({rowIndex, rowData, dispatch}) => {
    return(
        <tr>
            {Array(3).fill().map((td, i) => (<Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}/>))}
        </tr>
    );
});

export default Tr;