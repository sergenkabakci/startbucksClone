import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {

  public async run () {
    await User.createMany([
      {
        email: 'sergen@sergen.com',
        password: 'test',
        balance:150,
        first_name:"sergen",
        last_name:"sergen",
      },
      {
        email: 'test@test.com',
        password: 'test',
        first_name:"sergen",
        last_name:"sergen"
      }
    ])
  }

}
