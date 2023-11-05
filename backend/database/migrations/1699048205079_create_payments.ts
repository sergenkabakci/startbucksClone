import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .bigInteger('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')

      
      table.decimal('price',14,4)
      table.decimal('old_balance',14,4)
      table.decimal('new_balance',14,4)
      table.string('ip_address')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
