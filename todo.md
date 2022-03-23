/*
    Realizar una APIRest que permita ingresar registros de usuarios y ejercicios realizados por ellos, ademas de poder realizar consultas a travez de cieros endpoints.
    1) POST a /api/users con los datos del formulario con la siguiente estructura:{username:"name_user", _id:"Id de Mongo generada AUTO"}. La respuesta de generar esta request es la un JSON con la misma estructura: {username:"name_user", _id:"Id de Mongo generada AUTO"}.
    2) GET a api/users para obtener una lista con todo los usuarios: Debe devolver una array de objetos con la estructura {username:"name_user", _id:"Id de Mongo generada AUTO", __v:0}
    3) POST a api/users/:id/exercises con los datos de formulario {description, duration y opcionalmente date}: si no proporicona ninguna fecha asignarle la fecha actual por defecto. La respuesta del POST sera el objeto usuario con el JOIN de los campos ejercicios
    4) GET a api/users/:id/logs devulve {"_id":"idUsuario","username":"german","count":cantidadDeRegistros,"log":[{descr: string, duration: number, date: string dateString() API DATE},{ejs2},etc]}. 
    Esta peticion puede recibir parametros: from, to, limit

*/