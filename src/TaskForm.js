import React, {Component} from "react";

class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            label: "",
        }
    }

    render(){
        return (
            <div>
                <input
                    type="text"
                    placeholder="New task"
                    value={this.state.label}
                    onChange={
                        event => {
                            this.setState({label: event.target.value})
                        }
                    }
                />

                <button
                    onClick={
                        ()=>{
                            this.props.addTask(this.state.label)
                            this.setState({label: ""})
                        }
                    }
                >
                    Add
                </button>
            </div>
        )
    }
}

export default TaskForm