import useGeolocation from "./useGeolocation";

function App() {
    const location = useGeolocation();

    return (
        <div className="App">
            {location.loaded
                ? JSON.stringify(location)
                : "Location data not available yet."}
        </div>
    )
}

export default App;