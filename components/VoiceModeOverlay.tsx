
import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface VoiceModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceModeOverlay: React.FC<VoiceModeOverlayProps> = ({ isOpen, onClose }) => {
  const [transcription, setTranscription] = useState('Como posso te ajudar hoje?');
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helpers for audio encoding/decoding as per Gemini requirements
  function decodeBase64(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function encodeBase64(bytes: Uint8Array) {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  }

  useEffect(() => {
    if (!isOpen) return;

    setError(null);
    setIsConnecting(true);
    let stream: MediaStream | null = null;
    let processor: ScriptProcessorNode | null = null;

    const startSession = async () => {
      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
          throw new Error("Chave API não configurada.");
        }

        const ai = new GoogleGenAI({ apiKey });
        const inputCtx = new AudioContext({ sampleRate: 16000 });
        const outputCtx = new AudioContext({ sampleRate: 24000 });
        audioContextRef.current = outputCtx;

        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {
          throw new Error("Microfone não acessível. Verifique as permissões.");
        }
        
        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
            },
            systemInstruction: 'Você é Jumpad, um assistente de voz amigável. Responda de forma concisa e natural.',
            outputAudioTranscription: {}
          },
          callbacks: {
            onopen: () => {
              setIsConnecting(false);
              const source = inputCtx.createMediaStreamSource(stream!);
              processor = inputCtx.createScriptProcessor(4096, 1, 1);
              
              processor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const int16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                  int16[i] = inputData[i] * 32768;
                }
                const base64 = encodeBase64(new Uint8Array(int16.buffer));
                sessionPromise.then(session => {
                  session.sendRealtimeInput({ 
                    media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
                  });
                });
              };
              
              source.connect(processor);
              processor.connect(inputCtx.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
              if (message.serverContent?.outputTranscription) {
                setTranscription(prev => message.serverContent?.turnComplete ? message.serverContent.outputTranscription!.text : prev + ' ' + message.serverContent.outputTranscription!.text);
              }

              const audioBase64 = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (audioBase64 && audioContextRef.current) {
                const ctx = audioContextRef.current;
                const audioBuffer = await decodeAudioData(decodeBase64(audioBase64), ctx);
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(ctx.destination);
                
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
                source.onended = () => sourcesRef.current.delete(source);
              }

              if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => {
                  try { s.stop(); } catch(e) {}
                });
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
              }
            },
            onclose: () => {
              if (isOpen) setError("Conexão encerrada.");
            },
            onerror: (e) => {
              console.error('Live API Error:', e);
              setError("Erro de comunicação com o servidor.");
            }
          }
        });

        sessionRef.current = await sessionPromise;
      } catch (err: any) {
        console.error('Falha ao iniciar modo voz:', err);
        setError(err.message || "Falha ao iniciar modo voz.");
        setIsConnecting(false);
      }
    };

    startSession();

    return () => {
      stream?.getTracks().forEach(t => t.stop());
      processor?.disconnect();
      sourcesRef.current.forEach(s => {
        try { s.stop(); } catch(e) {}
      });
      if (sessionRef.current) sessionRef.current.close();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col animate-in fade-in slide-in-from-bottom duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-[17px]">Jumpad</span>
          <span className="text-slate-400 font-normal text-[17px]">Voz</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[20px] text-orange-500 animate-pulse">sensors</span>
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full text-[11px] font-bold text-slate-500">
            5G <span className="text-[10px]">47</span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-center justify-center py-2 gap-2 text-slate-400 text-[13px]">
        {error ? (
          <span className="text-red-500 font-medium">{error}</span>
        ) : (
          <>
            <span>Memórias salvas cheias</span>
            <span className="material-symbols-outlined text-[16px]">info</span>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        {isConnecting ? (
          <div className="flex flex-col items-center gap-4">
             <div className="flex gap-1 h-8 items-end">
                <div className="w-1.5 bg-slate-200 rounded-full animate-bounce h-4"></div>
                <div className="w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.1s] h-6"></div>
                <div className="w-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:0.2s] h-5"></div>
             </div>
             <p className="text-[20px] font-medium text-slate-400">Conectando...</p>
          </div>
        ) : (
          <p className="text-[24px] font-medium leading-tight text-slate-800 transition-all duration-500">
            {transcription}
          </p>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-6 pb-10 flex items-center justify-between gap-4">
        <button 
          onClick={onClose}
          className="size-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <span className="material-symbols-outlined">add</span>
        </button>

        <button 
          onClick={onClose}
          className="flex-1 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-medium text-[15px] hover:bg-slate-200 transition-colors"
        >
          Tipo
        </button>

        <div className="size-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
          <span className={`material-symbols-outlined ${!isConnecting && !error ? 'animate-pulse text-blue-500' : ''}`}>mic</span>
        </div>

        <button 
          onClick={onClose}
          className="h-12 px-6 bg-[#007aff] text-white rounded-full flex items-center gap-2 font-semibold text-[15px] shadow-lg shadow-blue-200 active:scale-95 transition-all"
        >
          <div className="flex gap-0.5 h-3 items-center">
            <div className="w-0.5 h-full bg-white/60 animate-bounce"></div>
            <div className="w-0.5 h-full bg-white animate-bounce [animation-delay:0.1s]"></div>
            <div className="w-0.5 h-full bg-white/60 animate-bounce [animation-delay:0.2s]"></div>
          </div>
          Encerrar
        </button>
      </div>
    </div>
  );
};

export default VoiceModeOverlay;
