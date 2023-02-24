import express, { Request, RequestHandler } from "express";
import { PrismaClient, User, Session } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import cookieParser from "cookie-parser";

const client = new PrismaClient();
const app = express();
const unauthorized = "Unauthorized User";
app.use(express.json());
app.use(cookieParser());

//Users
type CreateUserBody = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const authenticationMiddleware: RequestHandler = async (req:RequestWithSession, res, next) => {
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

app.delete("/users/:id", async (req, res) => {
  const user = await client.user.delete({
    where: {
      id: parseInt(req.params.id)
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

app.post("/sessions", async (req, res) => {
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
    res.status(401).json({ message: unauthorized});
  }
})

//Reptiles
type CreateReptileBody = {
  species: string,
  name: string,
  sex: string
}

app.post("/reptiles", async (req: RequestWithSession, res) => {
  if (req.session){
    const {species, name, sex} = req.body as CreateReptileBody;
    const user = req.user;
    if (!user){
      res.json(unauthorized);
      return;
    }
    const reptile = await client.reptile.create({
      data: {
        species,
        name,
        sex,
        userId: user.id
      }
    });
    res.json({reptile});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.get("/reptiles", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptiles = await client.reptile.findMany({
      where: {
        userId: req.user?.id
      }
    });
    res.json({reptiles});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.delete("/reptiles/:id", async (req: RequestWithSession, res) => {
  if (req.session){
      if (req.user){
      const reptile = await client.reptile.findFirst({
        where: {
          id: parseInt(req.params.id)
        }
      })
      if (req.user.id === reptile?.userId){
        const deletedReptile = await client.reptile.delete({
          where:{
            id: reptile.id
          }
        })
      }
      else {
        res.json(unauthorized);
        return;
      }
      res.json({reptile});
    }
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.put("/reptiles/:id", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where: {
        id: parseInt(req.params.id)
      }
    })
    if (!reptile){
      res.json("Reptile does not exist");
      return;
    }
    if (req.user?.id != reptile?.userId){
      res.json(unauthorized);
      return;
    }
    const {species, name, sex} = req.body as CreateReptileBody;
    const updatedReptile = await client.reptile.update({
      where: {
        id: reptile?.id
      },
      data: {
        species,
        name,
        sex
      }
    });
    res.json({updatedReptile});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

//Feeding
type CreateFeeding = {
  foodItem: string
}
app.post("/feeding/:reptileId", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where: {
        id: parseInt(req.params.reptileId)
      }
    });
    if (!reptile){
      res.json("Reptile does not exist");
      return;
    }
    if (req.user?.id !== reptile?.userId){
      res.json(unauthorized);
      return;
    }
    const {foodItem} = req.body as CreateFeeding;
    const feeding = await client.feeding.create({
      data: {
        foodItem,
        reptileId: reptile.id
      }
    });
    res.json({feeding});
  }
  else {
    res.json(unauthorized);
    return;
  }
});

app.get("/feeding/:reptileId", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where: {
        id: parseInt(req.params.reptileId)
      }
    });
    if (!reptile){
      res.json("Reptile doesn't exist");
      return;
    }
    if(reptile.userId !== req.user?.id){
      res.json(unauthorized);
      return;
    }
    const feedings = await client.feeding.findMany({
      where: {
        reptileId: reptile.id
      }
    });
    res.json({feedings});
  }
  else {
    res.json(unauthorized);
    return;
  }
});

//Husbandry Record
type CreateHusbandryRecord = {
  length: number,
  weight: number,
  temperature: number,
  humidity: number
}

app.post("/husbandry/:reptileId", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where:{
        id: parseInt(req.params.reptileId)
      }
    });
    if (!reptile){
      res.json("Reptile doesn't exist");
      return;
    }
    if (reptile.userId !== req.user?.id){
      res.json(unauthorized);
      return;
    }
    const {length, weight, temperature, humidity} = req.body as CreateHusbandryRecord;
    const husbandry = await client.husbandryRecord.create({
      data: {
        length,
        weight,
        temperature,
        humidity,
        reptileId: reptile.id
      }
    });
    res.json({husbandry});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.get("/husbandry/:reptileId", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where:{
        id: parseInt(req.params.reptileId)
      }
    });
    if (!reptile){
      res.json("Reptile doesn't exist");
      return;
    }
    if (reptile.userId !== req.user?.id){
      res.json(unauthorized);
      return;
    }
    const husbandry = await client.husbandryRecord.findMany({
      where: {
        reptileId: reptile.id
      }
    })
    res.json({husbandry});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

//Schedule
type CreateSchedule = {
  type: string,
  description: string,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean,
  sunday: boolean,
}

app.post("/schedule/:reptileId", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where:{
        id: parseInt(req.params.reptileId)
      }
    });
    if (!reptile){
      res.json("Reptile doesn't exist");
      return;
    }
    if (reptile.userId !== req.user?.id){
      res.json(unauthorized);
      return;
    }
    const {type, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = req.body as CreateSchedule;
    const schedule = await client.schedule.create({
      data: {
	type,
	description,
	monday,
	tuesday,
	wednesday,
	thursday,
	friday,
	saturday,
	sunday,
        reptileId: reptile.id,
	userId: req.user?.id
      }
    });
    res.json({schedule});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.get("/reptileSchedule/:reptileId", async (req: RequestWithSession, res) => {
  if (req.session){
    const reptile = await client.reptile.findFirst({
      where:{
        id: parseInt(req.params.reptileId)
      }
    });
    if (!reptile){
      res.json("Reptile doesn't exist");
      return;
    }
    if (reptile.userId !== req.user?.id){
      res.json(unauthorized);
      return;
    }
    const schedule = await client.schedule.findMany({
      where: {
        reptileId: reptile.id
      }
    });
    res.json({schedule});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.get("/userSchedule/:userId", async (req: RequestWithSession, res) => {
  if (req.session){
    const user = await client.user.findFirst({
      where:{
        id: parseInt(req.params.userId)
      }
    });
    if (!user){
      res.json(unauthorized);
      return;
    }
    if (user.id !== req.user?.id){
      res.json(unauthorized);
      return;
    }

    const schedule = await client.schedule.findMany({
      where: {
        userId: user.id
      }
    });
    res.json({schedule});
  }
  else{
    res.json(unauthorized);
    return;
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
