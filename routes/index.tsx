// import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// import {
//   Login,
//   VerifyEmail,
//   Registration,
//   ResetPassword,
//   ApiErrorWatcher,
//   TwoFactorScreen,
//   RequestPasswordReset,
// } from '~/components/Auth';
// // import AgentMarketplace from '~/components/Agents/Marketplace';
// import { OAuthSuccess, OAuthError } from '~/components/OAuth';
// import { AuthContextProvider } from '~/hooks/AuthContext';
// import RouteErrorBoundary from './RouteErrorBoundary';
// import StartupLayout from './Layouts/Startup';
// import LoginLayout from './Layouts/Login';
// import dashboardRoutes from './Dashboard';
// import ShareRoute from './ShareRoute';
// import ChatRoute from './ChatRoute';
// import Search from './Search';
// import Root from './Root';

// const AuthLayout = () => (
//   <AuthContextProvider>
//     <Outlet />
//     <ApiErrorWatcher />
//   </AuthContextProvider>
// );

// export const router = createBrowserRouter([
//   {
//     path: 'share/:shareId',
//     element: <ShareRoute />,
//     errorElement: <RouteErrorBoundary />,
//   },
//   {
//     path: 'oauth',
//     errorElement: <RouteErrorBoundary />,
//     children: [
//       {
//         path: 'success',
//         element: <OAuthSuccess />,
//       },
//       {
//         path: 'error',
//         element: <OAuthError />,
//       },
//     ],
//   },
//   {
//     path: '/',
//     element: <StartupLayout />,
//     errorElement: <RouteErrorBoundary />,
//     children: [
//       {
//         path: 'register',
//         element: <Registration />,
//       },
//       {
//         path: 'forgot-password',
//         element: <RequestPasswordReset />,
//       },
//       {
//         path: 'reset-password',
//         element: <ResetPassword />,
//       },
//     ],
//   },
//   {
//     path: 'verify',
//     element: <VerifyEmail />,
//     errorElement: <RouteErrorBoundary />,
//   },
//   {
//     element: <AuthLayout />,
//     errorElement: <RouteErrorBoundary />,
//     children: [
//       {
//         path: '/',
//         element: <LoginLayout />,
//         children: [
//           {
//             path: 'login',
//             element: <Login />,
//           },
//           {
//             path: 'login/2fa',
//             element: <TwoFactorScreen />,
//           },
//         ],
//       },
//       dashboardRoutes,
//       {
//         path: '/',
//         element: <Root />,
//         children: [
//           {
//             index: true,
//             element: <Navigate to="/c/new" replace={true} />,
//           },
//           {
//             path: 'c/:conversationId?',
//             element: <ChatRoute />,
//           },
//           {
//             path: 'search',
//             element: <Search />,
//           },
//         ],
//       },
//     ],
//   },
// ]);


// import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// import {
//   Login,
//   VerifyEmail,
//   Registration,
//   ResetPassword,
//   ApiErrorWatcher,
//   TwoFactorScreen,
//   RequestPasswordReset,
// } from '~/components/Auth';
// import { OAuthSuccess, OAuthError } from '~/components/OAuth';
// import { AuthContextProvider } from '~/hooks/AuthContext';
// import RouteErrorBoundary from './RouteErrorBoundary';
// import StartupLayout from './Layouts/Startup';
// import LoginLayout from './Layouts/Login';
// import dashboardRoutes from './Dashboard';
// import ShareRoute from './ShareRoute';
// import ChatRoute from './ChatRoute';
// import Search from './Search';
// import Root from './Root';
// // 导入System相关组件（假设存在这些组件）
// import SystemLayout from '~/components/System/SystemLayout';
// import SystemHome from '~/components/System/SystemHome';
// import CoolingSystem from '~/components/System/CoolingSystem';
// import RootCause from '~/components/System/RootCause';
// import JobQuery from '~/components/System/JobQuery';
// import SystemNewChat from '~/components/System/SystemNewChat';

// const AuthLayout = () => (
//   <AuthContextProvider>
//     <Outlet />
//     <ApiErrorWatcher />
//   </AuthContextProvider>
// );

