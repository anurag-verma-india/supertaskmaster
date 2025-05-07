import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import CheckedBox from "../assets/checked-checkbox.svg";
import EmptyCheckbox from "../assets/empty-checkbox.svg";

import { ref, set } from "firebase/database";
import { db } from "../firebase/firebase";
import Cookies from "universal-cookie";
import { useState } from "react";
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
        // console.log(id);

        // tasks/uid/list(num)/(taskID)/{task}
        const uid = cookies.get("uid");
        // console.log("listNumber\n", listNum);
        set(ref(db, `tasks/${uid}/list${listNum}/${id}`), {});
    };

    const handleCheckChange = () => {
        const uid = cookies.get("uid");
        // console.log(uid);
        set(ref(db, `tasks/${uid}/list${listNum}/${id}`), {
            EditedTime: Date.now(),
            isChecked: !state,
            title: title,
        });
    };

    return (
        <>
            {editModalOpen && (
                <EditTaskModal
                    taskTitle={title}
                    taskList={listNum}
                    taskID={id}
                    taskState={state}
                    closeModalFunction={setEditModalOpen}
                />
            )}
            <div className="task" key={id}>
                {state && (
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={CheckedBox}
                        alt="Edit"
                        id={id}
                        onClick={handleCheckChange}
                    />
                )}
                {!state && (
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={EmptyCheckbox}
                        alt="Edit"
                        id={id}
                        onClick={handleCheckChange}
                    />
                )}
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
