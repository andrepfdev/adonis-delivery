import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
    /**
     * Registra novo usuário
     */
    async register({ request, response }: HttpContext) {
        try {
            const data = request.only(['fullName', 'email', 'password'])

            // Check if user already exists
            const existingUser = await User.findBy('email', data.email)
            if (existingUser) {
                return response.conflict({ message: 'User with this email already exists' })
            }

            const user = await User.create(data)

            // Cria token de acesso
            const token = await User.accessTokens.create(user)

            return response.created({
                message: 'User registered successfully',
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
            return response.badRequest({ message: 'Failed to register user', error: error.message })
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
                message: 'Login successful',
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
            return response.unauthorized({ message: 'Invalid credentials' })
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

            return response.ok({ message: 'Logout successful' })
        } catch (error) {
            return response.internalServerError({ message: 'Failed to logout', error: error.message })
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
            return response.unauthorized({ message: 'Not authenticated' })
        }
    }
}
