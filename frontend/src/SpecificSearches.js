import React from "react";
import "./css/SpecificSearches.css";

function getAllCategories(){
    const categories = {
        all: document.getElementById('check-all').checked,
        specific: {
            room_name: document.getElementById('check-room-name').checked,
            room_start: document.getElementById('check-room-start').checked,
            room_finish: document.getElementById('check-room-end').checked,
            name: document.getElementById('check-student-name').checked,
            email: document.getElementById('check-student-mail').checked,
            time: document.getElementById('check-student-time').checked,
            overall_time: document.getElementById('check-student-overall').checked,
            platform: document.getElementById('check-student-platform').checked
        }
    };

    return categories;
}

function getCategoriesString(categoriesString, categories){
    for (const [category, checked] of Object.entries(categories)){
        if (checked){
            if (categoriesString == '')
                categoriesString = "categories=" + category;
            else 
                categoriesString += ',' + category;
        }
    }

    categoriesString += '&'

    return categoriesString;
}

function getSearchType(searchBy){
    if (searchBy == "Search by: Student name")
        return "type=name&";
    else if (searchBy == "Search by: Student email")
        return "type=email&";
    else
        return "bad type";
}

const SpecificSearches = props => {
    async function searchSpecific(e){
        const categories = getAllCategories();
        let categoriesString = '';
        if (categories.all == false) {
            categoriesString = getCategoriesString(categoriesString, categories.specific);
        }

        const inputType = getSearchType(props.searchByState);
        if (inputType == "bad type"){
            document.getElementById('specific-input-id').placeholder="Choose a search type";
            return;
        }

        const inputText = "input=" + document.getElementById('specific-input-id').value;

        let dynamic = '';
        if (document.getElementById('dynamic-checkbox').checked)
            dynamic = '&dynamic';

        await fetch('http://35.169.96.11:5000/specific?' + categoriesString + inputType + inputText + dynamic)
                .then(res => res.json())
                .then(newData => {
                    props.changeState(newData.results, categories.all, categories.specific);
        });
        
    }

    return (
        <div>
            <input type="text" name="search-bar" id="specific-input-id" placeholder="Search by specific category" className="specific-bar" />
            <button type="submit" className="button" onClick={searchSpecific}><i className="fa fa-search"></i></button>
        </div>
    );
}

export default SpecificSearches;