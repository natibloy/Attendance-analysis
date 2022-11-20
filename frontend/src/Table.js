import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./css/Table.css";

function checkCategories(categoriesChecker){
    let categories = [];
    
    if (categoriesChecker.roomName)
        categories.push("Room name");
    if (categoriesChecker.roomStart)
        categories.push("Room start time");
    if (categoriesChecker.roomFinish)
        categories.push("Room end time");
    if (categoriesChecker.studentName)
        categories.push("Student name");
    if (categoriesChecker.studentMail)
        categories.push("Student mail");
    if (categoriesChecker.studentTimeIntervals)
        categories.push("Student attendance time");
    if (categoriesChecker.studentOverallTime)
        categories.push("Student overall attendance");
    if (categoriesChecker.studentPlatform)
        categories.push("Student platform");
    if (categoriesChecker.average)
        categories.push("Average");
    
    return categories;
}

function setTableWidth(categories, header){
    let width = 16 + categories.length * 3;
    categories.map(category => {
        if (category == "Student mail")
            width += 400;
        else
            width += 160;
    });

    if (header) return {
        width: width.toString() + "px"
    };
    return {
        width: (width+2).toString() + "px"
    };
}

const Table = props => {
    if (typeof props.data === 'string') {
        console.log(props.data);
        return;
    }
    if (props.data.length === 0) return;

    const categories = checkCategories(props.categories);
    if (categories.length === 0) return;

    //setTableWidth(categories);

    return (
        <div id="table">
            <table id="d-table" style={setTableWidth(categories, false)}>
                <thead id="table-header-row" style={setTableWidth(categories, true)}>
                    <tr >
                        <TableHeader categories={categories} />
                    </tr>
                </thead>
                <tbody id="table-body" style={setTableWidth(categories, false)}>
                    <TableBody categories={categories} data={props.data} />
                </tbody>
            </table>
        </div>
        
    );
}

export default Table;