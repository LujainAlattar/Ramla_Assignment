export interface Task {
    id: number;
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    category: string;
    dateTimeRange: [Date, Date];
    completed: boolean;
}