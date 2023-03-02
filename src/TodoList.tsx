

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
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
            <li>
              <input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
            </li>
          ))}      
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    );
  }