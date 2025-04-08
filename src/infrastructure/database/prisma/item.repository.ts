import { PrismaClient } from "@prisma/client";
import { Item } from "../../../domain/entities/item";
import { ItemRepository } from "../../../domain/repositories/item-repository";

const prisma = new PrismaClient();

export class PrismaItemRepository implements ItemRepository {
    async create(item: Item): Promise<Item> {
        const createdItem = await prisma.item.create({
            data: {
                name: item.name,
                price: item.price,
            },
        });
        return new Item(createdItem.id, createdItem.name, createdItem.price);
    }   

    async findAll(): Promise<Item[]> {
        const items = await prisma.item.findMany();
        return items.map((item: Item) => new Item(item.id, item.name, item.price));
    }

    async findById(id: number): Promise<Item | null> {
        const item = await prisma.item.findUnique({ where: { id } });
        if (!item) return null;
        return new Item(item.id, item.name, item.price);
    }  

    async update(id: number, item: Item): Promise<Item> {
        const updatedItem = await prisma.item.update({
          where: { id },
          data: {
            name: item.name,
            price: item.price,
          },
        });
        return new Item(updatedItem.id, updatedItem.name, updatedItem.price);
    }   

    async delete(id: number): Promise<void> {
        await prisma.item.delete({ where: { id } });
    }
}
