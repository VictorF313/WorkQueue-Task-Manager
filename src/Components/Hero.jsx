import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [task, setTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("Task")) || [];
        setAllTasks(storedTasks);
    }, []);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const addTask = () => {
        if (task.trim() === "") {
            setShowModal(true);
            return;
        }

        const updatedTasks = [...allTasks, task.trim()];
        localStorage.setItem("Task", JSON.stringify(updatedTasks));
        setAllTasks(updatedTasks);
        setTask("");
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const deleteTask = (indexToDelete) => {
        const updatedTasks = allTasks.filter((_, index) => index !== indexToDelete);
        localStorage.setItem("Task", JSON.stringify(updatedTasks));
        setAllTasks(updatedTasks);
    };

    const editTask = (index) => {
        const newTask = prompt("Edit the task:", allTasks[index]);
        if (newTask !== null && newTask.trim() !== "") {
            const updatedTasks = [...allTasks];
            updatedTasks[index] = newTask.trim();
            localStorage.setItem("Task", JSON.stringify(updatedTasks));
            setAllTasks(updatedTasks);
        }
    };


    return (
        <div className="hero">
            <div className="entryField">
                <input
                    id='textHolder'
                    value={task}
                    onChange={handleChange}
                    placeholder="Enter Task"
                    autoFocus
                />
                <button className="bi bi-plus-square-fill addTask button" onClick={addTask}>
                </button>
            </div>

            {showModal && (
                <div className="modalOverlay" onClick={closeModal}>
                    <div className="modalContent" onClick={e => e.stopPropagation()}>
                        <p>Please write something before adding a task!</p>
                        <button onClick={closeModal} className="modalCloseBtn">Close</button>
                    </div>
                </div>
            )}

            <div className="taskSection">
                <div className="taskCounter">
                    <div className="counter">
                        Total Tasks: {allTasks.length}
                    </div>
                </div>
                <div className="taskarea">
                    {allTasks.length === 0 ? (
                        <div className="emptyNotice">
                            No tasks available. Add one to get started!
                        </div>
                    ) : (
                        allTasks.map((taskItem, index) => (
                            <div className="tasksAndButtons" key={index}>
                                <div className="task">{taskItem}</div>
                                <button className="bi bi-pencil-square editTask button" onClick={() => editTask(index)}>
                                </button>
                                <button className="bi bi-trash-fill deleteTask button" onClick={() => deleteTask(index)}>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;