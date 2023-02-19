import { renderPending, renderTodos } from './use-cases';
import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo-store'



//esta constante es un objeto con la referencia a todos los elementos html 
//que voy a necesitar, de esta forma nos aseguramos una mejor 
//funcionalidad, por ejemplo en caso de que cambien los id, solo tenemos
//que modificarlos una sola vez en este objeto
const ElementIds = {
    TodoList: '.ul-todo-list',
    TitleInput: '.title-input',
    DescriptionInput: ".description-area",
    Destroy: '.destroyAll',
    TodoFilters: '.filter',
    CountIncomplete: '.incompleteCount'
}




/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {

        const todos = todoStore.getTodo(todoStore.getCurrentFilter());

        renderTodos(ElementIds.TodoList, todos);
        incompleteCount();
    }

    const incompleteCount = () =>{
        renderPending(ElementIds.CountIncomplete)
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos(); //se crea el elemento html e inmediatamente se ejecuta la función encargada de renderizar los todos.
    })()


    //referencias HTML
    const newTitle = document.querySelector(ElementIds.TitleInput);
    const todoListUl = document.querySelector(ElementIds.TodoList);
    const destroy = document.querySelector(ElementIds.Destroy);
    const filters = document.querySelectorAll(ElementIds.TodoFilters); //aL regresar todos va a devolver un arreglo

    //el listener va a estar escuchando el keyup, esto es, cuando
    //alguién suelte la tecla.
    //El evento tiene varias propiedades que vamos a utilizar para armar la función
    newTitle.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return; //el keyCode es el código que identifica cuándo se tocó enter, por tanto esta función se seguirá ejecutando solo cuando se presione enter
        if (event.target.value.trim().length === 0) return; //el value del target es el último valor de la secuencia, es el mensaje completo, por ejemplo, toda la oración hasta la última letra que tipeo el usuario

        todoStore.addTodo(event.target.value)
        displayTodos();
        event.target.value = '';
    })

    //Necesito escuchar qué pasa en el ul que contiene la lista de todos
    todoListUl.addEventListener('click', (event) => {
        //necesito identificar el elemento al cual le estoy haciendo click
        //Previamente agregamos al elementoHTML li el atributo data-id con el todo.id, de esta manera
        //podemos buscarlo con el método closest, que busca hacia arriba, hacia el padre
        //el atributo solicitado por parámetro
        const element = event.target.closest('[data-id]');
        //ahora debemos tomar ese atributo con el getAttribute, a la vez le enviamos
        //el atributo al método correspondiente para el toggle
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })


    todoListUl.addEventListener('click', (event) => {
        //para identificar si el elemento HTML donde hago click es el botón o no
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    destroy.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    //No puedo usar el addeventListener porque el filters devuelve un arreglo
    //Con el forEach selecciono a cada elemento de array consecutivamente
    //Y a cada elemento le agrego el addeventListener
    filters.forEach(element => {
        element.addEventListener('click', (element) => {

            filters.forEach(el => el.classList.remove('selected'))//remueve la clase selescted de los demás
            element.target.classList.add('selected'); //le añado la clase selected para que aplique el boder

            //para concocer el valor del elemento HTML, esto es, el texto que lleva escrito aplico:
            //element.target.text
            switch (element.target.text) {
                case 'Show all':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Complete':
                    todoStore.setFilter(Filters.Complete)
                    break;
                case 'Incomplete':
                    todoStore.setFilter(Filters.Incomplete)
                    break;
            }
            displayTodos();
        })
    })


} 