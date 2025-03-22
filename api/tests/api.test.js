const axios = require('axios');

const API_URL = 'http://localhost:3000/api';
let adminToken;
let studentToken;
let lessonId;

describe('API Tests', () => {
  const testEmail = `teste${Date.now()}@api.com`;
  const adminEmail = `admin${Date.now()}@api.com`;

  describe('Authentication', () => {
    test('should register a student user', async () => {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: 'Teste Student',
        email: testEmail,
        password: '123456',
        role: 'STUDENT'
      });

      expect(response.status).toBe(200);
      expect(response.data.user).toHaveProperty('id');
      expect(response.data.user.role).toBe('STUDENT');
    });

    test('should register an admin user', async () => {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: 'Teste Admin',
        email: adminEmail,
        password: '123456',
        role: 'ADMIN'
      });

      expect(response.status).toBe(200);
      expect(response.data.user).toHaveProperty('id');
      expect(response.data.user.role).toBe('ADMIN');
    });

    test('should not register with invalid data', async () => {
      try {
        await axios.post(`${API_URL}/auth/register`, {
          name: 'Te',
          email: 'invalid-email',
          password: '123'
        });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should login as student', async () => {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: testEmail,
        password: '123456'
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
      studentToken = response.data.token;
    });

    test('should login as admin', async () => {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: adminEmail,
        password: '123456'
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('token');
      adminToken = response.data.token;
    });

    test('should not login with invalid credentials', async () => {
      try {
        await axios.post(`${API_URL}/auth/login`, {
          email: testEmail,
          password: 'wrong-password'
        });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });
  });

  describe('Lessons', () => {
    test('should create lesson as admin', async () => {
      const response = await axios.post(
        `${API_URL}/lessons`,
        {
          title: 'Test Lesson',
          description: 'Test Description',
          category: 'GRAMMAR',
          level: 'BEGINNER',
          content: { blocks: [] },
          order: 1
        },
        {
          headers: { Authorization: `Bearer ${adminToken}` }
        }
      );

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('lesson');
      expect(response.data.lesson).toHaveProperty('id');
      lessonId = response.data.lesson.id;
    });

    test('should not create lesson as student', async () => {
      try {
        await axios.post(
          `${API_URL}/lessons`,
          {
            title: 'Test Lesson',
            description: 'Test Description',
            category: 'GRAMMAR',
            level: 'BEGINNER',
            content: { blocks: [] },
            order: 1
          },
          {
            headers: { Authorization: `Bearer ${studentToken}` }
          }
        );
      } catch (error) {
        expect(error.response.status).toBe(403);
      }
    });

    test('should list lessons', async () => {
      const response = await axios.get(`${API_URL}/lessons`, {
        headers: { Authorization: `Bearer ${studentToken}` }
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('lessons');
      expect(Array.isArray(response.data.lessons)).toBe(true);
    });

    test('should filter lessons by category', async () => {
      const response = await axios.get(`${API_URL}/lessons?category=GRAMMAR`, {
        headers: { Authorization: `Bearer ${studentToken}` }
      });

      expect(response.status).toBe(200);
      expect(response.data.lessons.every(l => l.category === 'GRAMMAR')).toBe(true);
    });
  });

  describe('Progress', () => {
    test('should list user progress', async () => {
      const response = await axios.get(`${API_URL}/progress`, {
        headers: { Authorization: `Bearer ${studentToken}` }
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('progress');
      expect(response.data).toHaveProperty('statistics');
    });

    test('should filter progress by status', async () => {
      const response = await axios.get(`${API_URL}/progress?status=NOT_STARTED`, {
        headers: { Authorization: `Bearer ${studentToken}` }
      });

      expect(response.status).toBe(200);
      expect(response.data.progress.every(p => p.status === 'NOT_STARTED')).toBe(true);
    });

    test('should not access progress without token', async () => {
      try {
        await axios.get(`${API_URL}/progress`);
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });
  });
}); 