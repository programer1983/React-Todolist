export function TodoList() {
 
    return (
      <div>
        <h3>What you learnin</h3>
        <div>
          <input />
          <button>*</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={true}/><span>CSS&HTML</span></li>
          <li><input type="checkbox" checked={true}/><span>JS</span></li>
          <li><input type="checkbox" checked={false}/><span>REACT</span></li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    );
  }