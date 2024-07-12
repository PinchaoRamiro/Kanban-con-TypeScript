import express from 'express';
import {
  createUser,
  loginUser,
  deleteUser,
  updateUserEmail,
  updateUserPassword,
  updateUserUsername,
  logoutUser,
  checkToken,
  getUserById
} from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Ruta para crear un nuevo usuario (registro)
router.post('/user/register', createUser);

// Ruta para el inicio de sesión
router.post('/user/login', loginUser);

// Ruta para cerrar sesión
router.post('/user/logout', authenticate, logoutUser);

// Ruta para eliminar usuario
router.delete('/user/delete', authenticate, deleteUser);

// Ruta para actualizar email de usuario
router.put('/user/update/email', authenticate, updateUserEmail);

// Ruta para actualizar password de usuario
router.put('/user/update/password', authenticate, updateUserPassword);

// Ruta para actualizar el username de usuario
router.put('/user/update/username', authenticate, updateUserUsername);

// Ruta para verificar el token
router.get('/user/check_token',checkToken);

// Ruta para obtener usuario por id
router.get('/user/:id', authenticate, getUserById);

export default router;
