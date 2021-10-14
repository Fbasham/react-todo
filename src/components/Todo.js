import { useState, useEffect } from "react";

const Todo = ({ id, title, description, deleteTodo }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <div className="todo">
      <div className="titleDiv">
        <p
          className={`close ${show ? "" : "notActive"}`}
          onMouseOver={(e) => setShow(true)}
          onClick={(e) => deleteTodo(id)}
        >
          &times;
        </p>
        <p className="todoTitle">{title}</p>
      </div>
      <p className="todoDescription">{description}</p>
    </div>
  );
};

export default Todo;
