import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  
  constructor () {
    super(Logger)
  }


  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */
    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(403).json({
        status:false,
        message:"Unauthorized"
      }) 
    }
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(404).json({
        status:false,
        message:"Not Found",
      }) 
    }
    if (error.code === 'E_VALIDATION_FAILURE') {
      
      return ctx.response.status(422).json({
        status:false,
        message:"Validation Error",
        reason:error.messages.errors
      }) 
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
