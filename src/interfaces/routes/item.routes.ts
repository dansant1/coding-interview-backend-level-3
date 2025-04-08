import { ServerRoute } from "@hapi/hapi";
import { ItemController } from "../controllers/item.controller";

export const itemRoutes = (controller: ItemController): ServerRoute[] => [
    {
        method: "GET",
        path: "/items",
        handler: controller.getItems.bind(controller),
    },
    {
        method: "POST",
        path: "/items",
        handler: controller.createItem.bind(controller),
    },
    {
        method: "GET",
        path: "/items/{id}",
        handler: controller.getItemById.bind(controller),
    },
    {
        method: "PUT",
        path: "/items/{id}",
        handler: controller.updateItem.bind(controller),
    },
    {
        method: "DELETE",
        path: "/items/{id}",
        handler: controller.deleteItem.bind(controller),
    },
];  
