import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    /**
     * Registra novo usuário
     */
    async register({ request, response }: HttpContext) {
        try {
            const data = request.only(['fullName', 'email', 'password'])

            // Checa se o usuário já existe
            const existingUser = await User.findBy('email', data.email)
            if (existingUser) {
                return response.conflict({ message: 'E-mail do usuário já existe.' })
            }

            const user = await User.create(data)

            // Cria token de acesso
            const token = await User.accessTokens.create(user)

            return response.created({
                message: 'Usuário registrado com sucesso',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                },
                token: {
                    type: 'Bearer',
                    value: token.value!.release(),
                },
            })
        } catch (error) {
            return response.badRequest({ message: 'Falha no registro do usuário', error: error.message })
        }
    }

    /**
     * Login de usuário
     */
    async login({ request, response }: HttpContext) {
        try {
            const { email, password } = request.only(['email', 'password'])

            // Verifica credenciais do usuário
            const user = await User.verifyCredentials(email, password)

            // Cria token de acesso
            const token = await User.accessTokens.create(user)

            return response.ok({
                message: 'Login com sucesso',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                },
                token: {
                    type: 'Bearer',
                    value: token.value!.release(),
                },
            })
        } catch (error) {
            return response.unauthorized({ message: 'Credenciais inválidas' })
        }
    }

    /**
     * Logout de usuário
     */
    async logout({ auth, response }: HttpContext) {
        try {
            const user = auth.getUserOrFail()
            const token = auth.user?.currentAccessToken

            if (token) {
                await User.accessTokens.delete(user, token.identifier)
            }

            return response.ok({ message: 'Logout com sucesso' })
        } catch (error) {
            return response.internalServerError({ message: 'Falha no logout', error: error.message })
        }
    }

    /**
     * Busca dados do usuário autenticado
     */
    async me({ auth, response }: HttpContext) {
        try {
            const user = auth.getUserOrFail()

            return response.ok({
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    createdAt: user.createdAt,
                },
            })
        } catch (error) {
            return response.unauthorized({ message: 'Não autenticado' })
        }
    }
}
