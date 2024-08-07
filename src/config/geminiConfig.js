import axios from "axios";
import { useState } from "react";

export async function sendMessageToGemini(message) {
  const base_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${
    import.meta.env.VITE_GEMINI_API_KEY
  }`;
  try {
    const response = await axios({
      url: base_URL,
      method: "post",
      data: {
        contents: [{ parts: [{ text: message }] }],
      },
    });
    const data = await response.data.candidates[0].content.parts[0].text;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
