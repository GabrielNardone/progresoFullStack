import { Todo } from "../todos/models/todo-model"


export const Filters = {
    All: 'Show all',
    Incomplete: 'Incomplete',
    Complete: 'Complete'
}

const state = {
    todos: [
        new Todo('Hacer gelatina'),
        new Todo('Pagar la cuota del gym'),
        new Todo('Inscribirse al taller de inglés, speaking'),
        new Todo('Tomar dos litros de agua por día'),
        new Todo('Leer el Glossarium de Schmitt'),
        new Todo('Bañar al perro'),
        new Todo('Comprar remeras'),
        new Todo('Terminar la TO DO LIST'),
        new Todo('Programar la próxima app ;)'),

    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log(state);
}

const loadStore = () => {
    //voy a buscar el item con el key state en el local storage
    //pero ese getItem devuelve un string
    if (!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'))
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    //usamos el API que ya está en el navegador para acceder al localStorage
    //el localStorage solo grava información de tipo STRING por tanto se utiliza el stringify

    localStorage.setItem('state', JSON.stringify(state))

}//tengo que llamar esta función en todos los lugares en donde modifico el state

const getTodo = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos]; //regresa un nuevo objeto con cada uno de los valores
        case Filters.Incomplete:
            return state.todos.filter(todo => todo.done === false /*!todo.done*/)// el método filter recorre un arreglo y devuelve un nuevo arreglo con aquellos que cumplen la condición declarada en una callback function
        case Filters.Complete:
            return state.todos.filter(todo => todo.done === true /*todo.done*/)
        default: throw new Error(`Option ${filter} is not valid.`)
    }
}

/**
 * 
 * @param {String} title  
 */
const addTodo = (title) => {

    if (!title) throw new Error('Information is required')

    state.todos.push(new Todo(title));
    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {

    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
} //Recibe el todoId para modificar su estado de incomplete a complete

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);//el state es igual al state filtrado con la condición de que los todos tengan un id disitnto al pasado por parámetro
    saveStateToLocalStorage();
} //Recibe el todoId para eliminarlo

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done !== true);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}//permite establecer el filtro deseado: Show all, complete o incomplete
//recibe por parámetro el filtro seleccionado, y tiene por defecto el Show all

const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodo,
    initStore,
    loadStore,
    saveStateToLocalStorage,
    setFilter,
    toggleTodo,
}//la exportación por defecto exporta un OBJETO,
 //por tanto cuando lo importemos debemos poner un nombre de referencia
