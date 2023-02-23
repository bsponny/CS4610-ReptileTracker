import express, { Request, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();
const app = express();
app.use(express.json());

//Users
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

app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json({users});
})

type deletedUser = {
  id: number,
}

app.delete("/users",async (req, res) => {
  const {id} = req.body as deletedUser;
  const user = await client.user.delete({
    where: {
      id,
    }
  });
  res.json({user});
});

app.listen(3000, () => {
  console.log("I got started!");
});
