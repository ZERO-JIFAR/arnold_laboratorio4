import { ITareaBacklog } from "../types/ITareaBacklog";

// URL de tu backend (expuesta desde Docker)
const API_URL = import.meta.env.VITE_API_URL; // Por ejemplo: "http://localhost:3001"

// Obtener todas las tareas
export const getTareas = async (): Promise<ITareaBacklog[]> => {
  const response = await fetch(`${API_URL}/tareas`);
  return response.json();
};

// Crear una tarea
export const crearTarea = async (nuevaTarea: ITareaBacklog) => {
  const response = await fetch(`${API_URL}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaTarea),
  });
  return response.json();
};

// Actualizar una tarea
export const actualizarTarea = async (id: string, tareaActualizada: Partial<ITareaBacklog>) => {
  const response = await fetch(`${API_URL}/tareas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tareaActualizada),
  });
  return response.json();
};

// Eliminar una tarea
export const eliminarTarea = async (id: string) => {
  await fetch(`${API_URL}/tareas/${id}`, {
    method: "DELETE",
  });
};
