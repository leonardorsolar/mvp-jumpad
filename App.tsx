
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
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
  
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNewChat = () => {
    setChatState({ messages: [], isTyping: false, error: null });
    if (window.innerWidth < 1024) setSidebarOpen(false);
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
      // Initialize an empty AI message
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
          isTyping: false, // Turn off typing once streaming starts
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
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onNewChat={handleNewChat}
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        
        {chatState.error && (
          <div className="absolute top-20 inset-x-0 mx-auto max-w-sm bg-red-500 text-white px-4 py-2 rounded-xl text-center z-50 shadow-lg animate-bounce">
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
