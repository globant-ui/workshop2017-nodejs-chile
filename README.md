### Workshop 2016 Node.js + Express API

#### Requerimientos previos

- Computadora con Linux o Windows
- Git (si estás en Windows usá la consola de Git bash)
- Node.js 6.0 o superior
- npm 3.0 o superior
- Postman (para probar los endpoints)

#### Instrucciones de uso

- 1 Instalar las dependencias

```
   npm install
```

- 2 Iniciar el server

```
    npm start
```

#### Descripción del proyecto
Durante el desarrollo de éste simple sistema de BackEnd vas a aprender los conceptos básicos sobre cómo funciona un API.

Intentaremos cubrir de forma sencilla los siguientes puntos:

- Patrón de arquitectura MVC
- Routing
- Procesamiento de request
- Conexiones con una base de datos
- Respuestas del servidor
- Registro de usuarios
- Login y protección de rutas

#### Esquema de carpetas

```
.
├── /api/                       # El codigo de fuente del API
│   ├── /controllers/           # Controladores de rutas
│   ├── /models/                # Modelos de datos
│   ├── /middlewares/           # Middlewares de express
│   └── /router.js              # Setup de rutas del API
├── /database/                  # El codigo de fuente de la base de datos
│   ├── /seeds/                 # Contenido de la base de datos sin serializar
│   ├── /Database.js            # Instancia y clase de la base de datos. Wrapper que permite usar promesas sobre los metodos de la libreria nedb.
│   └── /docTypes.js            # "Constantes" que definen los tipos de documentos almacenados en la base de datos
├── /node_modules/              # Dependencias instaladas por npm
├── /scripts/                   # Scripts expuestos por linea de comando
│   ├── /dbdrop.js              # Script para eliminar el contenido de la base de datos
│   └── /dbseed.js              # Script para dar de alta a la base de datos a partir de los seeds
├── index.js                    # Entry point de la aplicación de node
└── package.json                # Lista de dependencias y descripcion del proyecto de node
```

#### Base de datos

##### Descripcion y modo de uso
La DB utilizada en el proyecto es persistida en un archivo local en el disco ubicado en ``/database/worshop.db``. Esta construida 100% con Javascript y no tiene dependencias con ningun motor externo (como MySQL o MongoDB).

Para acceder a ella se utiliza la clase ``Database`` presente en el archivo ``/database/Database.js``.

