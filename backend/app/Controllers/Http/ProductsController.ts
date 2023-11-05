import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Products from "App/Models/Products";


export default class ProductsController {

    public async index({request}){
        const page = request.input('page',1);
        const limit = request.input('per_page',10);
        const search = request.input('search', '');
        
        const query = Products.query().where('name', 'like', `%${search}%`);
  
        const data = await query.paginate(page, limit);
        
        return {
            status: true,
            message: "Successfuly",
            meta: {
                search: search,
              total: data.total,
              per_page: data.perPage,
              current_page: data.currentPage,
              last_page: data.lastPage,
              first_page: 1,
              first_page_url: `/?page=1`,
              last_page_url: `/?page=${data.lastPage}`,
              next_page_url: data.currentPage < data.lastPage ? `/?page=${data.currentPage + 1}` : null,
              previous_page_url: data.currentPage > 1 ? `/?page=${data.currentPage - 1}` : null,
            },
            data:data.toJSON().data, // rows özelliğini kullanarak sayfanın verilerini alın
          };
        
    }

    public async get({params , response}: HttpContextContract){
        try {
            const id = parseInt(params.id);
            
            if (isNaN(id)) {
                return response.status(400).json({
                status: false,
                message: "Invalid 'id' parameter",
                data: null
                });
            }

            const data = await Products.findOrFail(id)

            if (!data) {
                return response.status(404).json({
                status: false,
                message: "Product not found",
                data: null
                });
            }

            return {
                status: true,
                message:"Successfuly",
                data: data
            }
        }catch{
            return response.status(500).json({
                status: false,
                message: "An error occurred",
                data: null
            });
        }
    }
    
    public async delete({params, response}: HttpContextContract){

        try{

            const product = await Products.findOrFail(params.id)

            if(product){
                await product.delete()
                return response.ok({
                    status:true,
                    message:"Deleted"
                })
            }else{
               return response.status(500).json({
                    status: false,
                    message: "An error occurred",
                    data: null
                });
            }
           

        }catch(err){
            return response.status(500).json({
                status: false,
                message: "An error occurred",
                data: null
            });
        }
        
    
        
    }
    

    public async store({request, response}: HttpContextContract){
       Products.create({
        name: request.input('name'),
        description: request.input('description'),
        image: request.input('image'),

       })

       return response.created({
        status:true,
        message:"Created"
       })
    }

    public async update({request, response,params}: HttpContextContract){
        const product = await Products.findOrFail(params.id)

        product.name= request.input('name');
        product.description= request.input('description');
        product.image= request.input('image');

        product.save();


        return response.status(202).json({
            status:true,
            message:"Updated"
           })
    }
}
