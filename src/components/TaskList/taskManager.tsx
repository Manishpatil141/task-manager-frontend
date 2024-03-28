import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../NavBars/side.navbar';
import TopNavbar from '../NavBars/top.navbar';
import '../../assets/styles/list.css';
import TaskList, { Task } from './task.list';
import TaskDetailsModal from '../TaskModels/task.list.model';
import AddTaskModal from '../TaskModels/add.task.model';
import addButtonImage from '../../assets/images/add.png'; // Import the image
import LoadingSpinner from '../loadingIcons/loading';

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Task 1', description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable", priority: 'Low', dueDate: '2024-04-01', category: 'Category B' },
        { id: 2, title: 'Task 2', description: 'This is task 2', priority: 'Medium', dueDate: '2024-04-02', category: 'Category B' }, 
        { id: 3, title: 'Task 3', description: 'This is task 3', priority: 'High', dueDate: '2024-04-03', category: 'Category C' },
        { id: 4, title: 'Task 4', description: 'This is task 4', priority: 'Low', dueDate: '2024-04-04', category: 'Category A' }
    ]);

    const [showAddModal, setShowAddModal] = useState(false); // State for showing Add Task modal
    const [showViewModal, setShowViewModal] = useState(false); // State for showing View Task modal
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isLoadingAddModal, setIsLoadingAddModal] = useState(false); // State for loading state of Add Task modal
    const [isLoadingViewModal, setIsLoadingViewModal] = useState(false);

    const handleEdit = (taskId: number): void => {
        console.log(`Edit button clicked for task ID: ${taskId}`);
        // Implement your edit logic here
    };

    const handleDelete = (taskId: number): void => {
        console.log(`Delete button clicked for task ID: ${taskId}`);
        // Implement your delete logic here
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleSetPriority = (taskId: number, priority: 'Low' | 'Medium' | 'High'): void => {
        console.log(`Set priority button clicked for task ID: ${taskId}`);
        // Implement your set priority logic here
        setTasks(tasks.map(task => task.id === taskId ? { ...task, priority } : task));
    };

    const handleView = (task: Task): void => {
        setSelectedTask(task);
        setIsLoadingViewModal(true); // Show loading indicator before opening the modal
        // Simulate a delay to demonstrate loading
        setTimeout(() => {
            setShowViewModal(true);
            setIsLoadingViewModal(false); // Hide loading indicator after opening the modal
        }, 1000); // Adjust the timeout as needed
    };

    const handleCloseAddModal = (): void => {
        setShowAddModal(false);
    };

    const handleCloseViewModal = (): void => {

        setShowViewModal(false);
    };

    const handleAddTask = (): void => {
        setIsLoadingAddModal(true); // Start loading
        setShowAddModal(true); // Show the modal
    };
    
    useEffect(() => {
        if (showAddModal) {
            // Simulate a delay to demonstrate loading
            const timeout = setTimeout(() => {
                setIsLoadingAddModal(false); // Stop loading after the modal is completely loaded
            }, 500); // Adjust the timeout as needed
    
            return () => clearTimeout(timeout); // Clear the timeout on component unmount
        }
    }, [showAddModal]); // Trigger effect when the showAddModal state changes
    
    const handleAddTaskSubmit = (newTask: Task): void => {
        // Logic to submit new task data to the backend
        console.log('Submitting new task:', newTask);
        // Assuming you have a function to submit data to the backend, you can call it here
        // After successful submission, you can update the tasks state with the new task
        setTasks([...tasks, newTask]);
        setShowAddModal(false); // Close the modal after submission
    };

    return (
        <div className="container-fluid" style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                    <TopNavbar onSearch={() => { }} />
                    <div className="task-manager">
                        <TaskList
                            tasks={tasks}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetPriority={handleSetPriority}
                            onView={handleView}
                        />
                    </div>
                </div>
            </div>
            <img src={addButtonImage} alt="Add Task" className="add-task-button" onClick={handleAddTask} />
            <AddTaskModal showModal={showAddModal} onClose={handleCloseAddModal} onSubmit={handleAddTaskSubmit} />
            {isLoadingAddModal && <LoadingSpinner />}
            <TaskDetailsModal showModal={showViewModal} selectedTask={selectedTask} onClose={handleCloseViewModal} />
            {isLoadingViewModal && <LoadingSpinner />}
        </div>
    );
};

export default TaskManager;
