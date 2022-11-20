import { Component } from "react";
import './css/App.css';
import Menu from "./Menu";
import Table from "./Table";

class App extends Component {
    state = { data: [], categories: {
        roomName: true,
        roomStart: true,
        roomFinish: true,
        studentName: true,
        studentMail: true,
        studentTimeIntervals: true,
        studentOverallTime: true,
        studentPlatform: true,
        average: false
    }};
    
    constructor(){
        super();
    }

    changeState = (newDataValue, allCategories, newCategoriesValue) => {
        this.setState({ data: newDataValue, categories: {
            roomName: allCategories || newCategoriesValue.room_name,
            roomStart: allCategories || newCategoriesValue.room_start,
            roomFinish: allCategories || newCategoriesValue.room_finish,
            studentName: allCategories || newCategoriesValue.name,
            studentMail: allCategories || newCategoriesValue.email,
            studentTimeIntervals: allCategories || newCategoriesValue.time,
            studentOverallTime: allCategories || newCategoriesValue.overall_time,
            studentPlatform: allCategories || newCategoriesValue.platform,
            average: false
        }});
    }

    changeAvgState = (newDataValue) => {
        this.setState({ data: newDataValue, categories: {
            roomName: false,
            roomStart: false,
            roomFinish: false,
            studentName: true,
            studentMail: true,
            studentTimeIntervals: false,
            studentOverallTime: false,
            studentPlatform: false,
            average: true
        }});
    }

    async componentDidMount(){
        await fetch('http://localhost:5000/')
            .then(res => res.json())
            .then(newData => {;
                this.setState({ data: newData.results });
        });
    }
    
    render() {
        return(
            <div className="background">
                <div className="menu">
                    <Menu changeState={this.changeState} changeAvgState={this.changeAvgState}/>
                </div>
                <div className="table">
                    <Table categories={this.state.categories} data={this.state.data} />
                </div>
            </div>
        );
    }
    
}

export default App;