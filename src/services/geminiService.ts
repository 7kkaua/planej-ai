import type { FinancialData } from "../types/financial";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// 1. Função para diagnóstico (para vermos o que está acontecendo no console)
export async function listAvailableModels() {
  const URL = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("--- LISTA DE MODELOS ---", data);
    return data;
  } catch (error) {
    console.error("Erro ao listar modelos:", error);
  }
}

// 2. Função principal para buscar o conselho
export const getFinancialAdvice = async (data: FinancialData): Promise<string> => {
  const MODEL = "gemini-2.5-flash";
  const URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${API_KEY}`;
  
  const prompt = `Aja como um educador financeiro especialista. Analise: Renda: R$ ${data.income}, Gastos: R$ ${data.expenses}, Economia: R$ ${data.savings}, Objetivo: ${data.goal}. Responda em Markdown.`;

  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    console.error("Erro da API:", result);
    throw new Error(`Erro ${response.status}`);
  }

  return result.candidates[0].content.parts[0].text;
};