import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleFinished = () => {
     
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (id) => {
    let t = todos.find((i) => i.id === id);
    if (t) {
      setTodo(t.todo);
      let newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    if (index === -1) return;
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3  md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]  w-[50vw] ">
      <h1 className="font-bold text-center text-xl">i-Task Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full px-5 py-1
          " />
          <button
            onClick={handleAdd} disabled={todo.length===0}
            className="bg-green-500 disabled:bg-green-500 hover:bg-green-700 p-2 py-1 text-sm font-bold text-white rounded-md"
          >
            Save
          </button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) &&
              <div key={item.id} className={"todo flex md:w-1/2 my-3 justify-between"}>
                <div className="flex gap-4">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div
                    className={item.isCompleted ? "line-through" : ""}
                    aria-checked={item.isCompleted}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-green-500 hover:bg-green-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-green-500 hover:bg-green-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    <MdDelete />

                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
