import Style from "./Style.css";
import { ChangeEvent, useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface todoType {
  name: string;
  id: string;
}
function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [editedInputValue, setEditedInputValue] = useState<string>("");
  const [Todos, setTodos] = useState<todoType[]>([{ name: "", id: "" }]);
  const [showPop, setShowPop] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const [InputError, setInputError] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let idNum: string = uuidv4();

    if (inputValue === "") {
      setInputError(false);
    } else {
      setTodos((Todo) => [...Todo, { name: inputValue, id: idNum }]);
    }
    setInputValue("");
  };

  const RemoveTodo = () => {
    setShowPop((showPop) => !showPop);
    const updatedTodos = Todos.filter((todo) => todo.id !== removeId);
    setTodos(updatedTodos);
    setEditId("");
  };

  const showContents = (id: string) => {
    setShowPop((showPop) => !showPop);
    setRemoveId(id);
    setInputValue("");
    setEditId("");
  };

  const editTodos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedInputValue === "") {
      alert("please edit the topic");
    } else {
      const editedTodos = Todos.map(
        (todo): todoType =>
          todo.id === editId ? { ...todo, name: editedInputValue } : todo,
      );
      setTodos(editedTodos);
      setEditId("");
      setEditedInputValue("");
    }
  };

  const handleEdit = (id: string) => {
    setEditId(id);
  };

  return (
    <div className="main-container">
      <h2>To Do App</h2>
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label className="input-container">
              {InputError ? (
                <input
                  name="myInput"
                  value={inputValue}
                  className="input-box"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setInputValue(e.target.value)
                  }
                />
              ) : (
                <input
                  name="myInput"
                  className="input-box-error"
                  placeholder="please enter a task"
                  onClick={() => setInputError(true)}
                />
              )}
              <button type="submit">ADD</button>
            </label>
          </div>
        </form>
        <div className="lists">
          <div className="todos">
            {Todos.map((todo) =>
              todo.id === editId ? (
                <div className="edit-todo" key={todo.id}>
                  <form className="edit-form" onSubmit={editTodos}>
                    <label>
                      <input
                        type="text"
                        name="editedTodo"
                        className="input-box"
                        defaultValue={todo.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                          setEditedInputValue(e.target.value)
                        }
                      />
                    </label>
                    <button type="submit" className="edit-todo-update">
                      Update
                    </button>
                  </form>
                  <button
                    className="edit-todo-cancel"
                    onClick={() => setEditId("")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="todo" key={todo.id}>
                  <div className="todo-heading">{todo.name}</div>
                  <button
                    className="todo-edit"
                    onClick={() => {
                      handleEdit(todo.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="todo-remove"
                    onClick={() => showContents(todo.id)}
                  >
                    Remove
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
        {showPop && (
          <div className="modal-background">
            <div className="modal-container">
              <div className="modal-title">
                <p> Are you sure to remove the task ?</p>
              </div>
              <div className="modal-btns">
                <button
                  className="todo-remove btn-yes"
                  onClick={() => RemoveTodo()}
                >
                  Yes
                </button>
                <button
                  className="todo-remove btn-no"
                  onClick={() => setShowPop(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
