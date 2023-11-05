
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema,rules  } from '@ioc:Adonis/Core/Validator'
import User from "App/Models/User"

export default class AuthController {

    public async login({request, response,auth}: HttpContextContract){

      const users = await User
      .query()
      .preload('qrcode')

    users.forEach((user) => {
      console.log(user.qrcode)
    })
        try {
            
            const token = await auth.use('api').attempt(request.input('email'), request.input('password'),{
                expiresIn: '30 days'
              })
             

            return response.status(200).json({
                status:true,
                message: 'Login successfuly',
                data: {
                  ...{
                    
                      id: token.user.id,
                      email: token.user.email,
                      firstName: token.user.first_name,
                      lastName: token.user.last_name,
                      phone: token.user.phone,
                      balance: token.user.balance,
                      stars: token.user.stars,
                      freeDrinks: token.user.freedrinks,
                      count: token.user.count,
                    
                  },
                  token: token.token
                } 
            })
          } catch {
            return response.unauthorized({
                status:false,
                message:'Invalid credentials'
            })
          }
    }
    public async logout({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').revoke()
          return response.status(200).json({
            status: true,
            message: 'Logout successfuly'
          });
        } catch (error) {
          return response.status(500).json({
            status: false,
            message: 'An error occurred while logging out',
            error: error.message
          });
        }
      }

      public async logged_in({ auth, response }: HttpContextContract) {
        try {
            await auth.use('api').authenticate()
            if(auth.use('api').isLoggedIn){
                return response.status(200).json({
                    status: true,
                    message: 'User is logged in'
                  });
            }else{
                return response.status(200).json({
                    status: false,
                    message: 'User is not logged in'
                  });
            }
          
        } catch (error) {
          return response.status(200).json({
            status: false,
            message: 'User is not logged in'
          });
        }
      }


      public async refresh_token({ auth, response }: HttpContextContract) {
        try {
          // Kullanıcıyı alın (authUser)
          await auth.use('api').authenticate()
          const user = auth.use('api').user;

          if (!user) {
            return response.status(401).json({
              status: false,
              message: 'User not authenticated',
            });
          }
          await auth.use('api').revoke()
          // Tokeni yenileyin
          const newToken = await auth.use('api').generate(user);
      
          return response.status(200).json({
            status: true,
            message: 'Token refreshed successfully',
            data: newToken.token,
          });
        } catch (error) {
          return response.status(500).json({
            status: false,
            message: 'An error occurred while refreshing the token',
            error: error.message,
          });
        }
      }
      
      


    public async register({request, response}: HttpContextContract){

        const Validate = await schema.create({
            email: schema.string([
                rules.email(),
                rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string([
                rules.confirmed()
            ]),
            first_name: schema.string([
                rules.alpha({
                    allow: ['space', 'underscore', 'dash']
                  })
            ]),
            last_name: schema.string([
                rules.alpha({
                allow: ['space', 'underscore', 'dash']
                })
            ])
        })

        const data = await request.validate({
            schema: Validate,
            messages: {
                required: 'The {{ field }} is required',
                'email.unique': 'Email Already in Use'
              }
        })

       const user = await User.create(data)
    
           return response.created({
            status:true,
            message:"User created successfully",
            data: user
           })
    }
}
