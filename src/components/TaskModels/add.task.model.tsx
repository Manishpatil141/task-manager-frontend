import React, { useState, ChangeEvent } from 'react';
import { Task } from '../TaskList/task.list';
import '../../assets/styles/addTask.model.css';
import background from "../../assets/images/addTask.jpg";

interface AddTaskModalProps {
    showModal: boolean;
    onClose: () => void;
    onSubmit: (newTask: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ showModal, onClose, onSubmit }) => {
    const [newTask, setNewTask] = useState<Task>({
        id: 0,
        title: '',
        description: '',
        priority: 'Low',
        dueDate: '',
        category: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setNewTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setNewTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = (): void => {
        onSubmit(newTask);
        setNewTask({
            id: 0,
            title: '',
            description: '',
            priority: 'Low',
            dueDate: '',
            category: ''
        });
    };

    return (
        showModal ? (
            <div className="custom-modal" tabIndex={-2} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog custom-modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title-container">
                                <h4 className="modal-title">Add Task</h4>
                            </div>
                            <div className="close-button-container">
                                <button type="button" className="close-button" aria-label="Close" onClick={onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div className="modal-body" style={{backgroundImage:`url(${background})`}}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" className="form-control" name="title" value={newTask.title} onChange={handleChange} placeholder="Enter title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" className="form-control" name="description" value={newTask.description} onChange={handleDescriptionChange} placeholder="Enter description" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="priority">Priority</label>
                                    <select id="priority" className="form-control" name="priority" value={newTask.priority} onChange={handleChange}>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dueDate">Due Date</label>
                                    <input type="date" id="dueDate" className="form-control" name="dueDate" value={newTask.dueDate} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select id="category" className="form-control" name="category" value={newTask.category} onChange={handleChange}>
                                        <option value="study">Study</option>
                                        <option value="work">Work</option>
                                        <option value="event">Event</option>
                                        <option value="daily life">Daily Life</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Add Task</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
};

export default AddTaskModal;
