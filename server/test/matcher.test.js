const Matcher = require("../app/matcher");
//const OrderBook = require("../app/orderBook");
const Order = require("../app/order");



let testMatcher;

let buyOrder1;
let buyOrder2;
let buyOrder3;
let buyOrder4;
let buyOrder5;

let sellOrder1;
let sellOrder2;
let sellOrder3;
let sellOrder4;
let sellOrder5;

beforeEach(() => {

    testMatcher = new Matcher();

    buyOrder1 = new Order("1b", 1, 10, "buy");
    buyOrder2 = new Order("2b", 3, 10, "buy");
    buyOrder3 = new Order("3b", 2, 10, "buy");

    buyOrder4 = new Order("4b", 1, 10, "buy");
    buyOrder5 = new Order("5b", 2, 10, "buy");
    buyOrder6 = new Order("6b", 2, 10, "buy");

    buyOrder7 = new Order("7b", 1, 5, "buy");
    buyOrder8 = new Order("8b", 2, 10, "buy");
    buyOrder9 = new Order("9b", 2, 5, "buy");
    buyOrder10 = new Order("10b", 3, 5, "buy");
    buyOrder11 = new Order("9s", 2, 2, "buy");
    
    buyOrder12 = new Order("9s", 2, 30, "buy");


    sellOrder1 = new Order("1s", 1, 10, "sell");
    sellOrder2 = new Order("2s", 3, 10, "sell");
    sellOrder3 = new Order("3s", 2, 10, "sell");

    sellOrder4 = new Order("4s", 2, 10, "sell");
    sellOrder5 = new Order("5s", 3, 10, "sell");
    sellOrder6 = new Order("6s", 3, 10, "sell");

    sellOrder7 = new Order("7s", 1, 5, "sell");
    sellOrder8 = new Order("8s", 2, 10, "sell");
    sellOrder9 = new Order("9s", 2, 5, "sell");
    sellOrder10 = new Order("10s", 3, 5, "sell");
    sellOrder11 = new Order("9s", 2, 2, "sell");
    
    sellOrder12 = new Order("9s", 2, 30, "sell");

});

describe("Addition to Order Book", () => {

    it("Can add buy", () => {
        testMatcher.matcher(buyOrder1);
        expect(testMatcher.buyOrders.length).toBe(1);
    });

    it("Can add sell", () => {
        testMatcher.matcher(sellOrder1);
        expect(testMatcher.sellOrders.length).toBe(1);
    });

    it("Can add multiple buy", () => {
        testMatcher.matcher(buyOrder1);
        testMatcher.matcher(buyOrder2);
        testMatcher.matcher(buyOrder3);
        expect(testMatcher.buyOrders.length).toBe(3);
    });

    it("Can add multiple sell", () => {
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(sellOrder2);
        testMatcher.matcher(sellOrder3);
        expect(testMatcher.sellOrders.length).toBe(3);
    });
});

describe("Order book sorting", () => {

    it("Can sort 'buy' according to price ", () => {
        testMatcher.matcher(buyOrder1);
        testMatcher.matcher(buyOrder2);
        testMatcher.matcher(buyOrder3);
        expect(testMatcher.buyOrders).toEqual([buyOrder2, buyOrder3, buyOrder1]);
    })

    it("Can sort 'sell' according to price ", () => {
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(sellOrder2);
        testMatcher.matcher(sellOrder3);
        expect(testMatcher.sellOrders).toEqual([sellOrder1, sellOrder3, sellOrder2]);
    })

    it("Can sort 'buy' according to time ", () => {
        testMatcher.matcher(buyOrder1);
        testMatcher.matcher(buyOrder2);
        testMatcher.matcher(buyOrder3);
        testMatcher.matcher(buyOrder4);
        testMatcher.matcher(buyOrder5);
        testMatcher.matcher(buyOrder6);
        expect(testMatcher.buyOrders).toEqual([buyOrder2, buyOrder3, buyOrder5, buyOrder6, buyOrder1, buyOrder4,]);
    })

    it("Can sort 'sell' according to time ", () => {
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(sellOrder2);
        testMatcher.matcher(sellOrder3);
        testMatcher.matcher(sellOrder4);
        testMatcher.matcher(sellOrder5);
        testMatcher.matcher(sellOrder6);
        expect(testMatcher.sellOrders).toEqual([sellOrder1, sellOrder3, sellOrder4, sellOrder2, sellOrder5, sellOrder6,]);
    })

    it("Can sort 'sell' after removal ", () => {
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(sellOrder2);
        testMatcher.matcher(sellOrder3);
        testMatcher.matcher(sellOrder4);
        testMatcher.matcher(sellOrder5);
        testMatcher.matcher(sellOrder6);
        testMatcher.matcher(buyOrder2);
        testMatcher.matcher(buyOrder2);
        expect(testMatcher.sellOrders).toEqual([sellOrder4, sellOrder2, sellOrder5, sellOrder6,]);
    })
    
    it("Can sort 'buy' after removal ", () => {
        testMatcher.matcher(buyOrder1);
        testMatcher.matcher(buyOrder2);
        testMatcher.matcher(buyOrder3);
        testMatcher.matcher(buyOrder4);
        testMatcher.matcher(buyOrder5);
        testMatcher.matcher(buyOrder6);
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(sellOrder1);
        expect(testMatcher.buyOrders).toEqual([buyOrder5, buyOrder6, buyOrder1, buyOrder4,]);
    })




});

