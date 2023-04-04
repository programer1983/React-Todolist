import {ChangeEvent, KeyboardEvent, useState} from "react"
import { FilterValuesType } from "./App"


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  cahangeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
 }



export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value)
  }

  const onKeyPressHundler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13){
      props.addTask(newTaskTitle); 
      setNewTaskTitle("")
    }
  }

  const addTask = () => {
    props.addTask(newTaskTitle); setNewTaskTitle("")
  }

  const onAllClickHandler = () => props.cahangeFilter("all")
  const onActiveClickHandler = () => props.cahangeFilter("active")
  const onCompletedClickHandler = () => props.cahangeFilter("complited")
  
   return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input 
             value={newTaskTitle}
             onChange={onNewTitleChangeHandler}
             onKeyPress={onKeyPressHundler}
          />
          <button 
             onClick={addTask}>
              *
          </button>
        </div>
        <ul>
          {props.tasks.map((task) => {
            const onRemoveHandler = () => {props.removeTask(task.id)}
            const onChangeHandler = (
              e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
              }
            return (
            <li key={task.id}>
              <input 
                 type="checkbox" 
                 checked={task.isDone}
                 onChange={onChangeHandler}
              />
                 <span>{task.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
            )
          })}      
        </ul>
        <div>
          <button onClick={onAllClickHandler}>All</button>
          <button onClick={onActiveClickHandler}>Active</button>
          <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
      </div>
    );
  }