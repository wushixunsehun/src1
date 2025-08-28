
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Server, MessageSquare, Snowflake, Search, List, PlusCircle } from 'lucide-react'; 
import { cn } from '~/utils';
import { useLocalize } from '~/hooks';
import { TooltipAnchor } from '~/components/ui'; 

const Sidebar: React.FC = () => {
  const localize = useLocalize();
  const [isOperationOpen, setIsOperationOpen] = useState(true);
  const navigate = useNavigate();

  // 实际项目中可通过 API 获取历史会话
  const historyChats = ["chat1", "chat2"]; 

  const handleChatClick = (chatId: string) => {
    navigate(`/system/chat/${chatId}`);
  };

  // 处理新建聊天的点击事件（支持新窗口打开，适配系统路径）
  const handleNewChatClick = (e: React.MouseEvent) => {
    // Ctrl/Cmd+点击在新窗口打开系统新建聊天页面
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      window.open('/system/new-chat', '_blank'); // 新窗口打开系统内新建聊天页面
    }
    // 普通点击通过Link默认行为导航至system/new-chat
  };

  return (
    <div className={cn("h-screen w-64 border-r border-border-light bg-surface-primary p-4")}>
      {/* 品牌标识 */}
      <div className="mb-6 pb-4 border-b border-border-light">
        <h2 className="text-xl font-bold text-text-primary">NSCC</h2>
      </div>
      
      {/* 菜单列表 */}
      <nav>
        <ul className="space-y-1">
          {/* 首页 */}
          <li>
            <Link 
              to="/system" 
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-text-primary hover:bg-surface-hover",
                "no-underline"
              )}
            >
              <Home size={18} />
              <span>{localize('com_system_home')}</span> 
            </Link>
          </li>
          
          {/* 运维服务（可折叠） */}
          <li>
            <div 
              className={cn("flex cursor-pointer items-center justify-between gap-3 rounded-lg p-3 text-text-primary hover:bg-surface-hover font-bold")} 
              onClick={() => setIsOperationOpen(!isOperationOpen)}
            >
              <div className="flex items-center gap-3">
                <Server size={18} />
                <span>{localize('com_system_operation')}</span>
              </div>
              <span className={cn("transition-transform", isOperationOpen ? "rotate-180" : "")}>▼</span>
            </div>
            
            {isOperationOpen && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  {/* 新建聊天按钮 - 指向/system/new-chat，保持系统侧边栏 */}
                  <TooltipAnchor
                    description={localize('com_system_new_chat')} // 提示文本与按钮文本一致
                    render={
                      <Link 
                        to="/system/new-chat"  // 核心修改：跳转路径为系统内新建聊天页面
                        className={cn(
                          "flex items-center gap-3 rounded-lg p-3 text-text-secondary hover:bg-surface-hover",
                          "no-underline cursor-pointer" // 增强可点击性样式
                        )}
                        onClick={handleNewChatClick}  // 绑定处理函数（支持新窗口打开）
                      >
                        <PlusCircle size={18} />
                        <span>{localize('com_system_new_chat')}</span>  {/* 按钮文本使用系统专用翻译 */}
                      </Link>
                    }
                  />
                </li>
                {/* 历史会话列表 */}
                {historyChats.map((chatId) => (
                  <li key={chatId}>
                    <span 
                      className={cn("flex items-center gap-3 rounded-lg p-3 text-text-secondary hover:bg-surface-hover cursor-pointer")} 
                      onClick={() => handleChatClick(chatId)}
                    >
                      <MessageSquare size={18} />
                      <span>{chatId}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
          
          {/* 其他菜单项保持不变 */}
          <li>
            <Link 
              to="/system/cooling-system" 
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-text-primary hover:bg-surface-hover",
                "no-underline"
              )}
            >
              <Snowflake size={18} />
              <span>{localize('com_system_cooling')}</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/system/root-cause" 
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-text-primary hover:bg-surface-hover",
                "no-underline"
              )}
            >
              <Search size={18} />
              <span>{localize('com_system_root_cause')}</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/system/job-query" 
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-text-primary hover:bg-surface-hover",
                "no-underline"
              )}
            >
              <List size={18} />
              <span>{localize('com_system_job_query')}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
