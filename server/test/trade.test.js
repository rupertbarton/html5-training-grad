const Trade = require("../app/trade");
const Matcher = require("../app/matcher");
const Order = require("../app/order");

beforeEach(() => {

    buyOrder1 = new Order("a", 1, 5, "buy");
    buyOrder2 = new Order("b", 2, 5, "buy");
    buyOrder3 = new Order("c", 1, 10, "buy");

    sellOrder1 = new Order("a", 1, 5, "sell");
    sellOrder2 = new Order("b", 2, 5, "sell");
    sellOrder3 = new Order("c", 1, 10, "sell");

    testMatcher = new Matcher()

});

describe("Log Trade Ability", () => {

    it("If sell too high, no trade is recorded", () => {
        testMatcher.matcher(buyOrder1)
        testMatcher.matcher(sellOrder2)
        expect(testMatcher.tradeHistory.length).toBe(0)
    });

    it("If buy too low, no trade is recorded", () => {
        testMatcher.matcher(sellOrder2)
        testMatcher.matcher(buyOrder1)
        expect(testMatcher.tradeHistory.length).toBe(0)
    });

    it("If a sell comes in of same price, trade is recorded", () => {
        testMatcher.matcher(buyOrder1)
        testMatcher.matcher(sellOrder1)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });

    it("If a buy comes in of same price, trade is recorded", () => {
        testMatcher.matcher(sellOrder1)
        testMatcher.matcher(buyOrder1)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });

    it("If a buy comes in higher, trade is recorded", () => {
        testMatcher.matcher(sellOrder1)
        testMatcher.matcher(buyOrder2)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });
  
    it("If a sell comes in lower, trade is recorded", () => {
        testMatcher.matcher(buyOrder2)
        testMatcher.matcher(sellOrder1)
        expect(testMatcher.tradeHistory[0].price).toBe(2);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });

    it("If a buy comes in of same price, higher quantity, trade is recorded", () => {
        testMatcher.matcher(sellOrder1)
        testMatcher.matcher(buyOrder3)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });

    it("If a sell comes in of same price, higher quantity, trade is recorded", () => {
        testMatcher.matcher(buyOrder1)
        testMatcher.matcher(sellOrder3)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });

it("If a buy comes in of same price, lower quantity, trade is recorded", () => {
        testMatcher.matcher(sellOrder3)
        testMatcher.matcher(buyOrder1)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });

    it("If a sell comes in of same price, lower quantity, trade is recorded", () => {
        testMatcher.matcher(buyOrder3)
        testMatcher.matcher(sellOrder1)
        expect(testMatcher.tradeHistory[0].price).toBe(1);
        expect(testMatcher.tradeHistory[0].quantity).toBe(5)
    });
})