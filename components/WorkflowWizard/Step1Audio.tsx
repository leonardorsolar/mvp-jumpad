
import React, { useState, useEffect } from 'react';

const WorkflowStep1Audio: React.FC<{ onNext: () => void }> = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    if (isRecording) {
      const texts = [
        "Primeiro eu abro o SAP...",
        "Depois eu extraio o relatório de vendas mensal...",
        "Verifico se tem alguma inconsistência nos CPFs...",
        "Envio por email para a diretoria..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setTranscription(prev => prev + ' ' + texts[i]);
        if (texts[i].includes('extraio') || texts[i].includes('Verifico') || texts[i].includes('Envio')) {
          setTasks(prev => [...prev, texts[i].split(' ').slice(1, 4).join(' ')]);
        }
        i = (i + 1) % texts.length;
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  return (
    <div className="max-w-3xl mx-auto p-8 flex flex-col gap-10">
      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
        <div className="size-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined">lightbulb</span>
        </div>
        <div>
          <h3 className="font-bold text-blue-900 text-[17px]">Dica do Especialista</h3>
          <p className="text-blue-700/80 text-[14px] leading-snug">
            Tente narrar cada clique e cada decisão. Ex: "Se o valor for acima de R$ 1.000, eu peço aprovação do gerente".
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className={`size-32 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-50 ring-8 ring-red-50/50' : 'bg-slate-100'}`}>
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`size-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${isRecording ? 'bg-red-500 text-white' : 'bg-white text-slate-800'}`}
          >
            <span className="material-symbols-outlined text-[40px]">
              {isRecording ? 'stop' : 'mic'}
            </span>
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-[20px] font-bold text-slate-900">{isRecording ? 'Gravando entrevista...' : 'Pronto para gravar?'}</h2>
          <p className="text-slate-500 text-[14px]">{isRecording ? 'Fale naturalmente sobre seu processo.' : 'Clique no microfone para começar.'}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Transcription Area */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
             <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Transcrição em tempo real</span>
             {isRecording && <div className="size-2 bg-red-500 rounded-full animate-pulse" />}
          </div>
          <div className="flex-1 bg-white border border-slate-100 rounded-3xl p-5 min-h-[200px] shadow-sm italic text-slate-600 leading-relaxed">
            {transcription || 'Aguardando voz...'}
          </div>
        </div>

        {/* Live Tasks Detection */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">Tarefas detectadas (Rascunho)</span>
          <div className="bg-white border border-slate-100 rounded-3xl p-5 min-h-[200px] shadow-sm flex flex-col gap-3">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-2 py-10">
                <span className="material-symbols-outlined text-[32px]">pending</span>
                <span className="text-[13px]">A IA detectará passos aqui</span>
              </div>
            ) : (
              tasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-3 animate-in slide-in-from-left duration-300">
                  <div className="size-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-[11px] font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-[14px] text-slate-700 font-medium">{task}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStep1Audio;
