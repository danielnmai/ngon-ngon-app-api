"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const seedData_1 = require("./seedData");
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const user = yield prisma.user.upsert({
        where: { email: "test@email.com" },
        update: {},
        create: {
            email: "test@email.com",
            name: "Test User",
            picture: "https://example.com/test.jpg",
        },
    });
    yield prisma.order.upsert({
        where: { id: 1 },
        update: {
            description: "Co Tu",
            total: 50000,
            paymentStatus: client_1.PaymentStatus.PENDING,
            userId: user.id,
        },
        create: {
            description: "Co Tu",
            total: 50000,
            paymentStatus: client_1.PaymentStatus.PENDING,
            userId: user.id,
        },
    });
    try {
        for (var _d = true, foods_1 = __asyncValues(seedData_1.foods), foods_1_1; foods_1_1 = yield foods_1.next(), _a = foods_1_1.done, !_a; _d = true) {
            _c = foods_1_1.value;
            _d = false;
            const food = _c;
            const { id } = food, fields = __rest(food, ["id"]);
            yield prisma.food.upsert({
                where: { id: food.id },
                update: Object.assign(Object.assign({}, fields), { options: {
                        deleteMany: {},
                        create: food.options.map((option) => ({
                            size: option.size,
                            price: option.price,
                            minQuantity: option.minQuantity,
                            stripePriceId: option.stripePriceId,
                        })),
                    } }),
                create: Object.assign(Object.assign({}, fields), { options: {
                        create: food.options.map((option) => ({
                            size: option.size,
                            price: option.price,
                            minQuantity: option.minQuantity,
                            stripePriceId: option.stripePriceId,
                        })),
                    } }),
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = foods_1.return)) yield _b.call(foods_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
