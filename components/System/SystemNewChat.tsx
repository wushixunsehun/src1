import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatView from '../Chat/ChatView';
import { useNewConvo } from '~/hooks';
import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import { useGetEndpointsQuery } from '~/data-provider/Endpoints/queries';
import  store  from '~/store';
import { ToolCallsMapProvider } from '~/Providers/ToolCallsMapContext';
import { Spinner } from '~/components';

const SystemNewChat = () => {
    const { newConversation: newConvo } = useNewConvo();
    const { conversation, hasSetConversation } = store.useCreateConversationAtom(0); // 复用index=0的会话状态
    const modelsQuery = useGetModelsQuery({ enabled: true });
    const endpointsQuery = useGetEndpointsQuery({ enabled: true });

  // 初始化会话（类似ChatRoute的逻辑）
useEffect(() => {
    if (modelsQuery.data && endpointsQuery.data && !hasSetConversation.current) {
    newConvo({
        modelsData: modelsQuery.data,
      disableNavigation: true, // 关键：禁用导航
    });
    hasSetConversation.current = true;
    }
}, [newConvo, modelsQuery.data, endpointsQuery.data, hasSetConversation]);

  // 等待会话初始化完成
    if (!conversation || modelsQuery.isLoading || endpointsQuery.isLoading) {
    return (
        <div className="flex h-screen items-center justify-center" aria-live="polite" role="status">
        <Spinner className="text-text-primary" />
        </div>
    );
    }

    return (
    <ToolCallsMapProvider conversationId={conversation.conversationId ?? ''}>
        <ChatView index={0} />
    </ToolCallsMapProvider>
    );
};

export default SystemNewChat;
