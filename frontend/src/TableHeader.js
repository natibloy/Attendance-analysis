import React from "react";
import "./css/TableCell.css";

function merge(left, right) {
    let sortedArr = [] // the sorted items will go here
    while (left.length && right.length) {
      // Insert the smallest item into sortedArr
      if (left[0][2] < right[0][2]) {
        sortedArr.push(left.shift())
      } else {
        sortedArr.push(right.shift())
      }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right]
}

function mergeSort(arr) {
    // Base case
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    // Recursive calls
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

class TableHeader extends React.Component {
    state = { sortByLower: false }

    constructor(props){
        super(props);
    }
    
    sortAverage = (e) => {
        let tempArray = mergeSort(this.props.data);
        if (this.state.sortByLower === true){
            this.props.changeSortedState(tempArray);
            this.setState({ sortByLower: false });
        } else {
            this.props.changeSortedState(tempArray.reverse());
            this.setState({ sortByLower: true });
        }
    }

    render(){
        return this.props.categories.map(header => {
            if (header === "Student mail"){
                return(
                    <th className="table-cell table-header mail-cell">{header}</th>
                );
            } else if (header === "Average") {
                return <th className="table-cell table-header reg-cell" onClick={this.sortAverage}>{header}</th>;
            } else {
                return(
                    <th className="table-cell table-header reg-cell">{header}</th>
                );
            }
        });
    }

    
}

export default TableHeader;