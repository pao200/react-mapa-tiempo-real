// App.js
import React from "react";
import MapComponent from "./MapComponent"; 

function App() {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>📍 Mapa en Tiempo Real</h2>
            <p>Visualiza ubicaciones en tiempo real desde Firebase Firestore.</p>

            <div style={{ marginTop: "10px", borderRadius: "10px", overflow: "hidden" }}>
                <MapComponent /> {/* Renderiza solo el mapa */}
            </div>
        </div>
    );
}

export default App;
