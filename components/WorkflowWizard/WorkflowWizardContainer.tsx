
import React, { useState } from 'react';
import WorkflowStep1Audio from './Step1Audio';
import WorkflowStep2Text from './Step2Text';
import WorkflowStep3Docs from './Step3Docs';
import WorkflowResultView from './ResultView';

interface WorkflowWizardContainerProps {
  onFinish: () => void;
}

const WorkflowWizardContainer: React.FC<WorkflowWizardContainerProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinalized, setIsFinalized] = useState(false);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (isFinalized) {
    return <WorkflowResultView onBack={onFinish} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Stepper Header */}
      <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`size-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                s === currentStep 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110' 
                  : s < currentStep 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-slate-100 text-slate-400'
              }`}>
                {s < currentStep ? <span className="material-symbols-outlined text-[18px]">check</span> : s}
              </div>
              <span className={`text-[12px] font-semibold uppercase tracking-wider ${s === currentStep ? 'text-slate-900' : 'text-slate-400'}`}>
                {s === 1 ? 'Entrevista' : s === 2 ? 'Complemento' : 'Documentos'}
              </span>
              {s < 3 && <div className="w-8 h-px bg-slate-100 mx-1" />}
            </div>
          ))}
        </div>
        <div className="text-right">
          <span className="block text-[11px] font-bold text-slate-400 uppercase">Tempo est.</span>
          <span className="text-[14px] font-medium text-slate-600">12 min restantes</span>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto relative bg-[#fcfcfc]">
        {currentStep === 1 && <WorkflowStep1Audio onNext={nextStep} />}
        {currentStep === 2 && <WorkflowStep2Text onNext={nextStep} onPrev={prevStep} />}
        {currentStep === 3 && <WorkflowStep3Docs onNext={() => setIsFinalized(true)} onPrev={prevStep} />}
      </div>

      {/* Persistent Footer */}
      <div className="p-4 px-6 border-t border-slate-100 bg-white flex items-center justify-between z-10">
        <button 
          onClick={onFinish}
          className="text-slate-400 hover:text-slate-600 text-[14px] font-medium transition-colors"
        >
          Salvar rascunho e sair
        </button>
        <div className="flex gap-2">
           {currentStep > 1 && (
             <button 
              onClick={prevStep}
              className="px-6 py-2.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-[14px] hover:bg-slate-50"
             >
               Voltar
             </button>
           )}
           <button 
            onClick={currentStep === 3 ? () => setIsFinalized(true) : nextStep}
            className="px-8 py-2.5 rounded-2xl bg-[#1a1a1a] text-white font-bold text-[14px] hover:opacity-90 shadow-lg shadow-black/5"
           >
             {currentStep === 3 ? 'Finalizar e Gerar Fluxo' : 'Continuar'}
           </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowWizardContainer;
