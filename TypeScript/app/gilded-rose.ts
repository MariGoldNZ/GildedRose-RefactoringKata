export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateConjuredItem(item: Item): Item {
    item.sellIn = item.sellIn - 1;
    item.quality = Math.max(0, item.quality - 2);
    if (item.sellIn < 0) {
      item.quality = Math.max(0, item.quality - 2);
    }
    return item;
  }

  checkName(item: Item, name: string): boolean {
    return item.name.toLowerCase().includes(name.toLowerCase());
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
        this.updateItem(this.items[i]);
    }
    return this.items;
  }

  updateItem(item: Item):Item {
    
    if(this.checkName(item, 'conjured')) {
      item = this.updateConjuredItem(item);
      return item;
    }
    else {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }
      if (this.checkName(item, 'Aged Brie')) {
        if (item.quality < 50) {
          item.quality = item.quality + 1
          
        }
      }
      else if (this.checkName(item, 'Backstage passes')) {
        
        if (item.quality < 50) {
          item.quality = item.quality + 1
          if (item.sellIn < 10) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          if (item.sellIn < 5) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          
        }
        if (item.quality > 50) {
          item.quality = 50;
        }
        if (item.sellIn < 0) {
          item.quality = 0
        }
      }
      else {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = item.quality - 1
            if (item.sellIn < 0) {
              item.quality = item.quality - 1
            }
          }
         
            
          
        }

      }
      if (item.quality < 0) {
        item.quality =0
      }
      
      

      
        
    
    }
    return item;
  }
}
