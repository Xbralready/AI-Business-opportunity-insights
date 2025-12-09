import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Phone,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  FileText,
  MessageSquare,
  Navigation,
  ClipboardList,
  Zap,
  Target,
  Lightbulb,
  BarChart3,
  FileCheck,
  Globe,
  CreditCard,
  Banknote,
  Receipt,
  Network,
  Route,
  Link2,
  Building,
  Ship,
  Wallet,
  BadgeCheck,
  Info,
  DollarSign
} from 'lucide-react';
import {
  mockCustomers,
  mockCustomerProfile,
  mockProductRecommendations,
  mockActionHandbook
} from '../data/mockData';
import type { ActionTask } from '../data/mockData';

const categoryIcons = {
  loan: Banknote,
  international: Globe,
  bill: Receipt,
  settlement: CreditCard,
  wealth: Wallet
};

const categoryNames = {
  loan: '贷款产品',
  international: '国际业务',
  bill: '票据业务',
  settlement: '结算服务',
  wealth: '财富管理'
};

const taskCategoryIcons = {
  contact: Phone,
  document: FileText,
  visit: Navigation,
  follow_up: MessageSquare,
  approval: ClipboardList
};

// 将 SectionHeader 移到组件外部
function SectionHeader({
  title,
  icon: Icon,
  section,
  badge,
  expanded,
  onToggle
}: {
  title: string;
  icon: React.ElementType;
  section: string;
  badge?: string;
  expanded: boolean;
  onToggle: (section: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(section)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
          <Icon size={20} className="text-green-600" />
        </div>
        <span className="font-semibold text-gray-900">{title}</span>
        {badge && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
            {badge}
          </span>
        )}
      </div>
      {expanded ? (
        <ChevronDown size={20} className="text-gray-400" />
      ) : (
        <ChevronRight size={20} className="text-gray-400" />
      )}
    </button>
  );
}

// 将 DataItem 移到组件外部
function DataItem({
  label,
  value,
  highlight
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-green-600' : 'text-gray-900'}`}>
        {value}
      </span>
    </div>
  );
}

