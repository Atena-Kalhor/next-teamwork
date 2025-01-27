import { connectDB, disconnectDB } from "@/db/connectDB";
import Question from "@/db/models/Question";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response("Question ID is required", { status: 400 });
    }

    await connectDB();

    const question = await Question.findById(id);

    if (!question) {
      return new Response("Question not found", { status: 404 });
    }

    return new Response(JSON.stringify(question), {
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
    const { id } = params;
    await connectDB();
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return new Response("question not found", { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    disconnectDB();
  } finally {
    disconnectDB();
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    // console.log("this is the body:====");
    // console.log(body);
    await connectDB();
    const question = await Question.findById(id);
    if (!question) {
      return new Response("question not found", { status: 404 });
    }

    const ans = (await question.answer) || [];
    ans.push(body.answer);
    const q = await Question.findByIdAndUpdate(id, question);
    return new Response(JSON.stringify(q), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating question:", error);
    disconnectDB();
  } finally {
    disconnectDB();
  }
}
