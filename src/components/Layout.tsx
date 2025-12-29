import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, UserCircle, User, Settings, Radio, Search, LogOut, Link, Grid3X3, ClipboardList, Megaphone, Briefcase, MoreHorizontal, Lightbulb } from 'lucide-react';
import bankLogo from '../assets/bank-logo.jpg';
import { usePageState } from '../context/PageStateContext';

export default function Layout() {
  const [activeModule, setActiveModule] = useState('综合');
  const { pageState, setPageState } = usePageState();
  const location = useLocation();

  const modules = ['综合', '信贷', '营销'];
  const pageStates = [
    { key: 'normal', label: '正常状态', color: 'bg-green-500' },
    { key: 'empty', label: '空状态', color: 'bg-gray-400' },
    { key: 'error', label: '异常状态', color: 'bg-red-500' }
  ] as const;

  // 只在客户详情页显示状态切换
  const isCustomerDetail = location.pathname.startsWith('/customers/') && location.pathname !== '/customers';

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 全局头部 */}
      <header style={{ height: '56px' }} className="bg-white border-b border-gray-200 flex items-center px-4 flex-shrink-0">
        {/* 企业 Logo */}
        <div className="flex items-center mr-6">
          <img src={bankLogo} alt="银行Logo" style={{ width: '180px', height: 'auto' }} />
        </div>

        {/* 全局模块筛选 */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {modules.map((module) => (
            <button
              key={module}
              onClick={() => setActiveModule(module)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeModule === module
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {module}
            </button>
          ))}
        </div>

        {/* 页面状态切换 - 仅在客户详情页显示 */}
        {isCustomerDetail && (
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 ml-4">
            {pageStates.map((state) => (
              <button
                key={state.key}
                onClick={() => setPageState(state.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  pageState === state.key
                    ? `${state.color} text-white`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${pageState === state.key ? 'bg-white' : state.color}`} />
                {state.label}
              </button>
            ))}
          </div>
        )}

        {/* 中间空白区域 */}
        <div className="flex-1" />

        {/* 全局搜索 */}
        <div className="relative mr-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索客户、产品..."
            className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* 客户经理信息 */}
        <div className="flex items-center gap-2 mr-4 px-3 py-1.5 bg-gray-50 rounded-lg">
          <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center">
            <User size={14} className="text-red-600" />
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-800">李世伟</span>
            <span className="text-gray-400 ml-1">| 001276</span>
          </div>
        </div>

        {/* 退出按钮 */}
        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
          <LogOut size={20} />
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧导航栏 */}
        <aside style={{ width: '72px', minWidth: '72px' }} className="bg-red-600 border-r border-red-700 flex flex-col">
          <div className="p-3 border-b border-red-500 flex justify-center">
            <div style={{ width: '44px', height: '44px' }} className="bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-base">AI</span>
            </div>
          </div>

          <nav className="flex-1 py-3 overflow-y-auto">
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Home size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">首页</span>
            </NavLink>

            {/* AI 洞察 */}
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Radio size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">AI 洞察</span>
            </NavLink>

            {/* 客户 */}
            <NavLink
              to="/customer-management"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <UserCircle size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">客户</span>
            </NavLink>

            {/* 商机 */}
            <NavLink
              to="/opportunities"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Lightbulb size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">商机</span>
            </NavLink>

            {/* 常赢链 */}
            <NavLink
              to="/changyinglian"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Link size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">常赢链</span>
            </NavLink>

            {/* 网格 */}
            <NavLink
              to="/grid"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Grid3X3 size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">网格</span>
            </NavLink>

            {/* 任务 */}
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <ClipboardList size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">任务</span>
            </NavLink>

            {/* 营销 */}
            <NavLink
              to="/marketing"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Megaphone size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">营销</span>
            </NavLink>

            {/* 工作 */}
            <NavLink
              to="/work"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <Briefcase size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">工作</span>
            </NavLink>

            {/* 其他 */}
            <NavLink
              to="/other"
              className={({ isActive }) =>
                `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`
              }
            >
              <MoreHorizontal size={22} />
              <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">其他</span>
            </NavLink>
          </nav>

          <div className="p-2 border-t border-red-500">
            <button className="w-full p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <Settings size={16} className="mx-auto" />
            </button>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
