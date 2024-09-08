import { useState, useEffect } from "react";
import "./todo.css";


function TodoList() {

    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem("items");
        return saved ? JSON.parse(saved) : [];
    }
);

    useEffect ( () => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    function AddtoList() {
        if(document.getElementById("add").value.trim() !== "") {
            setItems([...items, {
                content: document.getElementById("add").value,
                isCompleted: false,
                isEditing: false,
            }]);
            document.getElementById("add").value = "";
        }
    }

    function DeleteItem(index) {
        setItems(items => items.filter((_, i) => i!== index));
    }

    function IsCompleted(index) {
        setItems(items.map((item, i) =>  
            index === i ? {...item, isCompleted: !item.isCompleted} : item
    ))}

    function HandleEdit(index) {
        setItems(items.map((item, i) => 
            index === i ? {...item, isEditing: !item.isEditing} : item
        ));
    }

    function EditItem(e, index) {
        setItems(items.map((item, i) => 
            index === i ? {...item, content: e.target.value} : item    
    ))}

    return (
        <div className="todo-card">
            <div>
                <h2>TODO LIST</h2>
            </div>
            <div className="add-item">
                <h4>ADD ITEM</h4>
                <input id="add" type="text"/>
                <button className="button btn-add" onClick={() => AddtoList()}>Add</button>
            </div>
            <div>
                <h4>TODO</h4>
                <ul className="part">
                    
                {items.map((item, index) => (
                        !item.isCompleted && 
                        <>
                            <div className="box-item">
                                <input type="checkbox" checked={item.isCompleted} onChange={() => IsCompleted(index)}/>
                                { item.isEditing ? (
                                    <input type="text" defaultValue={item.content} onChange={(e) => EditItem(e, index)}/>
                                ) : (
                                    <li className="content" key={index}>{item.content}</li>
                                    )
                                }
                                <div className="button-content">
                                    <button className="button btn-edit" onClick={() => HandleEdit(index)}>Edit</button>
                                    <button className="button btn-delete" onClick={() => DeleteItem(index)}>Delete</button>
                                </div>
                            </div>
                        </>
                    ))}
                    
                </ul>

            </div>
            <div>
                <h4>COMPLETED</h4>
                <ul className="part completed">
                    {items.map((item, index) => (
                        item.isCompleted &&
                        <>
                          <div className="box-item">
                                <input type="checkbox" checked={item.isCompleted} onChange={() => IsCompleted(index)}/>
                                { item.isEditing ? (
                                    <input type="text" defaultValue={item.content} onChange={(e) => EditItem(e, index)}/>
                                ) : (
                                    <li className="content" key={index}>{item.content}</li>
                                    )
                                }
                                <div className="button-content">
                                    <button className="button btn-edit" onClick={() => HandleEdit(index)}>Edit</button>
                                    <button className="button btn-delete" onClick={() => DeleteItem(index)}>Delete</button>
                                </div>
                            </div>  
                        </>


                    ))}
                </ul>
            </div>

        </div> 
    );
}

export default TodoList;