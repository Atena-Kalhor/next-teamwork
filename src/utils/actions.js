"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/db/connectDB";
import Question from "@/db/models/Question";

// Keep the same signature used by UI, but route based on the provided URL
export async function getData(url) {
  await connectDB();

  try {
    // Normalize and parse path
    const pathname =
      typeof url === "string" ? new URL(url, "http://localhost").pathname : "";
    const parts = pathname.split("/").filter(Boolean);

    // Expecting patterns like: /api/v1/question or /api/v1/question/:id
    const questionIndex = parts.findIndex((p) => p === "question");

    if (questionIndex !== -1 && parts.length === questionIndex + 1) {
      // All questions
      const questions = await Question.find().lean();
      return JSON.parse(JSON.stringify(questions));
    }

    if (questionIndex !== -1 && parts.length === questionIndex + 2) {
      // Single question by id
      const id = parts[questionIndex + 1];
      const question = await Question.findById(id).lean();
      return JSON.parse(JSON.stringify(question));
    }

    // Fallback: return all
    const questions = await Question.find().lean();
    return JSON.parse(JSON.stringify(questions));
  } catch (error) {
    console.error("Error in getData:", error);
    throw error;
  }
}

// Explicit helpers for components to call directly without URLs
export async function getAllQuestions() {
  await connectDB();
  try {
    const questions = await Question.find().lean();
    return JSON.parse(JSON.stringify(questions));
  } catch (error) {
    console.error("Error in getAllQuestions:", error);
    throw error;
  }
}

export async function getQuestionById(id) {
  await connectDB();
  try {
    const question = await Question.findById(id).lean();
    return JSON.parse(JSON.stringify(question));
  } catch (error) {
    console.error("Error in getQuestionById:", error);
    throw error;
  }
}

export async function addQuestion(formData) {
  await connectDB();
  try {
    const newQuestion = new Question({
      title: formData.title,
      description: formData.description,
      answer: [],
    });
    await newQuestion.save();
    revalidatePath("/question");
    return JSON.parse(JSON.stringify(newQuestion));
  } catch (error) {
    console.error("Error in addQuestion:", error);
    throw error;
  }
}

export async function deleteQuestion(id) {
  await connectDB();
  try {
    await Question.findByIdAndDelete(id);
    revalidatePath("/question");
    return { success: true };
  } catch (error) {
    console.error("Error in deleteQuestion:", error);
    throw error;
  }
}

//// Answer /////////////////////////////////////////////////////////////////

export async function patchAnswer(id, answer) {
  await connectDB();
  try {
    const updated = await Question.findByIdAndUpdate(
      id,
      { $push: { answer } },
      { new: true }
    ).lean();
    revalidatePath(`/question/${id}`);
    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    console.error("Error in patchAnswer:", error);
    throw error;
  }
}

export async function editAnswer(id, index, answer) {
  await connectDB();
  try {
    const question = await Question.findById(id);
    if (!question) throw new Error("Question not found");
    const answers = Array.isArray(question.answer) ? question.answer : [];
    answers[index] = answer;
    question.answer = answers;
    await question.save();
    revalidatePath(`/question/${id}`);
    return JSON.parse(JSON.stringify(question));
  } catch (error) {
    console.error("Error in editAnswer:", error);
    throw error;
  }
}

export async function deleteAnswer(id, index) {
  await connectDB();
  try {
    const question = await Question.findById(id);
    if (!question) throw new Error("Question not found");
    const answers = Array.isArray(question.answer) ? question.answer : [];
    answers.splice(index, 1);
    question.answer = answers;
    await question.save();
    revalidatePath(`/question/${id}`);
    return JSON.parse(JSON.stringify(question));
  } catch (error) {
    console.error("Error in deleteAnswer:", error);
    throw error;
  }
}
