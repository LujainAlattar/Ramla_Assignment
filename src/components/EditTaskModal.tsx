import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { Task } from './types';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface EditTaskModalProps {
    visible: boolean;
    task: Task;
    onCancel: () => void;
    onSave: (task: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ visible, task, onCancel, onSave }) => {
    const [form] = Form.useForm();
    const [editedTask, setEditedTask] = useState<Task | null>(null);

    const initialDateTimeRange = task?.dateTimeRange
        ? task.dateTimeRange.map((dateString) => moment.utc(dateString))
        : null;


    useEffect(() => {
        setEditedTask(task);
        form.resetFields();
    }, [task]);

    const handleSave = () => {
        form.validateFields().then((values) => {
            const updatedTask: Task = {
                ...editedTask!,
                name: values.name,
                description: values.description,
                priority: values.priority,
                category: values.category,
                dateTimeRange: values.dateTimeRange,
            };
            onSave(updatedTask);
        });
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Modal
            visible={visible}
            title="Edit Task"
            onCancel={handleCancel}
            onOk={handleSave}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    initialValue={task?.name}
                    rules={[{ required: true, message: 'Please enter the task name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    initialValue={task?.description}
                    rules={[{ required: true, message: 'Please enter the task description' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Priority"
                    name="priority"
                    initialValue={task?.priority}
                    rules={[{ required: true, message: 'Please select the task priority' }]}
                >
                    <Select>
                        <Option value="High">High</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="Low">Low</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    initialValue={task?.category}
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select>
                        <Option value="Urgent and Important">Urgent and Important</Option>
                        <Option value="Not Urgent but Important">Not Urgent but Important</Option>
                        <Option value="Urgent but Not Important">Urgent but Not Important</Option>
                        <Option value="Not Urgent and Not Important">Not Urgent and Not Important</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Date and Time Range"
                    name="dateTimeRange"
                    initialValue={initialDateTimeRange}
                    rules={[{ required: true, message: 'Please select the date and time range' }]}
                >
                    <RangePicker showTime format="YYYY-MM-DD HH:mm" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskModal;