// export const router = createBrowserRouter([
//   {
//     path: 'share/:shareId',
//     element: <ShareRoute />,
//     errorElement: <RouteErrorBoundary />,
//   },
//   {
//     path: 'oauth',
//     errorElement: <RouteErrorBoundary />,
//     children: [
//       {
//         path: 'success',
//         element: <OAuthSuccess />,
//       },
//       {
//         path: 'error',
//         element: <OAuthError />,
//       },
//     ],
//   },
//   {
//     path: '/',
//     element: <StartupLayout />,
//     errorElement: <RouteErrorBoundary />,
//     children: [
//       {
//         path: 'register',
//         element: <Registration />,
//       },
//       {
//         path: 'forgot-password',
//         element: <RequestPasswordReset />,
//       },
//       {
//         path: 'reset-password',
//         element: <ResetPassword />,
//       },
//     ],
//   },
//   {
//     path: 'verify',
//     element: <VerifyEmail />,
//     errorElement: <RouteErrorBoundary />,
//   },
//   {
//     element: <AuthLayout />,
//     errorElement: <RouteErrorBoundary />,
//     children: [
//       {
//         path: '/',
//         element: <LoginLayout />,
//         children: [
//           {
//             path: 'login',
//             element: <Login />,
//           },
//           {
//             path: 'login/2fa',
//             element: <TwoFactorScreen />,
//           },
//         ],
//       },
//       dashboardRoutes,
//       {
//         path: '/',
//         element: <Root />,
//         children: [
//           // 修改默认路由为system页面
//           {
//             index: true,
//             element: <Navigate to="/system" replace={true} />,
//           },
//           {
//             path: 'c/:conversationId?',
//             element: <ChatRoute />,
//           },
//           {
//             path: 'search',
//             element: <Search />,
//           },
//           // 添加system相关路由
//           {
//             path: 'system',
//             element: <SystemLayout />,
//             children: [
//               { path: '', element: <SystemHome /> }, // system首页
//               { path: 'cooling-system', element: <CoolingSystem /> },
//               { path: 'root-cause', element: <RootCause /> },
//               { path: 'job-query', element: <JobQuery /> },
//               { path: 'new-chat', element: <SystemNewChat /> }, // 新建聊天页面
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ]);



import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Login,
  VerifyEmail,
  Registration,
  ResetPassword,
  ApiErrorWatcher,
  TwoFactorScreen,
  RequestPasswordReset,
} from '~/components/Auth';
import { OAuthSuccess, OAuthError } from '~/components/OAuth';
import { AuthContextProvider } from '~/hooks/AuthContext';
import RouteErrorBoundary from './RouteErrorBoundary';
import StartupLayout from './Layouts/Startup';
import LoginLayout from './Layouts/Login';
import dashboardRoutes from './Dashboard';
import ShareRoute from './ShareRoute';
import ChatRoute from './ChatRoute';
import Search from './Search';
import Root from './Root';
import SystemHome from '~/routes/Systemhome';
import CoolingSystem from '~/routes/CoolingSystem';
import RootCause from '~/routes/RootCause';
import JobQuery from '~/routes/JobQuery';


const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
    <ApiErrorWatcher />
  </AuthContextProvider>
);

export const router = createBrowserRouter([
  {
    path: 'share/:shareId',
    element: <ShareRoute />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: 'oauth',
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'success',
        element: <OAuthSuccess />,
      },
      {
        path: 'error',
        element: <OAuthError />,
      },
    ],
  },
  {
    path: '/',
    element: <StartupLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'register',
        element: <Registration />,
      },
      {
        path: 'forgot-password',
        element: <RequestPasswordReset />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: 'verify',
    element: <VerifyEmail />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/',
        element: <LoginLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'login/2fa',
            element: <TwoFactorScreen />,
          },
        ],
      },
      dashboardRoutes,
      {
        path: '/',
        element: <Root />,
        children: [
          {
            index: true,
            element: <Navigate to="/c" replace={true} />,
          },
          {
            path: 'c',
            element: <SystemHome />,
          },
          {
            path: 'c/cooling-system',
            element: <CoolingSystem />,
          },
          {
            path: 'c/root-cause',
            element: < RootCause />,
          },
          {
            path: 'c/job-query',
            element: <JobQuery />,
          },
          {
            path: 'c/new',
            element: <ChatRoute />,
          },
          {
            path: 'c/:conversationId',
            element: <ChatRoute />,
          },
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
    ],
  },
]);