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

// Endpoint to delete a submission by index
router.delete("/delete", (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  let submissions = readDatabase();
  if (index >= 0 && index < submissions.length) {
    submissions = submissions.filter((_, i) => i !== index);
    writeDatabase(submissions);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Submission not found" });
  }
});

// Endpoint to update a submission by index
router.put("/update", (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  let submissions = readDatabase();
  if (index >= 0 && index < submissions.length) {
    submissions[index] = {
      name,
      email,
      phone,
      github_link,
      stopwatch_time,
    };
    writeDatabase(submissions);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Submission not found" });
  }
});

// Endpoint to search submissions by email
router.get("/search", (req: Request, res: Response) => {
  const email = req.query.email as string;
  const submissions = readDatabase();
  const results = submissions.filter(
    (submission) => submission.email === email
  );
  res.json(results);
});

router.get("/read-all", (req, res) => {
  const submissions = readDatabase();
  res.json(submissions);
});
export default router;
