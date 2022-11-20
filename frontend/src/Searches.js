import React from "react";
import "./css/Searches.css";

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
                categoriesString = "?categories=" + category;
            else 
                categoriesString += ',' + category;
        }
    }

    return categoriesString;
}

const Searches = props => {
    async function search(e){
        const categories = getAllCategories();
        let categoriesString = '';
        if (categories.all == false) {
            categoriesString = getCategoriesString(categoriesString, categories.specific);
        }
            
        await fetch('http://35.169.96.11:5000/' + categoriesString)
                .then(res => res.json())
                .then(newData => {
                    props.changeState(newData.results, categories.all, categories.specific);
        });
        
    }

    return(
        <div>
            <button type="submit" className="search-button" onClick={search}>Search <i className="fa fa-search"></i></button>
        </div>
    );
    
}

export default Searches;