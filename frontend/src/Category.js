import React from "react";
import "./css/Category.css"



function getCheckBoxes() {
    const checkBoxes = {
        roomName: document.getElementById('check-room-name'),
        roomStart: document.getElementById('check-room-start'),
        roomFinish: document.getElementById('check-room-end'),
        studentName: document.getElementById('check-student-name'),
        studentMail: document.getElementById('check-student-mail'),
        studentTime: document.getElementById('check-student-time'),
        studentOverall: document.getElementById('check-student-overall'),
        studentPlatform: document.getElementById('check-student-platform')
    };

    return checkBoxes;
}

function allCategoriesClick(e) {
    //const allCategories = document.getElementById('check-all');
    const allCategories = e.currentTarget;
    const checkBoxes = getCheckBoxes();

    if (allCategories.checked)
        for (const [key, element] of Object.entries(checkBoxes))
            element.checked = false;
    else if (!allCategories.checked)
        for (const [key, element] of Object.entries(checkBoxes))
            element.checked = true;
}

function specificCategoryClick(e) {
    const currentCategory = e.currentTarget;
    const checkBoxes = getCheckBoxes();
    const allCategories = document.getElementById('check-all');

    if (currentCategory.checked)
        allCategories.checked = false;
    else if (!currentCategory.checked){
        let flag = false;
        for (const [key, element] of Object.entries(checkBoxes))
            if (element.checked)
                 flag = true;
        if (!flag)
            allCategories.checked = true;
    }
}

function dropDownEventLoader(e) {
    const p = e.currentTarget.parentNode;
    if (p.classList.contains('visible'))
        p.classList.remove('visible');
    else
        p.classList.add('visible');      
};

const Category = () => {
    return (
        <div id="ddcbl" className="dropdown-check-list">
            <span className="anchor" onClick={dropDownEventLoader}>Select categories:</span>
            <ul className="items">
                <li><input type="checkbox" id="check-all" onClick={allCategoriesClick} defaultChecked/>All</li>
                <li><input type="checkbox" id="check-room-name" onClick={specificCategoryClick} />Room name</li>
                <li><input type="checkbox" id="check-room-start" onClick={specificCategoryClick} />Room start time</li>
                <li><input type="checkbox" id="check-room-end" onClick={specificCategoryClick} />Room end time</li>
                <li><input type="checkbox" id="check-student-name" onClick={specificCategoryClick} />Student name</li>
                <li><input type="checkbox" id="check-student-mail" onClick={specificCategoryClick} />Student mail</li>
                <li><input type="checkbox" id="check-student-time" onClick={specificCategoryClick} />Student attendnace time stamps</li>
                <li><input type="checkbox" id="check-student-overall" onClick={specificCategoryClick} />Student overall attendance time</li>
                <li><input type="checkbox" id="check-student-platform" onClick={specificCategoryClick} />Student platform</li>
            </ul>
        </div>
    );
}

export default Category;