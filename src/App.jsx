import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskListCollection from "./components/TaskListCollection";
import Navbar from "./components/Navbar";
import { useState } from "react";

import { userObjContext } from "./context/context";

function App() {
    const [userGlobalObj, setUserGlobalObj] = useState({});

    return (
        <>
            <userObjContext.Provider value={[userGlobalObj, setUserGlobalObj]}>
                <Navbar />
                <ToastContainer />
                <TaskListCollection />
            </userObjContext.Provider>
        </>
    );
}

export default App;
