import React, { useEffect } from 'react';
import ChatView from '../Chat/ChatView';
import { useNewConvo } from 'client/src/hooks'; 

const SystemNewChat = () => {
    const { newConversation: newConvo } = useNewConvo(); 

    
    useEffect(() => {
    newConvo();
    }, [newConvo]);

    return (
    <div className="h-full">
        <ChatView />
    </div>
    );
};

export default SystemNewChat;