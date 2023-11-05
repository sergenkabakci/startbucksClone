import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  BaseModel,
  beforeSave,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import Qrcode from 'App/Models/Qrcode'
import Order from './Order'
import Payment from './Payment'
export default class User extends BaseModel {

  @hasMany(() => Qrcode)
  public qrcode: HasMany<typeof Qrcode>
  
  @hasMany(() => Order)
  public order: HasMany<typeof Order>

  @hasMany(() => Payment)
  public payment: HasMany<typeof Payment>

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string | null
  
  @column()
  public balance: number | null;

  @column()
  public stars: number |null

  @column()
  public freedrinks: number |null

  @column()
  public count: number | null

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
