import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from './customer.ts'
import Product from './product.ts'
import OrderItem from './order_item.ts'
import Payment from './payment.ts'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerID: number

  @column()
  declare productId: number

  @column()
  declare quantity: number

  @column()
  declare totalItens: number

  @column()
  declare tax: number

  @column()
  declare status: 'pending' | 'shipped' | 'delivered' | 'canceled'

  @column()
  declare totalPrice: number

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @hasMany(() => Payment)
  declare payments: HasMany<typeof Payment>
}