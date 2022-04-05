import React, { useEffect, useState } from "react";

const initialFormValues = {
    title:'',
    description:''
}

const TodoForm = ({todoAdd,todoEdit,todoUpdate,setTodoEdit}) => {

    const [formValues, setFormValues] = useState(initialFormValues);
    const {title,description} = formValues;
    const [error,setError] = useState(null)
    const [successMessage,setSuccessMessage] = useState(null)

    useEffect(() => {
        if(todoEdit){
            setFormValues(todoEdit)
        }else{
            setFormValues(initialFormValues)
        }
    },[todoEdit])

    const handleInputChange = (e) => {

        const changeFormValues = {
            ...formValues,
            [e.target.name] : e.target.value
        }

        setFormValues(changeFormValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(title.trim() === ''){
            setError('Debes indicar un titulo')
            return;
        }

        if(description.trim() === ''){
            setError('Debes indicar una descripcion')
            return;
        }

        if(todoEdit){
            //actualizando
            todoUpdate(formValues)
            setSuccessMessage('Actualizado con Exito')
        }else{
            todoAdd(formValues)
            setSuccessMessage('Agregado con Exito')
            setFormValues(initialFormValues)
        }
        
        setError(null)

        setTimeout(() => {
            setSuccessMessage(null)
        },2000);

    }

    return(
        <div>
            <h1>{todoEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h1>
            {
                todoEdit &&
                <button 
                    onClick={() => setTodoEdit(null)}
                    className="btm btn-warning mb-2"
                 >  Cancelar Editar
                 </button>
               
          
                
            }
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder="titulo" 
                    className="form-control"
                    onChange={handleInputChange}
                    value={title}
                    name='title'
                />
                <textarea 
                    placeholder="descripcion" 
                    className="form-control mt-2"
                    onChange={handleInputChange}
                    value={description}
                    name='description'
                ></textarea>
                <button 
                    className="btn btn-primary mt-2"
                >
                    {todoEdit ? 'Actualizar Tarea': 'Agregar Tarea'}
                </button>
            </form>
            {
                error
                ? (
                <div className="alert alert-danger mt-2">
                    {error}
                </div>
                ): (
                    null
                )
            }
            {
                successMessage
                ?(
                    <div className="alert alert-success mt-2">
                        {successMessage}
                    </div>
                ):(
                    null
                )
            }
        </div>
    )
}

export default TodoForm;