
/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('object todo is required')

    const html =
        `<li class="li-item" data-id=${todo.id}>
            <div>

                <input id="todo-item" type="checkbox" ${todo.done ? 'checked' : ''}>
                <span class="geekmark"></span>
                <label class="check-style" for="todo-item">${todo.title}</label>

            </div>

            <button class="destroy">Delete</button>
        </li>`

    const liItem = document.createElement('li');
    liItem.innerHTML = html;

    if(todo.done)
        liItem.classList.add('completed'); //de esta forma agregamos una clase al elemento html

    return liItem;
    
}