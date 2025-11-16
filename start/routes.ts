/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Rotas públicas
router.post('/api/auth/register', '#controllers/auth_controller.register')
router.post('/api/auth/login', '#controllers/auth_controller.login')

// Rotas protegidas por autenticação
router.group(() => {
  // Auth
  router.post('/api/auth/logout', '#controllers/auth_controller.logout')
  router.get('/api/auth/me', '#controllers/auth_controller.me')

  // Orders
  router.post('/api/orders', '#controllers/orders_controller.store')
  router.get('/api/orders/:id', '#controllers/orders_controller.show')

  // Customers
  router.get('/api/customers', '#controllers/customers_controller.index')
  router.get('/api/customers/:id', '#controllers/customers_controller.show')
  router.post('/api/customers', '#controllers/customers_controller.store')
  router.put('/api/customers/:id', '#controllers/customers_controller.update')
  router.delete('/api/customers/:id', '#controllers/customers_controller.destroy')
}).middleware(middleware.auth())