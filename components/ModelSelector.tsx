
import React, { useState } from 'react';

interface ModelInfo {
  name: string;
  description?: string;
  isNew?: boolean;
}

interface Provider {
  name: string;
  models: ModelInfo[];
}

interface ModelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentModel: string;
  onSelectModel: (name: string) => void;
}

const providers: Provider[] = [
  {
    name: 'Anthropic',
    models: [
      { name: 'Claude 3.7 Sonnet', description: 'Most intelligent model with extended thinking' },
      { name: 'Claude Opus 4.0', description: 'Our most capable and intelligent model yet. Claude Opus 4 sets new standards in complex reasoning and advanced coding' },
      { name: 'Claude Sonnet 4.0', description: 'Our high-performance model with exceptional reasoning and efficiency' },
      { name: 'Claude Sonnet 4.5', description: 'Our best model for complex agents and coding' },
    ]
  },
  {
    name: 'Gemini',
    models: [
      { name: 'Gemini 2.0 Flash-Lite' },
      { name: 'Gemini 2.5 Flash', description: 'Fast, efficient model for everyday AI tasks.' },
      { name: 'Gemini 2.5 Flash Lite Preview(06-17)', description: 'Optimized for cost efficiency and low latency.' },
      { name: 'Gemini 2.5 Flash Preview', description: 'Fast, efficient model for everyday AI tasks.' },
      { name: 'Gemini 2.5 Pro', description: 'Enhanced thinking and reasoning, multimodal understanding, advanced programming, and more' },
      { name: 'Gemini 2.5 Pro Preview', description: 'Advanced AI model for complex tasks.' },
      { name: 'Gemini 3 Pro Preview', description: 'Flagship multimodal AI for coding, reasoning & context.' },
    ]
  },
  {
    name: 'Groq',
    models: [
      { name: 'Compound Beta', description: 'Groq AI model for complex tasks' },
      { name: 'Compound Beta Mini', description: 'Groq language model for AI tasks' },
      { name: 'DeepSeek R1 Distill Llama 70B', description: 'Efficient distilled model for tasks' },
      { name: 'GPT-OSS-120B', description: 'Open-source 120B parameter GPT model by OpenAI' },
      { name: 'GPT-OSS-20B', description: 'Open-source 20B parameter GPT model by OpenAI' },
      { name: 'LLaMA 3.1 8B Instant', description: 'Efficient LLaMA model for instant tasks' },
      { name: 'LLaMA 4 Maverick 17B Instruct', description: 'Advanced LLaMA model for instructions' },
    ]
  },
  {
    name: 'OpenAI',
    models: [
      { name: 'ChatGPT-4o Latest', description: 'GPT-4o model used in ChatGPT' },
      { name: 'GPT-4.1', description: 'Flagship GPT model for complex tasks' },
      { name: 'GPT-4.1 mini', description: 'Balanced for intelligence, speed, and cost' },
      { name: 'GPT-4.1 nano', description: 'Fastest, most cost-effective GPT-4.1 model' },
      { name: 'GPT-4o' },
      { name: 'GPT-4o Mini' },
      { name: 'GPT-5', description: 'Best model for coding and agentic tasks' },
      { name: 'GPT-5 Mini', description: 'A faster, more cost-efficient version of GPT-5 for well-defined tasks' },
      { name: 'GPT-5 Nano', description: 'Fastest, most cost-efficient version of GPT-5' },
      { name: 'GPT-5.2', description: 'The best model for coding and agentic tasks across industries' },
      { name: 'o1', description: 'Previous full o-series reasoning model' },
      { name: 'o1-pro', description: 'Version of o1 with more compute for better responses' },
      { name: 'o3', description: 'The most powerful reasoning model from OpenAI' },
      { name: 'o4-mini', description: 'Faster, more affordable reasoning model' },
    ]
  },
  {
    name: 'Oracle',
    models: [
      { name: 'Cohere Command A 03 2025', description: 'Most performant Cohere chat model with 256k token context' },
      { name: 'Meta LLaMA 3.3 70B Instruct', description: 'Better performance than Llama 3.1 and 3.2 for text' },
    ]
  },
  {
    name: 'Perplexity',
    models: [
      { name: 'Sonar', description: 'Fast and efficient AI model for quick responses' },
      { name: 'Sonar Pro', description: 'Advanced model for complex queries' },
      { name: 'Sonar Reasoning', description: 'Model for reasoning tasks' },
      { name: 'Sonar Reasoning Pro', description: 'Enhanced model for reasoning tasks' },
    ]
  },
  {
    name: 'vLLM',
    models: [
      { name: 'Qwen/Qwen3-8B', description: 'High-performance model for various applications' },
    ]
  },
  {
    name: 'xAI',
    models: [
      { name: 'Grok 3', description: 'Advanced model for complex tasks' },
      { name: 'Grok 3 Fast', description: 'Fast model for quick tasks' },
      { name: 'Grok 3 Mini', description: 'Compact model for basic tasks' },
      { name: 'Grok 3 Mini Fast', description: 'Fast and efficient model for quick tasks' },
      { name: 'Grok 3 Pro', description: 'Advanced model for professional tasks' },
      { name: 'Grok 4', description: 'Our latest and greatest flagship model, offering unparalleled performance' },
    ]
  }
];

