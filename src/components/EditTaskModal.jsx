import { useEffect, useState } from "react";
import "./Modal.css";
import Cookies from "universal-cookie";

import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase/firebase";

const EditTaskModal = ({ closeModalFunction, taskTitle, taskList, taskID }) => {
    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });
    const closeModal = () => {
        closeModalFunction(false);
    };

    const [currTask, setCurrTask] = useState({
        title: taskTitle,
        list: taskList,
        taskIDState: taskID,
    });

    const handleTaskSave = () => {
        // const randomID = Math.random().toString(36).slice(2);
        const uid = cookies.get("uid");

        // tasks/uid/list(num)/(taskID)/{task}

        // If the task id has changed
        if (currTask.list !== taskList) {
            // set the original task to empty (i.e. delete it)
            set(ref(db, `tasks/${uid}/list${taskList}/${taskID}`), {});
        }

        set(ref(db, `tasks/${uid}/list${currTask.list}/${taskID}`), {
            title: currTask.title,
            state: false,
            creationTime: Date.now(),
        });

        closeModal();
    };
    return (
        <>
            <div className="modalExtBG" onClick={closeModal} />
            <div className="modalBackgroundEdit">
                <div className="modalEditContainer">
                    <div className="titleCloseBtn">
                        <button onClick={closeModal}>x</button>
                    </div>
                    <div className="title">
                        <h1>Edit Task</h1>
                    </div>
                    <div className="body">
                        <div className="inputContainer">
                            <label htmlFor="task" id="taskLabel">
                                Task Title
                            </label>
                            <input
                                id="taskInput"
                                type="text"
                                placeholder="Add your task"
                                value={currTask.title}
                                onChange={(e) => {
                                    setCurrTask({
                                        ...currTask,
                                        title: e.target.value,
                                    });
                                }}
                            />
                            <select
                                name="taskGroup"
                                id="taskGroup"
                                onChange={(e) => {
                                    setCurrTask({
                                        ...currTask,
                                        list: e.target.value,
                                    });
                                }}
                            >
                                <option value="0">Group 1</option>
                                <option value="1">Group 2</option>
                                <option value="2">Group 3</option>
                                <option value="3">Group 4</option>
                            </select>
                        </div>
                    </div>
                    <div className="footer">
                        <button id="cancelBtn" onClick={closeModal}>
                            Cancel
                        </button>
                        <button id="saveTask" onClick={handleTaskSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditTaskModal;
