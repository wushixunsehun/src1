import { useNavigate } from 'react-router-dom';
import { Button } from '/home/lijh/LibreChat/client/src/components/ui/Button';
import { CogIcon } from 'lucide-react';
import AccountSettings from '~/components/Nav/AccountSettings';
import { useLocalize } from '~/hooks';

export default function Home() {
    const navigate = useNavigate();
    const localize = useLocalize();

    return (
    <div className="flex h-screen">
        <div className="fixed left-0 top-0 h-[calc(100vh-80px)] w-[160px] bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center pt-8 z-10">
            <Button
            className="w-full h-20 rounded-none flex flex-col items-center justify-center mb-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => navigate('/c/new')}
            >
            <CogIcon className="h-12 w-12 mb-2" /> 
            <span className="text-sm font-medium">{localize('com_nav_ops_service')}</span>
            </Button>
        </div>


        <div className="ml-[160px] flex-1 p-6">
            <h1 className="text-2xl font-bold"></h1>
            {/* 其他首页内容 */}
        </div>

        {/* 用户信息保持原始位置 */}
        <div className="fixed bottom-4 left-4 ml-6 z-20">
            <AccountSettings />
        </div>
    </div>
);
}
    