import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { Task } from './types';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface TaskFormProps {
    onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const task: Task = {
                id: Date.now(),
                name: values.name,
                description: values.description,
                priority: values.priority,
                category: values.category,
                dateTimeRange: values.dateTimeRange,
                completed: false,
            };
            onSubmit(task);
            form.resetFields();
        });
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical" style={{ width: '500px', backgroundColor: 'white', padding: '19px', borderRadius: '10px', boxShadow: '0 0 3px #d9d9d9' }}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the task name' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter the task description' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
                label="Priority"
                name="priority"
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
                rules={[{ required: true, message: 'Please select the date and time range' }]}
            >
                <RangePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Task
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TaskForm;
