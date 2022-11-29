Laboratorio III - División 3°D
==============================
<div align="center"><img src="https://i.ibb.co/XWTqXZ8/logoutn.png" alt="logoUTN"></div>

## Información
Aquí alojo el segundo parcial realizado durante mi cursada en la materia `Laboratorio de Computación III`, año 2022.

### Datos personales
* **Nombre**: Lautaro N. Díaz
* **DNI**: 39468894
* **Legajo**: 109288
* **Lenguaje Utilizado**: <a href="https://www.javascript.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" width="24px" height="24px" align="center"/>JavaScript</a>
* **Tecnologías**: <a href="https://html.spec.whatwg.org/multipage/"><img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" width="24px" height="24px" align="center"/>HTML</a>,<a href="https://www.w3.org/Style/CSS/"><img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" width="24px" height="24px" align="center"/>CSS</a>,<a href="https://getbootstrap.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/bootstrap/bootstrap-original.svg" width="24px" height="24px" align="center"/>Bootstrap</a>, <a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original.svg" width="24px" height="24px" align="center"/>Node.JS</a>
* **Nota obtenida**: 10

```js
// filter, map or reduce ??

let array_users = [
    {
        id: 1,
        name: "Juan",
        gender: "M",
        salary: 25000
    },
    {
        id: 2,
        name: "Eugenia",
        gender: "F",
        salary: 33000
    },
    {
        id: 3,
        name: "Leticia",
        gender: "F",
        salary: 21000
    }];

// use 'filter' to obtain only the information you need in the array
let users_women = array_users.filter(user => user.gender === "F");
/*
    => [
        {
        id: 2,
        name: "Eugenia",
        gender: "F",
        salary: 33000
    },
    {
        id: 3,
        name: "Leticia",
        gender: "F",
        salary: 21000
    }
    ]
*/
let user_id_3 = array_users.filter(user => user.id === 3);
/*
    => [
        {
            id: 3,
            name: "Leticia",
            gender: "F",
            salary: 21000
        }
    ]
*/

// use 'map' when you need some information of each item in the array
let users_genders = array_users.map((user) => user.gender);
/*
    => ["M", "F", "F"]
*/
// or when you need to get values modified
let users_salary_double = array_users.map(user => user.salary * 2);
/*
    => [50000, 66000, 42000]
*/

// use 'reduce' like acumulator or if you want to have certain information like user with highest salary
let users_salary_total = array_users.reduce((prev, actual) => prev + actual.salary, 0);
/*
    => 79000
*/
let user_best_salary = array_users.reduce((prev, actual) => prev.salary > actual.salary ? prev : actual);
/*
    => {
        id: 2,
        name: "Eugenia",
        gender: "F",
        salary: 33000
    }
*/
```
