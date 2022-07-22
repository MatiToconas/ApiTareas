//importa el modulo express completo
const express = require('express')
const app = express()

//le decimos al programa que debe ejecutarse en formato json
app.use(express.json())

//definimos un puerto
const port = 5000


//generamos arrays 
const todos = [{idTutorial:1, nombreTutorial:'Ecuaciones',tipoTutorial:"Matemática",url:"https://www.youtube.com/watch?v=a9ZXgrl94aQ", activo:false},
                {idTutorial:2, nombreTutorial:'SQL',tipoTutorial:"Clase Grabada",url:"https://www.w3schools.com/tags/tag_select.asp", activo:false}
            ]

//le decimos desde que url va a ejecutarse nuestro programa. le colocamos el nombre y dos parametros req y res
app.get('/tutoriales', (req,res) => {
    console.log("Llego solicitud de tutoriales")
    res.status(200).json(todos)
    })

    //en la solicitud respondemos el id de la tarea. Devolvemos una unica tarea / objeto
    app.get('/tutoriales/:id', (req,res) => {
        //tenemos el id de tareas
        const idTarea = req.params.id

        //buscamos una tarea en un array con el metodo fine
        const tarea = todos.find(t => t.id == idTarea)
        // si existe la tarea devuelvo el codigo 200, sino no existe devuelvo el codigo 404. No se encontro el recurso
        if(undefined != tarea)
            res.status(200).json(tarea)
        else
            res.status(404).json({mensaje: `el tutorial ${idTarea} no fue encontrada`})        
        })

        //post genera un nuevo registro y tiene que saber que informacion esta enviando
        app.post('/tutoriales', (req, res)=> {
            const cuerpo = req.body
            const ids = todos.map(t => t.idTutorial)
            //agregar un objeto al final
            const max = ids.length > 0 ? Math.max( ...ids) + 1 : 1
            todos.push ( {"idTutorial": max, "nombreTutorial": cuerpo.nombreTutorial, "url": cuerpo.url , 
                        "activo":cuerpo.activo })
            //devuelvo el codigo mas el objeto recien creado con el id
            res.status(201).json(todos[todos.length - 1])
        })

        // Borrar una tarea en particular por su id
        app.delete('/tutoriales/:id', (req,res) => {
            //tenemos el id de tareas
            const idTarea = req.params.id
            //buscamos una tarea en un array con el metodo fine
            const tarea = todos.find(t => t.idTutorial == idTarea)
            if(undefined != tarea){
                //devuelve en que indice se encuentra la tarea que encontre
                const idx = todos.indexOf(tarea)
                //le decimos que apartir de ese indice de array borra ese elemento
                todos.splice(idx,1)
                res.status(200).json({mensaje: `El tutorial ${idTarea} fue eliminado`})
            }
            //si no encontramos la tarea que queremos borrar
            else 
            res.status(404).json({mensaje: `El tutorial ${idTarea} no fue encontrado`})

        })

        //modificar un elemento del array a partir del id
        app.put('/tutoriales/:id/activar', (req,res) => {
            //tenemos el id de tareas
            const idTarea = req.params.id
            //buscamos una tarea en un array con el metodo fine
            const tarea = todos.find(t => t.idTutorial == idTarea)
            if(undefined != tarea){
                //devuelve en que indice se encuentra la tarea que encontre
                const idx = todos.indexOf(tarea)
                //si encuentro la tarea
                tarea.activo = true
                //borra el elemento que quiero cambiar y completa en su lugar lo que quiero modificar
                todos.splice(idx,1,tarea)
                res.status(200).json({mensaje: `El tutorial ${idTarea} fue activado `, "tarea": tarea})
            }
            //si no encontramos la tarea que queremos borrar
            else 
            res.status(404).json({mensaje: `El tutorial ${idTarea} no fue encontrado`})

        })
//ponemos nuestra aplicacion a correr. por le decimos en que puerto debe escuchar y luego un mensaje
app.listen(port, () => {
    console.log(`Aplicación iniciada en el puerto: ${port}`)
})