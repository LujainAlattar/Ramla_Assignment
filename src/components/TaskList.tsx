import React, { useState } from 'react';
import { List, Button, Input, Select, Pagination } from 'antd';
import { Task } from './types';
import EditTaskModal from './EditTaskModal';
import { getStoredData, storeData } from './localStorageUtils';

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    // Filter the tasks based on search text, category, priority, and status
    const filteredTasks = tasks.filter((task) => {
        const includesText = task.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        const matchesCategory = !categoryFilter || task.category === categoryFilter;
        const matchesPriority = !priorityFilter || task.priority === priorityFilter;
        const matchesStatus = !statusFilter || (statusFilter === 'completed' ? task.completed : !task.completed);

        return includesText && matchesCategory && matchesPriority && matchesStatus;
    });
    // State to manage the edit modal
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Function to handle showing the edit modal
    const showEditModal = (task: Task) => {
        setSelectedTask(task);
        setEditModalVisible(true);
    };

    // Function to handle hiding the edit modal
    const hideEditModal = () => {
        setEditModalVisible(false);
        setSelectedTask(null);
    };


    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 4; // Number of items to display per page

    // Calculate the indexes for the currently displayed items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search tasks..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 250, marginRight: 16 }}
                />
                <Select
                    placeholder="Filter by category"
                    value={categoryFilter}
                    onChange={(value) => setCategoryFilter(value)}
                    style={{ width: 150, marginRight: 16 }}
                >
                    <Select.Option value={null}>All</Select.Option>
                    {/* Replace the following options with your actual categories */}
                    <Select.Option value="Urgent and Important">Urgent and Important</Select.Option>
                    <Select.Option value="Not Urgent but Important">Not Urgent but Important</Select.Option>
                    <Select.Option value="Urgent but Not Important">Urgent but Not Important</Select.Option>
                    <Select.Option value="Not Urgent and Not Important">Not Urgent and Not Important</Select.Option>
                </Select>
                <Select
                    placeholder="Filter by priority"
                    value={priorityFilter}
                    onChange={(value) => setPriorityFilter(value)}
                    style={{ width: 150, marginRight: 16 }}
                >
                    <Select.Option value={null}>All</Select.Option>
                    {/* Replace the following options with your actual priorities */}
                    <Select.Option value="High">High</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="Low">Low</Select.Option>
                </Select>
                <Select
                    placeholder="Filter by status"
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    style={{ width: 150, marginRight: 16 }}
                >
                    <Select.Option value={null}>All</Select.Option>
                    <Select.Option value="completed">Completed</Select.Option>
                    <Select.Option value="pending">Pending</Select.Option>
                </Select>
            </div>
            <List
                itemLayout="horizontal"
                style={{ width: '700px' }}
                dataSource={currentItems} // Use the currentItems array for pagination
                renderItem={(task) => (
                    <List.Item
                        actions={[
                            <Button onClick={() => onToggleComplete(task.id)}>{task.completed ? 'Undo' : 'Complete'}</Button>,
                            <Button onClick={() => onDelete(task.id)}>Delete</Button>,
                            <Button onClick={() => showEditModal(task)}>Edit</Button>,
                        ]}
                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    >
                        <List.Item.Meta
                            title={
                                <>
                                    {task.name}
                                    <div style={{ fontSize: '14px', color: task.priority === 'Low' ? 'green' : task.priority === 'Medium' ? 'blue' : 'red' }}>{task.priority}</div>
                                    <div style={{ fontSize: '14px', color: '#999' }}>{task.category}</div>
                                </>
                            }
                            description={task.description}
                        />
                        <div>
                            <div>{new Date(task.dateTimeRange[0]).toLocaleString(undefined, { hour12: true, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</div>
                            <div style={{ margin: '4px 0' }}>to</div>
                            <div>{new Date(task.dateTimeRange[1]).toLocaleString(undefined, { hour12: true, year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</div>
                        </div>
                    </List.Item>
                )}
            />
            {/* Pagination component */}
            <div style={{
                backgroundColor: '#fff',
                marginTop: '27px',
                padding: '8px 16px 8px ',
                border: '1px solid #e8e8e8',
                borderRadius: '10px',
                bottom: '0px'
            }}>
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={filteredTasks.length}
                    onChange={handlePageChange}
                />
            </div>
            {/* Render the EditTaskModal outside the List */}
            {selectedTask && (
                <EditTaskModal
                    visible={editModalVisible}
                    task={selectedTask}
                    onCancel={hideEditModal}
                    onSave={onEdit}
                />
            )}
        </div>
    );
};

export default TaskList;
