import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './TaskList';
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: {
                title: '',
                description: '',
                active: false
            },
            tasks: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:9000/api/tasks')
            .then((res) => {
                this.setState(this.tasks = res.data);
                console.log(this.tasks);
            });
    }

    onChangeTitle = (event) => {
        const titleValue = event.target.value;
        this.setState(prevState => ({
            task: {...prevState.task, title: titleValue}
        }));
    };

    onChangeDescription = (event) => {
        const descriptionValue = event.target.value;
        this.setState(prevState => ({
            task: {...prevState.task, description: descriptionValue}
        }));
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.task.title !== '' && this.state.task.description !== '') {
            axios.post('http://localhost:9000/api/tasks', {
                title: this.state.task.title,
                description: this.state.task.description
            }).then();
            this.setState({
                task: {
                    title: '',
                    description: '',
                    active: false
                }
            });
        }
    };

    render() {
        return (
            <form className="Form">
                <div>
                    <TextField value={this.state.task.title}
                               onChange={this.onChangeTitle}
                               label="Título"
                               style={{width: 200, marginRight: 10}}/>
                    <TextField value={this.state.task.description}
                               onChange={this.onChangeDescription}
                               label="Descrição"
                               style={{width: 300}}/>
                    <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
                </div>
                <div className="List">
                    <TaskList tasks={this.state.tasks}/>
                </div>
            </form>
        )
    }
}