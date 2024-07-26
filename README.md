# Documentacion

MVP frontend para la gestión de dispensadores de cerveza.

# Estructura y stack tecnológico

El proyecto cuenta con dos secciones (un área privada y una zona pública). En el área privada encontramos 3 páginas. Para el desarrollo del proyecto he utilizado NextJS ya que con su nuevo sistema de gestión de rutas es mucho más ágil que tener que estar creando nuestro propio router. Además, dado que toda la información está getionada por la API he suprimido el uso de stado local. En caso de necesitarlo utilizaría Zustand ya que es una librería mucho más ágil que Redux para el estado.

## Zona privada

- `/login` - Aquí nos encontramos con el formulario de acceso. Como se trata de un MVP he utilzado React Hook Form para la gestión del formulario, ya que simplifica mucho el código y nos ahorra crear un hook propio para ello. Además he utilizado Zod para validaciones, es una librería que me gusta mucho para formularios y gestiona las validaciones de forma ágil y escalable.

Para controlar el estado de si se está autenticado o no estoy utilizando el localstorage, y los server actions de NextJS para hacer la autenticación.
Con fines de demo hay que usar los siguientes credenciales:

```
username: jonathan
password: jonathan1
```

- `/dashboard` - Aqui nos encontramos la página principal del dashboard, a la cual solo podemos acceder si estamos autenticados. En ella tenemos el listado de dispensadores disponibles y un formulario para crear nuevos con la siguiente función `createDispenser`.

- `/dashboard/dispenser/:id` - Una vez clickamos en cualquier dispensador de la página dashboard, nos lleva a esta, en la cual podemos ver un resumen del dispensador seleccionado y los beneficios que ha generado, para ello utilizamos las función `fetchDispenserData`.

## Zona pública

- `/dispensers ` - Aqui nos encontramos con el listado de dispensadores y su estado, el cual mostramos con la función `fetchDispensers`

- `/dispensers/:id ` - Una vez seleccionado un dispensador de la página anterior, nos lleva a esta, donde podemos abrir y cerrar el dispensador para llenar nuestro vaso de cerveza, para ello utilizamos la funcion `updateDispenserStatus`.

Para poder realizar test de forma ágil he aislado las funciones principales en una carpeta utils. Y he componetizado todo lo que he podido la aplicación.

## Instrucciones de funcionamiento

Clonamos y accedemos al repositorio

> ```console
>  $ git clone https://github.com/Jommartinez/challenge-timedi.git
>  $ cd challenge-timedi
> ```

Instalamos dependencias e iniciamos el proyecto

> ```console
> $ npm install
> $ npm run dev
> ```

Para ejecutar los test utilizamos el siguiente comando

> ```console
> $ npm run test
> ```
