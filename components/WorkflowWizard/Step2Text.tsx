
import React from 'react';

const WorkflowStep2Text: React.FC<{ onNext: () => void, onPrev: () => void }> = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 grid lg:grid-cols-[1fr_320px] gap-8">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">Refinar Detalhes (Suporte)</h2>
          <p className="text-slate-500 text-[14px]">Adicione as regras que a IA deve seguir para responder e-mails.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">terminal</span>
              Ferramentas e Sistemas
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Gmail / Outlook', 'Zendesk', 'Shopify', 'ERP Interno'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[13px] text-slate-600 flex items-center gap-2 font-medium">
                  {tag}
                  <button className="text-slate-300 hover:text-red-400">×</button>
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-slate-200 rounded-full text-[13px] text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors">
                + Outro
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-600">gavel</span>
              Regras e Condições
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[13px] text-slate-700"><b>Atraso:</b> Se pedido &lt; 3 dias úteis: resposta padrão + prazo.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[13px] text-slate-700"><b>Reembolso:</b> Pedir dados e abrir solicitação no ERP.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[13px] text-slate-700"><b>Fraude:</b> Escalar imediatamente para o Financeiro.</p>
              </div>
            </div>
            <textarea 
              className="w-full border-slate-100 rounded-2xl bg-slate-50 text-[14px] p-4 min-h-[80px] focus:ring-blue-100 transition-all mt-2"
              placeholder="Adicionar nova regra..."
            />
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600">priority_high</span>
              Exceções (Casos VIP)
            </h3>
            <textarea 
              className="w-full border-slate-100 rounded-2xl bg-slate-50 text-[14px] p-4 min-h-[100px] focus:ring-blue-100 transition-all"
              placeholder="Como tratar clientes VIP, pedidos de valor alto ou ameaça de Procon?"
              defaultValue="Clientes VIP e ameaças de Procon devem ser escalados para o Supervisor de Atendimento sem resposta automática."
            />
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-[#1a1a1a] rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-black/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-400">auto_awesome</span>
            <span className="text-[12px] font-bold uppercase tracking-widest text-blue-200">Lacunas do Fluxo</span>
          </div>
          <p className="text-[13px] text-slate-300 leading-snug">Para automação total, precisamos saber:</p>
          <div className="space-y-3">
            {[
              "Onde encontro o link do ERP?",
              "Quais são os 5 modelos padrão?",
              "Como identificar o cliente VIP?"
            ].map((gap, i) => (
              <div key={i} className="flex gap-3">
                <div className="size-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                <span className="text-[13px] text-slate-100">{gap}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-5 text-center space-y-3">
          <p className="text-[13px] text-slate-500 font-medium">Clareza do Fluxo: <span className="text-green-600">Excelente</span></p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="w-[90%] h-full bg-green-500 rounded-full" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default WorkflowStep2Text;
