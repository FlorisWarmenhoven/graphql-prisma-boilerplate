import bcrypt from "bcryptjs";
import prisma from "../../src/prisma";
import jwt from "jsonwebtoken";

const userOne = {
	input: {
		name: "Andrew",
		email: "andrew@example.com",
		password: bcrypt.hashSync("potatoes123"),
	},
	user: undefined,
	jwt: undefined,
};

const userTwo = {
	input: {
		name: "Floris",
		email: "floris@example.com",
		password: bcrypt.hashSync("potatoes123"),
	},
	user: undefined,
	jwt: undefined,
};

const seedDatabase = async () => {
	await prisma.mutation.deleteManyUsers();

	// Create userOne and sign token
	userOne.user = await prisma.mutation.createUser({
		data: userOne.input,
	});
	userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

	// Create userTwo and sign token
	userTwo.user = await prisma.mutation.createUser({
		data: userTwo.input,
	});
	userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };
