
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { MOCK_CONTACTS } from '../mockService';
import { Contact, ChatMessage } from '../types';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Plus, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  Info,
  ChevronLeft
} from 'lucide-react';

const Chats = () => {
  const { user } = useStore();
  const [contacts, setContacts] = useState<Contact[]>(MOCK_CONTACTS);
  const [activeContact, setActiveContact] = useState<Contact>(MOCK_CONTACTS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'u-sarah', senderName: 'Sarah Drasner', text: 'Hi! How is the React course going?', timestamp: Date.now() - 3600000 },
    { id: '2', senderId: 'u1', senderName: 'Me', text: "It's great! I'm really enjoying the patterns section.", timestamp: Date.now() - 3000000, isMe: true },
    { id: '3', senderId: 'u-sarah', senderName: 'Sarah Drasner', text: 'The new module on Server Actions is live!', timestamp: Date.now() - 2000000 },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeContact]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'u1',
      senderName: user?.name || 'Me',
      text: messageText,
      timestamp: Date.now(),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setMessageText('');

    // Update last message in contact list
    setContacts(contacts.map(c => 
      c.id === activeContact.id 
        ? { ...c, lastMessage: messageText, lastMessageTime: 'Just now' } 
        : c
    ));
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-160px)] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Contact Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black dark:text-white tracking-tight">Messages</h2>
            <button className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-colors">
              <Plus size={18} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-6">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full flex items-center p-4 rounded-3xl transition-all group ${
                activeContact.id === contact.id 
                  ? 'bg-white dark:bg-slate-800 shadow-xl shadow-indigo-500/5 ring-1 ring-slate-200 dark:ring-slate-700' 
                  : 'hover:bg-white dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} className="w-12 h-12 rounded-2xl bg-indigo-100 object-cover" alt={contact.name} />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 ${
                  contact.status === 'online' ? 'bg-emerald-500' : contact.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
                }`}></div>
              </div>
              <div className="ml-4 flex-1 text-left min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-sm font-bold dark:text-white truncate">{contact.name}</h4>
                  <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2">{contact.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate pr-4">{contact.lastMessage}</p>
                  {contact.unreadCount && contact.unreadCount > 0 && (
                    <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center">
                      {contact.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
          {filteredContacts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm text-slate-400">No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 relative">
        {/* Chat Header */}
        <div className="h-20 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center">
            <button className="md:hidden mr-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              <ChevronLeft size={20} />
            </button>
            <div className="relative">
              <img src={activeContact.avatar} className="w-10 h-10 rounded-xl bg-indigo-50" alt={activeContact.name} />
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                activeContact.status === 'online' ? 'bg-emerald-500' : activeContact.status === 'away' ? 'bg-amber-500' : 'bg-slate-400'
              }`}></div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-black dark:text-white leading-none">{activeContact.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {activeContact.status === 'online' ? 'Active now' : `Last seen ${activeContact.lastMessageTime}`} • {activeContact.role}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <Phone size={18} />
            </button>
            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <Video size={18} />
            </button>
            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <Info size={18} />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 bg-white dark:bg-slate-950/20"
        >
          <div className="flex justify-center my-6">
            <span className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 rounded-full">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[70%] group ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`p-4 rounded-[2rem] text-sm font-medium shadow-sm transition-all ${
                  msg.isMe 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <div className={`flex items-center mt-2 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.isMe && <span className="mx-1.5 text-emerald-500">Sent</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-8 pt-0 bg-white dark:bg-slate-900">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-[2rem] border border-slate-100 dark:border-slate-700 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
          >
            <div className="flex items-center space-x-1 pl-1">
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">
                <Plus size={20} />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">
                <Smile size={20} />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all">
                <Paperclip size={20} />
              </button>
            </div>
            <input 
              type="text" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Message ${activeContact.name}...`}
              className="flex-1 bg-transparent border-none py-2 text-sm focus:ring-0 outline-none dark:text-white"
            />
            <button 
              type="submit"
              disabled={!messageText.trim()}
              className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 disabled:opacity-50 disabled:grayscale transition-all transform active:scale-95"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chats;
