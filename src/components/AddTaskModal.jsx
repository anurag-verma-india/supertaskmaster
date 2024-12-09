import { useState } from "react";
import "./Modal.css";
import Cookies from "universal-cookie";

import { onValue, ref, set } from "firebase/database";
import { db } from "../firebase/firebase";

const Modal = ({ closeModalFunction }) => {
    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });
    const closeModal = () => {
        closeModalFunction(false);
    };

    const [currTask, setCurrTask] = useState({ title: "", list: "0" });

    const handleTaskSave = () => {
        // console.log(JSON.parse(localStorage.getItem("taskObj")));
        // console.log(currTask);
        const randomID = Math.random().toString(36).slice(2);
        const uid = cookies.get("uid");

        // tasks/uid/list(num)/(taskID)/{task}

        // const taskListRef = ref(db, `tasks/${uid}/list${currTask.list}/`);
        // onValue(taskListRef, (snapshot) => {
        //     const specificTaskList = snapshot.val();
        //     console.log("curr task list: \n", specificTaskList);
        // });

        set(ref(db, `tasks/${uid}/list${currTask.list}/${randomID}`), {
            title: currTask.title,
            state: false,
            EditedTime: Date.now(),
        });

        closeModal();
    };
    return (
        <>
            <div className="modalExtBG" />
            <div className="modalBackground">
                <div className="modalContainer">
                    <form onSubmit={handleTaskSave}>
                        <div className="titleCloseBtn">
                            <button onClick={closeModal}>x</button>
                        </div>
                        <div className="title">
                            <h1>Add Task</h1>
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
                            <input type="submit" value="Save" id="saveTask" />
                            {/* <button
                            type="submit"
                            id="saveTask"
                            onClick={handleTaskSave}
                        >
                            Save
                        </button> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
