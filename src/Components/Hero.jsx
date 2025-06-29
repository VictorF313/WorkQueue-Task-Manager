import React, { useState, useEffect, useMemo, useRef } from 'react';

const Hero = () => {
    const [task, setTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("Task")) || [];
        setAllTasks(storedTasks);
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key.length === 1 && inputRef.current !== document.activeElement) {
                inputRef.current.focus();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
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

    const getLocalStorageSize = () => {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                const value = localStorage.getItem(key);
                total += key.length + value.length;
            }
        }

        const bytes = total * 2;
        const kilobytes = bytes / 1024;
        return { bytes, kilobytes };
    };

    const { kilobytes } = useMemo(() => getLocalStorageSize(), [allTasks]);

    return (
        <div className="hero">
            <div className="entryField">
                <textarea
                    id="textHolder"
                    ref={inputRef}
                    value={task}
                    onChange={handleChange}
                    placeholder="Enter Task"
                    autoFocus
                />
                <button className="bi bi-plus-square-fill addTask button" onClick={addTask}></button>
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
                <div className="details">
                    <div className="counter">
                        Total Tasks: {allTasks.length}
                    </div>
                    <div className="totalSpace">
                        Total Space Used: {kilobytes.toFixed(2)} KB / {(kilobytes / 1024).toFixed(2)} MB
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
                                <button className="bi bi-pencil-square editTask button" onClick={() => editTask(index)}></button>
                                <button className="bi bi-trash-fill deleteTask button" onClick={() => deleteTask(index)}></button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;