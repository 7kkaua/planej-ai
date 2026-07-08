import { useEffect, useState } from 'react';
import { useFinancialStore } from '../store/useFinancialStore';
import { getFinancialAdvice, listAvailableModels } from '../services/geminiService';

export function ResultPage() {
  const data = useFinancialStore((state) => state.data);
  const [advice, setAdvice] = useState<string>('Processando...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Diagnóstico rápido: lista os modelos no console sempre que carregar
    listAvailableModels();

    if (data) {
      getFinancialAdvice(data)
        .then((response: string) => setAdvice(response))
        .catch((err: unknown) => {
          console.error(err);
          setAdvice("Ops! Erro ao conectar. Verifique o console (F12).");
        })
        .finally(() => setLoading(false));
    }
  }, [data]);

  return (
    <div className="text-gray-800 p-4 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Diagnóstico</h2>
      {loading ? (
        <p className="animate-pulse text-gray-500">Consultando a IA...</p>
      ) : (
        <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
          {advice}
        </div>
      )}
    </div>
  );
}