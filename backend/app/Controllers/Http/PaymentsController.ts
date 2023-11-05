import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';
import User from 'App/Models/User';
import Decimal from 'decimal.js';
import { schema,rules } from '@ioc:Adonis/Core/Validator'

export default class PaymentsController {

    private async addBalance(request: HttpContextContract['request'], user: User, balance: Decimal) {
      const userBalance = new Decimal(user.balance || 0);
      const currentBalance = new Decimal(userBalance).plus(balance);
  
      await Payment.create({
        ip_address: request.ip(),
        userId: user.id,
        new_balance: currentBalance.toNumber(),
        old_balance: userBalance.toNumber(),
        price: balance.toNumber(),
      });
  
      user.balance = currentBalance.toNumber();
      await user.save();

      return currentBalance.toNumber();
    }
  
    public async store({ request, response, auth }: HttpContextContract) {
      await auth.use('api').authenticate();
      const user = auth.use('api').user;
      if (!user) {
        return response.status(401).json({
          status: false,
          message: 'Unauthorized',
          code: '02',
        });
      }
      const balance = new Decimal(request.input('balance'));
      
      // Define a validation schema for payment data
      const validationSchema = schema.create({
        balance: schema.number([rules.required()]),
        cardNo: schema.string({}, [
            rules.required(),
            rules.maxLength(16),
            rules.minLength(16),
        ]),
        cardName: schema.string({}, [rules.required()]),
        cardCCV: schema.number([
            rules.required(),
            rules.range(100, 9999) 
        ]),
        cardExpiry: schema.string({}, [
            rules.regex(new RegExp(/^\d{2}\/\d{2}$/)),
        ]),
      });
  
      // Perform validation against the schema
      await request.validate({
        schema: validationSchema,
        messages: {
            "cardCCV.required": "cardCVV is required.",
            "cardCCV.number": "cardCVV must be a 3 or 4 digit number.",
            "cardCCV.range": "cardCVV must be a 3 or 4 digit number.",

            "cardExpiry.regex": "cardExpiry must be d/Y ( 11/29 )."
        }
      });
  
      /**  If payment successfully **/
  
     const currentBalance=  await this.addBalance(request, user, balance);
  
      return response.created({
        status: true,
        message: 'Payment successfully',
        data:{
            new_balance:currentBalance 
        }
      });
    }
}
