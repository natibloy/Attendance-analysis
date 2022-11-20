import React from "react";
import "./css/Searches.css";

const Average = props => {
    async function getAverage(e) {
        await fetch('http://localhost:5000/average')
                .then(res => res.json())
                .then(newData => {
                    props.changeAvgState(newData.results);
        });
    }

    return(
        <div>
            <button type="submit" className="search-avg-button" onClick={getAverage}>Search Avg % <i className="fa fa-search"></i></button>
        </div>
    );
}

export default Average;