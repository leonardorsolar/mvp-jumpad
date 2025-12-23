
import React, { useState } from 'react';

interface TaskAsset {
  id: string;
  title: string;
  files: { name: string, type: string }[];
  links: { label: string, url: string }[];
}

const WorkflowStep3Docs: React.FC<{ onNext: () => void, onPrev: () => void }> = ({ onNext, onPrev }) => {
  const [activeTaskId, setActiveTaskId] = useState('1');
  
  const [tasksAssets, setTasksAssets] = useState<TaskAsset[]>([
    { 
      id: '1', 
      title: 'Ler e-mails novos do suporte', 
      files: [], 
      links: [{ label: 'Outlook Web', url: 'https://outlook.office.com' }] 
    },
    { 
      id: '2', 
      title: 'Classificar assunto', 
      files: [{ name: 'Modelos_Resposta_v1.docx', type: 'DOCX' }], 
      links: [{ label: 'Wiki de Atendimento', url: 'https://notion.so/lojax/wiki' }] 
    },
    { 
      id: '3', 
      title: 'Buscar pedido no sistema', 
      files: [{ name: 'Manual_Integracao_Shopify.pdf', type: 'PDF' }], 
      links: [{ label: 'Painel Admin Shopify', url: 'https://lojax.myshopify.com/admin' }] 
    },
    { 
      id: '4', 
      title: 'Responder com modelo padrão', 
      files: [{ name: 'Politica_Reembolso_2024.pdf', type: 'PDF' }], 
      links: [] 
    },
    { 
      id: '5', 
      title: 'Escalar casos fora do padrão', 
      files: [], 
      links: [{ label: 'Canal Slack Nivel 2', url: 'https://slack.com/app/suporte' }] 
    },
  ]);

  const activeTask = tasksAssets.find(t => t.id === activeTaskId) || tasksAssets[0];

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-[280px_1fr] gap-8 animate-in fade-in duration-500">
      {/* Sidebar de Tarefas */}
      <aside className="space-y-4">
        <div>
          <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Documentação por Etapa</h3>
          <div className="flex flex-col gap-2">
            {tasksAssets.map((task, idx) => (
              <button
                key={task.id}
                onClick={() => setActiveTaskId(task.id)}
                className={`flex items-start gap-3 p-4 rounded-[1.5rem] text-left transition-all border ${
                  activeTaskId === task.id 
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200'
                }`}
              >
                <span className={`text-[12px] font-bold mt-1 ${activeTaskId === task.id ? 'text-slate-400' : 'text-slate-300'}`}>
                  #{idx + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] font-semibold leading-tight">{task.title}</span>
                  <div className="flex gap-2">
                    {task.files.length > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] opacity-70">
                        <span className="material-symbols-outlined text-[12px]">description</span>
                        {task.files.length}
                      </span>
                    )}
                    {task.links.length > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] opacity-70">
                        <span className="material-symbols-outlined text-[12px]">link</span>
                        {task.links.length}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Área Principal de Upload e Links */}
      <div className="flex flex-col gap-8 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex flex-col">
            <span className="text-slate-400 font-bold text-[12px] uppercase tracking-widest mb-1">Upload de Materiais</span>
            <h2 className="text-[24px] font-bold text-slate-900 leading-none">{activeTask.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="material-symbols-outlined text-[20px]">cloud_done</span>
            <span className="text-[13px] font-medium">Sincronizado</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Coluna de Arquivos */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">upload_file</span>
              Arquivos de Referência
            </h3>
            
            <div className="border-2 border-dashed border-slate-100 rounded-[1.8rem] p-6 flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-all group cursor-pointer">
              <div className="size-12 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </div>
              <p className="text-[13px] font-bold text-slate-500">Subir PDF, Doc ou Planilha</p>
            </div>

            <div className="space-y-2">
              {activeTask.files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-50 rounded-2xl group hover:border-blue-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-slate-800">{file.name}</span>
                      <span className="text-[10px] text-blue-500 font-bold uppercase">{file.type}</span>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna de Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">link</span>
              Links e Sistemas
            </h3>

            <div className="space-y-4">
              <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-amber-200 transition-all">
                <input 
                  type="text" 
                  placeholder="Nome do link..." 
                  className="flex-1 bg-transparent border-none text-[13px] focus:ring-0 px-2"
                />
                <button className="size-9 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-amber-500 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>

              <div className="space-y-2">
                {activeTask.links.map((link, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-50 rounded-2xl group hover:border-amber-100 transition-all">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="size-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-bold text-slate-800 truncate">{link.label}</span>
                        <span className="text-[11px] text-slate-400 truncate">{link.url}</span>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all shrink-0">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50/30 rounded-2xl border border-blue-50 flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-500 text-[20px]">info</span>
          <p className="text-[12.5px] text-blue-700 leading-snug">
            <b>Nota:</b> A IA lerá estes documentos para extrair modelos de resposta e regras específicas da LojaX. Certifique-se de que os PDFs contêm as políticas mais recentes.
          </p>
        </div>

        <div className="flex justify-between items-center pt-4">
          <button 
            onClick={onPrev}
            className="text-slate-400 hover:text-slate-600 font-bold text-[14px] flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Voltar ao Passo 2
          </button>
          
          <button 
            onClick={() => {
              const currentIndex = tasksAssets.findIndex(t => t.id === activeTaskId);
              if (currentIndex < tasksAssets.length - 1) {
                setActiveTaskId(tasksAssets[currentIndex + 1].id);
              } else {
                onNext();
              }
            }}
            className="px-8 py-3 bg-[#1a1a1a] text-white rounded-2xl font-bold text-[14px] flex items-center gap-2 hover:opacity-90 shadow-xl shadow-black/5"
          >
            {activeTaskId === tasksAssets[tasksAssets.length - 1].id ? 'Finalizar e Gerar Fluxo' : 'Próxima Etapa'}
            <span className="material-symbols-outlined">auto_awesome</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep3Docs;
