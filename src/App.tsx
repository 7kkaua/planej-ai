import { useState } from 'react';
import { FinancialForm } from './components/FinancialForm';
import { ResultPage } from './components/ResultPage'; // Vamos garantir que esse arquivo exista

function App() {
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Planej.ai
        </h1>
        
        {!showResult ? (
          <FinancialForm onComplete={() => setShowResult(true)} />
        ) : (
          <div className="flex flex-col gap-4">
            <ResultPage />
            <button 
              onClick={() => setShowResult(false)}
              className="mt-4 text-gray-500 underline"
            >
              Fazer nova simulação
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;