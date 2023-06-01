import React, { ChangeEvent } from 'react'

type EditableSpanProps = {
    title: string
    onChange: (newValue: string) => void
  }

export function EditableSpan(props: EditableSpanProps) {
    let [editeMode, setEditeMode] = React.useState(false)
    let [title, setTitle] = React.useState("")
    
    const activateEditMode = () => {
        setEditeMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    
    return (
        editeMode 
        ? 
        <input 
           value={title} 
           onBlur={activateViewMode} 
           onChange={onChangeTitleHandler}
           autoFocus
        /> 
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    ) 
}
  
  
   