const suggestions = ['jumpad ai', 'Haiku 4.5', 'Gpt-5.2', 'Gemini 3 Pro'];

const ModelSelector: React.FC<ModelSelectorProps> = ({ isOpen, onClose, currentModel, onSelectModel }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredProviders = providers.map(p => ({
    ...p,
    models: p.models.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
  })).filter(p => p.models.length > 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 fade-in duration-300">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative flex items-center bg-[#f3f4f6] rounded-2xl px-3 py-2">
            <span className="material-symbols-outlined text-[#9ca3af] text-[20px] mr-2">search</span>
            <input 
              type="text" 
              placeholder="Buscar modelos..." 
              className="bg-transparent border-none focus:ring-0 w-full text-[15px] p-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <span className="material-symbols-outlined text-[#9ca3af] text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          
          {/* Suggestions Block */}
          {!search && (
            <section>
              <h3 className="text-[12px] font-bold text-[#9ca3af] uppercase tracking-wider px-2 mb-3">Sugestões</h3>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map(model => (
                  <button 
                    key={model}
                    onClick={() => { onSelectModel(model); onClose(); }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all border ${
                      currentModel === model 
                        ? 'bg-[#f7f6f2] border-[#e5e7eb] text-[#1a1a1a]' 
                        : 'bg-white border-transparent hover:bg-slate-50 text-[#4b5563]'
                    }`}
                  >
                    <div className={`size-2 rounded-full ${currentModel === model ? 'bg-[#eeb0a1]' : 'bg-slate-200'}`} />
                    <span className="text-[14px] font-medium">{model}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Providers List */}
          {filteredProviders.map(provider => (
            <section key={provider.name}>
              <h3 className="text-[12px] font-bold text-[#9ca3af] uppercase tracking-wider px-2 mb-2">{provider.name}</h3>
              <div className="space-y-1">
                {provider.models.map(model => (
                  <button 
                    key={model.name}
                    onClick={() => { onSelectModel(model.name); onClose(); }}
                    className={`w-full flex flex-col gap-0.5 px-4 py-3 rounded-2xl transition-all text-left group ${
                      currentModel === model.name 
                        ? 'bg-[#f7f6f2]' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[15px] font-medium ${currentModel === model.name ? 'text-[#1a1a1a]' : 'text-[#374151]'}`}>
                        {model.name}
                      </span>
                      {currentModel === model.name && (
                         <span className="material-symbols-outlined text-[18px] text-[#eeb0a1]">check_circle</span>
                      )}
                    </div>
                    {model.description && (
                      <p className="text-[12.5px] text-[#6b7280] leading-relaxed line-clamp-2">
                        {model.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-[14px] font-semibold text-slate-600 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
