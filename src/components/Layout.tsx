import { Outlet, NavLink } from 'react-router-dom';
import { BarChart3, Users, User, Settings } from 'lucide-react';

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧导航栏 */}
      <aside style={{ width: '72px', minWidth: '72px' }} className="bg-white border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-200 flex justify-center">
          <div style={{ width: '44px', height: '44px' }} className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-base">AI</span>
          </div>
        </div>

        <nav className="flex-1 py-3">
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`
            }
          >
            <BarChart3 size={22} />
            <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">业绩分析</span>
          </NavLink>

          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`
            }
          >
            <Users size={22} />
            <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">客户触达</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center py-3 mx-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-500 hover:bg-gray-100'
              }`
            }
          >
            <User size={22} />
            <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="mt-1">个人中心</span>
          </NavLink>
        </nav>

        <div className="p-2 border-t border-gray-200">
          <div className="flex flex-col items-center">
            <div style={{ width: '36px', height: '36px' }} className="bg-gray-300 rounded-full flex items-center justify-center">
              <User size={18} className="text-gray-600" />
            </div>
            <span style={{ fontSize: '10px', whiteSpace: 'nowrap' }} className="text-gray-600 mt-1">李世伟</span>
            <span style={{ fontSize: '9px', whiteSpace: 'nowrap' }} className="text-gray-400">客户经理</span>
          </div>
          <button className="mt-2 w-full p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
            <Settings size={16} className="mx-auto" />
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
