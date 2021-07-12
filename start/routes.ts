/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/employees', 'EmployeesController.all');

Route.get('/employees/:id', 'EmployeesController.one') //prettifier-ignore
  .where('id', {
    match: /^[0-9]+$/,
    cast: (id: string) => Number(id),
  });

Route.post('/employees', 'EmployeesController.newEmployee').middleware('auth');

Route.put('/employees/:id', 'EmployeesController.replaceEmployee') //prettifier-ignore
  .where('id', {
    match: /^[0-9]+$/,
    cast: (id: string) => Number(id),
  })
  .middleware('auth');

Route.delete('/employees/:id', 'EmployeesController.deleteEmployee') //prettifier-ignore
  .where('id', {
    match: /^[0-9]+$/,
    cast: (id: string) => Number(id),
  })
  .middleware('auth');

Route.get('/departments', 'DepartmentsController.all');

Route.get('/departments/:id', 'DepartmentsController.one') //prettifier-ignore
  .where('id', {
    match: /^[0-9]+$/,
    cast: (id: string) => Number(id),
  });

Route.post('/departments', 'DepartmentsController.newDepartment');

Route.put('/departments/:id', 'DepartmentsController.replaceDepartment') //prettifier-ignore
  .where('id', {
    match: /^[0-9]+$/,
    cast: (id: string) => Number(id),
  })
  .middleware('auth');

Route.delete('/departments/:id', 'DepartmentsController.deleteDepartment') //prettifier-ignore
  .where('id', {
    match: /^[0-9]+$/,
    cast: (id: string) => Number(id),
  })
  .middleware('auth');

Route.post('/login', 'UsersController.login');

Route.post('/logout', 'UsersController.logout');
