
import React, { useState } from 'react';

const WorkflowResultView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('automacao');

  const tabs = [
    { id: 'fluxo', label: 'Fluxo da LojaX', icon: 'account_tree' },
    { id: 'automacao', label: 'Mapa de Automação', icon: 'robot_2' },
    { id: 'checklist', label: 'Checklist IA', icon: 'rule' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header Result */}
      <div className="bg-[#f8f9fb] border-b border-slate-100 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="size-20 bg-white rounded-[2rem] shadow-xl shadow-blue-500/10 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[40px]">auto_awesome</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[28px] font-bold text-slate-900 tracking-tight">Atendimento Automatizado!</h1>
            <p className="text-slate-500 text-[16px]">Suporte LojaX: pronto para rodar com assistência de IA.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-[#1a1a1a] text-white rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 shadow-xl shadow-black/10 transition-all">
            <span className="material-symbols-outlined">send</span>
            Ativar Assistente
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
        {activeTab === 'automacao' && (
          <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-blue-100">Redução de esforço</span>
                  <h4 className="text-[32px] font-bold mt-1">30–60%</h4>
                  <p className="text-blue-100 text-[14px] mt-2 leading-snug">Do volume diário de e-mails será transformado em "Resposta Assistida" pela IA.</p>
               </div>
               <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] text-slate-500 font-bold">Métricas Esperadas</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-slate-600">Tempo de Resposta</span>
                      <span className="font-bold text-green-600">-85%</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-slate-600">Acurácia Classificação</span>
                      <span className="font-bold text-slate-900">98%</span>
                    </div>
                  </div>
               </div>
             </div>

             <div className="grid gap-3">
               {[
                 { task: 'Classificar Assunto (Tag + Prioridade)', tech: 'IA-only', priority: 'Alta', status: 'Automático' },
                 { task: 'Buscar Dados do Pedido (Shopify API)', tech: 'IA + API', priority: 'Crítica', status: 'Conectado' },
                 { task: 'Gerar Rascunho com Base na Política', tech: 'IA + Prompt', priority: 'Alta', status: 'Em testes' },
                 { task: 'Aprovação Humana e Envio', tech: 'Humano', priority: 'Controle', status: 'Manual' }
               ].map((item, i) => (
                 <div key={i} className="bg-white border border-slate-100 rounded-[1.5rem] p-5 flex items-center justify-between group hover:border-blue-100 transition-all">
                   <div className="flex items-center gap-4">
                     <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600">
                       <span className="material-symbols-outlined">{item.tech === 'Humano' ? 'person' : 'smart_toy'}</span>
                     </div>
                     <div className="flex flex-col">
                       <span className="font-bold text-slate-800 text-[15px]">{item.task}</span>
                       <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{item.tech}</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-slate-50 rounded-full text-[11px] font-bold text-slate-500 border border-slate-100">
                        {item.status}
                      </span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'fluxo' && (
          <div className="max-w-3xl space-y-6">
            {[
              { title: 'Entrada de Dados', desc: 'IA monitora Gmail/Outlook e extrai o corpo do e-mail do cliente.' },
              { title: 'Análise de Sentimento', desc: 'Classifica em Troca, Atraso, Reembolso ou Fraude.' },
              { title: 'Cruzamento de Dados', desc: 'Busca o número do pedido no Shopify e verifica o status da entrega.' },
              { title: 'Drafting', desc: 'Aplica a política de reembolso (PDF) e gera um rascunho amigável.' }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 relative">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[14px] z-10 border border-blue-100">
                    {i+1}
                  </div>
                  {i < 3 && <div className="flex-1 w-0.5 bg-slate-100 my-2" />}
                </div>
                <div className="pb-8">
                  <h4 className="font-bold text-slate-800 text-[17px]">{step.title}</h4>
                  <p className="text-slate-500 text-[14px] mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 flex justify-center">
         <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-[14px] font-medium transition-colors">
           Sair e voltar ao dashboard
         </button>
      </div>
    </div>
  );
};

export default WorkflowResultView;
