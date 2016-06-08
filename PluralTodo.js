import React, { Component } from 'react';
import {
  Navigator,
} from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import store from './todoStore';

class PluralTodo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.getState();

    store.subscribe(() => {
      this.setState(store.getState()); // eslint-disable-line react/no-set-state
    });
  }

  onAddStarted() {
    this.nav.push({
      name: 'taskform',
    });
  }

  onCancel() {
    console.log('cancelled');
    this.nav.pop();
  }

  onAdd(task) {
    console.log(' a task was added: ', task);
    store.dispatch({
      type: 'ADD_TODO',
      task,
    });
    this.nav.pop();
  }

  onDone(todo) {
    console.log('task was completed: ', todo.task);
    store.dispatch({
      type: 'DONE_TODO',
      todo,
    });
  }

  onToggle() {
    store.dispatch({
      type: 'TOGGLE_STATE',
    });
  }

  renderScene(route, nav) {
    switch (route.name) {
    case 'taskform':
      return (
        <TaskForm
          onAdd={this.onAdd.bind(this)}
          onCancel={this.onCancel.bind(this)}
        />
      );
    default:
      return (
        <TaskList
          filter={this.state.filter}
          onAddStarted={this.onAddStarted.bind(this)}
          onDone={this.onDone.bind(this)}
          onToggle={this.onToggle.bind(this)}
          todos={this.state.todos}
        />
      );
    }
  }
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      <Navigator
        configureScene={this.configureScene}
        initialRoute={{ name: 'tasklist', index: 0 }}
        ref={(nav) => {
          this.nav = nav;
        }}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

export default PluralTodo;
