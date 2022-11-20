import { Component } from "react";
import "./css/UpdateAndDelete.css";

const sleep = ms => new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
})

class Update extends Component {
    state = { icon: "Click to update database" };
    
    constructor(){
        super();
    }

    updateDatabase = async e => {
        this.setState({ icon: "waiting" });
        
        const requestOptions = { method: 'POST' };
        await fetch('http://35.169.96.11:5000/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ icon: data.results }));
        
        await sleep(1400);

        this.setState({ icon: "Click to update database" });
    }
    
    render(){
        return(
            <button className="post-button" onClick={this.updateDatabase}>{this.state.icon}</button>
        );
    }
}

export default Update;