"use server";

import { revalidateTag } from "next/cache";
import { v4 as uuid } from "uuid";

export async function getData(url) {
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export async function addQuestion(formData) {
  console.log("Data being sent:", formData);
  await fetch("http://localhost:3000/api/v1/question", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, id: uuid() }),
  });
  revalidateTag("question");
}



export async function deleteQuestion(id) {
  await fetch(`http://localhost:3000/api/v1/question/${id}`, { 
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  revalidateTag("question");
}

////Answer/////////////////////////////////////////////////////////////////

export async function deleteAnswer(id, index) {
  await fetch(`http://localhost:3000/api/v1/question/${id}/${index}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  revalidateTag("question");
}

export async function patchAnswer(id, answer) {
  await fetch(`http://localhost:3000/api/v1/question/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer }),
  });
  revalidateTag("question");
}

export async function editAnswer(id, index, answer) {
  await fetch(`http://localhost:3000/api/v1/question/${id}/${index}`, {
    method: "PATCH",
    body: JSON.stringify({ answer }),
  });
  revalidateTag("questoin");
}