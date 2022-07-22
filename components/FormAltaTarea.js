import React,{useState} from 'react'


const FormAltaTarea = ({funcionAgregarTarea}) => {

    const [tareaInput, setTareaInput] = useState('')

    const cambio = (e) => {
        setTareaInput(e.currentTarget.value)
    }

    const alEnviar = (e) => {
        console.log("Aprete el boton enviar")
        e.preventDefault();
        if (tareaInput.length > 3) {
            funcionAgregarTarea(tareaInput);
            setTareaInput("");
        }
    }


    return (
        <div>
            <form onSubmit={alEnviar}>
                <input value={tareaInput} type="text" onChange={cambio} placeholder="Ingrese una tarea"/>
                <button>Agregar Tarea</button>
            </form>
        </div>
    )
}

export default FormAltaTarea