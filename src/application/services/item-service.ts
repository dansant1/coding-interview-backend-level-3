import { Item } from "../../domain/entities/item";
import { ErrotMessage } from "../../domain/errors/message.error";
import { ValidationError } from "../../domain/errors/validation.error";
import { ItemRepository } from "../../domain/repositories/item-repository";
import { ItemMapper } from "../../mappers/item.mapper";

export class ItemService {
    constructor(private itemRepository: ItemRepository) {}  

    async create(name: string, price: number): Promise<Item> {
      const errors: ErrotMessage[] = [];

      if (!name) {
          errors.push({ field: 'name', message: 'Field "name" is required' });
      }

      if (price === undefined) {
          errors.push({ field: 'price', message: 'Field "price" is required' });
      } else if (price < 0) {
          errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
      }

      if (errors.length > 0) {
          throw new ValidationError(errors);
      }

      const item = ItemMapper.toDomain(name, price);

      const createdItem = await this.itemRepository.create(item);

      return ItemMapper.toDTO(createdItem);
    }

    async findAll(): Promise<Item[]> {
      return this.itemRepository.findAll();
    }

    async findById(id: number): Promise<Item | null> {
      return this.itemRepository.findById(id);
    }

    async update(id: number, name: string, price: number): Promise<Item> {
      const errors: ErrotMessage[] = [];

      if (price < 0) {
        errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
      }

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }

      const item = ItemMapper.toDomain(name, price);

      const updatedItem = await this.itemRepository.update(id, item);

      return ItemMapper.toDTO(updatedItem);
    }
       
    async delete(id: number): Promise<void> {
      return this.itemRepository.delete(id);
    }
}
