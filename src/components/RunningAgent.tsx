import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Zap, Activity, Timer, Target } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const RunningAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu Running Coach de Onupolis. Puedo ayudarte con planes de entrenamiento personalizados, consejos de nutrición deportiva, técnicas de carrera y mucho más. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callDeepSeekAPI = async (userMessage: string): Promise<string> => {
    try {
      // Configuración para DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto entrenador de running y nutricionista deportivo. Proporciona consejos precisos, motivadores y personalizados sobre running, entrenamiento, nutrición deportiva, prevención de lesiones y técnicas de carrera. Responde siempre en español de manera amigable y profesional.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Error de API: ${response.status}`);
      }

      const data: DeepSeekResponse = await response.json();
      return data.choices[0]?.message?.content || 'Lo siento, no pude procesar tu consulta en este momento.';
    } catch (error) {
      console.error('Error calling DeepSeek API:', error);
      return 'Lo siento, hay un problema de conexión. Por favor, intenta de nuevo más tarde.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await callDeepSeekAPI(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: Timer, text: 'Plan de entrenamiento', action: 'Necesito un plan de entrenamiento personalizado', color: 'blue' },
    { icon: Target, text: 'Técnica de carrera', action: 'Dame consejos para mejorar mi técnica de carrera', color: 'indigo' },
    { icon: Activity, text: 'Prevenir lesiones', action: 'Cómo puedo prevenir lesiones al correr', color: 'sky' },
    { icon: Zap, text: 'Nutrición deportiva', action: 'Qué debo comer antes y después de correr', color: 'blue' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-blue-100/50 transform hover:shadow-3xl transition-all duration-500">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 via-indigo-800/30 to-blue-900/30"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-32 h-32 bg-orange-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-200/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center">
          {/* Logo de Onupolis en el header */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full shadow-2xl backdrop-blur-sm mb-6 border border-white/30 hover:scale-110 transition-transform duration-300">
            <img 
              src="/loogo onupolis.png" 
              alt="Onupolis" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-orange-100 bg-clip-text text-transparent drop-shadow-2xl mb-2">Tu Personal Coach</h2>
            <p className="text-orange-100 text-lg font-medium">Powered by Onupolis</p>
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-orange-300/80 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-orange-300/80 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-10 bg-gradient-to-br from-blue-50 via-white to-orange-50 border-b border-blue-100">
        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-8 text-center">Acciones Rápidas</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(action.action)}
              className={`group relative flex flex-col items-center p-8 bg-gradient-to-br from-white via-blue-50 to-orange-50 rounded-3xl border border-blue-200/50 hover:border-orange-300 hover:shadow-2xl hover:scale-110 hover:-translate-y-4 transition-all duration-500 shadow-xl backdrop-blur-sm transform-gpu`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-400/20 via-orange-400/20 to-blue-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className={`relative z-10 w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl group-hover:scale-125 transition-all duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="relative z-10 text-blue-800 font-bold text-center text-base leading-tight group-hover:text-orange-600 transition-colors duration-300">{action.text}</span>
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-400 to-orange-500 group-hover:w-full transition-all duration-500 rounded-full`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-white via-blue-50/30 to-orange-50/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-3 max-w-xs md:max-w-lg ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl'
                } transform hover:scale-110 transition-transform duration-200 border-2 border-white/50`}
              >
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-md shadow-lg'
                    : 'bg-white text-blue-900 rounded-bl-md border border-blue-100 shadow-lg'
                } transform hover:scale-105 transition-all duration-200 backdrop-blur-sm`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-cyan-100' : 'text-gray-500'
                  } opacity-75`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-xl border-2 border-white/50">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-xl border border-blue-100 backdrop-blur-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-blue-100 bg-gradient-to-r from-blue-50/50 via-white to-orange-50/50">
        <div className="flex space-x-4">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Pregúntame sobre running, entrenamiento, nutrición..."
            className="flex-1 p-4 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-lg bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-xl text-blue-900 placeholder-blue-400"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-orange-500 text-white p-4 rounded-xl hover:from-blue-600 hover:via-orange-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-110 border border-blue-400/30"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunningAgent;