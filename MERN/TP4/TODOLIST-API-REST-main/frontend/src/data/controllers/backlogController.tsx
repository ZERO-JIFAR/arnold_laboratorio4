import { ITareaBacklog } from "../../types/ITareaBacklog";

const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las tareas
export const getTareasController = async (): Promise<ITareaBacklog[] | undefined> => {
  try {
    const response = await fetch(`${API_URL}/tareas`);
    if (!response.ok) throw new Error("Error al obtener tareas");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al obtener tareas:", error);
  }
};

// Crear nueva tarea
export const createTareaController = async (tarea: ITareaBacklog) => {
  try {
    const response = await fetch(`${API_URL}/tareas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarea),
    });
    if (!response.ok) throw new Error("Error al crear tarea");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al crear tarea:", error);
  }
};

// Actualizar tarea por ID
export const updateTareaController = async (id: string, tareaActualizada: Partial<ITareaBacklog>) => {
  try {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tareaActualizada),
    });
    if (!response.ok) throw new Error("Error al actualizar tarea");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al actualizar tarea:", error);
  }
};

// Eliminar tarea por ID
export const deleteTareaController = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/tareas/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar tarea");
    return await response.json();
  } catch (error) {
    console.error("❌ Error al eliminar tarea:", error);
  }
};
