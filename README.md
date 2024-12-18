# Setup
Crear un proyecto de ReactJS y realizar los ejercicios 1 y 2 en dicho proyecto. Cuando se termine, subir a un repo de github o comprimir sin la carpeta node_modules y enviar para su revisión.

El ejercicio 3 se realizará escrito en una copia de esta misma hoja.

Para los ejercicios 1 y 2 nos bajaremos el siguiente repositorio con git:
```bash
git clone https://github.com/Dacuna97/test-backend-app.git
```

Ejecutaremos el siguiente comando en la carpeta de dicho repositorio:
```bash
npm install
```

Para ejecutarlo:
```bash
npm start
```

Se ejecutará en el puerto 3200.

Es un backend en NodeJS con Express que llama a una serie de apis externas, tu labor será llamar a este backend en el puerto 3200 a los endpoints que se muestran a continuación.

# Ejercicio 1
Para este ejercicio necesitarás los siguientes endpoints:

<mark>GET /api/genderize/:name</mark> donde name es un string que le pasaremos al endpoint como parámetro y la respuesta de la api será un JSON con el género más probable que tenga ese nombre.

<mark>GET /api/nationalize/:name</mark> donde name es un string que le pasaremos al endpoint como parámetro y la respuesta de la api será un JSON con una serie de países con una probabilidad a la que pertenece ese nombre.

<mark>GET /api/agify/:name</mark> donde name es un string que le pasaremos al endpoint como parámetro y la respuesta de la api será un JSON con la edad más probable para ese nombre

1. Crear un formulario que le pida al usuario que introduzca su nombre
2. Tras introducir el nombre llamar a las 3 apis para obtener la distinta información
3. Crear un componente que muestre el género más probable junto con la probabilidad,
4. también todas las nacionalidades probables  (si puede ser con un icono que sea su
bandera) y su probabilidad, y también la edad más probable.

# Ejercicio 2
Para este ejercicio necesitarás los siguientes endpoints:

<mark>GET /api/covid/historical</mark> La respuesta de la api será un JSON con la información por días (histórica de Estados Unidos), de casos (cases), tests (testing), muertes (outcomes.death).

Documentación de la API: https://covidtracking.com/data/api/version-2
1. Sabiendo esto, crear un componente (o componentes) que muestre información relevante sobre el covid en Estados Unidos por días. Puedes crear un componente para cada información, componentes que relacionen 2 o más métricas o lo que creas necesario para representar esta información de forma que un usuario pueda entenderla.