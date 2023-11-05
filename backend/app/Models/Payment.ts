import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number


    @column()
    public userId: number

    @belongsTo(() => User, {
      foreignKey: 'userId', 
    })
    public user: BelongsTo<typeof User>

    @column()
    public price: number

    @column()
    public old_balance: number
    
    @column()
    public new_balance: number

    @column()
    public ip_address: String



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
