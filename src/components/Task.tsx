import 'react';
import {Task as TaskType, useColumnStore} from "../store/useColumnStore.ts";

interface TaskProps {
    task: TaskType;
    columnId: string;
}

export const Task = ({task, columnId}: TaskProps) => {
    const {id, text} = task;
    const editTask = useColumnStore((state) => state.editTask);
    const removeTask = useColumnStore((state) => state.removeTask);

    return (
        <div className="flex px-2 py-3 border-2">
            <input
                type="text"
                value={text}
                onChange={(e) => editTask(id, e.target.value)}
                className="py-1"
            />
            <button
                onClick={() => removeTask(id, columnId)}
                className="bg-red-300 p-1"
            >
                Delete
            </button>
        </div>
    );
};
