
import React, { useState, useEffect } from 'react';
import { WorkflowStep } from '../types';

interface WorkflowFlowProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: WorkflowStep;
}

const WorkflowFlow: React.FC<WorkflowFlowProps> = ({ isOpen, onClose, initialStep = 'PERMISSION' }) => {
  const [step, setStep] = useState<WorkflowStep>(initialStep);
  const [workflowName, setWorkflowName] = useState('new-tab');
  
  // Reseta o passo sempre que o fluxo é aberto
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  if (!isOpen) return null;

  const renderGraphic = () => (
    <div className="relative w-64 h-40 bg-white border border-slate-200 rounded-2xl shadow-sm mb-12 flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-8 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-1">
        <div className="size-2 rounded-full bg-slate-200"></div>
        <div className="size-2 rounded-full bg-slate-200"></div>
        <div className="size-2 rounded-full bg-slate-200"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-12 h-6 border border-slate-100 rounded-full"></div>
        <div className="w-12 h-6 border border-slate-100 rounded-full"></div>
        <div className="w-12 h-6 border border-slate-100 rounded-full"></div>
      </div>
      <div className="absolute bottom-4 right-4 text-slate-400">
        <span className="material-symbols-outlined text-[32px]">near_me</span>
      </div>
    </div>
  );

  if (step === 'CREATE_MODAL') {
    return (
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-6 flex flex-col gap-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] font-bold text-[#1a1a1a]">Criar assistente de trabalho</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-slate-700 ml-1">Nome</label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <span className="text-slate-400 text-[16px] font-medium">/</span>
                <input 
                  type="text" 
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-[15px]" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-slate-700 ml-1">Prompt</label>
              <textarea 
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 min-h-[120px] focus:ring-2 focus:ring-blue-100 transition-all text-[15px] resize-none"
                placeholder="Ex: Abrir uma nova aba do navegador e acessar o site da empresa..."
                defaultValue="Open a new browser tab (navigate to the Chrome new tab page)."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-medium text-slate-700 ml-1">Começar de</label>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-blue-100 transition-all text-[15px]" 
                placeholder="https://example.com"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-[15px] text-slate-700 font-medium">Agendar</span>
              <button className="w-12 h-6 bg-slate-200 rounded-full relative p-1 transition-colors">
                <div className="size-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-slate-200 rounded-xl font-semibold text-[15px] hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-[#1a1a1a] text-white rounded-xl font-semibold text-[15px] hover:opacity-90 transition-opacity"
            >
              Criar assistente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[250] bg-[#fbfcf8] flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="material-symbols-outlined text-[20px] text-blue-600">language</span>
          <span className="font-medium text-[16px]">New tab</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-10 max-w-lg mx-auto w-full">
        {step === 'RECORDING' ? (
          <div className="w-full space-y-6 animate-in fade-in duration-500">
            <div className="flex items-start gap-4 p-4 bg-white/40 rounded-2xl">
              <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[14px] shrink-0">1</div>
              <div className="flex flex-col gap-0.5">
                <p className="font-bold text-slate-800 text-[16px]">Navigate to chrome://newtab/</p>
                <p className="text-slate-400 text-[13px]">Aba 719753715</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-[#f3f4f0] rounded-2xl border border-white">
              <div className="size-8 rounded-full bg-white flex items-center justify-center text-slate-500 font-bold text-[14px] shrink-0">2</div>
              <p className="text-slate-600 text-[16px] italic leading-tight">
                “me I'm always Testa esanova from San elidaji private vehicle the massaging yabusca Jordan age”
              </p>
            </div>
          </div>
        ) : (
          <>
            {renderGraphic()}
            <h1 className="text-[22px] font-bold text-slate-900 mb-4 tracking-tight">Ensine seu fluxo de trabalho ao Jumpad</h1>
            <p className="text-[16px] text-slate-600 leading-snug">
              {step === 'PERMISSION' 
                ? 'Ative seu microfone para narrar enquanto demonstra o fluxo de trabalho. Jumpad aprenderá o processo e o repetirá para você.'
                : 'Passe pelas etapas como se estivesse ensinando um novo colega de equipe. O Jumpad aprenderá o processo e o repetirá para você.'
              }
            </p>
          </>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-6 pb-12 bg-white rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.03)] border-t border-slate-50">
        {step === 'RECORDING' ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <button className="flex-1 h-14 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[24px]">delete</span>
              </button>
              <button className="flex-1 h-14 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[24px]">pause</span>
              </button>
              <button className="flex-1 h-14 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[24px]">mic</span>
              </button>
            </div>
            <button 
              onClick={() => setStep('CREATE_MODAL')}
              className="w-full h-14 bg-[#1a1a1a] text-white rounded-2xl font-bold text-[16px] hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              Concluído
            </button>
          </div>
        ) : (
          <button 
            onClick={() => step === 'PERMISSION' ? setStep('START') : setStep('RECORDING')}
            className="w-full h-16 bg-[#1a1a1a] text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-[17px] hover:opacity-95 transition-opacity active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">mic</span>
            {step === 'PERMISSION' ? 'Ativar microfone' : 'Iniciar gravação'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkflowFlow;
