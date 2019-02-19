const orderBook = require("../app/orderBook");
//const OrderBook = require("../app/orderBook");
const Order = require("../app/order");

beforeEach(() => {

    buyOrder1 = new Order("a", 1, 10, "buy");
    buyOrder2 = new Order("b", 3, 10, "buy");
    buyOrder3 = new Order("b", 2, 10, "buy");

    sellOrder1 = new Order("a", 1, 10, "sell");
    sellOrder2 = new Order("b", 3, 10, "sell");
    sellOrder3 = new Order("b", 2, 10, "sell");

    testBookBuy = new orderBook([buyOrder1, buyOrder2, buyOrder3],[])
    
    testBookSell = new orderBook([],[sellOrder1, sellOrder2, sellOrder3])

    testBookCombined = new orderBook(
        [buyOrder1, buyOrder2, buyOrder3],
        [sellOrder1, sellOrder2, sellOrder3]
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
        expect(testBookCombined.getAccountOrders("b").length).toBe(4);
    });
})