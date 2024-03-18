import {useColumnStore} from "../store/useColumnStore.ts";
import {Board} from "../components/Board.tsx";


export const BoardPage = () => {
    const columns = useColumnStore((state) => state.columns);

    return (
        <div className="container">
            <Board columns={columns} />
        </div>
    )
}