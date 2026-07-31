/* eslint-disable @typescript-eslint/no-var-requires */
// Creates (or updates the password of) an admin user.
// Run locally with the same DATABASE_URL as your deployment:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npm run create-admin
// or fill ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME into a local .env file first.
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (env vars or .env) before running this script.");
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: { password: hashed, name },
    create: { email: email.toLowerCase(), password: hashed, name }
  });

  console.log(`Admin ready: ${user.email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
