import 'react';
import {Task as TaskType, useBoardStore} from "../store/useBoardStore.ts";

interface TaskProps {
    task: TaskType;
    columnId: string;
}

export const Task = ({task, columnId}: TaskProps) => {
    const {id, text} = task;
    const editTask = useBoardStore((state) => state.editTask);
    const removeTask = useBoardStore((state) => state.removeTask);

    return (
        <div className="flex px-2 py-3 border-2 justify-between">
            {/* sandwich div to drag and drop */}
            <div className="p-2">☰</div>
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
