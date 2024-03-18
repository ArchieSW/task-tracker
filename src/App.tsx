import {useColumnStore} from "./store/useColumnStore.ts";
import {Board} from "./components/Board.tsx";

function App() {
    const columns = useColumnStore((state) => state.columns);

    return (
        <div className="h-screen w-screen bg-gray-50 flex justify-center">
            <Board columns={columns} />
        </div>
    )
}

export default App
