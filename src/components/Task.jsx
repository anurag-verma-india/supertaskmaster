import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";

import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const Task = ({ id, title, state }) => {

    const handleEditClick = () => {
        alert("You clicked edit");
    };
    const handleDeleteClick = () => {
        alert("You clicked delete");
    };

    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });

    useEffect(() => {
        const uid = cookies.get("uid");
        const userRef = ref(db, "users/" + uid);
    }, []);

    return (
        <>
            <div className="task" key={id}>
                <input
                    type="checkbox"
                    name="task-checkbox"
                    id=""
                    value={state}
                />
                <div className="task-title">{title}</div>
                <div className="icon-container" onClick={handleEditClick}>
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={EditIcon}
                        alt="Edit"
                    />
                </div>
                <div className="icon-container" onClick={handleDeleteClick}>
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={DeleteIcon}
                        alt="Edit"
                    />
                </div>
            </div>
        </>
    );
};

export default Task;
