import { Item } from "../entities/item";

export interface ItemRepository {
    create(item: Item): Promise<Item>;
    findAll(): Promise<Item[]>;
    findById(id: number): Promise<Item | null>;
    update(id: number, item: Item): Promise<Item>;
    delete(id: number): Promise<void>;
}
