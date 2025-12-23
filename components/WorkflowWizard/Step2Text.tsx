
import React from 'react';

const WorkflowStep2Text: React.FC<{ onNext: () => void, onPrev: () => void }> = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 grid lg:grid-cols-[1fr_300px] gap-8">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">Refinar detalhes</h2>
          <p className="text-slate-500 text-[14px]">Ajuste as tarefas detectadas e adicione informações críticas.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">terminal</span>
              Ferramentas e Sistemas
            </h3>
            <div className="flex flex-wrap gap-2">
              {['SAP ERP', 'Excel 365', 'Outlook', 'Portal Interno'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[13px] text-slate-600 flex items-center gap-2">
                  {tag}
                  <button className="text-slate-300 hover:text-red-400">×</button>
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-slate-200 rounded-full text-[13px] text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                + Adicionar
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600">warning</span>
              Exceções e Riscos
            </h3>
            <textarea 
              className="w-full border-slate-100 rounded-2xl bg-slate-50 text-[14px] p-4 min-h-[100px] focus:ring-blue-100 transition-all"
              placeholder="O que acontece se o relatório vier com erro? Quem você aciona?"
            />
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-[16px]">Notas Livres</h3>
            <textarea 
              className="w-full border-slate-100 rounded-2xl bg-slate-50 text-[14px] p-4 min-h-[120px] focus:ring-blue-100 transition-all"
              placeholder="Algum outro detalhe importante para quem for ler este fluxo?"
            />
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-[#1a1a1a] rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-black/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400">auto_awesome</span>
            <span className="text-[12px] font-bold uppercase tracking-widest text-blue-200">Lacunas da IA</span>
          </div>
          <p className="text-[13px] text-slate-300 leading-snug">Baseado no seu áudio, identifiquei alguns pontos cegos:</p>
          <div className="space-y-3">
            {[
              "Qual o volume médio mensal?",
              "Como você acessa o Portal?",
              "Quem aprova caso haja erro?"
            ].map((gap, i) => (
              <div key={i} className="flex gap-3">
                <input type="checkbox" className="mt-1 rounded border-white/20 bg-transparent text-blue-500 focus:ring-0" />
                <span className="text-[13px] text-slate-100">{gap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-5 text-center space-y-3">
          <p className="text-[13px] text-slate-500">Seu fluxo já tem <span className="font-bold text-slate-800">82%</span> de clareza.</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-[82%] h-full bg-green-500 rounded-full" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default WorkflowStep2Text;
