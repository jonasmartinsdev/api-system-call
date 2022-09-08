import { format } from 'date-fns';
import { Router } from 'express';
import { Called } from '../database/firebase';

const calledRoutes = Router();

interface CalledProps {
  id: string;
  subject: string;
  customer: string;
  customerId: string;
  created: Date;
  createdFormate: string;
  status: string;
  complement: string;
}

// Cadastrar novo Chamado
calledRoutes.post('/', async (request, response) => {
  const { customer, customerId, subject, status, complement, userId } =
    request.body;

  await Called.add({
    created: new Date(),
    customer,
    customerId,
    subject,
    status,
    complement,
    userId,
  });

  return response.json();
});

// Listar todos os chamados
calledRoutes.get('/', async (request, response) => {
  const listCalled = [] as CalledProps[];
  const snapshot = await Called.orderBy('created', 'desc').get();

  snapshot.forEach(doc => {
    listCalled.push({
      id: doc.id,
      subject: doc.data().subject,
      customer: doc.data().customer,
      customerId: doc.data().customer,
      created: doc.data().created,
      createdFormate: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
      status: doc.data().status,
      complement: doc.data().complement,
    });
  });

  return response.json(listCalled);
});

// Listar apenas um chamado

calledRoutes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const called = await Called.doc(id).get();

  return response.json(called.data());
});

// Editar chamados
calledRoutes.put('/:id', async (request, response) => {
  const { customer, customerId, subject, status, complement, userId } =
    request.body;

  const { id } = request.params;

  await Called.doc(id).update({
    customer,
    customerId,
    subject,
    status,
    complement,
    userId,
  });

  return response.json();
});

export default calledRoutes;
