import { Router } from 'express';
import { Customers } from '../database/firebase';

const customersRoutes = Router();

interface CustomerProps {
  id: string;
  address: string;
  cnpj: string;
  enterprise: string;
}

// Listar Clientes
customersRoutes.get('/', async (request, response) => {
  const listCustomer = [] as CustomerProps[];
  const snapshot = await Customers.get();

  snapshot.forEach(doc => {
    listCustomer.push({
      id: doc.id,
      address: doc.data().address,
      cnpj: doc.data().cnpj,
      enterprise: doc.data().enterprise,
    });
  });

  return response.json(listCustomer);
});

// Cadastrar novo Cliente
customersRoutes.post('/', async (request, response) => {
  const { enterprise, cnpj, address } = request.body;

  await Customers.add({
    enterprise,
    cnpj,
    address,
  });

  return response.json();
});

export default customersRoutes;
