import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Decimal } from 'decimal.js';
export default class Products extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String
  @column()
  public description: String
  @column()
  public image: String

  @column()
  public price: Decimal | null
  @column()
  public status: number
  @column()
  public featured: number
  @column()
  public order: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
