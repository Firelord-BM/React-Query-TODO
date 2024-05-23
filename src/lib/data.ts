import { Todo } from "@/entities/Todo";
const todos = [
    {
        id:1,
        title:"Learn HTML",
        completed:false
    },
    {
        id:2,
        title:"Learn CSS",
        completed:false,
    },
    {
        id:3,
        title:"Learn JavaScript",
        completed:false
    },
    {
        id:4,
        title:"Learn React",
        completed:false,
    },
    {
        id:5,
        title:"Learn NextJS",
        completed:false
    },
  
]

// Mock functions that mimic fetching Todos from a database

export const fetchTodos = async(query = ""):Promise<Todo[]> =>{
    await new Promise((resolve) => setTimeout(resolve,1000));
    console.log("fetched todos");

    const filteredTodos = todos.filter((todo)=>
    todo.title.toLowerCase().includes(query.toLowerCase()))

    // throw new Error();
    return [...filteredTodos];
}

//mock function that mimics adding a todo to a database.

export const addTodo = async(todo:Pick<Todo, "title">): Promise<Todo> => {
    await new Promise((resolve) => setTimeout(resolve,1000));
    const newTodo = {
        id:todos.length + 1,
        title: todo.title,
        completed:false
    };

    todos.push(newTodo);
    return newTodo;
}