import { useEffect, useMemo, useState } from 'react';
import { Send, Search, Phone, MoreVertical, Image, Smile } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  getConversationMessages,
  getConversations,
  sendMessage,
  type Conversation,
  type Message,
} from '@/service/travelApi';

function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [activeConvo, setActiveConvo] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadConversations() {
      setLoading(true);
      setError('');
      try {
        const response = await getConversations();
        if (!mounted) return;
        setConversations(response);
        if (response.length > 0) {
          setActiveConvo(response[0].id);
        }
      } catch (err) {
        if (mounted) {
          const messageText = err instanceof Error ? err.message : '加载会话失败';
          setError(messageText);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadConversations();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeConvo) return;
    const conversationId = activeConvo;
    let mounted = true;

    async function loadMessages() {
      try {
        const response = await getConversationMessages(conversationId);
        if (mounted) {
          setChatMessages(response);
        }
      } catch (err) {
        if (mounted) {
          const messageText = err instanceof Error ? err.message : '加载消息失败';
          setError(messageText);
        }
      }
    }

    loadMessages();
    return () => {
      mounted = false;
    };
  }, [activeConvo]);

  const activeConversation = conversations.find((c) => c.id === activeConvo);
  const filteredConversations = useMemo(
    () => conversations.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [conversations, searchQuery],
  );

  const handleSendMessage = async () => {
    if (!activeConvo || !message.trim()) return;
    try {
      const sent = await sendMessage(activeConvo, message.trim());
      setChatMessages((prev) => [...prev, sent]);
      setMessage('');
    } catch (err) {
      const messageText = err instanceof Error ? err.message : '发送消息失败';
      setError(messageText);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-8 flex flex-col">
      <Navbar />

      <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-1 mb-6">消息</h1>

        <div className="flex bg-white rounded-2xl border border-neutral-6 overflow-hidden h-[calc(100vh-220px)] min-h-[500px]">
          {/* Conversation List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-neutral-6 flex flex-col shrink-0 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-neutral-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-4" />
                <input
                  type="text"
                  placeholder="搜索对话..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-7 text-sm outline-none focus:ring-2 focus:ring-primary-1/20"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => { setActiveConvo(convo.id); setShowMobileChat(true); }}
                  className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-neutral-7/50 transition-colors cursor-pointer text-left ${
                    activeConvo === convo.id ? 'bg-primary-1/5 border-r-2 border-r-primary-1' : ''
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full object-cover" />
                    {convo.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary-4 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-neutral-2 truncate">{convo.name}</span>
                      <span className="text-xs text-neutral-4 shrink-0 ml-2">{convo.time}</span>
                    </div>
                    <p className="text-sm text-neutral-4 truncate mt-0.5">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <span className="shrink-0 w-5 h-5 bg-primary-1 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {convo.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
            {activeConversation ? (
              <>
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-6">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowMobileChat(false)} className="md:hidden text-neutral-4 mr-1 cursor-pointer">
                      ←
                    </button>
                    <img src={activeConversation.avatar} alt={activeConversation.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-sm text-neutral-2">{activeConversation.name}</div>
                      <div className="text-xs text-neutral-4">
                        {activeConversation.online ? '在线' : '离线'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActionMessage('语音通话功能正在接入中，请先使用文字沟通。')}
                      className="p-2 rounded-full hover:bg-neutral-7 text-neutral-4 cursor-pointer"
                    >
                      <Phone size={18} />
                    </button>
                    <button
                      onClick={() => setActionMessage('更多会话设置即将上线。')}
                      className="p-2 rounded-full hover:bg-neutral-7 text-neutral-4 cursor-pointer"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="text-center">
                    <span className="text-xs text-neutral-4 bg-neutral-7 px-3 py-1 rounded-full">今天</span>
                  </div>
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                        msg.sender === 'me'
                          ? 'bg-primary-1 text-white rounded-br-md'
                          : 'bg-neutral-7 text-neutral-2 rounded-bl-md'
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/60' : 'text-neutral-4'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-neutral-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActionMessage('图片发送能力开发中。')}
                      className="p-2 rounded-full hover:bg-neutral-7 text-neutral-4 cursor-pointer shrink-0"
                    >
                      <Image size={20} />
                    </button>
                    <button
                      onClick={() => setActionMessage('表情面板即将上线。')}
                      className="p-2 rounded-full hover:bg-neutral-7 text-neutral-4 cursor-pointer shrink-0"
                    >
                      <Smile size={20} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="输入消息..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-7 text-sm outline-none focus:ring-2 focus:ring-primary-1/20"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          void handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        void handleSendMessage();
                      }}
                      className="p-2.5 rounded-full bg-primary-1 text-white hover:bg-primary-1/90 cursor-pointer shrink-0"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-neutral-4">
                选择一个对话开始聊天
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {loading && (
        <div className="fixed bottom-5 right-5 rounded-full bg-neutral-2 px-4 py-2 text-xs text-white shadow">
          正在加载消息...
        </div>
      )}
      {error && (
        <div className="fixed bottom-5 left-5 rounded-full bg-red-500 px-4 py-2 text-xs text-white shadow">
          {error}
        </div>
      )}
      {actionMessage && !error && (
        <div className="fixed bottom-5 left-5 rounded-full bg-primary-1 px-4 py-2 text-xs text-white shadow">
          {actionMessage}
        </div>
      )}
    </div>
  );
}

export default Messages;
