// @ts-nocheck
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Sparkles,
  ChevronRight,
  Check,
  Clock,
  FileText,
  Zap,
  TrendingUp,
  AlertCircle,
  Calendar,
  Phone,
  Mail,
  MoreHorizontal,
  Target,
  Briefcase,
  Shield,
  Award,
  Users,
  MapPin,
  BarChart3,
  UserCircle,
  ExternalLink,
} from 'lucide-react';
import {
  mockCustomers,
  mockCustomerProfile,
  mockProductRecommendations,
  mockActionHandbook,
} from '../data/mockData';
import type { ActionTask } from '../data/mockData';
import CustomerProfileRadar from '../components/CustomerProfileRadar';

/* ============================================
   Design Tokens - iPadOS Style
   ============================================ */
const colors = {
  // Primary
  primary: '#007AFF',
  primaryHover: '#0056CC',
  primaryLight: 'rgba(0, 122, 255, 0.12)',
  // Semantic
  success: '#34C759',
  successLight: 'rgba(52, 199, 89, 0.12)',
  warning: '#FF9500',
  warningLight: 'rgba(255, 149, 0, 0.12)',
  danger: '#FF3B30',
  dangerLight: 'rgba(255, 59, 48, 0.12)',
  purple: '#AF52DE',
  purpleLight: 'rgba(175, 82, 222, 0.12)',
  cyan: '#5AC8FA',
  cyanLight: 'rgba(90, 200, 250, 0.12)',
  // Background
  background: '#F2F2F7',
  cardBg: '#FFFFFF',
  sidebarBg: 'rgba(255, 255, 255, 0.85)',
  // Text
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#C7C7CC',
  // Border
  separator: 'rgba(60, 60, 67, 0.12)',
};

/* ============================================
   Category Mappings
   ============================================ */
const categoryNames: Record<string, string> = {
  loan: '贷款产品',
  international: '国际业务',
  bill: '票据业务',
  settlement: '结算服务',
  wealth: '财富管理',
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  loan: { bg: colors.successLight, text: colors.success },
  international: { bg: colors.cyanLight, text: colors.cyan },
  bill: { bg: colors.purpleLight, text: colors.purple },
  settlement: { bg: colors.primaryLight, text: colors.primary },
  wealth: { bg: colors.warningLight, text: colors.warning },
};

/* ============================================
   Circular Progress Component
   ============================================ */
function CircleProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  color = colors.success,
  children,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.separator}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ============================================
   Sidebar Navigation
   ============================================ */
function Sidebar() {
  const navItems = [
    { icon: BarChart3, label: '业绩分析', path: '/performance', active: false },
    { icon: Users, label: '客户触达', path: '/customers', active: true, badge: 3 },
    { icon: UserCircle, label: '个人中心', path: '/profile', active: false },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[280px] flex flex-col z-30"
      style={{
        backgroundColor: colors.sidebarBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: `1px solid ${colors.separator}`,
      }}
    >
      {/* Logo */}
      <div className="p-6" style={{ borderBottom: `1px solid ${colors.separator}` }}>
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, #5856D6)`,
              boxShadow: `0 4px 12px ${colors.primary}33`,
            }}
          >
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-[18px] font-bold" style={{ color: colors.textPrimary }}>
              AI 信贷员
            </h1>
            <p className="text-[12px]" style={{ color: colors.textSecondary }}>
              智能金融工作台
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150"
            style={{
              backgroundColor: item.active ? colors.primary : 'transparent',
              color: item.active ? '#FFFFFF' : colors.textPrimary,
              boxShadow: item.active ? `0 4px 12px ${colors.primary}33` : 'none',
            }}
          >
            <item.icon size={20} style={{ color: item.active ? '#FFFFFF' : colors.textSecondary }} />
            <span className="flex-1 text-[15px] font-medium">{item.label}</span>
            {item.badge && (
              <span
                className="min-w-[20px] h-5 px-1.5 rounded-full text-[12px] font-semibold flex items-center justify-center"
                style={{
                  backgroundColor: item.active ? 'rgba(255,255,255,0.25)' : colors.danger,
                  color: '#FFFFFF',
                }}
              >
                {item.badge}
              </span>
            )}
            <ChevronRight size={16} style={{ color: item.active ? 'rgba(255,255,255,0.6)' : colors.textTertiary }} />
          </a>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4" style={{ borderTop: `1px solid ${colors.separator}` }}>
        <div
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
          style={{ backgroundColor: colors.background }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-semibold"
            style={{ background: `linear-gradient(135deg, ${colors.success}, #30B350)` }}
          >
            王
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold truncate" style={{ color: colors.textPrimary }}>
              王建业
            </div>
            <div className="text-[12px]" style={{ color: colors.textSecondary }}>
              高级客户经理
            </div>
          </div>
          <ChevronRight size={16} style={{ color: colors.textTertiary }} />
        </div>
      </div>
    </aside>
  );
}

