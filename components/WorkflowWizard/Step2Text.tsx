
import React, { useState } from 'react';

interface TaskDetail {
  id: string;
  title: string;
  tools: string[];
  rules: string[];
  gaps: string[];
  exceptions: string;
}

const WorkflowStep2Text: React.FC<{ onNext: () => void, onPrev: () => void }> = ({ onNext, onPrev }) => {
  const [activeTaskId, setActiveTaskId] = useState('1');
  
  const [tasksDetails, setTasksDetails] = useState<TaskDetail[]>([
    { 
      id: '1', 
      title: 'Ler e-mails novos do suporte', 
      tools: ['Gmail / Outlook'], 
      rules: ['Verificar apenas inbox principal', 'Ignorar spans'], 
      gaps: ['Qual o volume médio por hora?'],
      exceptions: 'E-mails marcados como [URGENTE] devem ser lidos primeiro.'
    },
    { 
      id: '2', 
      title: 'Classificar assunto', 
      tools: ['Zendesk', 'Planilha de Apoio'], 
      rules: ['Se "atraso" e pedido < 3 dias: resposta padrão', 'Se "reembolso": pedir dados'], 
      gaps: ['Quais são os 5 modelos padrão?'],
      exceptions: 'Ameaças de Procon ou Reclame Aqui -> Escalar para supervisor.'
    },
    { 
      id: '3', 
      title: 'Buscar pedido no sistema', 
      tools: ['Shopify', 'ERP Interno'], 
      rules: ['Buscar pelo e-mail ou CPF', 'Validar status da logística'], 
      gaps: ['Onde encontro o link do ERP?'],
      exceptions: 'Pedidos com mais de 30 dias sem atualização devem ser sinalizados.'
    },
    { 
      id: '4', 
      title: 'Responder com modelo padrão', 
      tools: ['Gmail', 'Zendesk'], 
      rules: ['Não alterar o assunto do e-mail', 'Copiar cliente em casos de troca'], 
      gaps: ['Os modelos estão atualizados para 2024?'],
      exceptions: 'Clientes VIP recebem tratamento manual, não usar rascunho de IA.'
    },
    { 
      id: '5', 
      title: 'Escalar casos fora do padrão', 
      tools: ['Slack', 'Zendesk Escalation'], 
      rules: ['Notificar no canal #suporte-nivel2', 'Anexar histórico completo'], 
      gaps: ['Quem é o responsável pelo Financeiro hoje?'],
      exceptions: 'Casos de fraude confirmada vão direto para o Jurídico.'
    },
  ]);

  const activeTask = tasksDetails.find(t => t.id === activeTaskId) || tasksDetails[0];

  const updateTask = (updates: Partial<TaskDetail>) => {
    setTasksDetails(prev => prev.map(t => t.id === activeTaskId ? { ...t, ...updates } : t));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-[280px_1fr] gap-8 animate-in fade-in duration-500">
      {/* Task Selector Sidebar */}
      <aside className="space-y-4">
        <div>
          <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Selecione para Refinar</h3>
          <div className="flex flex-col gap-2">
            {tasksDetails.map((task, idx) => (
              <button
                key={task.id}
                onClick={() => setActiveTaskId(task.id)}
                className={`flex items-start gap-3 p-4 rounded-[1.5rem] text-left transition-all border ${
                  activeTaskId === task.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200'
                }`}
              >
                <span className={`text-[12px] font-bold mt-1 ${activeTaskId === task.id ? 'text-blue-200' : 'text-slate-300'}`}>
                  #{idx + 1}
                </span>
                <span className="text-[14px] font-semibold leading-tight">{task.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Detail Form Area */}
      <div className="flex flex-col gap-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold text-[12px] uppercase tracking-widest mb-1">Passo Ativo</span>
            <h2 className="text-[24px] font-bold text-slate-900 leading-none">{activeTask.title}</h2>
          </div>
          <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-[13px] font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            Pronto para IA
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Ferramentas */}
            <section className="space-y-3">
              <h3 className="font-bold text-slate-800 text-[15px] flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">terminal</span>
                Ferramentas e Sistemas
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeTask.tools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[13px] text-slate-600 flex items-center gap-2 font-medium">
                    {tool}
                    <button className="text-slate-300 hover:text-red-400">×</button>
                  </span>
                ))}
                <button className="px-3 py-1.5 border border-dashed border-slate-200 rounded-xl text-[13px] text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                  + Adicionar
                </button>
              </div>
            </section>

            {/* Regras */}
            <section className="space-y-3">
              <h3 className="font-bold text-slate-800 text-[15px] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[20px]">gavel</span>
                Regras e Condições
              </h3>
              <div className="space-y-2">
                {activeTask.rules.map((rule, idx) => (
                  <div key={idx} className="group flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-100 transition-colors">
                    <span className="text-slate-300 mt-0.5">•</span>
                    <p className="text-[13px] text-slate-700 leading-snug flex-1">{rule}</p>
                    <button className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all">×</button>
                  </div>
                ))}
                <input 
                  type="text"
                  placeholder="Nova regra..."
                  className="w-full bg-transparent border-none p-2 text-[13px] focus:ring-0 placeholder:text-slate-300 italic"
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Lacunas */}
            <section className="bg-[#1a1a1a] rounded-[2rem] p-6 text-white space-y-4 shadow-xl shadow-black/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400">auto_awesome</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200">Lacunas para Automação</span>
              </div>
              <div className="space-y-3">
                {activeTask.gaps.map((gap, i) => (
                  <div key={i} className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="size-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                    <span className="text-[13px] text-slate-100 leading-tight">{gap}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Exceções */}
            <section className="space-y-3">
              <h3 className="font-bold text-slate-800 text-[15px] flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600 text-[20px]">priority_high</span>
                Exceções e Alertas
              </h3>
              <textarea 
                className="w-full border-slate-100 rounded-2xl bg-slate-50 text-[14px] p-4 min-h-[100px] focus:ring-blue-100 transition-all text-slate-600 leading-relaxed"
                value={activeTask.exceptions}
                onChange={(e) => updateTask({ exceptions: e.target.value })}
              />
            </section>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
           <div className="flex items-center gap-2 text-slate-400 text-[13px]">
              <span className="material-symbols-outlined text-[18px]">info</span>
              As regras de cada tarefa serão usadas para calibrar o prompt da IA.
           </div>
           <div className="flex gap-3">
             <button 
               onClick={() => {
                 const currentIndex = tasksDetails.findIndex(t => t.id === activeTaskId);
                 if (currentIndex < tasksDetails.length - 1) {
                   setActiveTaskId(tasksDetails[currentIndex + 1].id);
                 } else {
                   onNext();
                 }
               }}
               className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-[14px] flex items-center gap-2 hover:opacity-90"
             >
               {activeTaskId === tasksDetails[tasksDetails.length - 1].id ? 'Finalizar Configuração' : 'Próxima Tarefa'}
               <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep2Text;
