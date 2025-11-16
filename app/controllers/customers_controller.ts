import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'

export default class CustomersController {

    public async index({ response }: HttpContext) {
        try {
            const customers = await Customer.all()
            return response.ok({ data: customers })
        } catch (error) {
            return response.internalServerError({ message: 'Falha ao encontrar clientes', error: error.message })
        }
    }

    public async show({ params, response }: HttpContext) {
        try {
            const customer = await Customer.find(params.id)

            if (!customer) {
                return response.notFound({ message: 'Cliente não encontrado' })
            }

            return response.ok({ data: customer })
        } catch (error) {
            return response.internalServerError({ message: 'Falha ao encontrar cliente', error: error.message })
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

            return response.created({ message: 'Cliente criado com sucesso', data: customer })
        } catch (error) {
            return response.badRequest({ message: 'Falha ao criar cliente', error: error.message })
        }
    }

    public async update({ params, request, response }: HttpContext) {
        try {
            const customer = await Customer.find(params.id)

            if (!customer) {
                return response.notFound({ message: 'Cliente não encontrado' })
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

            return response.ok({ message: 'Cliente atualizado com sucesso', data: customer })
        } catch (error) {
            return response.badRequest({ message: 'Falha ao atualizar cliente', error: error.message })
        }
    }

    public async destroy({ params, response }: HttpContext) {
        try {
            const customer = await Customer.find(params.id)

            if (!customer) {
                return response.notFound({ message: 'Cliente não encontrado' })
            }

            await customer.delete()

            return response.ok({ message: 'Cliente excluído com sucesso' })
        } catch (error) {
            return response.internalServerError({ message: 'Falha ao excluir cliente', error: error.message })
        }
    }
}