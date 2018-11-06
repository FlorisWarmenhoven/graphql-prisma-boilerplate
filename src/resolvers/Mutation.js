import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import generateToken from "../utils/generateToken";
import hashPassword from "../utils/hashPassword";

const Mutation = {
	async createUser(parent, args, { prisma }, info) {
		const hashedPassword = await hashPassword(args.data.password);

		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password: hashedPassword,
			},
		});

		return {
			user,
			token: generateToken(user.id),
		};
	},

	deleteUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		return prisma.mutation.deleteUser({ where: { id: userId } }, info);
	},

	async updateUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		if (typeof args.data.password === "string") {
			args.data.password = await hashPassword(args.data.password);
		}
		return prisma.mutation.updateUser(
			{
				where: { id: userId },
				data: args.data,
			},
			info
		);
	},

	async login(parent, args, { prisma }, info) {
		const user = await prisma.query.user({ where: { email: args.data.email } });

		if (!user) {
			throw new Error(`User with email: ${args.data.email} does not exist.`);
		}

		const isPasswordMatched = await bcrypt.compare(
			args.data.password,
			user.password
		);

		if (!isPasswordMatched) {
			throw new Error(`Password for user ${args.data.email} is invalid.`);
		}

		return {
			user,
			token: generateToken(user.id),
		};
	},
};

export default Mutation;
