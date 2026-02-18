
import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { MOCK_PARTICIPANTS } from '../mockService';
import { 
  Mic, MicOff, Video, VideoOff, Hand, MessageSquare, Users, 
  Settings, LogOut, ScreenShare, Smile, Send, MoreHorizontal 
} from 'lucide-react';

const LiveClass = () => {
  const { liveParticipants, setLiveParticipants, toggleHand, user, messages, addMessage } = useStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setLiveParticipants(MOCK_PARTICIPANTS);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addMessage({
      id: Date.now().toString(),
      senderId: 'u1',
      senderName: user?.name || 'Me',
      text: inputText,
      timestamp: Date.now(),
      isMe: true
    });
    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-160px)] gap-4 animate-in fade-in duration-500">
      {/* Main Video Grid Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-3xl overflow-y-auto">
          {/* Instructor (Main) */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden border-2 border-indigo-500 ring-4 ring-indigo-500/20 group col-span-1 md:col-span-2">
            <img src="https://picsum.photos/seed/instructor/1200/800" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Instructor</div>
            <div className="absolute bottom-4 left-4 flex items-center bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <span className="text-white text-sm font-bold">Sarah Drasner</span>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
               <span className="text-white text-[10px] font-bold">LIVE • 432 Viewing</span>
            </div>
          </div>

          {/* User Participants */}
          {liveParticipants.map((p) => (
            <div key={p.id} className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-white/10 group">
              {p.isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-white text-2xl font-bold">
                    {p.name.charAt(0)}
                  </div>
                </div>
              ) : (
                <img src={p.avatar} className="w-full h-full object-cover opacity-60" />
              )}
              
              {p.isRaisingHand && (
                <div className="absolute top-4 right-4 bg-amber-500 p-1.5 rounded-full text-white shadow-lg animate-bounce">
                  <Hand size={14} />
                </div>
              )}

              <div className="absolute bottom-4 left-4 flex items-center bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
                <span className="text-white text-xs font-medium">{p.name}</span>
                {p.isMuted && <MicOff size={10} className="ml-2 text-red-500" />}
              </div>
            </div>
          ))}

          {/* Current User */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden border-2 border-green-500/50 group">
             <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name.charAt(0)}
                </div>
             </div>
             <div className="absolute bottom-4 left-4 flex items-center bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
                <span className="text-white text-xs font-medium">You</span>
                {isMuted && <MicOff size={10} className="ml-2 text-red-500" />}
              </div>
          </div>
        </div>

        {/* Meeting Controls */}
        <div className="h-20 bg-white dark:bg-slate-900 mt-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-2xl transition-colors ${isMuted ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}>
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-3 rounded-2xl transition-colors ${isVideoOff ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}>
              {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-colors">
              <Hand size={20} />
              <span className="text-[10px] font-bold mt-1 uppercase">Raise</span>
            </button>
            <button className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-colors">
              <ScreenShare size={20} />
              <span className="text-[10px] font-bold mt-1 uppercase">Share</span>
            </button>
            <button className="flex flex-col items-center text-slate-500 hover:text-indigo-600 transition-colors">
              <Smile size={20} />
              <span className="text-[10px] font-bold mt-1 uppercase">React</span>
            </button>
            <button 
              onClick={() => setChatOpen(!chatOpen)}
              className={`flex flex-col items-center transition-colors ${chatOpen ? 'text-indigo-600' : 'text-slate-500'}`}
            >
              <MessageSquare size={20} />
              <span className="text-[10px] font-bold mt-1 uppercase">Chat</span>
            </button>
          </div>

          <button className="bg-red-500 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center hover:bg-red-600 transition-colors">
            <LogOut size={18} className="mr-2" /> End Class
          </button>
        </div>
      </div>

      {/* Side Chat Panel */}
      {chatOpen && (
        <div className="w-80 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm animate-in slide-in-from-right-4">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm dark:text-white">Class Chat</h3>
            <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">Realtime</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-2xl text-[11px] text-slate-600 dark:text-slate-400 border border-indigo-100 dark:border-indigo-900/30">
              Welcome to <strong>Advanced React Patterns</strong> live class! Be respectful and ask questions anytime.
            </div>
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <p className="text-[10px] font-bold text-slate-400 mb-1">{msg.senderName}</p>
                <div className={`max-w-[90%] p-3 rounded-2xl text-xs ${msg.isMe ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Some mock initial messages */}
            <div className="flex flex-col items-start">
              <p className="text-[10px] font-bold text-slate-400 mb-1">Sarah Drasner</p>
              <div className="max-w-[90%] p-3 rounded-2xl text-xs bg-slate-100 dark:bg-slate-800 dark:text-slate-300">
                Hi everyone! We are starting in 2 minutes. Get your code editors ready!
              </div>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type message..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
            />
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded-xl">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveClass;
