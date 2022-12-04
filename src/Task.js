import React, {Component} from "react";
import "../public/Task.css"

class Task extends Component {
    constructor(props){
        super(props)
        this.state = {
            isDone: this.props.task.isDone
        }

        // console.log(this.props.task)
    }
    render(){
        const {task} = this.props;
        return (
            <div>
                <span className="task">{task.label}</span>
                <input 
                    type="checkbox" 
                    checked={this.state.isDone}
                    onChange={
                        event => {
                            this.setState({
                                isDone: event.target.checked
                            })
                            console.log("ppp")
                        }
                    }
                />
            </div>
        )
    }
}   
export default Task;