import "react";
import {Column as ColumnType, useBoardStore} from "../store/useBoardStore.ts";
import {Column} from "./Column.tsx";
import {DragDropContext, Droppable, OnDragEndResponder} from "react-beautiful-dnd";


interface BoardProps {
    columns: ColumnType[];
}

export const Board = ({columns}: BoardProps) => {

    const moveTask = useBoardStore((state) => state.moveTask);

    const handleDragEnd: OnDragEndResponder = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            // reordering tasks in the same column
            const column = columns.find((c) => c.id === source.droppableId);
            if (!column) return;

            const tasks = Array.from(column.tasks);
            const [removed] = tasks.splice(source.index, 1);
            tasks.splice(destination.index, 0, removed);

            column.tasks = tasks;
        } else {
            // moving task to a different column
            const sourceColumn = columns.find((c) => c.id === source.droppableId);
            const destinationColumn = columns.find(
                (c) => c.id === destination.droppableId
            );
            if (!sourceColumn || !destinationColumn) return;

            const sourceTasks = Array.from(sourceColumn.tasks);
            const [removed] = sourceTasks.splice(source.index, 1);
            const destinationTasks = Array.from(destinationColumn.tasks);
            destinationTasks.splice(destination.index, 0, removed);

            sourceColumn.tasks = sourceTasks;
            destinationColumn.tasks = destinationTasks;

            moveTask(removed.id, sourceColumn.id, destinationColumn.id);
        }
    };


    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-4">
                {columns.map((column) => (
                    <Droppable droppableId={column.id} key={column.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                key={column.id}
                            >
                                <Column column={column}/>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}