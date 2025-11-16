import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'

export default class CustomersController {

    public async index({ response }: HttpContext) {
        try {
            const customers = await Customer.all()
            return response.ok({ data: customers })
        } catch (error) {
            return response.internalServerError({ message: 'Failed to fetch customers', error: error.message })
        }
    }

    public async show({ params, response }: HttpContext) {
        try {
            const customer = await Customer.find(params.id)

            if (!customer) {
                return response.notFound({ message: 'Customer not found' })
            }

            return response.ok({ data: customer })
        } catch (error) {
            return response.internalServerError({ message: 'Failed to fetch customer', error: error.message })
        }
    }

    public async store({ request, response }: HttpContext) {
        try {
            const customerData = request.only([
                'name',
                'email',
                'phoneNumber',
                'cpf',
                'address',
                'number',
                'city',
                'state',
                'zipCode',
                'status'
            ])

            const customer = await Customer.create(customerData)

            return response.created({ message: 'Customer created successfully', data: customer })
        } catch (error) {
            return response.badRequest({ message: 'Failed to create customer', error: error.message })
        }
    }

    public async update({ params, request, response }: HttpContext) {
        try {
            const customer = await Customer.find(params.id)

            if (!customer) {
                return response.notFound({ message: 'Customer not found' })
            }

            const customerData = request.only([
                'name',
                'email',
                'phoneNumber',
                'cpf',
                'address',
                'number',
                'city',
                'state',
                'zipCode',
                'status'
            ])

            customer.merge(customerData)
            await customer.save()

            return response.ok({ message: 'Customer updated successfully', data: customer })
        } catch (error) {
            return response.badRequest({ message: 'Failed to update customer', error: error.message })
        }
    }

    public async destroy({ params, response }: HttpContext) {
        try {
            const customer = await Customer.find(params.id)

            if (!customer) {
                return response.notFound({ message: 'Customer not found' })
            }

            await customer.delete()

            return response.ok({ message: 'Customer deleted successfully' })
        } catch (error) {
            return response.internalServerError({ message: 'Failed to delete customer', error: error.message })
        }
    }
}