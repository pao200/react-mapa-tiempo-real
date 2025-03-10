import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";
import L from "leaflet";

// Ícono personalizado para los marcadores
const customIcon = new L.Icon({
    iconUrl: "/images/custom-marker.png", // Imagen del marcador
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32],
});

const MapComponent = () => {
    const [locations, setLocations] = useState([]); // Estado con ubicaciones

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
            const updatedLocations = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setLocations(updatedLocations);
        });

        return () => unsubscribe();
    }, []);

    return (
        <MapContainer center={[20.597, -100.392]} zoom={10} style={{ height: "80vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((loc) => (
                <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                    <Popup>
                        <h3>{loc.name}</h3>
                        <p><strong>Latitud:</strong> {loc.lat}</p>
                        <p><strong>Longitud:</strong> {loc.lng}</p>
                        {loc.description && <p><strong>Descripción:</strong> {loc.description}</p>}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
