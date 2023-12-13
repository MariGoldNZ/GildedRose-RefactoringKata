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
  private static readonly MAX_QUALITY = 50;
  private static readonly MIN_QUALITY = 0;
  private static readonly SULFURAS = 'Sulfuras, Hand of Ragnaros';
  private static readonly AGED_BRIE = 'Aged Brie';
  private static readonly BACKSTAGE_PASSES = 'Backstage passes';


  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private updateConjuredItem(item: Item): void{
    item.sellIn = item.sellIn - 1;
    item.quality = Math.max(0, item.quality - 2);
    if (item.sellIn < 0) {
      item.quality = Math.max(0, item.quality - 2);
    }
    
  }

  private checkName(item: Item, name: string): boolean {
    return item.name.toLowerCase().includes(name.toLowerCase());
  }

  updateQuality(): Array<Item> {
    this.items.forEach(item => this.updateItem(item));
    return this.items;
  }

  private updateItem(item: Item): void {
    if (this.checkName(item, 'conjured')) {
      this.updateConjuredItem(item);
    } 
    else {
      if (item.name !== GildedRose.SULFURAS) {
        item.sellIn -= 1;
        }
        if (this.checkName(item, GildedRose.AGED_BRIE)) {
          item.quality = Math.min(item.quality + 1, GildedRose.MAX_QUALITY);
          } 
        else if (this.checkName(item, GildedRose.BACKSTAGE_PASSES)) {
          if (item.sellIn < 0) {
            item.quality = GildedRose.MIN_QUALITY;
          } else {
            item.quality = Math.min(item.quality + 1, GildedRose.MAX_QUALITY);
          if (item.sellIn < 10) {
            item.quality = Math.min(item.quality + 1, GildedRose.MAX_QUALITY);
          }
          if (item.sellIn < 5) {
            item.quality = Math.min(item.quality + 1, GildedRose.MAX_QUALITY);
          }
        }
      }
      
      else {
        if (item.quality > GildedRose.MIN_QUALITY && item.name !== GildedRose.SULFURAS) {
          item.quality -= 1;
          if (item.sellIn < 0) {
          item.quality -= 1;
          }
      }
      
    }
    item.quality = Math.max(item.quality, GildedRose.MIN_QUALITY);
    
  }

}
