import React, { useEffect } from 'react';
import ChatView from '../Chat/ChatView';
import { useNewConvo } from '~/hooks';

const SystemNewChat = () => {
    const { newConversation: newConvo } = useNewConvo(); 

    
    useEffect(() => {
    newConvo();
    }, [newConvo]);

    return (
    <div className="新建聊天">
    </div>
    );
};

export default SystemNewChat;
