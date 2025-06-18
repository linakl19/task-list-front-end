import axios from 'axios';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

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

const getSingleTaskApi = (taskId) => {
  return axios.get(`${kBaseUrl}/tasks/${taskId}`)
    .then(response => {
      return convertFromApi(response.data.task);
    })
    .catch(error => {
      console.log(error);
    });
};

const markTaskCompleteApi = (taskId) => {
  return axios.patch(`${kBaseUrl}/tasks/${taskId}/mark_complete`)
    .then(response => {
      return response.status;
    })
    .catch(error => {
      console.log(error);
    });
};

const markTaskIncompleteApi = (taskId) => {
  return axios.patch(`${kBaseUrl}/tasks/${taskId}/mark_incomplete`)
    .then(response => {
      return response.status;
    })
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

  const toggleTaskComplete = taskId => {
    return getSingleTaskApi(taskId)
      .then(singleTask => {
        const toggleCompletionStatus = singleTask.isComplete ? markTaskIncompleteApi : markTaskCompleteApi;

        return toggleCompletionStatus(taskId);
      })
      .then(() => {
        return getAllTasks();
      })
      .catch(error => {
        console.log('Failed to toggle completion:', error);
      });
  };

  const removeTask = (taskId) => {
    return deleteTask(taskId)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => {
          return task.id !== taskId;
        }));
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={taskData} onTaskClick={toggleTaskComplete} onTaskDelete={removeTask} />}</div>
      </main>
    </div>
  );
};

export default App;
