import { PaymentStatus, PrismaClient } from "@prisma/client";
import { foods } from "./seedData";

const prisma = new PrismaClient();

const main = async () => {
	const user = await prisma.user.upsert({
		where: { email: "test@email.com" },
		update: {},
		create: {
			email: "test@email.com",
			name: "Test User",
			picture: "https://example.com/test.jpg",
		},
	});
	await prisma.order.upsert({
		where: { id: 1 },
		update: {
			description: "Co Tu",
			total: 50000,
			paymentStatus: PaymentStatus.PENDING,
			userId: user.id,
		},
		create: {
			description: "Co Tu",
			total: 50000,
			paymentStatus: PaymentStatus.PENDING,
			userId: user.id,
		},
	});
	for await (const food of foods) {
		const { id, ...fields } = food;
		await prisma.food.upsert({
			where: { id: food!.id },
			update: {
				...fields,
				options: {
					deleteMany: {},
					create: food.options.map((option) => ({
						size: option.size,
						price: option.price,
						minQuantity: option.minQuantity,
						stripePriceId: option.stripePriceId,
					})),
				},
			},
			create: {
				...fields,
				options: {
					create: food.options.map((option) => ({
						size: option.size,
						price: option.price,
						minQuantity: option.minQuantity,
						stripePriceId: option.stripePriceId,
					})),
				},
			},
		});
	}
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
