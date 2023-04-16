import {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList"
import {v1} from "uuid"

export type FilterValuesType = "all" | "complited" | "active"

function App() {
  const [tasks, setTasks] = useState([
    {id: v1(), title: "CSS", isDone: false},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
  ])

  type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
  }

  function addTask(title: string){
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    }
    setTasks([...tasks, newTask])
  }

  function removeTask(id: string){
    setTasks(tasks.filter(task => task.id !== id))
  }

  function changeStatus(taskId: string, isDone: boolean){
    let task = tasks.find(t => t.id === taskId)
    if (task){
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  function cahangeFilter(value: FilterValuesType, todolistId: string){
    let todoList = todoLists.find(tl => tl.id === todolistId)
    if (todoList){
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: v1(), title: "What to learn", filter: "active"},
    {id: v1(), title: "What to bay", filter: "complited"},
  ])

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let tasksForTodoList = tasks 

        if (tl.filter === "complited"){
          tasksForTodoList = tasks.filter(task => task.isDone === true)
        }
      
        if (tl.filter === "active"){
          tasksForTodoList = tasks.filter(task => task.isDone === false)
        }

        return (
        <TodoList
          key={tl.id}
          id={tl.id}
          title={tl.title} 
          tasks={tasksForTodoList} 
          removeTask={removeTask}
          cahangeFilter={cahangeFilter}
          filter={tl.filter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
        />
        )
      })}
    </div>
  );
}


export default App;
