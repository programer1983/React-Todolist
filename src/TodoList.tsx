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
 }


export function TodoList(props: PropsType) {
   
   return (
      <div>
        <h3>{props.title}</h3>
        <div>
          <input />
          <button>*</button>
        </div>
        <ul>
          {props.tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
              <button onClick={() => {props.removeTask(task.id)}}>x</button>
            </li>
          ))}      
        </ul>
        <div>
          <button onClick={() => {props.cahangeFilter("all")}}>All</button>
          <button onClick={() => {props.cahangeFilter("active")}}>Active</button>
          <button onClick={() => {props.cahangeFilter("complited")}}>Completed</button>
        </div>
      </div>
    );
  }