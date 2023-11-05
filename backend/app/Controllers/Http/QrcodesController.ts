import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Qrcode from 'App/Models/Qrcode'
import {generateRandomToken } from 'App/Helpers/GeneralHelper'
export default class QrcodesController {


    public async store({ response, auth }: HttpContextContract) {
        try {
            await auth.use('api').authenticate();
            const user = auth.use('api').user;
            const token = generateRandomToken(48);
            
          
            await Qrcode
                .query()
                .where('user_id', user!.id)
                .delete()

            await Qrcode.create({
                userId: user!.id,
                token: token,
                status: 1
            });
        
          
            return response.created({
                status: true,
                message: "Qrcode Created",
                data: token,
            });
        }catch (error) {
            return response.status(500).json({
                status: false,
                message: "An error occurred while creating QR code",
                error: error.message,
            });
        }
    }
      
      
      
      

}
