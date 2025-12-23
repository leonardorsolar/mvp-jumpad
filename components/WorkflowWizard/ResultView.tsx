
import React, { useState } from 'react';

const WorkflowResultView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('fluxo');

  const tabs = [
    { id: 'fluxo', label: 'Fluxo Gerado', icon: 'account_tree' },
    { id: 'checklist', label: 'Checklist', icon: 'rule' },
    { id: 'automacao', label: 'Mapa de Automação', icon: 'robot_2' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header Result */}
      <div className="bg-[#f8f9fb] border-b border-slate-100 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="size-20 bg-white rounded-[2rem] shadow-xl shadow-blue-500/10 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[40px]">task_alt</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Fluxo Gerado com Sucesso!</h1>
            <p className="text-slate-500 text-[16px]">Pronto para revisão e exportação.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 shadow-sm transition-all">
            <span className="material-symbols-outlined">ios_share</span>
            Compartilhar
          </button>
          <button className="px-6 py-3 bg-[#1a1a1a] text-white rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 shadow-xl shadow-black/10 transition-all">
            <span className="material-symbols-outlined">picture_as_pdf</span>
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 pt-6">
        <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-8 pt-6">
        {activeTab === 'fluxo' && (
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="space-y-4">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Passos do Processo</h3>
              <div className="space-y-4 border-l-2 border-slate-100 ml-4 pl-8">
                {[
                  { title: 'Extração SAP', desc: 'Acessar transação ZCOR, extrair relatório mensal em .XLSX', system: 'SAP ERP' },
                  { title: 'Limpeza de Dados', desc: 'Remover linhas duplicadas e validar CPFs com máscara de texto.', system: 'Excel' },
                  { title: 'Conciliação Bancária', desc: 'Cruzamento dos valores extraídos com o extrato bancário oficial.', system: 'Portal Financeiro' }
                ].map((step, i) => (
                  <div key={i} className="relative bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm hover:border-blue-100 transition-colors">
                    <div className="absolute top-6 -left-[41px] size-5 bg-white border-2 border-slate-200 rounded-full" />
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800 text-[16px]">{i+1}. {step.title}</h4>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[10px] font-bold">{step.system}</span>
                    </div>
                    <p className="text-slate-500 text-[14px] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'automacao' && (
          <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-blue-900">ROI Potencial: Médio/Alto</h4>
                  <p className="text-blue-700/70 text-[14px]">Este fluxo possui 2 tarefas altamente automatizáveis via IA + API.</p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold text-blue-400 uppercase">Economia estimada</span>
                  <span className="text-[20px] font-bold text-blue-900">~ 18h / mês</span>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-4">
               {[
                 { task: 'Validar CPFs', tech: 'IA-only', priority: 'Alta', color: 'blue' },
                 { task: 'Extração SAP', tech: 'Manual', priority: 'Baixa', color: 'slate' },
                 { task: 'Conciliação', tech: 'IA + RPA', priority: 'Média', color: 'purple' },
                 { task: 'Envio de Email', tech: 'IA + API', priority: 'Alta', color: 'green' }
               ].map((item, i) => (
                 <div key={i} className="bg-white border border-slate-100 rounded-[1.5rem] p-5 flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="font-bold text-slate-800">{item.task}</span>
                     <span className={`text-[11px] font-bold uppercase tracking-wide text-${item.color}-600`}>{item.tech}</span>
                   </div>
                   <div className="text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        item.priority === 'Alta' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {item.priority}
                      </span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 flex justify-center">
         <button 
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 text-[14px] font-medium"
         >
           Voltar para o Dashboard
         </button>
      </div>
    </div>
  );
};

export default WorkflowResultView;
