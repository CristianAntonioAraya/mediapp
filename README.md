# MediApp

# Descripción

Este monorepo, gestionado con Lerna, alberga tanto el cliente como el servidor de la aplicación. La estructura del monorepo permite una gestión eficiente de múltiples paquetes, lo que facilita el desarrollo, la construcción y la implementación de componentes individuales.

## Client Side

El proyecto fue creado con vue, typescript por el tipado y la ayuda a la legibilidad y vite por su rapidez al momento de desarrollar.

### Prerequisitos

Antes de comenzar, asegurarse de tener estos paquetes instalados

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [npm](https://www.npmjs.com/) (Node Package Manager)

## Server Side

Este proyecto es un backend desarrollado con Express y PostgreSQL. A continuación, se detallan los pasos para configurar el entorno de desarrollo y comenzar a trabajar en el proyecto.

### Prerequisitos

Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas en tu máquina:

-   [Node.js](https://nodejs.org/) (Se recomienda la versión LTS)
-   [npm](https://www.npmjs.com/) (Administrador de paquetes de Node.js)
-   [TypeScript](https://www.typescriptlang.org/) (Instalado globalmente: `npm install -g typescript`)
-   [PostgreSQL](https://www.postgresql.org/) (Base de datos relacional)

# Instalacion

1. Clona el repositorio desde e

    ```bash
    git clone https://github.com/CristianAntonioAraya/mediapp.git
    ```

2. Navega al repositorio

    ```bash
     cd mediApp
    ```

3. Instala las dependencias del proyecto, este paso se debe hacer en el cliente y en el servidor

```bash
 npm install
```

# Scripts Disponibles

1.  Iniciar Todos los Paquetes Concurrentemente

Este script utiliza Lerna para iniciar todos los paquetes de tu monorepo de forma concurrente. Es útil cuando necesitas ejecutar la aplicación en cada paquete simultáneamente.

```bash
npx lerna run start --parallel
```

2.  Iniciar Todos los Paquetes Concurrentemente

Este script utiliza Lerna para iniciar el modo de desarrollo en todos los paquetes de forma concurrente. El modo de desarrollo suele implicar recargar automática y otras características que facilitan el desarrollo.

```bash
npx lerna run dev --parallel
```

3. Construir un Paquete Específico

Este script utiliza Lerna para construir un paquete específico en tu monorepo. Es útil cuando solo deseas construir y preparar un paquete particular para la implementación.

```bash
npx lerna run build --scope=server
```

# Variables de entorno

Antes de levantar el servidor, hace falta crear y rellenar el archivo .env, para ello existe otro fichero con todas las variables necesarias, es **.env.template**

### SERVER_PORT

La variable `SERVER_PORT` especifica el puerto en el que el servidor Express se ejecutará. Asegúrate de que no esté en uso por otros servicios.

### POSTGRES_USERNAME

La variable `POSTGRES_USERNAME` es el nombre de usuario que se utilizará para conectar a la base de datos PostgreSQL.

### POSTGRES_PASSWORD

La variable `POSTGRES_PASSWORD` es la contraseña asociada al usuario de PostgreSQL.

### POSTGRES_DATABASE

La variable `POSTGRES_DATABASE` especifica el nombre de la base de datos a la que se conectará la aplicación.

### POSTGRES_PORT

La variable `POSTGRES_PORT` define el puerto en el que el servidor de PostgreSQL está escuchando.

### POSTGRES_HOST

La variable `POSTGRES_HOST` especifica la dirección del host donde se encuentra el servidor de PostgreSQL.

### SECRET_JWT

La variable `SECRET_JWT` es la clave secreta utilizada para firmar y verificar los tokens JWT. Asegúrate de que sea una cadena segura y única.

# Desarrollo

En ambos proyectos, cliente y servidor se inician en modo desarrollo con el mismo comando.

```bash
 npm run dev
```

## Client

El cliente corre por defecto en http://localhost:5173/ por usar vite

## Server

El servidor corre por defecto en http://localhost:4000/ o en el que se asigne en las las variables de entorno

⚠️ Al iniciar el servidor, automáticamente habrá creado la base de datos llamada **MediApp** y las tablas de _Professionals_, _Questions_ y _Users_ necesarias para el funcionamiento y las comprueba cada vez que se vuelve a levantar el servidor.

# Usuario Admin

⚠️ Tendras que configurar manualmente el usuario tipo admin, ingresas al frontend, the registra como un usuario común.

Luego, ya sea por el CLI de postgres o Pgadmin, cambias el campo **role** que por defecto es **patients** a **admin** y tendras acceso a todos los endpoint disponibles.

# Paquetes y librerias de terceros

## Client

-   jwt-decode : se uso para manejar el token de sesion proveniente del servidor.
-   sweetalert2: se creo como manejador de errores estilizados.

## Server

-   bcryptjs: Encriptacion de contraceñas
-   cors: Manejo de cross origin
-   joi: Validador de Schemas provenientes de la request
-   jsonwebtoken: Token de seguridad y acceso
-   sequelize: ORM que ayuda a la interaccion con PostgreSql
-   @hapo/boom: Estandarizar el manejo de errores

# Json web Token

Se utiliza un token para mantener la sesion y seguridad, en cada peticion con informacion sensible es verificado su firma y el rol del usuario,

Tiene una duracion de 24 hrs antes de que expire.

Para que se creen correctamente le hace falta una variable de entorno con una palabra secreta para generar una firma unica a dicho token.

# Respuestas esperadas

Gracias a la libreria de @Hapi/boom se puede estandarizar las respuestas del servidor, tanto como los tipos de mensajes de error como como el contenido del payload.

Una respuesta del servior suele lucir asi.

Para respuestas exitosas

```
{
    "ok": true,
    "user": [
       //...resto de json
    ]
}
```

Para repuestas fallidas

```
{
    "ok": false,
    msg: err.msg
    statusCode: err.status
}
```

Siendo la campo **ok**, el principal indicador de estado.
