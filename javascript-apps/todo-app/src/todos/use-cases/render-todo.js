import { createTodoHTML } from "./";

let elem;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
//necesito tanto el elemto html donde voy a renderizar, 
//como los todos que tengo que renderizar
export const renderTodos = (elementId, todos = []) => {

    if(!elem)
        elem = document.querySelector(elementId);

    elem.innerHTML = ''; //cada vez que llame la función vacio el contenido para que no se acumulen    

    todos.forEach(todo => {
        //aquí llamamos otra función que se encarque exclusivamente
        //de crear la etiqueta html de los todo
        elem.append(createTodoHTML(todo))
    });

}