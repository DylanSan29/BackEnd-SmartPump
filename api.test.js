import request from 'supertest';
import app from './server'; // Asume que tienes configurado el servidor
import { User } from './models/userModel.js';

// Mock del modelo User
jest.mock('./models/userModel.js', () => ({
  User: {
    data: {
      users: [
        { _id: '1', email: 'henderson.briggs@geeknet.net', password: '23derd*334', balance: 100 },
        { _id: '2', email: 'user@example.com', password: 'password123', balance: 50 },
      ],
    },
    write: jest.fn(), // Mock para la función write() si la usas para persistir cambios
  },
}));

// Mock para el middleware de autenticación
jest.mock('./middleware/authMiddlerware.js', () => ({
  authenticate: (req, res, next) => next(), // Simula que la autenticación siempre pasa
}));

// Tests para las rutas
describe('User API', () => {

  describe('POST /api/login', () => {
    it('should return 200 and token for valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ email: 'henderson.briggs@geeknet.net', password: '23derd*334' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();  // Asume que el login genera un token
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ email: 'invalid@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('GET /api/user/:userId', () => {
    it('should return user details for a valid userId', async () => {
      const response = await request(app).get('/api/user/1');
      expect(response.body.email).toBe('henderson.briggs@geeknet.net');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/user/999'); // Usuario no existente
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('GET /api/balance/:userId', () => {
    it('should return balance for a valid userId', async () => {
      const response = await request(app).get('/api/balance/1');
      expect(response.status).toBe(200);
      expect(response.body.balance).toBe(100);
    });

    it('should return 404 for non-existent userId', async () => {
      const response = await request(app).get('/api/balance/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('PATCH /api/user/:userId', () => {
    it('should update user balance for valid userId', async () => {
      const response = await request(app)
        .patch('/api/user/1')
        .send({ balance: 200 });

      expect(response.status).toBe(200);
      expect(response.body.updatedUser.balance).toBe(200);
      expect(response.body.message).toBe('User updated successfully');
    });

    it('should return 404 for non-existent userId', async () => {
      const response = await request(app)
        .patch('/api/user/999')
        .send({ balance: 200 });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('User not found');
    });
  });

  describe('GET /api/AllUsers', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/AllUsers');
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 404 if no users are found', async () => {
      User.data.users = [];  // Simula que no hay usuarios
      const response = await request(app).get('/api/AllUsers');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('No users found');
    });
  });
});
