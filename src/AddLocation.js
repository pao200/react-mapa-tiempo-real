import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const agregarUbicacion = async () => {
    try {
        const docRef = await addDoc(collection(db, "locations"), {
            name: "Plaza Comercial",
            lat: 30.620,
            lng: -100.405,
            description: "Centro comercial con tiendas y restaurantes."
        });
        console.log("Ubicación agregada con ID:", docRef.id);
    } catch (error) {
        console.error("Error al agregar ubicación: ", error);
    }
};

export default function AddLocationButton() {
    return (
        <button
            onClick={agregarUbicacion}
            style={{
                backgroundColor: "#28a745", // Verde
                color: "white",
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
                marginBottom: "10px",
                fontWeight: "bold",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
            ➕ Agregar Ubicación
        </button>
    );
}
