# Reporting Backend

- [Casos de uso](#casos-de-uso)
- [Puesta en marcha del proyecto](#puesta-en-marcha-del-proyecto)
- [Uso de la Herramienta CLI](#uso-de-la-herramienta-cli)
- [Uso de la API REST](#uso-de-la-api-rest)
  - [Puesta en marcha del servidor](#puesta-en-marcha-del-servidor)
  - [Rutas](#rutas)
    - [/api](#api)
      - [POST /generateReports](#post-generatereports)
        - [Request](#request)
        - [Response](#response)
- [Detalles de implementación](#detalles-de-implementación)
  - [Generación de reportes](#generación-de-reportes)
- [Pruebas / Testing](#pruebas--testing)
- [Enlaces de interés / Bibliografía](#enlaces-de-interés--bibliografía)

Este proyecto nace como una herramienta de CLI y posteriormente se convierte en una API REST para ofrecer la funcionalidad a través de la red. Por este motivo, este proyecto cuenta con dos modos de funcionamiento.

## Casos de uso

Dados los archivos de entrada _customers.csv, orders.csv y products.csv_, genera una serie de reportes.

Los reportes que se generan son los siguientes:

- _order_prices.csv_ -> Calcula el coste total de cada uno de los pedidos.
- _product_customers.csv_ -> Reporte que relaciona cada producto con una lista de Consumers que han adquirido el producto.
- _customer_ranking.csv_ -> Ordena los clientes según el total de los pedidos realizados.

## Puesta en marcha del proyecto

Para poder iniciar el proyecto, hay que clonar el repositorio y, posteriormente, instalar las dependencias necesarias:

```
git clone https://github.com/SalvaChiLlo/ReportingBackend.git
cd ReportingBackend
npm install
```

## Uso de la Herramienta CLI

Una de las formas más sencillas de utilizar la herramienta es haciendo uso de _npm_, para ello, utilizaremos el comando `npm run startCLI`.

La herramienta acepta diferentes parámetros. Por ejemplo, con el siguiente comando podemos obtener una descripción sobre el uso de la herramienta:

```
$ npm run startCLI -- --help

  Usage:
    --customers [file_path] | required
    --products [file_path] | required
    --orders [file_path] | required
```

Por tanto para generar los reportes bastaría con ejecutar el comando pasado para cada argumento la dirección donde se encuentra cada uno de los archivos necesarios:

```
$ npm run startCLI -- --orders ./orders.csv --products ./products.csv --customers ./customers.csv
```

## Uso de la API REST

### Puesta en marcha del servidor

Existen dos formas de ejecutar el servidor, en local o en Docker.
Para lanzar el servidor en local, simplemente ejecuta el siguiente comando, el cual hará que el servidor empiece a responder peticiones en el puerto indicado en la configuración (archivo _.env_, por defecto _8080_):

```
npm run startSERVER
```

Si por el contrario, no quieres instalar ninguna dependencia, puedes ejecutar el servicio en Docker. Para ello, descarga el fichero [docker-compose.yml](https://github.com/SalvaChiLlo/ReportingBackend/blob/main/docker-compose.yml), y en el mismo directorio donde se encuentra el fichero, ejecuta:

```
docker-compose up -d
```

Como resultado obtendrás un contenedor que expone la API descrita a continuación en el puerto _8080_.

**La API puede ser probada fácilmente desde el cliente creado para ello, [ReportingFrontend](https://github.com/SalvaChiLlo/ReportingFrontend).**

### Rutas

#### /api

##### **POST** `/generateReports`

###### Request

La petición que se realiza debe de contener los 3 archivos necesarios para generar los reportes dentro de un _formData_

```
formData: {
  customers,
  orders,
  products,
}
```

###### Response

Como respuesta el servicio puede generar las siguientes respuestas.
En caso de realizar una ejecución correcta:

```
status: 200
{
  "orderPrices": "..." // Reporte en formato CSV
  "productCustomers": "..." // Reporte en formato CSV
  "customersRanking": "..." // Reporte en formato CSV
}
```

En caso de que se produzca algún error durante la generación de reportes:

```
status: 503
{
  "message": "..." // Mensaje descriptivo del error
}
```

## Detalles de implementación

Para facilitar la implementación de la solución se ha optado por utilizar las siguientes dependencias, las cuales han sido elegidas tras un periodo de investigación, tratando de elegir siempre paquetes que tengan un buen equipo detrás y que sean de gran uso entre la comunidad:

- [Arg](https://npmjs.com/package/arg)
  - Permite gestionar de forma sencilla los argumentos que se pasan al programa por línea de comandos.
- [Csvtojson](https://www.npmjs.com/package/csvtojson)
  - Permite la conversión de ficheros _CSV_ a _JSON_ de una forma sencilla y segura.
- [Express](https://www.npmjs.com/package/express)
  - Framework de aplicaciones web Node.js minimalista y flexible de gran reputación.
- [Multer](https://www.npmjs.com/package/multer)
  - Middleware para el manejo de _multipart/form-data_, que se utiliza principalmente para subir archivos.

Algunas de estas dependencias han facilitado mucho el desarrollo del proyecto, destacando _Multer_. Que ha permitido ofrecer la funcionalidad de subir archivos al backend para poder ofrecer una API que pueda ser consumida por una aplicación web. Cabe destacar su [documentación](http://expressjs.com/en/resources/middleware/multer.html) que ha sido de gran ayuda.

### Generación de reportes

Uno de los detalles de implementación más críticos, sobre los que se ha tenido que tomar una decisión, ha sido el de la forma en la que se desarrollarían los algoritmos de generación de reportes.

Había dos opciones principalmente:

- Hacer un algoritmo que fuese más grande y complejo, pero más eficiente, es decir, en el que se realizan menos iteraciones.
- Hacer diferentes algoritmos más pequeños y simples para cada reporte, pero que permiten una mejor legibilidad y mantenimiento futuro, aunque en un cómputo total son algo menos eficientes que la opción anterior.

Finalmente, se decidió llevar a cabo la segunda de las opciones en favor de una mejora mantenibilidad. De esta forma, en un futuro, si se desea, se pueden añadir nuevas funcionalidades en alguno de los algoritmos sin que afecte a los otros. O por ejemplo, se podrían generar reportes de forma independiente.

En cuanto al rendimiento, con el fin de buscar una mejora del mismo, se opta por indexar los diferentes datos obtenidos a partir de los _CSV_ con la finalidad de reducir a tiempo constante _O(1)_ la búsqueda de datos en los mismos.

## Pruebas / Testing

Con el fin de validar el correcto funcionamiento y evitar introducir defectos en la aplicación durante el desarrollo, se ha optado por realizar pruebas unitarias sobre la aplicación tratando de tener una cobertura de código lo más alta posible para evitar comportamientos no deseados en la aplicación.

Para ello, se ha tratado de seguir al máximo posible la filosofía TDD.

Los tests, se han realizado con Mocha, framework de testing para Javascript, y Chai, librería de aserciones para Node.

Para lanzar los tests, ejecuta el siguiente comando:

```
npm run test
```

## Enlaces de interés / Bibliografía

[Multer](http://expressjs.com/en/resources/middleware/multer.html)
[Csvtojson](https://www.npmjs.com/package/csvtojson)
[Ansi-colors](https://www.npmjs.com/package/ansi-colors)
[Eslint](https://www.npmjs.com/package/eslint)
[Dynamically set angular env variables in docker](https://nkpremices.com/dynamically-set-angular-env-variables-in-docker/)
[Configure NGINX for Angular - Docker](https://dev.to/oneofthedevs/docker-angular-nginx-37e4)
