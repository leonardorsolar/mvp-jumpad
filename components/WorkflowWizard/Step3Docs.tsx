
import React from 'react';

const WorkflowStep3Docs: React.FC<{ onNext: () => void, onPrev: () => void }> = () => {
  const mockFiles = [
    { name: 'template_relatorio_v2.xlsx', type: 'Template', status: 'pronto' },
    { name: 'norma_credito_2024.pdf', type: 'Regra de Negócio', status: 'pronto' },
    { name: 'exemplo_saida.csv', type: 'Exemplo de Saída', status: 'processando' }
  ];

  return (
    <div className="max-w-3xl mx-auto p-8 flex flex-col gap-10">
      <div className="text-center space-y-2">
        <h2 className="text-[22px] font-bold text-slate-900 tracking-tight">Anexar Documentos</h2>
        <p className="text-slate-500 text-[14px]">Anexe arquivos ou links que sirvam de apoio para a IA entender os formatos.</p>
      </div>

      <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-all group cursor-pointer">
        <div className="size-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 shadow-sm transition-colors">
          <span className="material-symbols-outlined text-[32px]">upload_file</span>
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-700">Arraste seus arquivos aqui</p>
          <p className="text-slate-400 text-[13px]">Ou clique para selecionar no computador</p>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">Documentos identificados</span>
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          {mockFiles.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-none group">
              <div className="flex items-center gap-4">
                <div className="size-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-slate-800">{file.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase">{file.type}</span>
                    <span className="text-slate-300">•</span>
                    <span className={`text-[12px] flex items-center gap-1 ${file.status === 'pronto' ? 'text-green-600' : 'text-slate-400'}`}>
                      {file.status === 'pronto' ? (
                        <>
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          IA analisou
                        </>
                      ) : (
                        <>
                          <div className="size-2 bg-slate-300 rounded-full animate-pulse" />
                          Processando...
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-slate-800 text-[15px] flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400">link</span>
          Adicionar Link
        </h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="https://sua-empresa.sharepoint.com/..." 
            className="flex-1 bg-slate-50 border-slate-100 rounded-2xl text-[14px] px-4"
          />
          <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-2xl font-bold text-[13px] hover:bg-slate-200">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep3Docs;
