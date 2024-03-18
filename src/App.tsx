import {useBoardStore} from "./store/useBoardStore.ts";
import {Board} from "./components/Board.tsx";

function App() {
    const columns = useBoardStore((state) => state.columns);

    return (
        <div className="h-screen w-screen bg-gray-50 flex justify-center">
            <Board columns={columns} />
        </div>
    )
}

export default App
