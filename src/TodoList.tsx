import {ChangeEvent, KeyboardEvent, useState} from "react"
import { FilterValuesType } from "./App"


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  cahangeFilter: (value: FilterValuesType, todolistId: string) => void
  filter: FilterValuesType
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
 }

export function TodoList(props: PropsType) {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onKeyPressHundler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13){
      addTask()
    }
  }

  const addTask = () => {
    if (title.trim() !== ""){
        props.addTask(title.trim()); 
        setTitle("")
    }else{
      setError("Title is required")
    } 
  }

  const onAllClickHandler = () => props.cahangeFilter("all", props.id)
  const onActiveClickHandler = () => props.cahangeFilter("active", props.id)
  const onCompletedClickHandler = () => props.cahangeFilter("complited", props.id)
  
   return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input 
             value={title}
             onChange={onNewTitleChangeHandler}
             onKeyPress={onKeyPressHundler}
             className={error ? "error" : ""}
          />
          <button onClick={addTask}>*</button>
          {error &&<div className="error-message">{error}</div>}
        </div>
        <ul>
          {props.tasks.map((task) => {
            const onRemoveHandler = () => {props.removeTask(task.id)}
            const onChangeHandler = (
              e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
              }
            return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
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
          <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
          <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
          <button className={props.filter === "complited" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
      </div>
    );
  }