export default function CustomerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
  const profile = mockCustomerProfile;
  const products = mockProductRecommendations;
  const handbook = mockActionHandbook;

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    internalInfo: true,
    externalData: true,
    transactionAnalysis: true,
    billDetails: true,
    graphInfo: true,
    customerJourney: true,
    publicPrivateLinkage: true,
    competitorInfo: true,
    internationalPayments: true
  });

  const [tasks, setTasks] = useState<ActionTask[]>(handbook.tasks);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === 'completed' ? 'pending' : 'completed'
            }
          : task
      )
    );
  };

  const handleAIExecute = (task: ActionTask) => {
    // 模拟AI执行
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, status: 'in_progress' } : t
      )
    );
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: 'completed' } : t
        )
      );
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/customers')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{customer.companyName}</h1>
              <p className="text-sm text-gray-500">客户详情 · AI 智能分析</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all">
              <Sparkles size={16} />
              AI 一键分析
            </button>
          </div>
        </div>
      </header>

      {/* 主内容区 - 长页面滚动 */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          {/* ==================== 客户基础信息栏 ==================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-200 p-6"
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building2 size={40} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900">{customer.companyName}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {customer.industry}
                  </span>
                  <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <CheckCircle size={14} />
                    低风险
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    成立于 {customer.establishedYear} 年
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign size={16} className="text-gray-400" />
                    注册资本 {customer.registeredCapital}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    法人: {customer.legalRepresentative}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} className="text-gray-400" />
                    {customer.contactPerson} {customer.contactPhone}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-400" />
                  {customer.address}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">已有产品:</span>
                    {customer.existingProducts.map((product) => (
                      <span
                        key={product}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">标签:</span>
                    {customer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <div className="text-sm text-gray-500">当前授信额度</div>
                  <div className="text-2xl font-bold text-green-600">{customer.creditAmount}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">累计跟进</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {customer.contactCount} 次
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ==================== AI 客户画像 ==================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI 客户画像</h3>
                  <p className="text-sm text-gray-500">多维度智能分析，全面洞察客户价值</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* 行内信息 */}
              <div>
                <SectionHeader title="行内信息" icon={Building} section="internalInfo" badge="核心" expanded={expandedSections.internalInfo} onToggle={toggleSection} />
                {expandedSections.internalInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-4 gap-6">
                      <DataItem label="开户日期" value={profile.internalInfo.accountOpenDate} />
                      <DataItem label="主账户" value={profile.internalInfo.mainAccount} />
                      <DataItem label="日均余额" value={profile.internalInfo.averageBalance} highlight />
                      <DataItem label="存款余额" value={profile.internalInfo.depositAmount} />
                      <DataItem label="贷款余额" value={profile.internalInfo.loanBalance} />
                      <DataItem
                        label="授信使用率"
                        value={`${profile.internalInfo.creditUsageRate}%`}
                      />
                      <DataItem label="逾期次数" value={profile.internalInfo.overdueCount} highlight />
                      <DataItem label="客户经理" value={profile.internalInfo.relationshipManager} />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 外部数据 */}
              <div>
                <SectionHeader title="外部数据" icon={Globe} section="externalData" expanded={expandedSections.externalData} onToggle={toggleSection} />
                {expandedSections.externalData && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-4 gap-6">
                      <DataItem
                        label="征信评分"
                        value={profile.externalData.creditScore}
                        highlight
                      />
                      <DataItem label="纳税评级" value={profile.externalData.taxRating} highlight />
                      <DataItem
                        label="参保人数"
                        value={`${profile.externalData.socialSecurityCount} 人`}
                      />
                      <DataItem label="专利数量" value={`${profile.externalData.patents} 项`} />
                    </div>
                    <div className="mt-4">
                      <span className="text-xs text-gray-500">资质认证:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profile.externalData.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            <BadgeCheck size={12} />
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 流水分析 */}
              <div>
                <SectionHeader title="流水分析" icon={BarChart3} section="transactionAnalysis" expanded={expandedSections.transactionAnalysis} onToggle={toggleSection} />
                {expandedSections.transactionAnalysis && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="grid grid-cols-2 gap-4">
                          <DataItem
                            label="月均流入"
                            value={profile.transactionAnalysis.monthlyInflow}
                            highlight
                          />
                          <DataItem
                            label="月均流出"
                            value={profile.transactionAnalysis.monthlyOutflow}
                          />
                        </div>
                        <div className="mt-4">
                          <span className="text-xs text-gray-500">季节性特征:</span>
                          <p className="text-sm text-gray-700 mt-1">
                            {profile.transactionAnalysis.seasonalPattern}
                          </p>
                        </div>
                        <div className="mt-3">
                          <span className="text-xs text-gray-500">集中度风险:</span>
                          <p className="text-sm text-gray-700 mt-1">
                            {profile.transactionAnalysis.concentrationRisk}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="mb-3">
                          <span className="text-xs text-gray-500">主要客户:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {profile.transactionAnalysis.mainCustomers.map((c) => (
                              <span
                                key={c}
                                className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">主要供应商:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {profile.transactionAnalysis.mainSuppliers.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 票据明细 */}
              <div>
                <SectionHeader title="票据明细" icon={Receipt} section="billDetails" expanded={expandedSections.billDetails} onToggle={toggleSection} />
                {expandedSections.billDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-5 gap-4">
                      <DataItem
                        label="承兑金额"
                        value={profile.billDetails.acceptanceAmount}
                        highlight
                      />
                      <DataItem label="贴现金额" value={profile.billDetails.discountAmount} />
                      <DataItem label="票据笔数" value={`${profile.billDetails.billCount} 笔`} />
                      <DataItem label="平均期限" value={profile.billDetails.averageTerm} />
                      <div>
                        <span className="text-xs text-gray-500">主要交易对手</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.billDetails.mainCounterparties.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 图谱信息 */}
              <div>
                <SectionHeader title="图谱信息" icon={Network} section="graphInfo" badge="关联" expanded={expandedSections.graphInfo} onToggle={toggleSection} />
                {expandedSections.graphInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">股东结构</h5>
                        <div className="space-y-2">
                          {profile.graphInfo.shareholders.map((s) => (
                            <div key={s.name} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{s.name}</span>
                              <span className="text-sm font-medium text-gray-900">{s.ratio}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">子公司</h5>
                        <div className="space-y-2">
                          {profile.graphInfo.subsidiaries.map((s) => (
                            <div key={s.name} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{s.name}</span>
                              <span className="text-sm font-medium text-gray-900">{s.ratio}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">供应链关系</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-gray-500">上游供应商</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {profile.graphInfo.supplyChain.upstream.map((u) => (
                              <span
                                key={u}
                                className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs"
                              >
                                {u}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">下游客户</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {profile.graphInfo.supplyChain.downstream.map((d) => (
                              <span
                                key={d}
                                className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 客户旅程 */}
              <div>
                <SectionHeader title="客户旅程" icon={Route} section="customerJourney" expanded={expandedSections.customerJourney} onToggle={toggleSection} />
                {expandedSections.customerJourney && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">当前阶段:</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {profile.customerJourney.currentStage}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">下一步:</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {profile.customerJourney.nextAction}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {profile.customerJourney.touchpoints.map((tp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm text-gray-500 w-24">{tp.date}</span>
                          <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-600">
                            {tp.channel}
                          </span>
                          <span className="text-sm text-gray-700 flex-1">{tp.action}</span>
                          <span className="text-sm text-green-600">{tp.result}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 公私联动 */}
              <div>
                <SectionHeader title="公私联动" icon={Link2} section="publicPrivateLinkage" badge="机会" expanded={expandedSections.publicPrivateLinkage} onToggle={toggleSection} />
                {expandedSections.publicPrivateLinkage && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">关联个人客户</h5>
                      <div className="space-y-2">
                        {profile.publicPrivateLinkage.relatedIndividuals.map((ind) => (
                          <div
                            key={ind.name}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <span className="text-sm font-medium text-gray-900">{ind.name}</span>
                              <span className="ml-2 text-xs text-gray-500">{ind.role}</span>
                            </div>
                            <div className="flex gap-2">
                              {ind.products.map((p) => (
                                <span
                                  key={p}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">交叉销售机会</h5>
                      <div className="flex flex-wrap gap-2">
                        {profile.publicPrivateLinkage.crossSellOpportunities.map((opp) => (
                          <span
                            key={opp}
                            className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs"
                          >
                            <Target size={12} />
                            {opp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 他行情报 */}
              <div>
                <SectionHeader title="他行情报" icon={Building} section="competitorInfo" badge="竞争" expanded={expandedSections.competitorInfo} onToggle={toggleSection} />
                {expandedSections.competitorInfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <DataItem
                        label="他行负债总额"
                        value={profile.competitorInfo.totalExternalDebt}
                      />
                      <DataItem
                        label="近期征信查询"
                        value={`${profile.competitorInfo.recentInquiries} 次`}
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">他行贷款明细</h5>
                      <div className="space-y-2">
                        {profile.competitorInfo.otherBankLoans.map((loan) => (
                          <div
                            key={loan.bank}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">{loan.bank}</span>
                            <div className="flex gap-6">
                              <span className="text-sm text-gray-600">金额: {loan.amount}</span>
                              <span className="text-sm text-gray-600">利率: {loan.rate}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* 国际收支 */}
              <div>
                <SectionHeader title="国际收支" icon={Ship} section="internationalPayments" expanded={expandedSections.internationalPayments} onToggle={toggleSection} />
                {expandedSections.internationalPayments && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-3 p-4 bg-white border border-gray-100 rounded-xl"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      <DataItem
                        label="年出口额"
                        value={profile.internationalPayments.exportVolume}
                        highlight
                      />
                      <DataItem
                        label="年进口额"
                        value={profile.internationalPayments.importVolume}
                      />
                      <DataItem
                        label="外汇敞口"
                        value={profile.internationalPayments.fxExposure}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-500">主要贸易国家:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profile.internationalPayments.mainCountries.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">贸易融资使用:</span>
                        <p className="text-sm text-gray-700 mt-1">
                          {profile.internationalPayments.tradeFinanceUsage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>

          {/* ==================== AI 产品推荐 ==================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Target size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI 产品推荐</h3>
                  <p className="text-sm text-gray-500">基于客户画像智能匹配最优产品组合</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {products.map((product) => {
                  const CategoryIcon = categoryIcons[product.category];
                  return (
                    <div
                      key={product.id}
                      className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <span className="text-xs text-gray-500">
                              {categoryNames[product.category]}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-blue-600">
                            {product.matchScore}
                          </span>
                          <span className="text-xs text-gray-500">匹配度</span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">{product.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.amount && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            额度: {product.amount}
                          </span>
                        )}
                        {product.rate && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            利率: {product.rate}
                          </span>
                        )}
                        {product.term && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            期限: {product.term}
                          </span>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className="text-xs text-gray-500">推荐理由:</span>
                        <ul className="mt-1 space-y-1">
                          {product.reasons.slice(0, 2).map((reason, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-1 text-xs text-gray-600"
                            >
                              <CheckCircle
                                size={12}
                                className="text-green-500 mt-0.5 flex-shrink-0"
                              />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {product.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* ==================== AI 行动手册 ==================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <FileCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI 行动手册</h3>
                    <p className="text-sm text-gray-500">结构化执行方案，指导客户经理高效跟进</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-all">
                  <Zap size={16} />
                  AI 一键执行全部
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 策略摘要 */}
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lightbulb size={20} className="text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">策略摘要</h4>
                    <p className="text-sm text-gray-700">{handbook.summary}</p>
                  </div>
                </div>
              </div>

              {/* 关键洞察 */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  关键洞察
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {handbook.keyInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg"
                    >
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 推荐策略 */}
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Target size={20} className="text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">推荐策略</h4>
                    <p className="text-sm text-gray-700">{handbook.recommendedStrategy}</p>
                  </div>
                </div>
              </div>

              {/* 执行时间线 */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-orange-600" />
                  执行时间线
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {handbook.timeline.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gray-50 rounded-xl border-l-4 border-orange-400"
                    >
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">{phase.phase}</h5>
                      <ul className="space-y-1">
                        {phase.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className="text-xs text-gray-600 flex items-start gap-1">
                            <ChevronRight size={12} className="text-orange-400 flex-shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 待办任务列表 */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ClipboardList size={16} className="text-purple-600" />
                  待办任务
                  <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {tasks.filter((t) => t.status !== 'completed').length} 项待完成
                  </span>
                </h4>
                <div className="space-y-3">
                  {tasks.map((task) => {
                    const TaskIcon = taskCategoryIcons[task.category];
                    const priorityColors = {
                      high: 'border-l-red-500 bg-red-50',
                      medium: 'border-l-yellow-500 bg-yellow-50',
                      low: 'border-l-gray-400 bg-gray-50'
                    };

                    return (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border-l-4 ${priorityColors[task.priority]} ${
                          task.status === 'completed' ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              task.status === 'completed'
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 hover:border-green-500'
                            }`}
                          >
                            {task.status === 'completed' && (
                              <Check size={14} className="text-white" />
                            )}
                            {task.status === 'in_progress' && (
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <TaskIcon size={16} className="text-gray-500" />
                              <h5
                                className={`font-medium ${
                                  task.status === 'completed'
                                    ? 'text-gray-500 line-through'
                                    : 'text-gray-900'
                                }`}
                              >
                                {task.title}
                              </h5>
                              <span
                                className={`px-2 py-0.5 rounded text-xs ${
                                  task.priority === 'high'
                                    ? 'bg-red-100 text-red-700'
                                    : task.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {task.priority === 'high'
                                  ? '高优先级'
                                  : task.priority === 'medium'
                                  ? '中优先级'
                                  : '低优先级'}
                              </span>
                              {task.status === 'in_progress' && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs animate-pulse">
                                  执行中...
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                            <div className="mt-2 flex items-center gap-4">
                              <span className="text-xs text-gray-500">
                                截止日期: {task.dueDate}
                              </span>
                            </div>
                            {task.suggestedScript && task.status !== 'completed' && (
                              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <MessageSquare size={14} className="text-green-600" />
                                  <span className="text-xs font-medium text-gray-700">
                                    AI 建议话术
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  {task.suggestedScript}
                                </p>
                              </div>
                            )}
                          </div>
                          {task.aiExecutable && task.status === 'pending' && (
                            <button
                              onClick={() => handleAIExecute(task)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-lg text-xs font-medium hover:bg-purple-600 transition-all"
                            >
                              <Zap size={12} />
                              AI执行
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 底部留白 */}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
}
