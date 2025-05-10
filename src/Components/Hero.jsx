import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [task, setTask] = useState("");
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("Task")) || [];
        setAllTasks(storedTasks);
    }, []);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const addTask = () => {
        if (!task.trim()) {
            alert("Task is empty");
            return;
        }

        const updatedTasks = [...allTasks, task];
        localStorage.setItem("Task", JSON.stringify(updatedTasks));
        setAllTasks(updatedTasks);
        setTask(""); // clear input
    };

    const deleteTask = (indexToDelete) => {
        const updatedTasks = allTasks.filter((_, index) => index !== indexToDelete);
        localStorage.setItem("Task", JSON.stringify(updatedTasks));
        setAllTasks(updatedTasks);
    };

    const editTask = (index) => {
        const newTask = prompt("Edit the task:", allTasks[index]);
        if (newTask !== null) {
            const updatedTasks = [...allTasks];
            updatedTasks[index] = newTask;
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
                <button className={`addTask button`} onClick={addTask}></button>
            </div>
            <div className="taskarea">
                {allTasks.map((taskItem, index) => (
                    <div className="tasksAndButtons" key={index}>
                        <div className="task">{taskItem}</div>
                        <button className={`editTask button`} onClick={() => editTask(index)}></button>
                        <button className={`deleteTask button`} onClick={() => deleteTask(index)}></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;