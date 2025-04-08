import { Item } from "../domain/entities/item";

export class ItemMapper {

    static toDomain(name: string, price: number) {
        return new Item(0, name, price);
    }

    static toDTO(item: Item) {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
        };
    }
}