describe("Intruder and Defender with equal quantity", () => {

    it("Adding a buy with price equal to sell price", () => {
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(buyOrder1);
        expect(testMatcher.buyOrders.length).toBe(0);
    });

    it("Adding a sell with price equal to buy price", () => {
        testMatcher.matcher(buyOrder1);
        testMatcher.matcher(sellOrder1);
        expect(testMatcher.buyOrders.length).toBe(0);
    });

    it("Adding a buy with price less than sell price", () => {
        testMatcher.matcher(sellOrder2);
        testMatcher.matcher(buyOrder1);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(1)
    });

    it("Adding a sell with price less than buy price", () => {
        testMatcher.matcher(buyOrder2);
        testMatcher.matcher(sellOrder1);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(0);
    });

    it("Adding a buy with price greater than sell price", () => {
        testMatcher.matcher(sellOrder1);
        testMatcher.matcher(buyOrder2);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(0)
    });

    it("Adding a sell with price greater than buy price", () => {
        testMatcher.matcher(buyOrder1);
        testMatcher.matcher(sellOrder2);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(1);
    });

});

describe("Intruder with higher quantity", () => {

    it("Intruder: Sell, Price equal", () => {
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(sellOrder8);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders[0].quantity).toBe(5);
    });

    it("Intruder: Buy, Price equal", () => {
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(buyOrder8);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders[0].quantity).toBe(5);
    });

    it("Intruder: Sell, Intruder lower price", () => {
        testMatcher.matcher(buyOrder10);
        testMatcher.matcher(sellOrder8);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.sellOrders[0].quantity).toBe(5);
    });

    it("Intruder: Buy, Intruder lower price", () => {
        testMatcher.matcher(sellOrder10);
        testMatcher.matcher(buyOrder8);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(1)
    });

    it("Intruder: Sell, Intruder greater price", () => {
        testMatcher.matcher(buyOrder7);
        testMatcher.matcher(sellOrder8);
        expect(testMatcher.sellOrders.length).toBe(1)
        expect(testMatcher.buyOrders.length).toBe(1);
    });

    it("Intruder: Buy, Intruder greater price", () => {
        testMatcher.matcher(sellOrder7);
        testMatcher.matcher(buyOrder8);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders[0].quantity).toBe(5);
    });
    
    it("Intruder: Buy, price equal, vs multiple smaller Defenders", () => {
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(buyOrder12);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders[0].quantity).toBe(5);
    });
    
    it("Intruder: Sell, price equal, vs multiple smaller Defenders", () => {
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(sellOrder12);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.sellOrders[0].quantity).toBe(5);
    });

});

describe("Intruder with lower quantity", () => {

    it("Intruder: Sell, Price equal", () => {
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(sellOrder11);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.buyOrders[0].quantity).toBe(3);
    });

    it("Intruder: Buy, Price equal", () => {
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(buyOrder11);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.sellOrders[0].quantity).toBe(3);
    });

    it("Intruder: Sell, Intruder lower price", () => {
        testMatcher.matcher(buyOrder10);
        testMatcher.matcher(sellOrder11);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders[0].quantity).toBe(3);
    });

    it("Intruder: Buy, Intruder lower price", () => {
        testMatcher.matcher(sellOrder10);
        testMatcher.matcher(buyOrder11);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(1)
    });

    it("Intruder: Sell, Intruder greater price", () => {
        testMatcher.matcher(buyOrder7);
        testMatcher.matcher(sellOrder11);
        expect(testMatcher.sellOrders.length).toBe(1)
        expect(testMatcher.buyOrders.length).toBe(1);
    });

    it("Intruder: Buy, Intruder greater price", () => {
        testMatcher.matcher(sellOrder7);
        testMatcher.matcher(buyOrder11);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.sellOrders[0].quantity).toBe(3);
    });

    describe("Intruder with lower quantity", () => {

    it("Intruder: Sell, Price equal", () => {
        testMatcher.matcher(buyOrder9);
        testMatcher.matcher(sellOrder11);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.buyOrders[0].quantity).toBe(3);
    });

    it("Intruder: Buy, Price equal", () => {
        testMatcher.matcher(sellOrder9);
        testMatcher.matcher(buyOrder11);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.sellOrders[0].quantity).toBe(3);
    });

    it("Intruder: Sell, Intruder lower price", () => {
        testMatcher.matcher(buyOrder10);
        testMatcher.matcher(sellOrder11);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(0);
        expect(testMatcher.buyOrders[0].quantity).toBe(3);
    });

    it("Intruder: Buy, Intruder lower price", () => {
        testMatcher.matcher(sellOrder10);
        testMatcher.matcher(buyOrder11);
        expect(testMatcher.buyOrders.length).toBe(1);
        expect(testMatcher.sellOrders.length).toBe(1)
    });

    it("Intruder: Sell, Intruder greater price", () => {
        testMatcher.matcher(buyOrder7);
        testMatcher.matcher(sellOrder11);
        expect(testMatcher.sellOrders.length).toBe(1)
        expect(testMatcher.buyOrders.length).toBe(1);
    });

    it("Intruder: Buy, Intruder greater price", () => {
        testMatcher.matcher(sellOrder7);
        testMatcher.matcher(buyOrder11);
        expect(testMatcher.buyOrders.length).toBe(0);
        expect(testMatcher.sellOrders.length).toBe(1);
        expect(testMatcher.sellOrders[0].quantity).toBe(3);
    });

});

});