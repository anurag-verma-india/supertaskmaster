import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";

import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase/firebase";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";

const Task = ({ id, title, state, listNum }) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const handleEditClick = () => {
        // alert("You clicked edit");
        setEditModalOpen(!editModalOpen);
    };
    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });
    const handleDeleteClick = () => {
        // alert("You clicked delete");
        console.log(id);

        // tasks/uid/list(num)/(taskID)/{task}
        const uid = cookies.get("uid");
        console.log("listNumber\n", listNum);
        set(ref(db, `tasks/${uid}/list${listNum}/${id}`), {});
    };

    return (
        <>
            {editModalOpen && (
                <EditTaskModal
                    taskTitle={title}
                    taskList={listNum}
                    taskID={id}
                    closeModalFunction={setEditModalOpen}
                />
            )}
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