/* ============================================
   Button Components
   ============================================ */
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md';
  icon?: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

function Button({ variant = 'primary', size = 'md', icon: Icon, children, onClick, fullWidth }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-150 active:scale-[0.98]";

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: '#FFFFFF',
      boxShadow: `0 2px 8px ${colors.primary}40`,
    },
    secondary: {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: colors.primary,
    },
  };

  const sizes = {
    sm: 'h-9 px-3 text-[13px] gap-1.5 rounded-lg',
    md: 'h-11 px-5 text-[15px] gap-2 rounded-xl',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`}
      style={variants[variant]}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  );
}

function IconButton({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-95"
      style={{ backgroundColor: colors.background, color: colors.textPrimary }}
    >
      <Icon size={20} />
    </button>
  );
}

/* ============================================
   Card Component
   ============================================ */
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        backgroundColor: colors.cardBg,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {children}
    </div>
  );
}

/* ============================================
   Stat Card Component
   ============================================ */
function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  const bgColor = color === colors.primary ? colors.primaryLight :
                  color === colors.success ? colors.successLight :
                  color === colors.warning ? colors.warningLight :
                  color === colors.cyan ? colors.cyanLight : colors.background;
  return (
    <div className="rounded-2xl p-4" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-medium" style={{ color: colors.textSecondary }}>{label}</span>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="text-[24px] font-bold leading-none" style={{ color }}>{value}</div>
    </div>
  );
}

/* ============================================
   Main Component
   ============================================ */
export default function CustomerDetailNew() {
  const navigate = useNavigate();
  const { id } = useParams();
  const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
  const profile = mockCustomerProfile;
  const products = mockProductRecommendations;
  const handbook = mockActionHandbook;

  const [tasks, setTasks] = useState<ActionTask[]>(handbook.tasks);

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const handleAIExecute = (task: ActionTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: 'in_progress' } : t))
    );
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'completed' } : t))
      );
    }, 2000);
  };

  const { aiSummary } = profile;
  const pendingTasksCount = tasks.filter((t) => t.status !== 'completed').length;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.background }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-[280px]">
        {/* Header */}
        <header
          className="sticky top-0 z-20"
          style={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.separator}`,
          }}
        >
          <div className="flex items-center justify-between px-8 h-16">
            <div className="flex items-center gap-4">
              <IconButton icon={ArrowLeft} label="返回" onClick={() => navigate('/customers')} />
              <div className="h-6 w-px" style={{ backgroundColor: colors.separator }} />
              <div>
                <h1 className="text-[20px] font-bold" style={{ color: colors.textPrimary }}>
                  {customer.companyName}
                </h1>
                <p className="text-[13px]" style={{ color: colors.textSecondary }}>
                  {customer.industry} · 成立{2024 - customer.establishedYear}年
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" icon={FileText}>导出报告</Button>
              <Button variant="primary" icon={Sparkles}>AI 深度分析</Button>
              <IconButton icon={MoreHorizontal} label="更多" />
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - 8 cols */}
            <div className="col-span-8 space-y-6">
              {/* AI 客户画像 - 五维度雷达图 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <CustomerProfileRadar profile={profile} />
              </motion.div>

              {/* AI Product Recommendations */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <Card>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-[17px] font-semibold" style={{ color: colors.textPrimary }}>AI 产品推荐</h3>
                      <p className="text-[13px] mt-0.5" style={{ color: colors.textSecondary }}>基于客户画像的智能产品匹配</p>
                    </div>
                    <Button variant="tertiary" size="sm">
                      查看全部产品
                      <ChevronRight size={16} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {products.slice(0, 4).map((product) => {
                      const catColors = categoryColors[product.category] || categoryColors.loan;
                      return (
                        <div
                          key={product.id}
                          className="p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md"
                          style={{ borderColor: colors.separator }}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: catColors.bg }}
                            >
                              <Target size={24} style={{ color: catColors.text }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[15px] font-semibold truncate" style={{ color: colors.textPrimary }}>
                                {product.name}
                              </h4>
                              <p className="text-[13px] line-clamp-2 mt-1" style={{ color: colors.textSecondary }}>
                                {product.description}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${colors.separator}` }}>
                            <div className="text-[13px]" style={{ color: colors.textSecondary }}>
                              {product.amount && <span className="mr-3">{product.amount}</span>}
                              {product.rate && <span style={{ color: colors.primary }}>{product.rate}</span>}
                            </div>
                            <Button variant="primary" size="sm">推进产品</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* AI Action Handbook */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Card>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-[17px] font-semibold" style={{ color: colors.textPrimary }}>AI 行动手册</h3>
                      <p className="text-[13px] mt-0.5" style={{ color: colors.textSecondary }}>智能生成的客户经营策略</p>
                    </div>
                    <Button variant="primary" size="sm" icon={Zap}>一键执行全部</Button>
                  </div>

                  {/* Strategy Summary */}
                  <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: colors.purpleLight }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.purple }}>
                        <Sparkles size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold mb-1" style={{ color: colors.purple }}>策略摘要</p>
                        <p className="text-[14px] leading-relaxed" style={{ color: colors.textSecondary }}>{handbook.summary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-[13px] font-semibold uppercase tracking-wide mb-4" style={{ color: colors.textSecondary }}>
                      执行时间线
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {handbook.timeline.map((phase, idx) => {
                        const lineColors = [colors.purple, colors.primary, colors.success];
                        return (
                          <div key={idx} className="relative p-4 rounded-xl overflow-hidden" style={{ backgroundColor: colors.background }}>
                            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: lineColors[idx] }} />
                            <h5 className="text-[14px] font-semibold mb-3 pl-2" style={{ color: colors.textPrimary }}>{phase.phase}</h5>
                            <ul className="space-y-2 pl-2">
                              {phase.actions.slice(0, 2).map((action, actionIdx) => (
                                <li key={actionIdx} className="text-[13px] flex items-start gap-2" style={{ color: colors.textSecondary }}>
                                  <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.textTertiary }} />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - 4 cols */}
            <div className="col-span-4 space-y-6">
              {/* Quick Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-2 gap-4">
                <StatCard label="合作年限" value="9年" icon={Award} color={colors.primary} />
                <StatCard label="综合贡献" value={profile.cooperationAndContribution.contribution.comprehensiveContribution} icon={TrendingUp} color={colors.success} />
                <StatCard label="授信余额" value="1,800万" icon={Briefcase} color={colors.cyan} />
                <StatCard label="待办任务" value={`${pendingTasksCount}项`} icon={AlertCircle} color={pendingTasksCount > 2 ? colors.warning : colors.textSecondary} />
              </motion.div>

              {/* Contacts */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                <Card className="p-5">
                  <h3 className="text-[17px] font-semibold mb-4" style={{ color: colors.textPrimary }}>联系信息</h3>
                  <div className="space-y-3">
                    {profile.relationshipGraph.keyContacts.slice(0, 2).map((contact) => (
                      <div key={contact.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: colors.background }}>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[14px] font-semibold"
                          style={{ background: `linear-gradient(135deg, ${colors.purple}, #9A40C9)` }}
                        >
                          {contact.name.slice(0, 1)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[14px] font-semibold" style={{ color: colors.textPrimary }}>{contact.name}</div>
                          <div className="text-[12px]" style={{ color: colors.textSecondary }}>{contact.role}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
                            <Phone size={16} />
                          </button>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.background, color: colors.textSecondary }}>
                            <Mail size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Tasks */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-[17px] font-semibold" style={{ color: colors.textPrimary }}>待办任务</h3>
                      <p className="text-[13px] mt-0.5" style={{ color: colors.textSecondary }}>{pendingTasksCount} 项待完成</p>
                    </div>
                    <Button variant="tertiary" size="sm">查看全部</Button>
                  </div>

                  <div className="space-y-3">
                    {tasks.slice(0, 4).map((task) => {
                      const bgColor = task.status === 'completed' ? colors.background :
                                      task.priority === 'high' ? colors.dangerLight :
                                      task.priority === 'medium' ? colors.warningLight : colors.background;
                      return (
                        <div
                          key={task.id}
                          className="p-4 rounded-xl transition-all"
                          style={{
                            backgroundColor: bgColor,
                            opacity: task.status === 'completed' ? 0.6 : 1,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTaskStatus(task.id)}
                              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                              style={{
                                backgroundColor: task.status === 'completed' ? colors.success :
                                                 task.status === 'in_progress' ? colors.primary : 'transparent',
                                border: task.status === 'pending' ? `2px solid ${colors.textTertiary}` : 'none',
                              }}
                            >
                              {task.status === 'completed' && <Check size={14} className="text-white" strokeWidth={3} />}
                              {task.status === 'in_progress' && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                            </button>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5
                                  className="text-[14px] font-medium"
                                  style={{
                                    color: task.status === 'completed' ? colors.textTertiary : colors.textPrimary,
                                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                  }}
                                >
                                  {task.title}
                                </h5>
                                {task.priority === 'high' && (
                                  <span className="text-[11px] font-semibold" style={{ color: colors.danger }}>紧急</span>
                                )}
                                {task.priority === 'medium' && (
                                  <span className="text-[11px] font-semibold" style={{ color: colors.warning }}>重要</span>
                                )}
                              </div>
                              <p className="text-[12px] line-clamp-2" style={{ color: colors.textSecondary }}>{task.description}</p>
                              {task.dueDate && (
                                <div className="flex items-center gap-1 mt-2 text-[11px]" style={{ color: colors.textTertiary }}>
                                  <Calendar size={12} />
                                  {task.dueDate}
                                </div>
                              )}
                            </div>

                            {task.aiExecutable && task.status === 'pending' && (
                              <Button variant="primary" size="sm" icon={Zap} onClick={() => handleAIExecute(task)}>
                                AI执行
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* Competition Intel */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[17px] font-semibold" style={{ color: colors.textPrimary }}>竞争情报</h3>
                    <Shield size={18} style={{ color: colors.warning }} />
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: colors.successLight }}>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={14} style={{ color: colors.success }} />
                        <span className="text-[13px] font-semibold" style={{ color: colors.success }}>利率优势</span>
                      </div>
                      <p className="text-[12px]" style={{ color: colors.textSecondary }}>
                        工行3.85% → 我行可提供3.45%，价差40BP
                      </p>
                    </div>
                    <div className="p-3 rounded-xl" style={{ backgroundColor: colors.warningLight }}>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock size={14} style={{ color: colors.warning }} />
                        <span className="text-[13px] font-semibold" style={{ color: colors.warning }}>到期转贷机会</span>
                      </div>
                      <p className="text-[12px]" style={{ color: colors.textSecondary }}>
                        建行500万信用贷9月到期，可提前介入
                      </p>
                    </div>
                  </div>

                  <Button variant="secondary" size="sm" fullWidth>
                    查看完整竞争分析
                    <ExternalLink size={14} />
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
