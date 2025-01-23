import { connectDB, disconnectDB } from "@/db/connectDB";
import Question from "@/db/models/Question";

export async function GET(req, { params }) {
  try {
    const { id, index } = params;

    if (!id) {
      return new Response("Question ID is required", { status: 400 });
    }

    await connectDB();

    const question = await Question.findById(id);
    if (!question) {
      return new Response("Question not found", { status: 404 });
    }

    return new Response(JSON.stringify(question.answer), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching Question:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    disconnectDB();
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id, index } = params;
    await connectDB();
    const question = await Question.findById(id);
    if (!question) {
      return new Response("question not found", { status: 404 });
    }

    const ans = await question.answer;
    ans.splice(index, 1);
    const q = await Question.findByIdAndUpdate(id, question);
    return new Response(JSON.stringify(q), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    disconnectDB();
  } finally {
    disconnectDB();
  }
}
