import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();
const app = express();
app.use(express.json());

type CreateUserBody = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

app.post("/users", async (req, res) => {
  const {firstName, lastName, email, password} = req.body as CreateUserBody;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
    }
  });
  res.json({ user });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

app.listen(3000, () => {
  console.log("I got started!");
});