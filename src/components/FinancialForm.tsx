import { useForm } from 'react-hook-form';
import { useFinancialStore } from '../store/useFinancialStore';
import type { FinancialData } from '../types/financial';

export function FinancialForm({ onComplete }: { onComplete: () => void }) {
  const { register, handleSubmit } = useForm<FinancialData>();
  const setData = useFinancialStore((state) => state.setData);

  const onSubmit = (data: FinancialData) => {
    setData(data);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input {...register("income")} type="number" placeholder="Renda Mensal" className="p-2 border" />
      <input {...register("expenses")} type="number" placeholder="Gastos Mensais" className="p-2 border" />
      <input {...register("savings")} type="number" placeholder="Poupança Mensal" className="p-2 border" />
      <input {...register("goal")} type="text" placeholder="Seu Objetivo" className="p-2 border" />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Gerar Diagnóstico</button>
    </form>
  );
}