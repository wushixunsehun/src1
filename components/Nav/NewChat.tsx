import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys, Constants, TConversation, ConversationListParams } from 'librechat-data-provider';
import type { TMessage, ConversationListResponse } from 'librechat-data-provider';
import { NewChatIcon, MobileSidebar, Sidebar, Spinner } from '~/components/svg';
import { TooltipAnchor, Button } from '~/components/ui';
import { useLocalize, useNewConvo, useNavigateToConvo } from '~/hooks';
import store from '~/store';
import { Home, Server, Snowflake, Search, List, Menu, MessageSquare, ChevronDown } from 'lucide-react';
import { cn } from '~/utils';
import { useConversationsInfiniteQuery } from '~/data-provider/queries';

export default function NewChat({
  index = 0,
  toggleNav,
  subHeaders,
  isSmallScreen,
  headerButtons,
  navVisible,
  setNavVisible,
}: {
  index?: number;
  toggleNav: () => void;
  isSmallScreen?: boolean;
  subHeaders?: React.ReactNode;
  headerButtons?: React.ReactNode;
  navVisible: boolean;
  setNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { newConversation: newConvo } = useNewConvo(index);
  const { navigateToConvo } = useNavigateToConvo(index);
  const navigate = useNavigate();
  const localize = useLocalize();
  const { conversation } = store.useCreateConversationAtom(index);
  const [isOperationOpen, setIsOperationOpen] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const location = useLocation();
  const conversationsContainerRef = useRef<HTMLDivElement>(null);
  const currentConvoId = location.pathname.split('/')[2];

  const queryParams: ConversationListParams = {
    isArchived: false,
    sortBy: 'updatedAt',
    sortDirection: 'desc',
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useConversationsInfiniteQuery(queryParams);

  const conversations = data?.pages.flatMap(page => page.conversations) || [];

  const targetRoutes = [
    '/c/system',
    '/c/cooling-system',
    '/c/root-cause',
    '/c/job-query',
    '/c/new',
  ];
  const isTargetRoute = targetRoutes.includes(location.pathname);

  const handleOpenSidebar = () => {
    setNavVisible(true);
  };

  const handleConversationClick = (conversation: TConversation) => {
    navigateToConvo(conversation, {
      resetLatestMessage: true,
      currentConvoId: currentConvoId,
    });
    if (isSmallScreen) {
      toggleNav();
      setNavVisible(false);
    }
  };

  const handleLoadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      setIsLoadingMore(true);
      try {
        await fetchNextPage();
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    const container = conversationsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight < 200 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      newConvo({ disableNavigation: isSmallScreen });
      if (isSmallScreen) {
        toggleNav();
      }
    },
    [queryClient, conversation, newConvo, toggleNav, isSmallScreen],
  );

  return (
    <>
      {!navVisible && isTargetRoute && (
        <Button
          variant="outline"
          data-testid="open-sidebar-button"
          aria-label={localize('com_nav_open_sidebar')}
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={handleOpenSidebar}
        >
          <Menu size={20} />
        </Button>
      )}

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
                onClick={() => {
                  toggleNav();
                  setNavVisible(false);
                }}
              >
                <Sidebar className="max-md:hidden mr-2 h-6 w-6" />
                <MobileSidebar className="m-1 inline-flex size-12 items-center justify-center md:hidden mr-2" />
              </Button>
            }
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-text-primary mb-2">NSCC</h2>
          <div className="w-full h-px bg-border-light"></div>
        </div>

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_home')}
            render={
              <Button
                variant="outline"
                className={cn("w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3", 
                  location.pathname === '/c/system' ? 'bg-surface-active-alt' : '')}
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

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_cooling')}
            render={
              <Button
                variant="outline"
                className={cn("w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3", 
                  location.pathname === '/c/cooling-system' ? 'bg-surface-active-alt' : '')}
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

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_root_cause')}
            render={
              <Button
                variant="outline"
                className={cn("w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3", 
                  location.pathname === '/c/root-cause' ? 'bg-surface-active-alt' : '')}
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

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_job_query')}
            render={
              <Button
                variant="outline"
                className={cn("w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3", 
                  location.pathname === '/c/job-query' ? 'bg-surface-active-alt' : '')}
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

        <div className="mb-2">
          <TooltipAnchor
            description={localize('com_system_operation')}
            render={
              <Button
                variant="outline"
                className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-3"
                onClick={() => setIsOperationOpen(!isOperationOpen)}
                aria-expanded={isOperationOpen}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Server size={20} className="mr-3" />
                    <span className="text-base font-bold">{localize('com_system_operation')}</span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={cn("transition-transform duration-200", isOperationOpen ? "rotate-180" : "")} 
                  />
                </div>
              </Button>
            }
          />
        </div>

        {isOperationOpen && (
          <div 
            className="space-y-1 mt-1 max-h-[400px] overflow-y-auto pr-2" 
            ref={conversationsContainerRef}
            aria-label={localize('com_ui_conversations_list')}
          >
            <TooltipAnchor
              description={localize('com_ui_new_chat')}
              render={
                <Button
                  variant="outline"
                  data-testid="nav-new-chat-button"
                  aria-label={localize('com_ui_new_chat')}
                  className="w-full justify-start border-none bg-transparent hover:bg-surface-hover py-1.5" 
                  onClick={clickHandler}
                >
                  <NewChatIcon className="icon-lg text-text-primary mr-2 h-3 w-3" />
                  <span className="text-xs">{localize('com_ui_new_chat')}</span> 
                </Button>
              }
            />

            <div className="mt-1 border-t border-border-light pt-1">
              {isLoading && conversations.length === 0 ? (
                <div className="flex justify-center py-3">
                  <Spinner size={14} />
                  <span className="ml-2 text-xs text-text-secondary">{localize('com_ui_loading_conversations')}</span>
                </div>
              ) : conversations.length > 0 ? (
                conversations.map((convo) => (
                  <Button
                    key={convo.conversationId}
                    variant="outline"
                    className={cn(
                      "w-full justify-start border-none bg-transparent hover:bg-surface-hover py-1.5 text-left",
                      currentConvoId === convo.conversationId ? "bg-surface-active-alt" : ""
                    )}
                    onClick={() => handleConversationClick(convo)}
                    aria-current={currentConvoId === convo.conversationId ? "page" : undefined}
                  >
                    <MessageSquare className="icon-lg text-text-primary mr-2 h-3 w-3" />
                    <span className="text-xs truncate max-w-[200px]">
                      {convo.title || localize('com_ui_untitled_conversation')}
                    </span>
                  </Button>
                ))
              ) : (
                <div className="text-xs text-text-secondary px-4 py-3 text-center">
                  {localize('com_ui_no_conversations')}
                </div>
              )}

              {(hasNextPage || isFetchingNextPage) && conversations.length > 0 && (
                <div className="flex justify-center py-1 mt-1">
                  {isFetchingNextPage ? (
                    <>
                      <Spinner size={14} />
                      <span className="ml-2 text-[10px] text-text-secondary">{localize('com_ui_loading_more')}</span>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-[10px] text-text-secondary"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                    >
                      <ChevronDown size={12} className="mr-1" />
                      {localize('com_ui_load_more')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
