import {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList"
import {v1} from "uuid"
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "complited" | "active"

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {

  function addTask(title: string, todolistId: string){
    let task = {
      id: v1(),
      title: title,
      isDone: false,
    }
    let tasks = tasksObj[todolistId]
    let newTasks = [...tasks, task]
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }

  function removeTask(id: string, todolistId: string){
    let tasks = tasksObj[todolistId]
    let filterTasks = tasks.filter(task => task.id !== id)
    tasksObj[todolistId] = filterTasks
    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string){
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task){
      task.isDone = isDone
      setTasks({...tasksObj})
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string){
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task){
      task.title = newTitle
      setTasks({...tasksObj})
    }
  }

  function changeTodoListTitle(id: string, newTitle: string){
    const todoList = todoLists.find(tl => tl.id === id)
    if (todoList){
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }

  function cahangeFilter(value: FilterValuesType, todolistId: string){
    let todoList = todoLists.find(tl => tl.id === todolistId)
    if (todoList){
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to bay", filter: "all"},
  ])

  let removeTodoList = (todolistId: string) => {
    let filteredTodoList = todoLists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodoList)
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "CSS", isDone: false},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
    ],

    [todolistId2]: [
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Milk", isDone: true},
    ]
  })

  function appTodoList(title: string){
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    }
    setTodoLists([todoList, ...todoLists])
    setTasks({...tasksObj, [todoList.id]: []})
  }

  return (
    <div className="App">
      <AddItemForm addItem={appTodoList}/>
      {todoLists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id]

        if (tl.filter === "complited"){
          tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true)
        }
      
        if (tl.filter === "active"){
          tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false)
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
            changeTaskTitle={changeTaskTitle}
            removeTodoList={removeTodoList}
            changeTodoListTitle={changeTodoListTitle}
          />
        )
      })}
    </div>
  );
}


export default App;
