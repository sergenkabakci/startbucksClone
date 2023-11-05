import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { Decimal } from 'decimal.js';

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderNo: string

  @column()
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId', 
  })
  public users: BelongsTo<typeof User>

  
  @column()
  public total: Decimal  | null
  
  @column()
  public status: number

  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
