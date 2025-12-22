
import React, { useState, useCallback } from 'react';
import TitleBar from './components/TitleBar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';
import { ChatState, Message, Role } from './types';
import { streamMessageFromGemini } from './services/geminiService';

const App: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
    error: null,
  });

  const handleNewChat = () => {
    setChatState({ messages: [], isTyping: false, error: null });
  };

  const handleSendMessage = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      timestamp: Date.now(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isTyping: true,
      error: null,
    }));

    let aiResponseText = "";
    const aiMessageId = (Date.now() + 1).toString();

    try {
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          id: aiMessageId,
          role: Role.MODEL,
          text: "",
          timestamp: Date.now()
        }]
      }));

      const stream = streamMessageFromGemini(text);
      
      for await (const chunk of stream) {
        aiResponseText += chunk;
        setChatState(prev => ({
          ...prev,
          isTyping: false,
          messages: prev.messages.map(m => 
            m.id === aiMessageId ? { ...m, text: aiResponseText } : m
          )
        }));
      }
    } catch (err) {
      setChatState((prev) => ({
        ...prev,
        isTyping: false,
        error: "Erro de conexão. Verifique sua chave de API.",
      }));
    }
  }, []);

  return (
    <div className="flex flex-col h-screen-ios bg-[#f9faf8]">
      {/* Barra de Título conforme a imagem do usuário */}
      <TitleBar />
      
      {/* Cabeçalho do Chat (Haiku 4.5) */}
      <Header onNewChat={handleNewChat} />
      
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {chatState.error && (
          <div className="absolute top-4 inset-x-4 bg-red-500 text-white px-4 py-2 rounded-xl text-center z-50 shadow-lg text-sm">
            {chatState.error}
          </div>
        )}

        <ChatArea 
          messages={chatState.messages} 
          isTyping={chatState.isTyping} 
        />
        
        <InputBar 
          onSendMessage={handleSendMessage} 
          disabled={chatState.isTyping} 
        />
      </div>
    </div>
  );
};

export default App;
