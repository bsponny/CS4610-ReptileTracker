import express, { Request, RequestHandler } from "express";
import { PrismaClient, User, Session } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import cookieParser from "cookie-parser";

const client = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cookieParser());

//Users
type CreateUserBody = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const authenticationMiddleware: RequestHandler =async (req:RequestWithSession, res, next) => {
  const sessionToken = req.cookies["session-token"];
  if (sessionToken){
    const session = await client.session.findFirst({
      where: {
        token: sessionToken
      },
      include: {
        user: true
      }
    });
    if (session){
      req.session = session;
      req.user = session.user;
    }
  }
  next();
}
app.use(authenticationMiddleware);

app.post("/users", async (req, res) => {
  const {firstName, lastName, email, password} = req.body as CreateUserBody;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      sessions: {
        create: [{
          token: uuidv4()
        }]
      }
    },
    include:{
      sessions: true
    }
  });
  res.cookie("session-token", user.sessions[0].token, {
    httpOnly: true,
    maxAge: 60000 * 10
  });
  res.json({ user });
});

app.get("/users", async (req, res) => {
  const users = await client.user.findMany();
  res.json({users});
});

type DeleteUser = {
  id: number
}

app.delete("/users",async (req, res) => {
  const {id} = req.body as DeleteUser;
  const user = await client.user.delete({
    where: {
      id
    }
  });
  res.json(user);
});

//Login
type RequestWithSession = Request & {
  session?: Session
  user?: User
}

type LoginBody = {
  email: string,
  password: string
}

app.post("/sessions",  async (req, res) => {
  const {email, password} = req.body as LoginBody;
  const user = await client.user.findFirst({
    where: {
      email,
    }
  });
  if (!user) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    res.status(404).json({ message: "Invalid email or password" });
    return;
  }

  const token = uuidv4();
  const session = await client.session.create({
    data: {
      userId: user.id,
      token,
    }
  })

  res.cookie("session-token", session.token, {
    httpOnly: true,
    maxAge: 60000 * 10
  })
  res.json({session});
});

app.get("/me", async (req: RequestWithSession, res) => {
  if (req.session) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "unauthorized"});
  }
})

app.listen(3000, () => {
  console.log("I got started!");
});
