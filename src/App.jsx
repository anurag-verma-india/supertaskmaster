import "./App.css";
import EditIcon from "./assets/edit.svg";
import DeleteIcon from "./assets/delete.svg";
import STLogo from "./assets/four-logo.svg";
import NavbarGoogleLogin from "./components/NavbarGoogleLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const handleTitleEditClick = () => {
        alert("You clicked edit title");
    };

    const handleEditClick = () => {
        alert("You clicked edit");
    };
    const handleDeleteClick = () => {
        alert("You clicked delete");
    };
    const returnTasks = (arr) => {
        // return <h1>This is hello</h1>;
        let finalArr = [];
        arr.forEach((element) => {
            finalArr.push(
                <div className="task" key={element}>
                    <input type="checkbox" name="task-checkbox" id="" />
                    <div className="task-title">Task {element}</div>
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
            );
        });
        return finalArr;
    };
    const handleAddClick = () => {
        alert("You clicked +");
    };

    return (
        <>
            <ToastContainer />
            <div className="main-title-navbar">
                <img
                    style={{ height: "2rem", paddingRight: "10px" }}
                    className="main-logo-img"
                    src={STLogo}
                    alt="Edit"
                />
                <h1>Super Taskmaster</h1>
                <NavbarGoogleLogin />
            </div>
            <div className="tasklist-container">
                <div className="list1 tasklist">
                    <div className="taskheading-container">
                        <div className="taskheading">Task Heading</div>
                        <div
                            className="icon-container"
                            onClick={handleTitleEditClick}
                        >
                            <img
                                style={{ height: "1.5rem" }}
                                className="edit-icon-img"
                                src={EditIcon}
                                alt="Edit"
                            />
                        </div>
                    </div>
                    <div className="task-container">
                        {returnTasks([1, 2, 3, 4])}
                    </div>
                    {/* <div className="task">
                        <input type="checkbox" name="task-checkbox" id="" />
                        <div className="task-title">{hello([1, 2, 3])}</div>
                    </div> */}
                </div>
                <div className="list2 tasklist">
                    <div className="taskheading-container">
                        <div className="taskheading">Task Heading</div>
                        <div
                            className="icon-container"
                            onClick={handleTitleEditClick}
                        >
                            <img
                                style={{ height: "1.5rem" }}
                                className="edit-icon-img"
                                src={EditIcon}
                                alt="Edit"
                            />
                        </div>
                    </div>
                    <div className="task-container">
                        {returnTasks([1, 2, 3, 4])}
                    </div>
                </div>
                <div className="list3 tasklist">
                    <div className="taskheading-container">
                        <div className="taskheading">Task Heading</div>
                        <div
                            className="icon-container"
                            onClick={handleTitleEditClick}
                        >
                            <img
                                style={{ height: "1.5rem" }}
                                className="edit-icon-img"
                                src={EditIcon}
                                alt="Edit"
                            />
                        </div>
                    </div>
                    <div className="task-container">
                        {returnTasks([1, 2, 3, 4])}
                    </div>
                </div>
                <div className="list4 tasklist">
                    <div className="taskheading-container">
                        <div className="taskheading">Task Heading</div>
                        <div
                            className="icon-container"
                            onClick={handleTitleEditClick}
                        >
                            <img
                                style={{ height: "1.5rem" }}
                                className="edit-icon-img"
                                src={EditIcon}
                                alt="Edit"
                            />
                        </div>
                    </div>
                    <div className="task-container">
                        {returnTasks([1, 2, 3, 4])}
                    </div>
                </div>
                <div className="center-wheel" onClick={handleAddClick}>
                    +
                </div>
            </div>
        </>
    );
}

export default App;
