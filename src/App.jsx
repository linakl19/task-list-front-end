import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const toggleTaskComplete = (taskId) => {
    setTaskData(tasks => {
      return tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isComplete: !task.isComplete};
        } else {
          return task;
        };
      });
    });
  };

  const removeTask = (taskId) => {
    setTaskData(tasks => {
      return tasks.filter(task => task.id !== taskId);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData} onTaskClick={toggleTaskComplete} onTaskDelete={removeTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
