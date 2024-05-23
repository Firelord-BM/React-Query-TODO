"use client";
import TodoCard from "@/components/Todo";
import { addTodo, fetchTodos } from "@/lib/data";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function Demo() {
  const queryClient = useQueryClient();
  const [search,setSearch] = useState("")
  const [ title, setTitle ] = useState("");
  const { data: todos, isLoading } = useQuery({
     queryKey: ["todos", { search }],
    queryFn: () => fetchTodos(search),
    staleTime: Infinity,
    gcTime: 0,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey:["todos"]})
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <b>Learn React Query</b>
      <div>
        <input
          type="text"
          value={title}
          className="border"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={async () => {
          try {
            await addTodoMutation({title});
            setTitle("");
          } catch (error) {
            console.log(error)
          }
        }}>
          Add Todo
        </button>
      </div>
      {todos?.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })}
    </div>
  );
}
