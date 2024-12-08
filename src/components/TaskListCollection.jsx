import Cookies from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import { userObjContext } from "../context/context";
import { TaskList } from "./TaskList";
import Task from "./Task";

import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebase";

const TaskListCollection = () => {
    const [taskObj, setTaskObj] = useState({});
    const cookies = new Cookies(null, {
        path: "/",
        maxAge: 1000 * 365 * 24 * 60 * 60,
    });

    useEffect(() => {
        const uid = cookies.get("uid");
        const userRef = ref(db, "tasks/" + uid);

        onValue(userRef, (snapshot) => {
            const taskObjSnap = snapshot.val();
            // console.log(taskObjSnap);
            setTaskObj(taskObjSnap);
        });
    }, []);

    // const [userObj, setUserObj] = useState({
    //     taskLists: ["Do First", "Do Later", "Delegate", "Eliminate"],
    // });
    // const userGlobalObj = useContext(UserContext)
    // useEffect(() => {
    //     async function getSetUser() {
    //         // console.log("start")
    //         const uidFromCookies = cookies.get("uid");
    //         // console.log("got cookies\n", uidFromCookies)
    //         // const userFromDB = getUserFromUID(uidFromCookies);
    //         const userFromDB = await updateUserFromUID(uidFromCookies);
    //         // console.log("got user")
    //         setUserObj(userFromDB);
    //         // console.log("set user successfull")
    //         // updateUserFromUID(uidFromCookies);
    //         setUserObj(userFromDB);
    //         console.log(userFromDB);
    //     }
    //     getSetUser();
    // }, []);

    const handleAddClick = () => {
        alert("You clicked +");
    };
    const returnTasks = (arr) => {
        // return <h1>This is hello</h1>;
        let finalArr = [];
        arr.forEach((element) => {
            finalArr.push(
                <Task
                    id={1}
                    key={element}
                    title={"Sample Title"}
                    state={false}
                />
            );
        });
        return finalArr;
    };

    const assembleTask = (tasksObj) => {
        let finalArr = [];
        if (taskObj !== null && taskObj !== undefined) {
            for (const [taskID, taskDetails] of Object.entries(tasksObj)) {
                finalArr.push(
                    <Task
                        id={taskID}
                        key={taskID}
                        title={taskDetails.title}
                        state={taskDetails.state}
                    />
                );
            }
            return finalArr;
        }
    };

    return (
        <>
            <div className="tasklist-container">
                {/* {returnTaskLists()} */}
                <TaskList listNumber="0" key="0">
                    {/* {returnTasks([1, 2, 3, 4])} */}
                    {taskObj.list0 && assembleTask(taskObj.list0)}
                </TaskList>
                <TaskList listNumber="1" key="1">
                    {/* {returnTasks([1, 2, 3, 4])} */}
                    {taskObj.list1 && assembleTask(taskObj.list1)}
                </TaskList>
                <TaskList listNumber="2" key="2">
                    {/* {returnTasks([1, 2, 3, 4])} */}
                    {taskObj.list2 && assembleTask(taskObj.list2)}
                </TaskList>
                <TaskList listNumber="3" key="3">
                    {/* {returnTasks([1, 2, 3, 4])} */}
                    {taskObj.list3 && assembleTask(taskObj.list3)}
                </TaskList>
                <div className="center-wheel" onClick={handleAddClick}>
                    +
                </div>
            </div>
        </>
    );
};

export default TaskListCollection;
