# Koibanx Frontend Challenge

## Como Correrlo?

Dentro de la carpeta raiz debe crearse un archivo .env con esto dentro

```bash
NEXT_PUBLIC_API_URL= https://api.koibanx.com/stores
```

esto mismo podria haber sido colocado en un archivo de configuracion pero opte por consumir de un .env

Vamos a la terminal, nos colocamos sobre la carpeta del proyecto y corremos la siguiente linea

```bash
npm i
```

Una vez terminado de instalar los paquetes correspondientes de este repositorio lo corremos con

```bash
npm start
```

Aclaracion:
Para este proyecto se usó NextJs por lo que si se dejaba por defecto al correr la linea "npm start" correria el build, que todavia no se ha hecho, se ha modificado el script del package.json

```bash
previamente era
"start": "next start"

por
"start": "next dev",
```

una vez hecho esto esta listo para poder ingresar al proyecto en la url http://localhost:3000/

## Que librerias se han usado?

- NextJs
- Typescript
- React-icons

## Aclaracion en la estructura

La carpeta "pages" es usada solamente como routing y la carpeta "screen" es donde se encuentra las paginas.
