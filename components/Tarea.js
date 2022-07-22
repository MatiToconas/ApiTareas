
const Tarea = ( {indice, tarea, marcar, borrar} ) => {
    return (
        <div className="todo" style={{ textDecoration: tarea.cumplida ? "line-through" : "" }}>
            Id: {tarea.id} - {tarea.nombre}
            <div>
                <button onClick={() => marcar(indice)}>Marcar</button>
                <button onClick={() => borrar(indice)}>Borrar</button>
            </div>
        </div>
    )
}

export default Tarea