import pool from '../db.js';
import z from 'zod';
import { columnSchema } from '../Schemas/columnsSchemas.js';
// Obtener las columnas por ID de usuario
export const getColumnByUserId = async (req, res) => {
    const { user_id } = req.params;
    // Validar column id manualmente
    if (user_id === 'undefined' || parseInt(user_id) <= 0 || !Number.isInteger(parseInt(user_id))) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    try {
        const { rows } = await pool.query('SELECT * FROM columns WHERE user_id = $1', [user_id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Column not found' });
        }
        res.status(200).json(rows);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors[0].message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Crear una nueva columna
export const createColumn = async (req, res) => {
    const { title, user_id } = req.body;
    try {
        columnSchema.parse({ title, user_id });
        const { rows } = await pool.query('INSERT INTO columns (title, user_id) VALUES ($1, $2) RETURNING *', [title, user_id]);
        res.status(201).json(rows[0]);
    }
    catch (error) {
        return handleError(error, res);
    }
};
// Actualizar una columna por ID
export const updateColumn = async (req, res) => {
    const { user_id } = req.params;
    const { title } = req.body;
    if (!title || !user_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (user_id === 'undefined' || parseInt(user_id) <= 0 || !Number.isInteger(parseInt(user_id))) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    try {
        columnSchema.parse({ title });
        const result = await pool.query('UPDATE columns SET title = $1 WHERE user_id = $2 RETURNING *', [title, user_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Column not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors[0].message });
        }
        return handleError(error, res);
    }
};
// Eliminar una columna por user_id
export const deleteColumn = async (req, res) => {
    const { user_id } = req.params;
    if (user_id === 'undefined' || parseInt(user_id) <= 0 || !Number.isInteger(parseInt(user_id))) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    try {
        const { rows } = await pool.query('DELETE FROM columns WHERE user_id = $1 RETURNING *', [user_id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Column not found' });
        }
        res.status(200).json({ message: 'Column deleted successfully' });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors[0].message });
        }
        return handleError(error, res);
    }
};
// manejador de errores
function handleError(error, res) {
    if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Validation error', details: error.errors[0].message });
    }
    // error del servidor cuando pide una columna que ya existe
    if (error.code === '23505') {
        return res.status(409).json({ error: 'Column already exists' });
    }
    // si el id de usuario es inválido
    if (error.code === '23503') {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    res.status(500).json({ error: 'Internal server error' });
}
//# sourceMappingURL=columnController.js.map