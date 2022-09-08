import { Router } from 'express';
import { Auth, User } from '../database/firebase';

const usersRoutes = Router();

// Cadastrar novo usuário
usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const { user } = await Auth.createUserWithEmailAndPassword(email, password);

  await User.doc(user?.providerId).set({
    name,
    avatarURL: null,
    email,
  });

  return response.json(user);
});

// Login usuário
usersRoutes.post('/sessions', async (request, response) => {
  const { email, password } = request.body;

  const { user } = await Auth.signInWithEmailAndPassword(email, password);

  const userProfile = await User.doc(user?.providerId).get();

  const data = {
    uid: user?.uid,
    name: userProfile.data()?.name,
    avatarURL: userProfile.data()?.avatarURL,
    email: userProfile.data()?.email,
  };

  return response.json(data);
});

export default usersRoutes;
