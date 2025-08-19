import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // password default untuk keduanya: "password123"
  const hashed = await bcrypt.hash("password123", 10);

  // 1) Users: admin & kasir
  await prisma.users.upsert({
    where: { email: "admin@pos.local" }, // pakai field UNIQUE
    update: {},
    create: {
      name: "Admin",
      email: "admin@pos.local",
      password_hash: hashed,
      role: "admin",
    },
  });

  await prisma.users.upsert({
    where: { email: "kasir@pos.local" },
    update: {},
    create: {
      name: "Kasir",
      email: "kasir@pos.local",
      password_hash: hashed,
      role: "cashier",
    },
  });

  // 2) Products (cek dulu biar tidak dobel, karena "name" tidak unique)
  const products = [
    { name: "Nasi Goreng", price: "20000.00" },
    { name: "Mie Goreng", price: "18000.00" },
    { name: "Es Teh", price: "5000.00" },
    { name: "Es Jeruk", price: "7000.00" },
    { name: "Air Mineral", price: "4000.00" },
  ];

  for (const p of products) {
    const exists = await prisma.products.findFirst({ where: { name: p.name } });
    if (!exists) {
      await prisma.products.create({ data: { ...p, is_active: true } });
    }
  }

  console.log("Seed OK: Users and Products created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
