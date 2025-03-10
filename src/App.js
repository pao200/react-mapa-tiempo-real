import React from "react";
import MapComponent from "./MapComponent"; 
import AddLocationButton from "./AddLocation"; 

function App() {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>📍 Mapa en Tiempo Real</h2>
            <p>Visualiza ubicaciones en tiempo real desde Firebase Firestore.</p>
            
            <AddLocationButton /> {/* Botón para agregar ubicaciones */}
            
            <div style={{ marginTop: "10px", borderRadius: "10px", overflow: "hidden" }}>
                <MapComponent /> {/* Renderiza el mapa sin buscador */}
            </div>
        </div>
    );
}

export default App;
