import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from "App/Models/Order"
import Decimal from 'decimal.js'

export default class OrdersController {

    private async getNextOrderNo(): Promise<number> {
        const maxOrderNo = await Order.query()
          .max('order_no')
          .first();
            
            if(maxOrderNo){
                const maxno= maxOrderNo.$extras.max;
               
                return parseInt(maxno) +1;
            }else{
                return 10001;
            }
          

    }

    public async store({request, response,auth}: HttpContextContract){

        
        await auth.use('api').authenticate();
        const user = auth.use('api').user;
        const userQRCode = request.input('token');
        const price = request.input('price') as Decimal;

        if (!user) {
            return response.status(401).json({
              status: false,
              message: "Unauthorized",
              code: "02"
            });
        }

      
        const balance  = new Decimal(user.balance || 0);
        const storedQRCodes = await user.related('qrcode').query().where('status', 1).exec();
        const validQRCode = storedQRCodes.find((qrcode) => qrcode.token === userQRCode);
        if (!validQRCode) {
            return response.status(403).json({
              status: false,
              message: "Invalid QR code",
              code: "01"
            });
          }
        
        if (balance.cmp(price) >= 0) {
            const fark =new Decimal(balance).minus(price);
            const nextOrderNo = await this.getNextOrderNo();
            
            
           
            await Order.create({
                orderNo: nextOrderNo.toString(),
                userId: user!.id,
                total: price,
                status: 1
            });
            await validQRCode?.merge({
                status: 0
              }).save();

              
              user.balance =  Number(fark)
              await user.save();
              
           
            return response.created({
             status:true,
             message:"Order created successfully"
            })
        }else{
            return response.status(403).json({
                status:false,
                message:"Insufficient balance!",
                code:"00"
            })
        }

        
     }


}
