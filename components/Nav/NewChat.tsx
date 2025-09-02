
import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys, Constants } from 'librechat-data-provider';
import type { TMessage } from 'librechat-data-provider';
import { NewChatIcon, MobileSidebar, Sidebar } from '~/components/svg';
import { TooltipAnchor, Button } from '~/components/ui';
import { useLocalize, useNewConvo } from '~/hooks';
import store from '~/store';
import { Home, Server, Snowflake, Search, List, Menu } from 'lucide-react'; // 使用lucide的Menu图标
import { cn } from '~/utils';

export default function NewChat({
  index = 0,
  toggleNav,
  subHeaders,
  isSmallScreen,
  headerButtons,
  navVisible, // 从props接收导航状态
  setNavVisible, // 从props接收状态更新方法
}: {
  index?: number;
  toggleNav: () => void;
  isSmallScreen?: boolean;
  subHeaders?: React.ReactNode;
  headerButtons?: React.ReactNode;
  navVisible: boolean; // 新增：导航可见性状态
  setNavVisible: React.Dispatch<React.SetStateAction<boolean>>; // 新增：更新导航状态的方法
}) {
  const queryClient = useQueryClient();
  const { newConversation: newConvo } = useNewConvo(index);
  const navigate = useNavigate();
  const localize = useLocalize();
  const { conversation } = store.useCreateConversationAtom(index);
  const [isOperationOpen, setIsOperationOpen] = useState(true);
  const location = useLocation();

  // 定义需要显示打开按钮的页面路由
  const targetRoutes = [
    '/c/system',
    '/c/cooling-system',
    '/c/root-cause',
    '/c/job-query',
    '/c/new',
  ];
  const isTargetRoute = targetRoutes.includes(location.pathname);

  // 点击打开侧边栏按钮
  const handleOpenSidebar = () => {
    setNavVisible(true);
  };

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (e.button === 0 && (e.ctrlKey || e.metaKey)) {
        window.open('/c/new', '_blank');
        return;
      }
      queryClient.setQueryData<TMessage[]>(
        [QueryKeys.messages, conversation?.conversationId ?? Constants.NEW_CONVO],
        [],
      );
      queryClient.invalidateQueries([QueryKeys.messages]);
      newConvo();
      navigate('/c/new', { state: { focusChat: true } });
      if (isSmallScreen) {
        toggleNav();
      }
    },
    [queryClient, conversation, newConvo, navigate, toggleNav, isSmallScreen],
  );

  return (
    <>
      {/* 打开侧边栏按钮（仅在目标页面且侧边栏折叠时显示） */}
      {!navVisible && isTargetRoute && (
        <Button
          variant="outline"
          data-testid="open-sidebar-button"
          aria-label={localize('com_nav_open_sidebar')}
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={handleOpenSidebar}
        >
          <Menu size={20} /> {/* 使用lucide的Menu图标替代MenuIcon */}
        </Button>
      )}

      {/* 核心功能区：所有同级按钮+运维服务子级 */}
      <div className="mb-4 border-b border-border-light pb-3">
        {/* 1. 关闭侧边栏按钮 */}
        <div className="mb-3">
          <TooltipAnchor
            description={localize('com_nav_close_sidebar')}
            render={
              <Button
                variant="outline"
                data-testid="close-sidebar-button"
                aria-label={localize('com_nav_close_sidebar')}
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={() => {
                  toggleNav();
                  setNavVisible(false);
                }}
              >
                <Sidebar className="max-md:hidden mr-2 h-5 w-5" />
                <MobileSidebar className="m-1 inline-flex size-10 items-center justify-center md:hidden mr-2" />
              </Button>
            }
          />
        </div>

        {/* 新增标题和分割线 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-text-primary mb-2">NSCC</h2>
          <div className="w-full h-px bg-border-light"></div>
        </div>

        {/* 2.1 系统首页 */}
        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_home')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3"
                onClick={() => {
                  if (isSmallScreen) toggleNav();
                  setNavVisible(false);
                }}
              >
                <Link to="/c/system" className="flex items-center w-full no-underline text-text-primary">
                  <Home size={20} className="mr-3" />
                  <span className="text-base font-bold">{localize('com_system_home')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        {/* 2.2 风冷系统 */}
        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_cooling')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3"
                onClick={() => {
                  if (isSmallScreen) toggleNav();
                  setNavVisible(false);
                }}
              >
                <Link to="/c/cooling-system" className="flex items-center w-full no-underline text-text-primary">
                  <Snowflake size={20} className="mr-3" />
                  <span className="text-base font-bold">{localize('com_system_cooling')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        {/* 2.3 根因分析 */}
        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_root_cause')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3"
                onClick={() => {
                  if (isSmallScreen) toggleNav();
                  setNavVisible(false);
                }}
              >
                <Link to="/c/root-cause" className="flex items-center w-full no-underline text-text-primary">
                  <Search size={20} className="mr-3" />
                  <span className="text-base font-bold">{localize('com_system_root_cause')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        {/* 2.4 作业查询 */}
        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_job_query')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3"
                onClick={() => {
                  if (isSmallScreen) toggleNav();
                  setNavVisible(false);
                }}
              >
                <Link to="/c/job-query" className="flex items-center w-full no-underline text-text-primary">
                  <List size={20} className="mr-3" />
                  <span className="text-base font-bold">{localize('com_system_job_query')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        {/* 2.5 运维服务 */}
        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_operation')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3"
                onClick={() => setIsOperationOpen(!isOperationOpen)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Server size={20} className="mr-3" />
                    <span className="text-base font-bold">{localize('com_system_operation')}</span>
                  </div>
                  <span className="text-base">
                    {isOperationOpen ? '▼' : '▶'}
                  </span>
                </div>
              </Button>
            }
          />
        </div>

        {/* 3. 运维服务子级 */}
        {isOperationOpen && (
          <div className="space-y-3 mt-1">
            {/* 3.1 创建新聊天 */}
            <TooltipAnchor
              description={localize('com_ui_new_chat')}
              render={
                <Button
                  variant="outline"
                  data-testid="nav-new-chat-button"
                  aria-label={localize('com_ui_new_chat')}
                  className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-2" 
                  onClick={clickHandler}
                >
                  <NewChatIcon className="icon-lg text-text-primary mr-2 h-4 w-4" />
                  <span className="text-sm">{localize('com_ui_new_chat')}</span> 
                </Button>
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
