import express, { Request, Response } from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();

/*
    Endpoint	Method	Purpose	Status
    POST /auth/token	POST	Login (JWT/bearer token generation)	✅
    DELETE /auth/token	DELETE	Logout (invalidate token)	✅
    POST /users	POST	Signup (user registration)	✅
    GET /users/me	GET	Get current user profile	✅
    PUT /users/me	PUT	Update current user	✅
    GET /users/me/reviews	GET	Get current user's reviews	✅
    GET /admin/users/:id	GET	Admin: get user by ID	⚠️ (admin)
    PATCH /admin/users/:id	PATCH	Admin: partial user update	⚠️ (admin)

*/





router.post('/users', createUser);
router.get('/users/me', createUser);


export default router;