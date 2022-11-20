import React from "react";
import "./css/TableCell.css";

const TableHeader = props => {
    return props.categories.map(header => {
        if (header === "Student mail"){
            return(
                <th className="table-cell table-header mail-cell">{header}</th>
            );
        } else {
            return(
                <th className="table-cell table-header reg-cell">{header}</th>
            );
        }
    })
}

export default TableHeader;