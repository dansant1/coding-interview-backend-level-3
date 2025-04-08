export class Item {
    constructor(
        public id: number,
        public name: string,
        public price: number
    ) {}
  
    static create(name: string, price: number) {
      if (price < 0) {
        throw new Error("Price cannot be negative");
      }
      return new Item(0, name, price);
    }
}
  