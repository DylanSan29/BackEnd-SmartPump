import express from "express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors({ origin: "http://localhost:3002" }));
app.use(express.json());
app.use(userRouter);
app.use(authRouter);

export default app;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
