import React from "react";
import "./css/SearchType.css"

function dropDownEventLoader(e) {
    const p = e.currentTarget.parentNode;
    if (p.classList.contains('visible'))
        p.classList.remove('visible');
    else
        p.classList.add('visible');      
};

const SearchType = props => {
    return(
        <div id="dropdown-type">
            <span className="anchor" onClick={dropDownEventLoader} >{props.searchByState}</span>
            <ul className="items">
                <li><label id="type-email" onClick={props.searchByUpdater}>Student email</label></li>
                <li><label id="type-email" onClick={props.searchByUpdater}>Student name</label></li>
            </ul>
        </div>
    );
}

export default SearchType;