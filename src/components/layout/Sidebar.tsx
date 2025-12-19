import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Users,
  UserCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: BarChart3, label: '业绩分析', path: '/performance' },
  { icon: Users, label: '客户触达', path: '/customers', badge: 3 },
  { icon: UserCircle, label: '个人中心', path: '/profile' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-[var(--color-sidebar-background)] backdrop-blur-xl border-r border-[var(--color-separator)] flex flex-col z-30">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-[var(--color-separator)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[#5856D6] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
            <Sparkles size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-[17px] font-bold text-[var(--color-text-primary)] tracking-tight">
              AI 信贷员
            </h1>
            <p className="text-[12px] text-[var(--color-text-secondary)]">
              智能金融工作台
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-150 ease-out
              group
              ${isActive
                ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--color-background)]'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-white' : 'text-[var(--color-text-secondary)]'} />
                <span className="flex-1 text-[15px] font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`
                    min-w-[20px] h-5 px-1.5 rounded-full text-[12px] font-semibold
                    flex items-center justify-center
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--color-danger)] text-white'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  size={16}
                  className={`
                    transition-transform
                    ${isActive ? 'text-white/60' : 'text-[var(--color-text-tertiary)] group-hover:translate-x-0.5'}
                  `}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-[var(--color-separator)]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-background)] cursor-pointer hover:bg-[var(--color-background-secondary)] transition-colors">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-success)] to-[#30B350] flex items-center justify-center text-white text-[14px] font-semibold">
            王
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-[var(--color-text-primary)] truncate">
              王建业
            </div>
            <div className="text-[12px] text-[var(--color-text-secondary)]">
              高级客户经理
            </div>
          </div>
          <ChevronRight size={16} className="text-[var(--color-text-tertiary)]" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
