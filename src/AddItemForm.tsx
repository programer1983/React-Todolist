 import {useState, ChangeEvent, KeyboardEvent,} from "react"
 
 type AddItemFormPropsType = {
    addItem: (title: string) => void
  }

  export function AddItemForm(props: AddItemFormPropsType){
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    }

    const addTask = () => {
      if (title.trim() !== ""){
          props.addItem(title.trim()); 
          setTitle("")
      }else{
        setError("Title is required")
      } 
    }

    const onKeyPressHundler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null)
      if (e.charCode === 13){
        addTask()
      }
    }
    
    return (
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
    )
  }