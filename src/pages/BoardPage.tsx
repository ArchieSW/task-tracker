import {useBoardStore} from "../store/useBoardStore.ts";
import {Board} from "../components/Board.tsx";


export const BoardPage = () => {
    const columns = useBoardStore((state) => state.columns);

    return (
        <div className="container">
            <Board columns={columns} />
        </div>
    )
}