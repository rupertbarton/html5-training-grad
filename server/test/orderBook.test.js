const orderBook = require("../app/orderBook");
//const OrderBook = require("../app/orderBook");
const Order = require("../app/order");

beforeEach(() => {

    buyOrder1 = new Order("a", 1, 10, "buy");
    buyOrder2 = new Order("b", 3, 10, "buy");
    buyOrder3 = new Order("b", 2, 10, "buy");

    buyOrder4 = new Order("c", 1.5, 10, "buy");
    buyOrder5 = new Order("d", 3.99, 10, "buy");
    buyOrder6 = new Order("e", 8.5, 10, "buy");

    sellOrder1 = new Order("a", 1, 10, "sell");
    sellOrder2 = new Order("b", 3, 10, "sell");
    sellOrder3 = new Order("b", 2, 10, "sell");

    sellOrder4 = new Order("c", .1, 10, "sell");
    sellOrder5 = new Order("d", 3.01, 10, "sell");
    sellOrder6 = new Order("e", 9, 10, "sell");

    testBookBuy = new orderBook([buyOrder1, buyOrder2, buyOrder3],[])
    
    testBookSell = new orderBook([],[sellOrder1, sellOrder2, sellOrder3])

    testAccountBook = new orderBook(
        [buyOrder1, buyOrder2, buyOrder3],
        [sellOrder1, sellOrder2, sellOrder3]
    )

    testBuyAggregateOrder = new orderBook(
        [buyOrder6,buyOrder5,buyOrder2,buyOrder3,buyOrder4,buyOrder1],
        []
    )

    testSellAggregateOrder = new orderBook(
        [],
        [sellOrder4,sellOrder1,sellOrder3,sellOrder2,sellOrder5,sellOrder6]
    )

    testAggregateOrder = new orderBook(
        [buyOrder6,buyOrder5,buyOrder2,buyOrder3,buyOrder4,buyOrder1],
        [sellOrder4,sellOrder1,sellOrder3,sellOrder2,sellOrder5,sellOrder6]
    )

});

describe("getAccountOrders Function", () => {

    it("Can get account buys", () => {
        expect(testBookBuy.getAccountOrders("a")).toEqual([buyOrder1]);
    });

    it("Can get account sells", () => {
        expect(testBookSell.getAccountOrders("a")).toEqual([sellOrder1]);
    });

    it("Can get account orders", () => {
        expect(testAccountBook.getAccountOrders("b").length).toBe(4);
    });

    describe("getAggregatedOrders Function", () => {

        it("Aggregate Buys", () => {
        expect(testBuyAggregateOrder.createAgreggatedOrderBook(1)).toEqual([ [ [8.00,10], [3.00,20], [2.00,10], [1.00,20] ],  [] ]);
        });
    
        it("AggregateSells", () => {
        expect(testSellAggregateOrder.createAgreggatedOrderBook(1)).toEqual([ [], [[1.00,20], [2.00,10], [3.00,10], [4.00,10], [9.00,10] ] ]);
        });
    })
    
        it("Aggregate both Buys and Sells", () => {
        expect(testAggregateOrder.createAgreggatedOrderBook(1)).toEqual([ [ [8.00,10], [3.00,20], [2.00,10], [1.00,20] ], [[1.00,20], [2.00,10], [3.00,10], [4.00,10], [9.00,10] ] ]);
        });

        it("3917.99 buy...", () => {
        rogue = new Order("z", 3917.99, 10, "buy");
        rogueBook = new orderBook([rogue],[]);
        expect(rogueBook.createAgreggatedOrderBook(0.01)).toEqual([ [[3917.99,10]],[]]);
        });
        
        it("100.99 buy...", () => {
        rogue = new Order("z", 100.99, 10, "buy");
        rogueBook = new orderBook([rogue],[]);
        expect(rogueBook.createAgreggatedOrderBook(0.01)).toEqual([ [[100.99,10]],[]]);
        });

        it("3917.99 sell...", () => {
        rogue = new Order("z", 3917.99, 10, "buy");
        rogueBook = new orderBook([],[rogue]);
        expect(rogueBook.createAgreggatedOrderBook(0.01)).toEqual([ [],[[3917.99,10]]]);
        });
        
        it("100.99 sell...", () => {
        rogue = new Order("z", 100.99, 10, "buy");
        rogueBook = new orderBook([],[rogue]);
        expect(rogueBook.createAgreggatedOrderBook(0.01)).toEqual([ [],[[100.99,10]]]);
        });

})