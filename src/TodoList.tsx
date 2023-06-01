import {ChangeEvent, KeyboardEvent, useState} from "react"
import { FilterValuesType } from "./App"
import { AddItemForm } from "./AddItemForm"


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  cahangeFilter: (value: FilterValuesType, todolistId: string) => void
  filter: FilterValuesType
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  removeTodoList: (todolistId: string) => void
 }

export function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.cahangeFilter("all", props.id)
  const onActiveClickHandler = () => props.cahangeFilter("active", props.id)
  const onCompletedClickHandler = () => props.cahangeFilter("complited", props.id)

  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  
   return (
      <div>
        <h3>{props.title} <button onClick={removeTodoList}>X</button></h3>
        <AddItemForm addItem={addTask}/>
        <ul>
          {props.tasks.map((task) => {
            const onRemoveHandler = () => {props.removeTask(task.id, props.id)}
            const onChangeHandler = (
              e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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

 