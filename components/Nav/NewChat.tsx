import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys, Constants } from 'librechat-data-provider';
import type { TMessage } from 'librechat-data-provider';
import { NewChatIcon, MobileSidebar, Sidebar } from '~/components/svg';
import { TooltipAnchor, Button } from '~/components/ui';
import { useLocalize, useNewConvo } from '~/hooks';
import store from '~/store';
import { Home, Server, Snowflake, Search, List } from 'lucide-react';
import { cn } from '~/utils';

export default function NewChat({
  index = 0,
  toggleNav,
  subHeaders,
  isSmallScreen,
  headerButtons,
}: {
  index?: number;
  toggleNav: () => void;
  isSmallScreen?: boolean;
  subHeaders?: React.ReactNode;
  headerButtons?: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const { newConversation: newConvo } = useNewConvo(index);
  const navigate = useNavigate();
  const localize = useLocalize();
  const { conversation } = store.useCreateConversationAtom(index);
  const [isOperationOpen, setIsOperationOpen] = useState(true); 

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
      <div className="mb-4 border-b border-border-light pb-3">
        <div className="mb-3">
          <TooltipAnchor
            description={localize('com_nav_close_sidebar')}
            render={
              <Button
                variant="outline"
                data-testid="close-sidebar-button"
                aria-label={localize('com_nav_close_sidebar')}
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={toggleNav}
              >
                <Sidebar className="max-md:hidden mr-2" />
                <MobileSidebar className="m-1 inline-flex size-10 items-center justify-center md:hidden mr-2" />
                <span className="text-sm">{localize('com_nav_close_sidebar')}</span>
              </Button>
            }
          />
        </div>

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_home')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={() => isSmallScreen && toggleNav()}
              >
                <Link to="/system" className="flex items-center w-full no-underline text-text-primary">
                  <Home size={16} className="mr-2" />
                  <span className="text-sm">{localize('com_system_home')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_cooling')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={() => isSmallScreen && toggleNav()}
              >
                <Link to="/system/cooling-system" className="flex items-center w-full no-underline text-text-primary">
                  <Snowflake size={16} className="mr-2" />
                  <span className="text-sm">{localize('com_system_cooling')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_root_cause')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={() => isSmallScreen && toggleNav()}
              >
                <Link to="/system/root-cause" className="flex items-center w-full no-underline text-text-primary">
                  <Search size={16} className="mr-2" />
                  <span className="text-sm">{localize('com_system_root_cause')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_job_query')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={() => isSmallScreen && toggleNav()}
              >
                <Link to="/system/job-query" className="flex items-center w-full no-underline text-text-primary">
                  <List size={16} className="mr-2" />
                  <span className="text-sm">{localize('com_system_job_query')}</span>
                </Link>
              </Button>
            }
          />
        </div>

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_operation')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                onClick={() => setIsOperationOpen(!isOperationOpen)}
              >
                <div className="flex items-center w-full">
                  <span className="mr-2 text-sm">
                    {isOperationOpen ? '▼' : '▶'}
                  </span>
                  <Server size={16} className="mr-2" />
                  <span className="text-sm">{localize('com_system_operation')}</span>
                </div>
              </Button>
            }
          />
        </div>

        {isOperationOpen && (
          <div className="ml-6 space-y-3 mt-1">
            <TooltipAnchor
              description={localize('com_ui_new_chat')}
              render={
                <Button
                  variant="outline"
                  data-testid="nav-new-chat-button"
                  aria-label={localize('com_ui_new_chat')}
                  className="w-full justify-start border-none bg-transparent hover:bg-surface-hover"
                  onClick={clickHandler}
                >
                  <NewChatIcon className="icon-lg text-text-primary mr-2" />
                  <span className="text-sm">{localize('com_ui_new_chat')}</span>
                </Button>
              }
            />

            {/* 迁移历史会话到运维服务子级 */}
            <div className="pt-2 border-t border-border-light">
              <div className="mb-2 text-xs text-text-secondary">
              </div>
              {/* 直接渲染原本的历史会话内容，包括“今天”及下方内容 */}
              {subHeaders}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
