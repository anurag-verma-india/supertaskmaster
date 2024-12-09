import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import CheckedBox from "../assets/checked-checkbox.svg";
import EmptyCheckbox from "../assets/empty-checkbox.svg";

import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase/firebase";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";

const Task = ({ id, title, state, listNum }) => {
    const [isChecked, setIsChecked] = useState(false);
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
    useEffect(() => {
        setIsChecked(state);
    }, []);

    const handleCheckChange = () => {
        setIsChecked(!isChecked);
        const uid = cookies.get("uid");
        // console.log(uid);
        set(ref(db, `tasks/${uid}/list${listNum}/${id}`), {
            EditedTime: Date.now(),
            isChecked: !isChecked,
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
                    taskState={isChecked}
                    closeModalFunction={setEditModalOpen}
                />
            )}
            <div className="task" key={id}>
                {isChecked && (
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={CheckedBox}
                        alt="Edit"
                        id={id}
                        onClick={handleCheckChange}
                    />
                )}
                {!isChecked && (
                    <img
                        style={{ height: "1.5rem" }}
                        className="edit-icon-img"
                        src={EmptyCheckbox}
                        alt="Edit"
                        id={id}
                        onClick={handleCheckChange}
                    />
                )}
                {/* <img src={CheckedBox} alt="" />
                <img src={EmptyCheckbox} alt="" /> */}
                {/* <div onClick={console.log("clicked")}>
                    <input
                        type="checkbox"
                        name="task-checkbox"
                        id={id}
                        value={"example"}
                        onChange={console.log("changed")}
                        defaultChecked={false}
                    />
                </div> */}
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
