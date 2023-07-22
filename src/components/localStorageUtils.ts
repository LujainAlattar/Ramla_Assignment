import { Task } from './types';

const LOCAL_STORAGE_KEY = 'tasks';

export const getStoredData = (): Task[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
        return JSON.parse(data);
    }
    return [];
};

export const storeData = (tasks: Task[]): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};