Esta clase funciona como un wrapper de la libreria [nedb](https://github.com/louischatriot/nedb) y le suma la posibilidad de trabajar con promises para facilitar su uso.

Para utilizarla solo basta con requerir su instancia en el archivo que deseemos.

```javascript
    const dataBase = require('../../database/Database').instance;
```

Esta instancia nos brinda metodos para buscar, insertar, editar y eliminar documentos de la DB. Las queries son un subset de las que pueden encontrar en MongoDB.

```javascript

    /*
        Ejemplo: Buscar una banda por id
    */
    const dataBase = require('../../database/Database').instance;

    dataBase.findOne({_id: 2213, docType: 'BAND'})
        .then(document => {
            console.log('Banda:', documents);
        })
        .catch(error => {
            console.log('Ha ocurrido un error', error);
        });
```

Para una referencia completa del funcionamiento de la base de datos consulten la [documentacion oficial de nedb](https://github.com/louischatriot/nedb)

##### Postman

[Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?utm_source=chrome-app-launcher-info-dialog) es una herramienta que permite facilmente utilizar RESTful, sumamente util al momento de construir servicios.

Dentro de la carpeta `postman` se encuentran archivos de configuracion listos para importar y poder utilizar rapidamente en este proyecto.


##### Estructura de los documentos almacenados en la base de datos

**Bands**

```
    {
        "url": string - Url de la imagen de la banda
        "name": string - Nombre de la banda
        "genres": string - Géneros de la banda
        "popularity": int - Indicador de la popularidad de la banda
        "docType": string - Identificador del tipo de documento, siempre es "BAND"
        "albums": Array<string> - Array de Id's de artistas relacionados
        "artists": Array<string> - Array de Id's de artistas relacionados
        "_id": string - Identificador interno, autogenerado por nedb
        "createdAt": string - Fecha de alta en la base de datos, autogenerado por nedb
        "updatedAt": string - Fecha de la última actualización de ésta entrada en la base de datos, autogenerado por nedb
    }
```

**Albums**

```
    {
        "url": string - Url de la imagen del album
        "name": string - Nombre del album
        "docType": string - Identificador del tipo de documento, siempre es "ALBUM"
        "releaseDate": "1963-03-22T00:00:00-0300"
        "tracks": Array<string> - Array de Id's de tracks relacionados
        "_id": string - Identificador interno, autogenerado por nedb
        "createdAt": string - Fecha de alta en la base de datos, autogenerado por nedb
        "updatedAt": string - Fecha de la última actualización de ésta entrada en la base de datos, autogenerado por nedb
    }
```

**Artists**

```
    {
        "url": string - Url de la imagen del artista
        "firstName": string - Nombre del artista
        "lastName": string - Apellido del artista
        "birthdate": string - Fecha de nacimiento
        "instrument": string - Instrumento principal,
        "docType": string - Identificador del tipo de documento, siempre es "ARTIST"
        "_id": string - Identificador interno, autogenerado por nedb
        "createdAt": string - Fecha de alta en la base de datos, autogenerado por nedb
        "updatedAt": string - Fecha de la última actualización de ésta entrada en la base de datos, autogenerado por nedb
    }
```

**Tracks**

```
    {
        "disc_number": int - Número de disco,
        "name": string - Nombre del track,
        "track_number": int - Número del track dentro del album,
        "docType": string - Identificador del tipo de documento, siempre es "TRACK"
        "comments": Array<string> - Array de Id's de comentarios relacionados
        "commentsCount": int - Número que indica la cantidad de comentarios,
        "_id": string - Identificador interno, autogenerado por nedb
        "createdAt": string - Fecha de alta en la base de datos, autogenerado por nedb
        "updatedAt": string - Fecha de la última actualización de ésta entrada en la base de datos, autogenerado por nedb
    }
```

**Comments**

```
    {
        "docType": string - Identificador del tipo de documento, siempre es "COMMENT",
        "message": string - Mensaje del comentario,
        "name": string - Nombre del autor del comentario,
        "_id": string - Identificador interno, autogenerado por nedb
        "createdAt": string - Fecha de alta en la base de datos, autogenerado por nedb
        "updatedAt": string - Fecha de la última actualización de ésta entrada en la base de datos, autogenerado por nedb
    }
```

#### Contrato con el frontend
Para que una aplicacion funcione correctamente con un API externo ambas partes (en este caso, el FrontEnd y el BackEnd) deben acordar como estarán compuestos los puntos de acceso.
En esta sección se detalla la configuración esperada de cada endpoint.

```
    Ruta: /bands
    Método: GET
    Descripción: Retorna una lista de bandas
    Request URL Params: -
    Request payload: -
    Formato de respuesta: JSON
    Ejemplo de Server Response: [
        {
            "url": "https://i.scdn.co/image/934c57df9fbdbbaa5e93b55994a4cb9571fd2085",
            "name": "The Beatles",
            "genres": "british invasion, classic rock, folk rock, mellow gold, merseybeat, protopunk, psychedelic rock, rock, singer-songwriter",
            "popularity": 85,
            "docType": "BAND",
            "albums": [
              "R7W8b3fkyf5YZSIv",
              "g5ywOryGxhBhu0os",
              "W3yH88LzoGoYixoT",
              "So4FVZV4AuDlyHYX",
              "Bml7QlTKMEnO2br4",
              "Kfa8Z8T4x5pPxB2j"
            ],
            "artists": [
              "mSIbUc0YW6Hjnz31",
              "yUYRjTH3kEkIgRRC",
              "WsSIHEwlcgofu9Au",
              "olwvpqlfqJdqDaRk"
            ],
            "_id": "UQVOynWWir2XPyDS",
            "createdAt": "2016-08-26T18:47:56.935Z",
            "updatedAt": "2016-08-26T18:47:56.935Z"
        },
        ...
    ]
```

```
    Ruta: /bands/:bandId
    Método: GET
    Descripción: Retorna una banda en particular
    Request URL Params: bandId: string
    Request payload: -
    Formato de respuesta: JSON
    Ejemplo de Server Response: {
        "url": "https://i.scdn.co/image/934c57df9fbdbbaa5e93b55994a4cb9571fd2085",
        "name": "The Beatles",
         "genres": "british invasion, classic rock, folk rock, mellow gold, merseybeat, protopunk, psychedelic rock, rock, singer-songwriter",
        "popularity": 85,
        "docType": "BAND",
        "albums": [
            "R7W8b3fkyf5YZSIv",
            "g5ywOryGxhBhu0os",
            "W3yH88LzoGoYixoT",
            "So4FVZV4AuDlyHYX",
            "Bml7QlTKMEnO2br4",
            "Kfa8Z8T4x5pPxB2j"
        ],
        "artists": [
            "mSIbUc0YW6Hjnz31",
            "yUYRjTH3kEkIgRRC",
            "WsSIHEwlcgofu9Au",
            "olwvpqlfqJdqDaRk"
        ],
        "_id": "UQVOynWWir2XPyDS",
        "createdAt": "2016-08-26T18:47:56.935Z",
        "updatedAt": "2016-08-26T18:47:56.935Z"
    }

```

```
    Ruta: /bands/:bandId/artists
    Método: GET
    Descripción: Retorna los artistas pertenecientes a una banda
    Request URL Params: bandId: string
    Request payload: -
    Formato de respuesta: JSON
    Ejemplo de Server Response: [
        {
            "url": "https://i.scdn.co/image/96e2e59a1bf0b90cce97035ca48ad017cb9937c9",
            "firstName": "Paul",
            "lastName": "McCartney",
            "birthdate": "1942-06-18T00:00:00-0300",
            "instrument": "guitar",
            "docType": "ARTIST",
            "_id": "mSIbUc0YW6Hjnz31",
            "createdAt": "2016-08-26T18:47:56.933Z",
            "updatedAt": "2016-08-26T18:47:56.933Z"
        },
        ...
    ]
```

```
    Ruta: /bands/:bandId/albums
    Método: GET
    Descripción: Retorna la lista de los albumnes de una banda
    Request URL Params: bandId: string
    Request payload: -
    Formato de respuesta: JSON
    Ejemplo de Server Response: [
        {
            "url": "https://i.scdn.co/image/2782d94528b449fb6910300cc8c8f93ab8cc7a8d",
            "name": "The Beatles (Remastered)",
            "docType": "ALBUM",
            "releaseDate": "1963-03-22T00:00:00-0300",
            "tracks": [
              "cZwNfmwAyA0u4aHr",
              "tHBsgcNLclzqZV0W",
              "SwCQl4tCjEVEOljh",
              "S8U7mcIdpukaXt2I"
            ],
            "_id": "R7W8b3fkyf5YZSIv",
            "createdAt": "2016-08-26T18:47:56.929Z",
            "updatedAt": "2016-08-26T18:47:56.929Z"
        },
        ...
    ]
```

```
    Ruta: /tracks/:trackId
    Método: GET
    Descripción: Retorna los datos de un track en particular
    Request URL Params: trackId: string
    Request payload: -
    Formato de respuesta: JSON
    Ejemplo de Server Response: {
      "disc_number": 1,
      "name": "Here Comes The Sun - Remastered",
      "track_number": 7,
      "docType": "TRACK",
      "comments": [],
      "commentsCount": 0,
      "_id": "cZwNfmwAyA0u4aHr",
      "createdAt": "2016-08-26T18:47:56.913Z",
      "updatedAt": "2016-08-26T18:47:56.913Z"
    }
```

```
    Ruta: /tracks/:trackId/comments
    Método: GET
    Descripción: Retorna los comentarios asignados a un track en particular
    Request URL Params: trackId: string
    Request payload: -
    Formato de respuesta: JSON
    Ejemplo de Server Response: [
        {
             "docType": "COMMENT",
             "message": "Este es un mensaje",
             "name": "Matias",
             "_id": "ron5XqlwmsENL8da",
             "createdAt": "2016-09-27T13:44:49.833Z",
             "updatedAt": "2016-09-27T13:44:49.833Z"
        },
        ...
    ]
```

```
    Ruta: /comments
    Método: POST
    Descripción: Agrega un comentario a un track
    Request URL Params: -
    Request payload: {
        message: string,
        name: string,
        trackId: string
    }
    Formato de respuesta: JSON
    Ejemplo de Server Response: {
        "docType": "COMMENT",
        "message": "Este es un mensaje",
        "name": "Matias",
        "_id": "ron5XqlwmsENL8da",
        "createdAt": "2016-09-27T13:44:49.833Z",
        "updatedAt": "2016-09-27T13:44:49.833Z"
    }
```
