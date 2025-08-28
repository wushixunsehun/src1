import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AccountSettings from '~/components/Nav/AccountSettings';
import { cn } from '~/utils';
import { useLocalize } from '~/hooks';
import { useAuthContext } from '~/hooks/AuthContext';
import { Navigate } from 'react-router-dom';

// 定义上下文类型
type SystemLayoutContext = {
  navVisible: boolean;
  setNavVisible: (visible: boolean) => void;
};

export default function SystemLayout() {
  const location = useLocation();
  const { user } = useAuthContext(); // 获取登录状态
  const [navVisible, setNavVisible] = useState(true);

  // 路由变化时保持侧边栏可见
  useEffect(() => {
    const shouldHide = false; // 所有系统页面均显示侧边栏
    setNavVisible(!shouldHide);
  }, [location.pathname]);

  // 未登录时重定向到登录页，并记录当前路径
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* 侧边栏 */}
      {navVisible && <Sidebar />}
      
      {/* 主内容区域 */}
      <main className={cn(
        "flex-1 overflow-auto bg-background",
        navVisible ? "p-6 ml-[var(--sidebar-width)]" : "p-6 ml-0"
      )}>
        {/* 向子组件传递上下文 */}
        <Outlet context={{ navVisible, setNavVisible } as SystemLayoutContext} />
      </main>
      
      {/* 用户信息按钮 */}
      {navVisible && (
        <div className="fixed bottom-4 left-4 z-10 md:bottom-6 md:left-6">
          <AccountSettings />
        </div>
      )}
    </div>
  );
}

// 提供类型安全的上下文钩子
export function useSystemLayoutContext() {
  return useOutletContext<SystemLayoutContext>();
}
