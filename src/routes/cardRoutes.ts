import express from 'express';
import {
    getCardsByColumnId,
    createCard,
    updateCard,
    deleteCard,
    updateCardPosition,
    updateCardPosition_column,
} from '../controllers/cardController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.get('/cards/:column_id', authenticate, getCardsByColumnId);//obtener las cartas de una columna
router.post('/cards', authenticate, createCard);//crear una nueva carta
router.put('/cards/:id', authenticate, updateCard);//actualizar una carta
router.put('/cards_position', authenticate, updateCardPosition);//cambiar la posicion de una carta
router.patch('/cards/position_column', updateCardPosition_column)// cambia la posicon de la targeta 
router.delete('/cards/:id', authenticate, deleteCard);//eliminar una carta

export default router;