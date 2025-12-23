
import React, { useState, useEffect } from 'react';

interface TaskStep {
  id: string;
  title: string;
  isRecorded: boolean;
  transcription: string;
}

const WorkflowStep1Audio: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [phase, setPhase] = useState<'mapping' | 'interview'>('mapping');
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState<TaskStep[]>([
    { id: '1', title: 'Ler e-mails novos do suporte', isRecorded: false, transcription: '' },
    { id: '2', title: 'Classificar assunto (troca, atraso, reembolso, boleto, cadastro)', isRecorded: false, transcription: '' },
    { id: '3', title: 'Buscar pedido no sistema', isRecorded: false, transcription: '' },
    { id: '4', title: 'Responder com modelo padrão', isRecorded: false, transcription: '' },
    { id: '5', title: 'Escalar casos fora do padrão', isRecorded: false, transcription: '' }
  ]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask: TaskStep = {
        id: Date.now().toString(),
        title: taskInput.trim(),
        isRecorded: false,
        transcription: ''
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTask();
  };

  const startInterview = (taskId: string) => {
    setActiveTaskId(taskId);
    setIsRecording(true);
    
    setTimeout(() => {
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, isRecorded: true, transcription: 'Eu abro a caixa de entrada do suporte e vejo as mensagens pendentes...' } 
          : t
      ));
      setIsRecording(false);
      setActiveTaskId(null);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 flex flex-col gap-8 animate-in fade-in duration-500">
      
      {phase === 'mapping' ? (
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-[12px] font-bold text-blue-600 mb-2">
              <span className="material-symbols-outlined text-[16px]">store</span>
              EXEMPLO: SUPORTE LOJAX
            </div>
            <h2 className="text-[24px] font-bold text-slate-900 tracking-tight">O que você faz no dia a dia?</h2>
            <p className="text-slate-500 text-[15px]">Liste as tarefas do seu processo de atendimento.</p>
          </div>

          <div className="flex gap-2 bg-white border-2 border-slate-100 p-2 rounded-[1.5rem] shadow-sm focus-within:border-blue-200 transition-all">
            <input 
              type="text" 
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Adicione outra tarefa..."
              className="flex-1 bg-transparent border-none px-4 py-2 focus:ring-0 text-[16px]"
            />
            <button 
              onClick={addTask}
              className="size-12 bg-[#1a1a1a] text-white rounded-2xl flex items-center justify-center hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="grid gap-3 animate-in slide-in-from-bottom-4 duration-300">
              {tasks.map((task, idx) => (
                <div key={task.id} className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-slate-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="size-8 rounded-lg bg-slate-50 flex items-center justify-center text-[12px] font-bold text-slate-400">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-slate-700">{task.title}</span>
                  </div>
                  <button 
                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {tasks.length > 0 && (
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setPhase('interview')}
                className="px-10 py-4 bg-blue-600 text-white rounded-[2rem] font-bold text-[16px] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3 animate-in zoom-in duration-300"
              >
                Próximo: Detalhar por áudio
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setPhase('mapping')} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h2 className="text-[20px] font-bold text-slate-900">Entrevista da LojaX</h2>
              <p className="text-slate-500 text-[14px]">Clique em cada tarefa para detalhar como ela é feita.</p>
            </div>
          </div>

          <div className="grid gap-4">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`relative p-5 rounded-[2rem] border transition-all ${
                  activeTaskId === task.id 
                    ? 'border-blue-500 bg-blue-50/30 ring-4 ring-blue-50' 
                    : task.isRecorded 
                      ? 'border-green-100 bg-white shadow-sm' 
                      : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-xl flex items-center justify-center font-bold ${
                      task.isRecorded ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {task.isRecorded ? <span className="material-symbols-outlined">check</span> : <span className="material-symbols-outlined">mic</span>}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{task.title}</h4>
                      <p className="text-[12px] text-slate-400">
                        {task.isRecorded ? 'Gravação concluída' : 'Aguardando áudio'}
                      </p>
                    </div>
                  </div>
                  
                  {!task.isRecorded && !isRecording && (
                    <button 
                      onClick={() => startInterview(task.id)}
                      className="px-4 py-2 bg-[#1a1a1a] text-white rounded-xl text-[13px] font-bold hover:opacity-90 transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      Gravar
                    </button>
                  )}

                  {activeTaskId === task.id && isRecording && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full animate-pulse">
                      <div className="size-2 bg-red-600 rounded-full" />
                      <span className="text-[11px] font-bold uppercase">Ouvindo...</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowStep1Audio;
