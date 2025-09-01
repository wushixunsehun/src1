import { useMemo, memo, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { useLocalize, useMediaQuery } from '~/hooks';
import { TConversation } from 'librechat-data-provider';
import { Spinner } from '~/components/svg';
import Convo from './Convo';

// 定义列表项类型（仅保留会话和加载状态，移除header）
type FlattenedItem =
  | { type: 'convo'; convo: TConversation }
  | { type: 'loading' };

// 记忆化处理的会话组件
const MemoizedConvo = memo(
  ({
    conversation,
    retainView,
    toggleNav,
    isLatestConvo,
  }: {
    conversation: TConversation;
    retainView: () => void;
    toggleNav: () => void;
    isLatestConvo: boolean;
  }) => (
    <Convo
      conversation={conversation}
      retainView={retainView}
      toggleNav={toggleNav}
      isLatestConvo={isLatestConvo}
    />
  ),
  (prevProps, nextProps) => (
    prevProps.conversation.conversationId === nextProps.conversation.conversationId &&
    prevProps.isLatestConvo === nextProps.isLatestConvo
  )
);

export const Conversations = memo(({
  conversations: rawConversations,
  moveToTop,
  toggleNav,
  containerRef,
  loadMoreConversations,
  isLoading,
  isSearchLoading,
}: {
  conversations: Array<TConversation | null>;
  moveToTop: () => void;
  toggleNav: () => void;
  containerRef: React.RefObject<HTMLDivElement | List>;
  loadMoreConversations: () => void;
  isLoading: boolean;
  isSearchLoading: boolean;
}) => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const convoHeight = isSmallScreen ? 44 : 34;

  // 过滤有效会话（去除null值）
  const filteredConversations = useMemo(
    () => rawConversations.filter(Boolean) as TConversation[],
    [rawConversations]
  );

  // 生成扁平化列表（直接添加所有会话，无时间分组）
  const flattenedItems = useMemo(() => {
    const items: FlattenedItem[] = [];
    // 直接推送所有会话，不分组
    items.push(...filteredConversations.map(convo => ({ 
      type: 'convo' as const, 
      convo 
    })));
    // 添加加载状态项（如果需要）
    if (isLoading) {
      items.push({ type: 'loading' as const });
    }
    return items;
  }, [filteredConversations, isLoading]);

  // 列表项高度缓存配置
  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: convoHeight,
        keyMapper: (index) => {
          const item = flattenedItems[index];
          if (item.type === 'convo') {
            return `convo-${item.convo.conversationId}`;
          }
          if (item.type === 'loading') {
            return `loading-${index}`;
          }
          return `unknown-${index}`;
        },
      }),
    [flattenedItems, convoHeight]
  );

  // 渲染列表项（仅处理会话和加载状态）
  const rowRenderer = useCallback(
    ({ index, key, parent, style }) => {
      const item = flattenedItems[index];
      if (item.type === 'loading') {
        return (
          <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
            {({ registerChild }) => (
              <div ref={registerChild} style={style}>
                <div className="flex items-center justify-center p-2">
                  <Spinner className="text-text-primary" size={16} />
                  <span className="ml-2 text-sm text-text-primary">加载中...</span>
                </div>
              </div>
            )}
          </CellMeasurer>
        );
      }
      return (
        <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
          {({ registerChild }) => (
            <div ref={registerChild} style={style}>
              {item.type === 'convo' && (
                <MemoizedConvo
                  conversation={item.convo}
                  retainView={moveToTop}
                  toggleNav={toggleNav}
                  isLatestConvo={index === 0} // 第一个会话视为最新
                />
              )}
            </div>
          )}
        </CellMeasurer>
      );
    },
    [cache, flattenedItems, moveToTop, toggleNav]
  );

  // 其他列表配置（高度计算、加载更多等）
  const getRowHeight = useCallback(({ index }: { index: number }) => cache.getHeight(index, 0), [cache]);
  const throttledLoadMore = useMemo(() => throttle(loadMoreConversations, 300), [loadMoreConversations]);
  const handleRowsRendered = useCallback(
    ({ stopIndex }: { stopIndex: number }) => {
      if (stopIndex >= flattenedItems.length - 8) {
        throttledLoadMore();
      }
    },
    [flattenedItems.length, throttledLoadMore]
  );

  // 渲染列表
  return (
    <div className="relative flex h-full flex-col pb-2 text-sm text-text-primary">
      {isSearchLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="text-text-primary" />
          <span className="ml-2">搜索中...</span>
        </div>
      ) : (
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={containerRef as React.RefObject<List>}
              width={width}
              height={height}
              deferredMeasurementCache={cache}
              rowCount={flattenedItems.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              overscanRowCount={10}
              className="outline-none"
              onRowsRendered={handleRowsRendered}
            />
          )}
        </AutoSizer>
      )}
    </div>
  );
});
