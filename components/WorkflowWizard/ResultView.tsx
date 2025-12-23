
import React, { useState } from 'react';

interface AnalyzedTask {
  id: string;
  title: string;
  probability: number;
  complexity: 'Baixa' | 'Média' | 'Alta';
  description: string;
  status: 'active' | 'inactive';
}

const WorkflowResultView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tasks, setTasks] = useState<AnalyzedTask[]>([
    { 
      id: '1', 
      title: 'Classificar Assunto (Tag + Prioridade)', 
      probability: 98, 
      complexity: 'Baixa',
      description: 'A IA identifica o motivo do contato (troca, atraso, reembolso) e define a urgência automaticamente.',
      status: 'inactive'
    },
    { 
      id: '2', 
      title: 'Extração de Dados e Consulta ERP', 
      probability: 92, 
      complexity: 'Média',
      description: 'Captura nomes e números de pedido do e-mail e verifica o status real no Shopify/ERP.',
      status: 'inactive'
    },
    { 
      id: '3', 
      title: 'Rascunho de Resposta Personalizada', 
      probability: 88, 
      complexity: 'Média',
      description: 'Gera uma resposta baseada na política de reembolso e no status do pedido encontrado.',
      status: 'inactive'
    },
    { 
      id: '4', 
      title: 'Triagem de Fraudes e VIPs', 
      probability: 75, 
      complexity: 'Alta',
      description: 'Identifica padrões de risco ou clientes de alta prioridade para escalonamento manual.',
      status: 'inactive'
    },
  ]);

  const toggleAssistant = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t));
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 90) return 'text-green-600';
    if (prob >= 75) return 'text-blue-600';
    return 'text-amber-600';
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fbfcf8] overflow-hidden animate-in fade-in duration-500">
      {/* Header Result */}
      <div className="bg-white border-b border-slate-100 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-5">
          <div className="size-16 bg-blue-600 rounded-[1.5rem] shadow-xl shadow-blue-500/20 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[32px]">analytics</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[24px] font-bold text-slate-900 tracking-tight leading-tight">Análise Estratégica Concluída</h1>
            <p className="text-slate-500 text-[15px]">Suporte LojaX: Mapeamos o potencial de automação por IA em cada etapa.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onBack}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-black/5"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Ver Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Tarefas Mapeadas</h3>
            <div className="flex items-center gap-2 text-[12px] text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-blue-500">info</span>
              Probabilidade baseada na clareza das suas regras
            </div>
          </div>

          <div className="grid gap-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className="group bg-white border border-slate-100 rounded-[2rem] p-6 hover:border-blue-200 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Info Column */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-xl flex items-center justify-center font-bold ${
                        task.complexity === 'Baixa' ? 'bg-green-50 text-green-600' : 
                        task.complexity === 'Média' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        <span className="text-[11px] uppercase">{task.complexity[0]}</span>
                      </div>
                      <h4 className="text-[17px] font-bold text-slate-800">{task.title}</h4>
                    </div>
                    <p className="text-[14px] text-slate-500 leading-relaxed max-w-xl">
                      {task.description}
                    </p>
                  </div>

                  {/* Probability & Actions */}
                  <div className="flex flex-col md:items-end gap-4 min-w-[200px]">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Sucesso da IA</span>
                        <span className={`text-[20px] font-black ${getProbabilityColor(task.probability)}`}>
                          {task.probability}%
                        </span>
                      </div>
                      <div className="w-40 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            task.probability >= 90 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${task.probability}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="flex-1 md:flex-none px-4 py-2 border border-slate-100 text-slate-600 rounded-xl text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                        Melhorar
                      </button>
                      <button 
                        onClick={() => toggleAssistant(task.id)}
                        className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 border ${
                          task.status === 'active' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-blue-600 text-white border-blue-600 hover:opacity-90 shadow-lg shadow-blue-500/10'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {task.status === 'active' ? 'check_circle' : 'bolt'}
                        </span>
                        {task.status === 'active' ? 'Ativo' : 'Ativar Assistente'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integration Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8 flex items-start gap-4">
            <div className="size-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
              <span className="material-symbols-outlined">hub</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-blue-900">Integração Próxima: Shopify & ERP</h4>
              <p className="text-[14px] text-blue-700/80 leading-relaxed">
                Para que a tarefa de "Extração e Consulta" atinja 100% de sucesso, recomendamos conectar as chaves de API do seu Shopify e ERP interno. Isso permitirá que a IA tome decisões em tempo real baseadas no estoque e logística.
              </p>
              <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl text-[13px] font-bold hover:bg-blue-700 transition-all">
                Configurar Conexões
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkflowResultView;
