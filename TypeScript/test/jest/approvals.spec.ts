import { Item, GildedRose } from '@/gilded-rose';

/**
 * This unit test uses [Jest Snapshot](https://goo.gl/fbAQLP).
 * 
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */

describe('Gilded Rose Approval', () => {

  let gameConsoleOutput: string;
  let originalConsoleLog: (message: any) => void;
  let originalProcessArgv: string[]

  function gameConsoleLog(msg: string) {
    if (msg) {
      gameConsoleOutput += msg;
    }
    gameConsoleOutput += "\n";
  }

  beforeEach(() => {
    // prepare capturing console.log to our own gameConsoleLog.
    gameConsoleOutput = "";
    originalConsoleLog = console.log;
    console.log = gameConsoleLog;
    originalProcessArgv = process.argv;
  });

  afterEach(() => {
    // reset original console.log
    console.log = originalConsoleLog;
    process.argv = originalProcessArgv;
  });

  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
  
    expect(items).toMatchSnapshot();
  });

  it('should thirtyDays', () => {
    process.argv = ["<node>", "<script", "30"];
    require('../golden-master-text-test.ts');
       
    expect(gameConsoleOutput).toMatchSnapshot();
  });

  it('should Conjured degrade twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured item', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9); 
    expect(items[0].quality).toBe(8); 
  });

  it('should Conjured should not go negative', () => {
    const gildedRose = new GildedRose([new Item('Conjured item', 3, 3)]);
    
    const items1 = gildedRose.updateQuality();
    expect(items1[0].quality).toBe(1); 

    const items2 = gildedRose.updateQuality();
    expect(items2[0].quality).toBe(0); 
  });

});
