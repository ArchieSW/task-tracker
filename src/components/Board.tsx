import "react";
import {Column as ColumnType} from "../store/useColumnStore.ts";
import {Column} from "./Column.tsx";


interface BoardProps {
    columns: ColumnType[];
}

export const Board = ({columns}: BoardProps) => {

    return (
        <div className="flex space-x-4">
            {columns.map((column) => (
                <div key={column.id}>
                    <Column column={column}/>
                </div>
            ))}
        </div>
    );
}