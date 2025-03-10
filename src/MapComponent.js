// MapComponent.js
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import L from "leaflet";

// Ícono personalizado para los marcadores
const customIcon = new L.Icon({
    iconUrl: "/images/custom-marker.png", // Ruta de tu imagen de marcador
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

const MapComponent = () => {
    const [locations, setLocations] = useState([]); // Estado con ubicaciones

    useEffect(() => {
        // Escuchar cambios en la colección "locations" en Firebase en tiempo real
        const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
            const updatedLocations = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setLocations(updatedLocations);
        });

        return () => unsubscribe(); // Detener la suscripción al desmontar el componente
    }, []);

    // Función para actualizar Firestore cuando se mueve un marcador
    const handleMarkerDragEnd = async (id, event) => {
        const { lat, lng } = event.target.getLatLng();
        try {
            const locationRef = doc(db, "locations", id);
            await updateDoc(locationRef, { lat, lng });
            console.log(`Ubicación actualizada: ${lat}, ${lng}`);
        } catch (error) {
            console.error("Error al actualizar ubicación: ", error);
        }
    };

    return (
        <MapContainer center={[20.3, -100.2]} zoom={12} style={{ height: "80vh", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {locations.map((loc) => (
                <Marker
                    key={loc.id}
                    position={[loc.lat, loc.lng]}
                    icon={customIcon}
                    draggable={true} // Permite arrastrar el marcador
                    eventHandlers={{
                        dragend: (event) => handleMarkerDragEnd(loc.id, event),
                    }}
                >
                    <Popup>
                        <h3>{loc.name}</h3>
                        <p><strong>Dirección:</strong> {loc.direccion || "No disponible"}</p>
                        <p><strong>Descripción:</strong> {loc.description || "No disponible"}</p>
                        <p><strong>Teléfono:</strong> {loc.telefono || "No disponible"}</p>
                        <p><strong>Latitud:</strong> {loc.lat}</p>
                        <p><strong>Longitud:</strong> {loc.lng}</p>
                        <p><strong>Última actualización:</strong> {new Date().toLocaleString()}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
