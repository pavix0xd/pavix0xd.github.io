import useMousePosition from "../hooks/useMousePosition";

export default function MouseTracker() {
    const { x, y } = useMousePosition();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Mouse Position Tracker</h1>
            <p className="text-lg">X: {x}, Y: {y}</p>
        </div>
    );
}
