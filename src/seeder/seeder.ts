import { PrismaClient, User } from '@prisma/client';
import * as faker from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { hash } from 'argon2';
const prisma = new PrismaClient();

const fakerUser = (): Partial<User> => ({
  firstName: faker.faker.person.firstName(),
  email: faker.faker.internet.email(),
  password: '12345678',
  secondName: faker.faker.person.middleName(),
  username: faker.faker.internet.userName(),
  imageURL: faker.faker.image.avatar(),
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  for (let i = 0; i < fakerRounds; i++) {
    const user = fakerUser();
    await prisma.user.create({
      data: { ...user, password: await hash(user.password) } as User,
    });
  }
}
main();
