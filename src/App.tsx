import React, { useState } from 'react';
import './index.css';
import { Breadcrumb, Divider, Layout, Menu, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { Task } from './components/types';
import { getStoredData, storeData } from './components/localStorageUtils';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const storedData: Task[] = getStoredData();
  const [tasks, setTasks] = useState<Task[]>(storedData);

  // Function to handle task addition
  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
    storeData([...tasks, task]);
  };

  // Function to handle task deletion
  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    storeData(updatedTasks);
  };

  // Function to handle task completion status toggle
  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    storeData(updatedTasks);
  };

  // Function to handle task editing
  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    storeData(updatedTasks);
  };

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1d39c4',
          justifyContent: 'space-between',
        }}
      >
        <h3 style={{ color: 'white', fontFamily: 'cursive' }}>Task Manager</h3>
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Space>
      </Header>
      <Content style={{ padding: '20px 50px', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
        <TaskForm onSubmit={handleAddTask} />
        <Divider type="vertical" style={{ height: '600px' }} />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

export default App;