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

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', "HomeController.index")

Route.group(() => {
  Route.group(() => {
    Route.get('/logged-in', 'AuthController.logged_in');
    Route.post('/logout', 'AuthController.logout');
    Route.post('/refresh-token', 'AuthController.refresh_token');



    Route.get('/products', 'ProductsController.index')
    Route.get('/products/:id', 'ProductsController.get')
    Route.post('/products', 'ProductsController.store')
    Route.patch('/products/:id','ProductsController.update')
    Route.delete('/products/:id','ProductsController.delete')

    Route.post('/qr-generate', 'QrcodesController.store')
    Route.post('/order', 'OrdersController.store')
    Route.post('/payment', 'PaymentsController.store')
    

  }).middleware('auth');

  Route.post('/login','AuthController.login');
  Route.post('/register','AuthController.register');


}).prefix('api');
