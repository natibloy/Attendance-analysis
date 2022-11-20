import React from "react";
import TableRow from "./TableRow";

const TableBody = props => {
    return props.data.map(row => {
        return(
            <tr>
                <TableRow categories={props.categories} data={row} />
            </tr>
        );
    })
}

export default TableBody;
