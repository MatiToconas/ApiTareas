import Tarea from  './Tarea'
import React,{ useState, useEffect } from 'react'
import FormAltaTarea from './FormAltaTarea'

const Tareas = () => {

    const [tareas, setTareas] = useState([])
    const [hayCambio, setHayCambio] = useState(false)


    useEffect( () => {
       fetch('http://localhost:4000/tareas')
       .then( res => res.json() )
       .then( datos => setTareas(datos) )
    } , [hayCambio])


    const borrarTarea = (index) => {
        fetch(`http://localhost:4000/tareas/${index}`, {method: 'DELETE'} )
        .then( res => res.json() )
        .then( datos => setHayCambio(!hayCambio) )
      };


    const marcarTarea = (index) => {
        const opciones = {
            method: 'PUT'
        }
        fetch(`http://localhost:4000/tareas/${index}/cambiarestado`, opciones )
        .then( res => res.json() )
        .then( datos => setHayCambio(!hayCambio) )
      };


    const agregarTarea = (tarea) => {
        const opciones = {
            method: 'POST',
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify( { nombre: tarea } )
        }
        fetch('http://localhost:4000/tareas', opciones )
        .then( res => res.json() )
        .then( datos => setHayCambio(!hayCambio) )
    }


    return (
        <div > 
            <div className="todo-list">
                { tareas.map(
                    (el, idx) => { return (<Tarea key={idx} indice={el.id} tarea={el} marcar={marcarTarea} borrar={borrarTarea} />)  }
                ) }
            </div>
            <br />
            <FormAltaTarea  funcionAgregarTarea={agregarTarea} />
        </div>
    )
}

export default Tareas
