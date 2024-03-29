import 'react';
import {Column as ColumnType, useBoardStore} from "../store/useBoardStore.ts";
import {Task} from "./Task.tsx";
import {Draggable} from "react-beautiful-dnd";

interface ColumnProps {
    column: ColumnType;
}

export const Column = ({column}: ColumnProps) => {
    const addTask = useBoardStore((state) => state.addTask);

    return (
        <div className="bg-white p-4 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-2">{column.title}</h2>
            <div>
                {column.tasks.map((task, index) => (
                    <Draggable draggableId={task.id} index={index}>
                        {(provided) => (
                            <div key={task.id} className="my-2">
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Task task={task} columnId={column.id}/>
                                </div>
                            </div>
                        )}
                    </Draggable>
                ))}
            </div>
            <div className="min-w-fit flex justify-center">
                <button onClick={() => addTask(column.id, "New task")}>
                    Add Task
                </button>
            </div>
        </div>
    );
}