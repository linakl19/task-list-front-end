import axios from 'axios';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';
import NewTaskForm from './components/NewTaskForm.jsx';

const kBaseUrl = 'http://127.0.0.1:5000';

const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then(response => {
      return response.data.map(convertFromApi);
    })
    .catch(error => {
      console.log(error);
    });
};

const toggleIsCompleteApi = (taskId, desiredStatus) => {
  return axios.patch(`${kBaseUrl}/tasks/${taskId}/mark_${desiredStatus}`)
    .catch(error => {
      console.log(error);
    });
};


const deleteTask = (taskId => {
  return axios.delete(`${kBaseUrl}/tasks/${taskId}`)
    .catch(error => {
      console.log(error);
    });
});

const addTaskApi = (newTaskData) => {
  return axios.post(`${kBaseUrl}/tasks`, newTaskData)
    .then(response => {
      return convertFromApi(response.data.task);
    })
    .catch(error => {
      console.log(error);
    });
};

const convertFromApi = (apiTask => {
  const { id, goal_id, title, description, is_complete } = apiTask;
  const newTask = { id, goalId: goal_id, title, description, isComplete: is_complete };

  return newTask;
});

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi()
      .then(response => setTaskData(response));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleTaskComplete = (taskId) => {
    const taskToUpdate = taskData.find(task => task.id === taskId);

    if (!taskToUpdate) return;

    const newStatus = taskToUpdate.isComplete ? 'incomplete' : 'complete';
    const updatedIsComplete = !taskToUpdate.isComplete;

    setTaskData(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, isComplete: updatedIsComplete } : task
      )
    );

    // Call the API after state update
    toggleIsCompleteApi(taskId, newStatus);
  };

  const removeTask = (taskId) => {
    return deleteTask(taskId)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => {
          return task.id !== taskId;
        }));
      });
  };

  const addTask = (newTaskData) => {
    addTaskApi(newTaskData)
      .then(newTask => {
        setTaskData(prevTasks => [...prevTasks, newTask]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList tasks={taskData} onTaskClick={toggleTaskComplete} onTaskDelete={removeTask} />
          <NewTaskForm onAddTask={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
