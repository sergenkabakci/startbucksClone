// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

    public async index(){
        return {
            status: true,
            message:"API v1"}
    }

}
