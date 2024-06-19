import { Router } from "express";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

const dbFilePath = path.join(__dirname, "db.json");

// Helper function to read the JSON database
const readDatabase = (): Submission[] => {
  try {
    const data = fs.readFileSync(dbFilePath, "utf-8");
    return JSON.parse(data) as Submission[];
  } catch (error) {
    return [];
  }
};

// Helper function to write to the JSON database
const writeDatabase = (data: Submission[]): void => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

// Endpoint to check server status
router.get("/ping", (req: Request, res: Response) => {
  res.json({ success: true });
});

// Endpoint to submit a new submission
router.post("/submit", (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const submissions = readDatabase();
  const newSubmission: Submission = {
    name,
    email,
    phone,
    github_link,
    stopwatch_time,
  };
  submissions.push(newSubmission);
  writeDatabase(submissions);
  res.json({ success: true });
});

// Endpoint to read a submission by index
router.get("/read", (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = readDatabase();
  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ error: "Submission not found" });
  }
});

export default router;
