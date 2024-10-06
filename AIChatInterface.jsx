import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AIChatInterface() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是AI助手，很高兴为你服务。有什么我可以帮你的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: `感谢你的提问！这是一个模拟的AI响应。我理解了你说的"${input}"，请问还有什么我可以帮你的吗？` 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
          <div className={`p-2 rounded-full ${isUser ? 'bg-blue-500' : 'bg-gray-200'}`}>
            {isUser ? <User size={24} className="text-white" /> : <Bot size={24} />}
          </div>
          <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
            {message.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <CardContent className="flex flex-col h-full p-4">
        <ScrollArea className="flex-grow mb-4 pr-4">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              AI正在思考...
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="输入消息..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow"
          />
          <Button onClick={handleSend} className="px-4 py-2">
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
    }
