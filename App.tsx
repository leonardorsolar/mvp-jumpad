
import React, { useState, useCallback } from 'react';
import TitleBar from './components/TitleBar';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';
import PeopleList from './components/PeopleList';
import DirectChat from './components/DirectChat';
import VoiceModeOverlay from './components/VoiceModeOverlay';
import WorkflowFlow from './components/WorkflowFlow';
import WorkflowDashboard from './components/WorkflowWizard/WorkflowDashboard';
import WorkflowWizardContainer from './components/WorkflowWizard/WorkflowWizardContainer';
import { ChatState, Message, Role, ViewState, Conversation, WorkflowStep } from './types';
import { streamMessageFromGemini } from './services/geminiService';

const MOCK_DIRECT_MESSAGES: Message[] = [
  { id: 'm1', role: Role.MODEL, text: 'Este é o número do seu protocolo: 901080251', timestamp: Date.now() - 100000, senderName: 'Eduardo' },
  { id: 'm2', role: Role.MODEL, text: 'Informe da Direção acerca da falta de energia em nosso Campus.', timestamp: Date.now() - 90000, senderName: 'Diretoria' },
  { id: 'm3', role: Role.MODEL, text: 'To aqui aplicando prova 😢', timestamp: Date.now() - 80000, senderName: 'Junior <3' },
  { id: 'm4', role: Role.MODEL, text: 'Ja tem 1h que acabou a luz', timestamp: Date.now() - 70000, senderName: 'Junior <3' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('AI');
  const [selectedModel, setSelectedModel] = useState('Haiku 4.5');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  
  // States para Overlays
  const [isVoiceModeOpen, setIsVoiceModeOpen] = useState(false);
  const [isWorkflowFlowOpen, setIsWorkflowFlowOpen] = useState(false);
  const [workflowInitialStep, setWorkflowInitialStep] = useState<WorkflowStep>('PERMISSION');

  const [aiChatState, setAiChatState] = useState<ChatState>({
    messages: [],
    isTyping: false,
    error: null,
  });

  const [directMessages, setDirectMessages] = useState<Message[]>(MOCK_DIRECT_MESSAGES);

  const handleNewChat = () => {
    setAiChatState({ messages: [], isTyping: false, error: null });
  };

  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    setCurrentView('DIRECT_CHAT');
  };

  const handleOpenWorkflow = (step: WorkflowStep) => {
    setWorkflowInitialStep(step);
    setIsWorkflowFlowOpen(true);
  };

  const handleSendMessage = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text,
      timestamp: Date.now(),
    };

    if (currentView === 'DIRECT_CHAT') {
      setDirectMessages(prev => [...prev, userMsg]);
      return;
    }

    setAiChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isTyping: true,
      error: null,
    }));

    let aiResponseText = "";
    const aiMessageId = (Date.now() + 1).toString();

    try {
      setAiChatState(prev => ({
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
        setAiChatState(prev => ({
          ...prev,
          isTyping: false,
          messages: prev.messages.map(m => 
            m.id === aiMessageId ? { ...m, text: aiResponseText } : m
          )
        }));
      }
    } catch (err) {
      setAiChatState((prev) => ({
        ...prev,
        isTyping: false,
        error: "Erro de conexão. Verifique sua chave de API.",
      }));
    }
  }, [currentView]);

  return (
    <div className="flex flex-col h-screen-ios bg-[#f9faf8] relative">
      <TitleBar />
      
      <Header 
        onNewChat={handleNewChat} 
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        currentView={currentView}
        onViewChange={setCurrentView}
        title={activeConversation?.name}
        onBack={
          currentView === 'DIRECT_CHAT' 
            ? () => setCurrentView('PEOPLE_LIST') 
            : currentView === 'WORKFLOW_WIZARD' 
              ? () => setCurrentView('WORKFLOW_DASHBOARD')
              : undefined
        }
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {aiChatState.error && currentView === 'AI' && (
          <div className="absolute top-4 inset-x-4 bg-red-500 text-white px-4 py-2 rounded-xl text-center z-50 shadow-lg text-sm">
            {aiChatState.error}
          </div>
        )}

        {currentView === 'AI' && (
          <ChatArea 
            messages={aiChatState.messages} 
            isTyping={aiChatState.isTyping} 
          />
        )}

        {currentView === 'PEOPLE_LIST' && (
          <PeopleList onSelectConversation={handleSelectConversation} />
        )}

        {currentView === 'DIRECT_CHAT' && activeConversation && (
          <DirectChat 
            conversation={activeConversation} 
            messages={directMessages} 
          />
        )}

        {currentView === 'WORKFLOW_DASHBOARD' && (
          <WorkflowDashboard onCreateNew={() => setCurrentView('WORKFLOW_WIZARD')} />
        )}

        {currentView === 'WORKFLOW_WIZARD' && (
          <WorkflowWizardContainer onFinish={() => setCurrentView('WORKFLOW_DASHBOARD')} />
        )}
        
        {['AI', 'DIRECT_CHAT'].includes(currentView) && (
          <InputBar 
            onSendMessage={handleSendMessage} 
            disabled={aiChatState.isTyping} 
            onOpenVoice={() => setIsVoiceModeOpen(true)}
            onOpenWorkflow={handleOpenWorkflow}
          />
        )}
      </div>

      {/* Renderização dos Overlays */}
      <VoiceModeOverlay 
        isOpen={isVoiceModeOpen} 
        onClose={() => setIsVoiceModeOpen(false)} 
      />

      <WorkflowFlow
        isOpen={isWorkflowFlowOpen}
        onClose={() => setIsWorkflowFlowOpen(false)}
        initialStep={workflowInitialStep}
      />
    </div>
  );
};

export default App;
