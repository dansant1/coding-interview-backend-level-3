import { Request, ResponseToolkit } from "@hapi/hapi";
import { ItemService } from "../../application/services/item-service";
import { ValidationError } from "../../domain/errors/validation.error";

export class ItemController {
    constructor(private itemService: ItemService) {}    

    async createItem(request: Request, h: ResponseToolkit) {
        const { name, price } = request.payload as { name: string; price: number };
    
        try {
            const item = await this.itemService.create(name, price);
            return h.response(item).code(201);
        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response({ errors: error.errors }).code(400);
            }
            console.error(error);
            return h.response('Internal Server Error').code(500);
        }
    }
    
    async getItems(request: Request, h: ResponseToolkit) {
        const items = await this.itemService.findAll();
        return h.response(items).code(200);
    }   

    async getItemById(request: Request, h: ResponseToolkit) {
        const { id } = request.params;
        const item = await this.itemService.findById(Number(id));
        if (!item) return h.response().code(404);
        return h.response(item).code(200);
    }

    async updateItem(request: Request, h: ResponseToolkit) {
        const { id } = request.params;
        const { name, price } = request.payload as { name: string; price: number };
    
        try {
            const updatedItem = await this.itemService.update(Number(id), name, price);
            return h.response(updatedItem).code(200);
        } catch (error) {
            if (error instanceof ValidationError) {
                return h.response({
                    errors: error.errors,
                }).code(400);
            }
            console.error(error);
            return h.response('Internal Server Error').code(500);
        }
    }    

    async deleteItem(request: Request, h: ResponseToolkit) {
        const { id } = request.params;
        await this.itemService.delete(Number(id));
        return h.response().code(204);
    }
}
