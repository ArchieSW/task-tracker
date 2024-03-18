import create from 'zustand';
import {nanoid} from "nanoid";
import {persist} from "zustand/middleware";

export type Task = {
    id: string;
    text: string;
};

export type Column = {
    id: string;
    title: string;
    tasks: Task[];
};


export type Store = {
    columns: Column[];
    addColumn: (title: string) => void;
    addTask: (columnId: string, text: string) => void;
    moveTask: (taskId: string, fromColumnId: string, toColumnId: string) => void;
    editTask: (taskId: string, newText: string) => void;
    removeTask: (taskId: string, columnId: string) => void;
};

const INITIAL_COLUMNS: Column[] = [
    {
        id: 'todo',
        title: 'Todo',
        tasks: [{id: nanoid(), text: "make some noise"}, {id: nanoid(), text: "meke more noise!"}]
    },
    {id: 'in-progress', title: 'In Progress', tasks: []},
    {id: 'done', title: 'Done', tasks: []},
];

export const useBoardStore = create(
    persist<Store>(
        (set, get) => ({
            columns: INITIAL_COLUMNS,

            addColumn: (title) =>
                set((state) => ({
                    columns: [...state.columns, {id: nanoid(), title, tasks: []}],
                })),

            addTask: (columnId, text) =>
                set((state) => ({
                    columns: state.columns.map((column) =>
                        column.id === columnId
                            ? {...column, tasks: [...column.tasks, {id: nanoid(), text}]}
                            : column
                    ),
                })),

            moveTask: (taskId, fromColumnId, toColumnId) =>
                set((state) => {
                    const fromColumn = state.columns.find((c) => c.id === fromColumnId);
                    const toColumn = state.columns.find((c) => c.id === toColumnId);

                    if (!fromColumn || !toColumn) return state;

                    const task = fromColumn.tasks.find((t) => t.id === taskId);

                    if (!task) return state;

                    const newFromColumn = {
                        ...fromColumn,
                        tasks: fromColumn.tasks.filter((t) => t.id !== taskId),
                    };

                    const newToColumn = {
                        ...toColumn,
                        tasks: [...toColumn.tasks, task],
                    };

                    return {
                        ...state,
                        columns: state.columns.map((column) =>
                            column.id === fromColumnId
                                ? newFromColumn
                                : column.id === toColumnId
                                    ? newToColumn
                                    : column
                        ),
                    };
                }),

            editTask: (taskId, newText) =>
                set((state) => ({
                    columns: state.columns.map((column) => ({
                        ...column,
                        tasks: column.tasks.map((task) =>
                            task.id === taskId ? {...task, text: newText} : task
                        ),
                    })),
                })),

            removeTask: (taskId, columnId) =>
                set((state) => ({
                    columns: state.columns.map((column) =>
                        column.id === columnId
                            ? {...column, tasks: column.tasks.filter((t) => t.id !== taskId)}
                            : column
                    ),
                })),

        }),
        {
            name: 'kanban-board',
        }
    )
);
