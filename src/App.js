import { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Loader from "./components/Loader";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [loading, setLoading] = useState(true);
  let titleRef = useRef();
  let descRef = useRef();

  let deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  useEffect(() => {
    let ls = localStorage;
    if (ls.getItem("todos")) {
      setTodos(JSON.parse(ls.getItem("todos")));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let ls = localStorage;
    ls.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {loading && <Loader />}
      <h1>Todo...</h1>

      <div className="formControl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newTitle && newDesc) {
              titleRef.current.value = null;
              descRef.current.value = null;
              titleRef.current.focus();
              setTodos([
                ...todos,
                { id: todos.length + 1, title: newTitle, description: newDesc },
              ]);
              setNewTitle("");
              setNewDesc("");
            }
          }}
        >
          <input
            placeholder="title"
            ref={titleRef}
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <textarea
            placeholder="todo..."
            ref={descRef}
            onChange={(e) => setNewDesc(e.target.value)}
          ></textarea>
          <button>submit</button>
        </form>
      </div>

      <div className="App">
        {todos.map(({ id, title, description }) => {
          return (
            <Todo
              key={id}
              id={id}
              title={title}
              description={description}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
