
import React, { useState } from 'react';
import { WorkflowEntry } from '../../types';

const MOCK_WORKFLOWS: WorkflowEntry[] = [
  { id: '1', title: 'Onboarding de Clientes - Financeiro', status: 'aprovado', date: '21 Mar 2024', step: 3 },
  { id: '2', title: 'Aprovação de Crédito Imobiliário', status: 'em_revisao', date: 'Hoje', step: 2 },
  { id: '3', title: 'Relatório Mensal de Performance', status: 'rascunho', date: 'Ontem', step: 1 },
];

interface WorkflowDashboardProps {
  onCreateNew: () => void;
}

const WorkflowDashboard: React.FC<WorkflowDashboardProps> = ({ onCreateNew }) => {
  const [search, setSearch] = useState('');

  const getStatusBadge = (status: WorkflowEntry['status']) => {
    const styles = {
      aprovado: 'bg-green-50 text-green-700 border-green-100',
      em_revisao: 'bg-amber-50 text-amber-700 border-amber-100',
      rascunho: 'bg-slate-50 text-slate-700 border-slate-100',
    };
    const labels = {
      aprovado: 'Aprovado',
      em_revisao: 'Em revisão',
      rascunho: 'Rascunho',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden p-6 gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-slate-900 tracking-tight">Meus Fluxos</h1>
          <p className="text-slate-500 text-[14px]">Documente e automatize processos com IA.</p>
        </div>
        <button 
          onClick={onCreateNew}
          className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-2xl font-bold text-[15px] flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-black/5"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Criar meu fluxo
        </button>
      </div>

      <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
        <span className="material-symbols-outlined text-slate-400">search</span>
        <input 
          type="text" 
          placeholder="Buscar processos..." 
          className="bg-transparent border-none p-0 focus:ring-0 w-full text-[15px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        {MOCK_WORKFLOWS.map((flow) => (
          <div 
            key={flow.id}
            className="group p-4 border border-slate-100 rounded-[1.5rem] hover:border-slate-200 hover:shadow-sm transition-all flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <span className="material-symbols-outlined text-[26px]">
                  {flow.status === 'aprovado' ? 'verified' : 'history_edu'}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 text-[16px]">{flow.title}</span>
                  {getStatusBadge(flow.status)}
                </div>
                <span className="text-slate-400 text-[13px]">Atualizado em {flow.date} • Passo {flow.step}/3</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all">
              chevron_right
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowDashboard;
