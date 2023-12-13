enum ItemName {
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes',
  Conjured = 'Conjured'
  }

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

interface UpdateStrategy {
  update(item: Item): void;
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const QUALITY_DEGRADE = 1;
const QUALITY_UPGRADE = 1;
const SELLIN_THRESHOLD_TEN_DAYS = 10;
const SELLIN_THRESHOLD_FIVE_DAYS = 5;
const SELLIN_DECREMENT = 1;
const CONJURED_DEGRADE_MULTIPLIER = 2;
const SELLIN_QUALITY_THRESHOLD = 0;

class ConjuredStrategy implements UpdateStrategy {
  update(item: Item): void {
    item.sellIn -= SELLIN_DECREMENT;
    item.quality = Math.max(MIN_QUALITY, item.quality - QUALITY_DEGRADE * CONJURED_DEGRADE_MULTIPLIER);
    if (item.sellIn < SELLIN_QUALITY_THRESHOLD) {
      item.quality = Math.max(MIN_QUALITY, item.quality - QUALITY_DEGRADE * CONJURED_DEGRADE_MULTIPLIER);
    }
  }
}
class AgedBrieStrategy implements UpdateStrategy {
  update(item: Item): void {
    item.sellIn -= SELLIN_DECREMENT;
    if (item.quality < MAX_QUALITY) {
      item.quality += QUALITY_UPGRADE;
    }
  }
}

class LegendaryStrategy implements UpdateStrategy {
  update(item: Item): void {
    item.quality = 80;
  }
}

class BackstagePassesStrategy implements UpdateStrategy {
  update(item: Item): void {
    item.sellIn -= SELLIN_DECREMENT;
    if (item.sellIn < MIN_QUALITY) {
      item.quality = MIN_QUALITY;
      return;
    }
    if (item.quality < MAX_QUALITY) {
      item.quality += QUALITY_UPGRADE;
      if (item.sellIn < SELLIN_THRESHOLD_TEN_DAYS) {
        item.quality += QUALITY_UPGRADE;
      }
      if (item.sellIn < SELLIN_THRESHOLD_FIVE_DAYS) {
        item.quality += QUALITY_UPGRADE;
      }
    }
    if (item.quality > MAX_QUALITY) {
      item.quality = MAX_QUALITY;
    }
  }
}
  
  
class DefaultStrategy implements UpdateStrategy {
  update(item: Item): void {
    item.sellIn -= SELLIN_DECREMENT;
    if (item.quality > MIN_QUALITY) {
      item.quality -= QUALITY_DEGRADE;
      if (item.sellIn < MIN_QUALITY) {
        item.quality -= QUALITY_DEGRADE;
      }
    }
  }
}

export class GildedRose {
  private strategies: Map<ItemName | 'DEFAULT', UpdateStrategy>;

  constructor(public items: Array<Item> = []) {
    this.strategies = new Map<ItemName | 'DEFAULT', UpdateStrategy>([
      [ItemName.Conjured, new ConjuredStrategy()],
      [ItemName.AgedBrie, new AgedBrieStrategy()],
      [ItemName.BackstagePasses, new BackstagePassesStrategy()],
      [ItemName.Sulfuras, new LegendaryStrategy()],
      ['DEFAULT', new DefaultStrategy()] // Default strategy for unhandled items
    ]);
  }

  private getStrategy(itemName: ItemName): UpdateStrategy | undefined {
    let foundStrategy: UpdateStrategy | undefined;
    this.strategies.forEach((strategy, strategyItem) => {
      if (
        itemName.toLowerCase().includes(strategyItem.toLowerCase())
      ) {
        foundStrategy = strategy;
      }
    });
    return foundStrategy || this.strategies.get('DEFAULT');
  }

  updateQuality(): Array<Item> {
    this.items.forEach(item => {
      const strategy = this.getStrategy(item.name as ItemName);
      if (strategy) {
        strategy.update(item);
      }
    });
    return this.items;
  }
}

  

  
