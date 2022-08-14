<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecturar en Desarrollo

1. Clonar repositorio
2. Ejecutar

```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g nest/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```


5. Clonar el archivo ```.env.template``` y renombrar a archivo ```.env``` 


6. Rellernar las variables de entorno con los valores indicados ```.env```

7. Ejecutar la aplicacion en dev:
```
npm run star:dev
``` 
8. Reconstruir la base de datos con el url:
```
http://localhost:3000/api/v2/seed
```

# STACK USADO
* MongoDB
* Nest


