import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  Sparkles,
  Check,
  FileText,
  Lightbulb,
  Target,
  CreditCard,
  Banknote,
  Wallet,
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  MessageSquare,
  MessageCircle,
  TrendingUp,
  Award,
  Phone,
  Send,
  MapPinned
} from 'lucide-react';
import {
  mockCustomers,
  mockCustomerProfile,
  mockActionHandbook
} from '../data/mockData';
import type { ActionTask } from '../data/mockData';
import PunchCardChart from '../components/PunchCardChart';

const categoryIcons = {
  deposit: Wallet,
  loan: Banknote,
  settlement: CreditCard
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  deposit: { bg: 'bg-blue-50', text: 'text-blue-600' },
  loan: { bg: 'bg-green-50', text: 'text-green-600' },
  settlement: { bg: 'bg-purple-50', text: 'text-purple-600' }
};

// 行动类型配置：图标、按钮文案、颜色
const actionCategoryConfig: Record<string, { icon: typeof Phone; label: string; bg: string; text: string; hoverBg: string }> = {
  contact: { icon: Phone, label: '拨打电话', bg: 'bg-blue-500', text: 'text-white', hoverBg: 'hover:bg-blue-600' },
  document: { icon: FileText, label: '准备文档', bg: 'bg-purple-500', text: 'text-white', hoverBg: 'hover:bg-purple-600' },
  visit: { icon: MapPinned, label: '预约拜访', bg: 'bg-orange-500', text: 'text-white', hoverBg: 'hover:bg-orange-600' },
  follow_up: { icon: MessageSquare, label: '发送消息', bg: 'bg-green-500', text: 'text-white', hoverBg: 'hover:bg-green-600' },
  approval: { icon: Send, label: '提交审批', bg: 'bg-indigo-500', text: 'text-white', hoverBg: 'hover:bg-indigo-600' }
};

// 需求词云组件 - 支持高亮关联需求
function NeedsWordCloud({ needs, highlightNeeds = [] }: { needs: { text: string; weight: number; urgent?: boolean }[]; highlightNeeds?: string[] }) {
  // 颜色配置
  const getColor = (urgent: boolean | undefined, weight: number, isHighlighted: boolean) => {
    if (isHighlighted) {
      return '#16a34a'; // green-600 - 高亮关联的需求
    }
    if (urgent) {
      if (weight >= 90) return '#15803d'; // green-700
      if (weight >= 70) return '#16a34a'; // green-600
      return '#ea580c'; // orange-600
    } else {
      return '#9ca3af'; // gray-400 - 非关联需求灰显
    }
  };

  // 词云位置配置 - 模拟真实词云的不规则散布
  const wordPositions = [
    { x: 48, y: 25, rotate: 0 },      // 顶部中心 - 最大词
    { x: 20, y: 45, rotate: -90 },    // 左侧垂直
    { x: 75, y: 40, rotate: 15 },     // 右上斜
    { x: 50, y: 55, rotate: -8 },     // 中间偏下
    { x: 30, y: 70, rotate: 0 },      // 左下
    { x: 78, y: 68, rotate: -90 },    // 右侧垂直
    { x: 55, y: 80, rotate: 12 },     // 底部中右
    { x: 15, y: 25, rotate: 0 },      // 左上
  ];

  // 按权重排序
  const sortedNeeds = [...needs].sort((a, b) => b.weight - a.weight);

  return (
    <div
      className="relative w-full"
      style={{ height: '180px' }}
    >
      {sortedNeeds.map((need, idx) => {
        const pos = wordPositions[idx % wordPositions.length];
        const fontSize = 12 + (need.weight / 100) * 20; // 12px - 32px
        const isHighlighted = highlightNeeds.includes(need.text);
        const color = getColor(need.urgent, need.weight, isHighlighted);
        const isVertical = Math.abs(pos.rotate) === 90;

        return (
          <span
            key={idx}
            className={`absolute transition-all duration-300 hover:scale-110 hover:z-20 cursor-default whitespace-nowrap select-none ${isHighlighted ? 'z-10' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
              fontSize: `${fontSize}px`,
              color: color,
              fontWeight: isHighlighted ? 700 : (need.weight >= 80 ? 700 : need.weight >= 60 ? 600 : 500),
              lineHeight: 1,
              letterSpacing: isVertical ? '2px' : 'normal',
              opacity: isHighlighted ? 1 : (highlightNeeds.length > 0 ? 0.4 : 0.85),
              textShadow: isHighlighted ? '0 0 8px rgba(22, 163, 74, 0.3)' : 'none',
            }}
          >
            {need.text}
          </span>
        );
      })}
    </div>
  );
}

export default function CustomerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const customer = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
  const profile = mockCustomerProfile;
  const handbook = mockActionHandbook;

  const [tasks] = useState<ActionTask[]>(handbook.tasks);
  const [selectedDimension, setSelectedDimension] = useState<string | null>('基本信息');
  const [adoptedTaskIds, setAdoptedTaskIds] = useState<string[]>([]);

  const adoptTask = (taskId: string) => {
    setAdoptedTaskIds((prev) => [...prev, taskId]);
  };

  // 每个维度的 AI 解读内容（含评级和综合解析）
  const dimensionInterpretations: Record<string, { summary: string; positive: string[]; negative: string[]; rating: 'excellent' | 'good' | 'fair' | 'poor'; stars: number }> = {
    '基本信息': {
      summary: '成立年限适中、区域产业配套成熟，经营稳定性较好，归属清晰便于持续经营。',
      positive: [
        '成立年限适中，区域产业配套成熟（苏州制造业集群）',
        '经营稳定性较好',
        '我行内部归属清晰（机构/客户经理/客户等级明确），便于持续经营与资源协调'
      ],
      negative: [
        '员工规模与中型定位意味着管理复杂度上升，关键人员变动可能带来波动',
        '若客户等级偏高但产品覆盖不深，容易出现"资源投入与回报不匹配"的经营压力'
      ],
      rating: 'good',
      stars: 4
    },
    '行业分析': {
      summary: '装备制造链条长、结算场景多，天然适合做"结算+供应链+票据"的组合渗透。',
      positive: [
        '装备制造链条长、结算场景多，天然适合做"结算+供应链+票据"的组合渗透',
        '政策敏感度中等：既可能有技改/产业政策机会，也不至于强监管掣肘'
      ],
      negative: [
        '行业景气度中性偏好但易受下游订单周期影响（回款与库存周期可能放大波动）',
        '若属于隐性强监管细分（如涉军/危化/环保红线），合规要求会显著抬升准入成本'
      ],
      rating: 'good',
      stars: 4
    },
    '经营与资金': {
      summary: '营收、利润、毛利率处于"制造业可接受区间"，经营现金流为正，造血能力尚可。',
      positive: [
        '营收、利润、毛利率处于"制造业可接受区间"，经营现金流为正，造血能力尚可',
        '结算流水大、月均收付稳定，具备做现金管理、收款集中、支付控制的基础'
      ],
      negative: [
        '资产负债率较高（62%），叠加"短期资金紧张次数4次"，提示流动性管理偏紧',
        '最低余额偏低且流水波动存在，说明资金沉淀稳定性不足，易被同业"利率/费用"撬走'
      ],
      rating: 'fair',
      stars: 3
    },
    '融资与授用信': {
      summary: '授信结构较完整，用信稳定、额度使用率高，说明融资需求真实且可预测。',
      positive: [
        '授信结构较完整（普通+低风险），用信稳定、额度使用率高，说明融资需求真实且可预测',
        '表外融资不高，杠杆外溢风险相对可控',
        '无逾期，基本信用纪律良好'
      ],
      negative: [
        '出现过展期，提示经营现金回收周期或订单回款存在阶段性压力',
        '普通用信占比高、低风险用信偏少：若未来景气下行，风险迁移空间不足（抗波动能力弱）'
      ],
      rating: 'good',
      stars: 4
    },
    '价值贡献': {
      summary: '贷款加权利率与FTP之间有利差空间，综合贡献度"中上"，具备继续经营价值。',
      positive: [
        '贷款加权利率与FTP之间有利差空间，综合贡献度"中上"，具备继续经营价值',
        '历史FTP稳定，说明我行内部定价政策与客户贡献匹配较合理'
      ],
      negative: [
        '竞品能做到3.65%时，我行3.85%存在被"比价"压力，价格敏感客户可能要求再议价',
        '如果存款FTP较高而沉淀不稳，可能出现"负债成本偏高但留存不强"的利润挤压'
      ],
      rating: 'good',
      stars: 4
    },
    '竞品业务渗透': {
      summary: '多家他行并存意味着客户需求多元，可通过"到期日窗口"做份额迁移。',
      positive: [
        '多家他行并存意味着客户需求多元，可通过"到期日窗口（3个月后）"做份额迁移',
        '他行在供应链/票据已有布局，反向证明客户场景真实（不是伪需求）'
      ],
      negative: [
        '竞品利率更低且产品更全，客户议价能力强、切换成本低时，我行面临被动防守',
        '若客户在他行已有"主办行心智"（资金池、授信核心在他行），我行突破难度更大'
      ],
      rating: 'fair',
      stars: 3
    },
    '风险合规': {
      summary: '无失信限高、行政处罚为零，合规底盘较干净；征信与风控评分整体可接受。',
      positive: [
        '无失信限高、行政处罚为零，合规底盘较干净',
        '征信与风控评分整体可接受',
        '诉讼金额小（120万）且数量可控，更多像经营纠纷而非系统性信用恶化'
      ],
      negative: [
        '"频繁回转交易/关联交易"是显著预警信号，可能涉及刷流水、资金空转或关联方资金调度',
        '未决诉讼虽小但持续存在，若集中在核心客户/供应商，可能演化成供应链风险'
      ],
      rating: 'good',
      stars: 4
    },
    '决策链': {
      summary: '触达频次高，对接人与拍板人清晰，具备推进复杂产品的条件。',
      positive: [
        '触达频次高（拜访+沟通），对接人与拍板人清晰，具备推进复杂产品（如供应链/现金管理）的条件',
        '拒绝原因明确（费用+切换成本），说明"不是不需要"，而是需要更好的方案与ROI解释'
      ],
      negative: [
        '如果仅停留在财务经理层面，拍板人（CEO）未形成价值共识，容易卡在"看过但不签"',
        '过往拒绝记录意味着客户对我行方案差异化感知不足，需要重新定位价值点（否则重复被拒）'
      ],
      rating: 'good',
      stars: 4
    },
    '我行业务渗透': {
      summary: '基本户在我行 + 已有结算/代发/票据等基础产品，粘性底座不错，易做"深耕套餐化"。',
      positive: [
        '基本户在我行 + 已有结算/代发/票据等基础产品，粘性底座不错，易做"深耕套餐化"',
        '有票据场景可向贴现、供应链、应收账款融资等延伸'
      ],
      negative: [
        '缺少供应链融资、现金管理、跨境/外汇等高价值产品，说明"广度有了、深度不足"',
        '若仅靠基础结算留存，面对竞品利率/费用策略时抗压能力弱，存在被分流风险'
      ],
      rating: 'fair',
      stars: 3
    }
  };

  // Punch Card 数据 - 9个维度，点数量与正负向内容数量一致
  const punchCardData = [
    {
      dimension: '基本信息',
      points: [
        // 正向3条
        { label: '成立年限适中', score: 95, type: 'positive' as const },
        { label: '经营稳定', score: 75, type: 'positive' as const },
        { label: '归属清晰', score: 58, type: 'positive' as const },
        // 负向2条
        { label: '管理复杂度上升', score: 30, type: 'negative' as const },
        { label: '资源回报不匹配', score: 10, type: 'negative' as const },
      ]
    },
    {
      dimension: '行业分析',
      points: [
        // 正向2条
        { label: '结算场景多', score: 90, type: 'positive' as const },
        { label: '政策敏感度中等', score: 65, type: 'positive' as const },
        // 负向2条
        { label: '订单周期影响', score: 32, type: 'negative' as const },
        { label: '合规要求高', score: 10, type: 'negative' as const },
      ]
    },
    {
      dimension: '经营与资金',
      points: [
        // 正向2条
        { label: '现金流为正', score: 88, type: 'positive' as const },
        { label: '月均收付稳定', score: 62, type: 'positive' as const },
        // 负向2条
        { label: '资产负债率62%', score: 35, type: 'negative' as const },
        { label: '资金沉淀不稳', score: 12, type: 'negative' as const },
      ]
    },
    {
      dimension: '融资与授用信',
      points: [
        // 正向3条
        { label: '额度使用率高', score: 95, type: 'positive' as const },
        { label: '杠杆风险可控', score: 75, type: 'positive' as const },
        { label: '无逾期记录', score: 58, type: 'positive' as const },
        // 负向2条
        { label: '出现过展期', score: 30, type: 'negative' as const },
        { label: '抗波动能力弱', score: 10, type: 'negative' as const },
      ]
    },
    {
      dimension: '价值贡献',
      points: [
        // 正向2条
        { label: '利差空间充足', score: 88, type: 'positive' as const },
        { label: 'FTP稳定', score: 62, type: 'positive' as const },
        // 负向2条
        { label: '竞品比价压力', score: 32, type: 'negative' as const },
        { label: '负债成本偏高', score: 8, type: 'negative' as const },
      ]
    },
    {
      dimension: '竞品业务渗透',
      points: [
        // 正向2条
        { label: '客户需求多元', score: 85, type: 'positive' as const },
        { label: '场景真实', score: 60, type: 'positive' as const },
        // 负向2条
        { label: '竞品利率更低', score: 30, type: 'negative' as const },
        { label: '他行主办行心智', score: 8, type: 'negative' as const },
      ]
    },
    {
      dimension: '风险合规',
      points: [
        // 正向3条
        { label: '无失信限高', score: 95, type: 'positive' as const },
        { label: '风控评分可接受', score: 75, type: 'positive' as const },
        { label: '诉讼金额小', score: 55, type: 'positive' as const },
        // 负向2条
        { label: '频繁回转交易', score: 28, type: 'negative' as const },
        { label: '未决诉讼存在', score: 8, type: 'negative' as const },
      ]
    },
    {
      dimension: '决策链',
      points: [
        // 正向2条
        { label: '触达频次高', score: 90, type: 'positive' as const },
        { label: '拒绝原因明确', score: 62, type: 'positive' as const },
        // 负向2条
        { label: '拍板人未共识', score: 32, type: 'negative' as const },
        { label: '差异化感知不足', score: 10, type: 'negative' as const },
      ]
    },
    {
      dimension: '我行业务渗透',
      points: [
        // 正向2条
        { label: '基本户在我行', score: 92, type: 'positive' as const },
        { label: '票据场景可延伸', score: 65, type: 'positive' as const },
        // 负向2条
        { label: '高价值产品不足', score: 32, type: 'negative' as const },
        { label: '抗压能力弱', score: 10, type: 'negative' as const },
      ]
    },
  ];

  // 需求词云数据（urgent=true表示急迫需求，用红/橙色显示）
  const customerNeeds = [
    { text: '流动资金周转', weight: 100, urgent: true },
    { text: '回款账期长', weight: 95, urgent: true },
    { text: '外汇结算', weight: 85, urgent: false },
    { text: '汇率波动', weight: 75, urgent: true },
    { text: '资金归集', weight: 70, urgent: false },
    { text: '多账户管理', weight: 65, urgent: false },
    { text: '远期套保', weight: 60, urgent: false },
    { text: '银企直连', weight: 50, urgent: false }
  ];

  // 产品推荐数据 - 按存款类、贷款类、结算类分类
  const productRecommendations = [
    // 存款类产品
    {
      id: '1',
      name: '协定存款',
      shortName: '协定存款',
      category: 'deposit',
      matchScore: 88,
      amount: '100万起',
      rate: '1.15%',
      summary: '企业活期账户与定期收益相结合，兼顾流动性与收益',
      reason: '企业日均余额2850万，适合协定存款。可在保持流动性同时获得更高收益，优化企业闲置资金管理。',
      talkingPoints: '设定一个保底金额，超过的部分自动享受更高利率，随用随取不影响日常结算。',
      relatedNeeds: ['资金归集', '多账户管理']
    },
    {
      id: '2',
      name: '通知存款',
      shortName: '通知存款',
      category: 'deposit',
      matchScore: 82,
      amount: '50万起',
      rate: '1天0.45%/7天1.0%',
      summary: '短期大额资金增值，提前通知即可支取',
      reason: '企业有短期闲置资金需求，比活期利率高，流动性好，适合资金周转周期较短的企业。',
      talkingPoints: '根据资金使用计划选择1天或7天通知存款，提前通知即可支取，灵活方便。',
      relatedNeeds: ['资金归集']
    },
    {
      id: '3',
      name: '结构性存款',
      shortName: '结构性存款',
      category: 'deposit',
      matchScore: 75,
      amount: '100万起',
      rate: '1.5%-3.8%',
      summary: '本金保障+浮动收益，挂钩利率/汇率等指标',
      reason: '企业风险偏好稳健，在保本基础上追求更高收益，可根据市场行情获得浮动收益。',
      talkingPoints: '本金100%保障，收益挂钩市场指标，期限可选1-12个月，到期自动返还本金和收益。',
      relatedNeeds: ['资金归集', '多账户管理']
    },
    // 贷款类产品
    {
      id: '4',
      name: '流动资金贷款',
      shortName: '流动资金贷款',
      category: 'loan',
      matchScore: 95,
      amount: '500-3000万',
      rate: '3.45%起',
      summary: '满足企业日常经营周转的短期融资需求',
      reason: '客户的问题本质是"回款慢导致的阶段性缺口"，不是经营不行。用流贷把缺口平滑掉，能避免停工、错失订单。',
      talkingPoints: '把贷款期限和还款节奏按回款周期设计，用授信框架做"随借随还"，让客户在旺季不用反复跑流程。',
      relatedNeeds: ['流动资金周转', '回款账期长']
    },
    {
      id: '5',
      name: '科创企业信用贷',
      shortName: '科创信用贷',
      category: 'loan',
      matchScore: 92,
      amount: '500-2000万',
      rate: '3.65%起',
      summary: '面向高新技术企业的纯信用贷款产品，无需抵押担保',
      reason: '企业为高新技术企业，符合产品准入条件，专利数量23项，研发实力强，无需抵押担保，纯信用授信。',
      talkingPoints: '凭借高新技术企业资质和专利，可获得纯信用贷款，审批快速，循环使用。',
      relatedNeeds: ['流动资金周转']
    },
    {
      id: '6',
      name: '供应链融资',
      shortName: '供应链融资',
      category: 'loan',
      matchScore: 85,
      amount: '100-2000万',
      rate: '3.8%起',
      summary: '基于核心企业信用的应收账款融资',
      reason: '下游客户包含华为、中兴等优质核心企业，应收账款周转健康，可降低融资成本约0.5%。',
      talkingPoints: '依托核心企业信用，应收账款质押融资，放款快，成本低。',
      relatedNeeds: ['回款账期长']
    },
    {
      id: '7',
      name: '固定资产贷款',
      shortName: '固定资产贷款',
      category: 'loan',
      matchScore: 78,
      amount: '1000-5000万',
      rate: '4.0%起',
      summary: '支持企业设备采购、厂房建设等固定资产投资',
      reason: '企业有扩产设备采购需求，可匹配设备折旧周期还款，支持企业产能升级。',
      talkingPoints: '贷款期限可达5年，与设备折旧周期匹配，减轻还款压力。',
      relatedNeeds: ['流动资金周转']
    },
    // 结算类产品
    {
      id: '8',
      name: '企业网银',
      shortName: '企业网银',
      category: 'settlement',
      matchScore: 90,
      summary: '提供转账、查询、代发等一站式网上银行服务',
      reason: '提升企业财务处理效率，7×24小时随时办理业务，降低企业运营成本。',
      talkingPoints: '一个平台管理所有账户，转账、查询、对账一站式完成，安全便捷。',
      relatedNeeds: ['多账户管理', '银企直连']
    },
    {
      id: '9',
      name: '银企直连',
      shortName: '银企直连',
      category: 'settlement',
      matchScore: 85,
      summary: '企业ERP系统与银行系统直接对接，实现资金自动化管理',
      reason: '企业有多账户管理需求，可实现资金自动归集调拨，提升财务管理自动化水平。',
      talkingPoints: 'ERP系统直连银行，资金收付自动处理，对账报表自动生成，效率提升80%。',
      relatedNeeds: ['资金归集', '多账户管理', '银企直连']
    },
    {
      id: '10',
      name: '代发工资',
      shortName: '代发工资',
      category: 'settlement',
      matchScore: 82,
      summary: '批量代发员工工资、奖金、福利等',
      reason: '企业员工156人，代发需求明确，可绑定员工个人金融服务，提升员工与企业粘性。',
      talkingPoints: '批量处理，准时发放，员工可享受我行个人金融优惠服务。',
      relatedNeeds: ['多账户管理']
    },
    {
      id: '11',
      name: '跨境结算',
      shortName: '跨境结算',
      category: 'settlement',
      matchScore: 78,
      summary: '提供进出口贸易的跨境收付款服务',
      reason: '企业年进出口额超1300万美元，可降低汇兑成本，提供汇率风险管理方案。',
      talkingPoints: '币种齐全，汇率优惠，专业团队提供汇率风险管理建议。',
      relatedNeeds: ['外汇结算', '汇率波动', '远期套保']
    }
  ];

  // 产品分类配置
  const productCategoryTabs = [
    { key: 'deposit', label: '存款类产品' },
    { key: 'loan', label: '贷款类产品' },
    { key: 'settlement', label: '结算类产品' }
  ];
  const [productCategoryTab, setProductCategoryTab] = useState<string>('deposit');

  // 选中的产品（只有当选中的产品在当前 tab 下时才生效）
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const selectedProduct = selectedProductId
    ? productRecommendations.find(p => p.id === selectedProductId && p.category === productCategoryTab)
    : null;
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number | undefined>(undefined);
  const [isWide, setIsWide] = useState<boolean>(() => (typeof window !== 'undefined' ? window.innerWidth >= 1280 : false));
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);
  const [caseCategoryTab, setCaseCategoryTab] = useState<'deposit' | 'loan' | 'settlement'>('deposit');

  // 根据左列总高度同步右侧高度，避免右侧超出视口或底部不齐，同时检测宽度用于两列布局
  useEffect(() => {
    const measure = () => {
      if (leftColumnRef.current) {
        setRightHeight(leftColumnRef.current.offsetHeight);
      }
      if (typeof window !== 'undefined') {
        setIsWide(window.innerWidth >= 1280);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // 默认展开第一条未完成的行动，若全部完成则展开第一条
  useEffect(() => {
    if (tasks.length === 0) return;
    const firstPending = tasks.find(t => t.status !== 'completed');
    setOpenTaskId((prev) => prev ?? (firstPending ? firstPending.id : tasks[0].id));
  }, [tasks]);

  return (
    <div className="flex flex-col">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
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
              <p className="text-sm text-gray-500 mt-1">{customer.industry} · 成立{2024 - customer.establishedYear}年</p>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="flex-1 bg-gray-50 p-6">
        <div className="space-y-4">

          {/* ==================== 模块1: 客户基础信息（全宽） ==================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <Building2 size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-900">{customer.companyName}</h2>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{profile.cooperationAndContribution.customerLevel}</span>
                  </div>
                  <span className="text-xs text-gray-400">数据更新于 2024-01-15</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Briefcase size={14} />{customer.industry}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} />杭州市</span>
                  <span>{profile.businessFundamentals.basicInfo.employeeCount}人</span>
                </div>
              </div>
            </div>

            {/* AI 核心洞察 */}
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px' }}>
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-green-700 mb-2">AI 核心洞察</div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="text-green-600 font-semibold">优质高新技术企业</span>，经营稳健，有明确<span className="text-green-600 font-semibold">扩产融资需求约2000万</span>，票据业务活跃，建议优先推进<span className="text-green-600 font-semibold">科创信用贷</span>。
                  </p>
                </div>
              </div>
            </div>

          </motion.section>

          {/* ==================== 两栏布局：左侧 + 右侧 ==================== */}
          <div
            className="grid grid-cols-1 gap-4 items-start w-full max-w-full"
            style={{ gridTemplateColumns: isWide ? '2fr 1fr' : '1fr' }}
          >

            {/* 左列：纵向堆叠两个卡 */}
            <div className="flex flex-col gap-4 min-w-0 xl:col-span-2" ref={leftColumnRef}>

              {/* AI 客户画像 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI 客户画像</h3>

                {/* Punch Card 图 + 内嵌解读 */}
                <div className="flex justify-center">
                  <PunchCardChart
                    data={punchCardData}
                    selectedDimension={selectedDimension}
                    onDimensionClick={(dimension) => setSelectedDimension(selectedDimension === dimension ? null : dimension)}
                    dimensionInterpretations={dimensionInterpretations}
                  />
                </div>
              </motion.section>

              {/* AI 产品推荐 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI 产品推荐</h3>

                <div className="flex flex-col lg:flex-row gap-6">
                  {/* 左侧：用户需求词云 */}
                  <div className="w-full lg:w-2/5 min-w-0">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 h-full border border-gray-100">
                      <div className="text-sm font-medium text-gray-700 mb-1 text-center">客户需求洞察</div>
                      <div className="text-xs text-gray-400 text-center mb-2">绿色高亮 = 当前产品解决的需求</div>
                      <NeedsWordCloud needs={customerNeeds} highlightNeeds={selectedProduct?.relatedNeeds || []} />
                      {/* 关联需求标签 */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500 mb-2">当前产品解决的需求：</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProduct ? (
                            selectedProduct.relatedNeeds.map((need, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                {need}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">点击下方产品卡片查看</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右侧：产品推荐详情 */}
                  <div className="w-full lg:w-3/5 min-w-0">
                    {/* 分类 Tab */}
                    <div className="flex items-center gap-2 mb-4">
                      {productCategoryTabs.map((tab) => {
                        const isActive = tab.key === productCategoryTab;
                        return (
                          <button
                            key={tab.key}
                            onClick={() => {
                              setProductCategoryTab(tab.key);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isActive
                                ? 'bg-green-500 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* 产品列表 */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={productCategoryTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {productRecommendations
                          .filter(p => p.category === productCategoryTab)
                          .slice(0, 5)
                          .map((product) => {
                            const CategoryIcon = categoryIcons[product.category as keyof typeof categoryIcons] || Wallet;
                            const colors = categoryColors[product.category as keyof typeof categoryColors] || { bg: 'bg-gray-100', text: 'text-gray-600' };

                            const isSelected = selectedProductId === product.id;
                            return (
                              <div
                                key={product.id}
                                onClick={() => setSelectedProductId(product.id)}
                                className={`border bg-white rounded-lg p-4 transition-all cursor-pointer ${
                                  isSelected
                                    ? 'border-green-500 shadow-md ring-2 ring-green-100'
                                    : 'border-gray-200 hover:border-green-300 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`} style={{ width: '40px', height: '40px' }}>
                                    <CategoryIcon size={20} className={colors.text} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{product.summary}</p>
                                    <div className="bg-gray-50 rounded p-2">
                                      <div className="flex items-center gap-1 mb-1">
                                        <Lightbulb size={12} className="text-orange-500" />
                                        <span className="text-xs font-medium text-gray-600">推荐理由</span>
                                      </div>
                                      <p className="text-xs text-gray-500 leading-relaxed">{product.reason}</p>
                                    </div>
                                    {product.talkingPoints && (
                                      <div className="bg-blue-50 rounded p-2 mt-2">
                                        <div className="flex items-center gap-1 mb-1">
                                          <MessageCircle size={12} className="text-blue-500" />
                                          <span className="text-xs font-medium text-gray-600">沟通要点</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{product.talkingPoints}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* 右列：单卡 - AI 行动手册 */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-orange-50 rounded-xl border border-gray-200 p-5 flex flex-col min-w-0 h-full"
              style={{ height: rightHeight ? `${rightHeight}px` : 'auto', borderColor: '#fed7aa' }}
            >
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900">AI 行动手册</h3>
              </div>

              {/* 行动策略 */}
              <div className="bg-blue-50 rounded-lg p-4 mb-4 flex-shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">行动策略</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{handbook.summary}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <Sparkles size={14} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">主攻方向</div>
                      <div className="text-sm font-medium text-gray-800 truncate">锁定核心决策人+差异化报价</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <Target size={14} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">关键动作</div>
                      <div className="text-sm font-medium text-gray-800 truncate">对标竞品利率，突出交叉产品组合</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <TrendingUp size={14} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">目标</div>
                      <div className="text-sm font-medium text-gray-800 truncate">提高授信占比 + 成交转化</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <Clock size={14} className="text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">节奏</div>
                      <div className="text-sm font-medium text-gray-800 truncate">本月完成沟通/报价/质检闭环</div>
                    </div>
                  </div>
                </div>

                {/* 优秀案例 - 嵌入式展示 */}
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={14} className="text-purple-600" />
                    <span className="text-sm font-semibold text-purple-700">优秀营销案例</span>
                  </div>

                  {/* 产品类型Tab */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => { setCaseCategoryTab('deposit'); setExpandedCaseId(null); }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        caseCategoryTab === 'deposit'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      存款类产品
                    </button>
                    <button
                      onClick={() => { setCaseCategoryTab('loan'); setExpandedCaseId(null); }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        caseCategoryTab === 'loan'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      贷款类产品
                    </button>
                    <button
                      onClick={() => { setCaseCategoryTab('settlement'); setExpandedCaseId(null); }}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        caseCategoryTab === 'settlement'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      结算类产品
                    </button>
                  </div>

                  {/* 案例列表 */}
                  <div className="space-y-2">
                    {caseCategoryTab === 'deposit' && (
                      <>
                        {/* 存款案例一 */}
                        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                          <button
                            onClick={() => setExpandedCaseId(expandedCaseId === 'deposit1' ? null : 'deposit1')}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded font-medium flex-shrink-0" style={{ minWidth: '44px', textAlign: 'center' }}>案例一</span>
                                <span className="text-sm font-medium text-gray-800">杭州盛达贸易有限公司</span>
                                <span className="px-1.5 py-0.5 text-xs text-green-700 bg-green-100 rounded">新增存款5000万</span>
                              </div>
                              <ChevronRight size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${expandedCaseId === 'deposit1' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedCaseId !== 'deposit1' && (
                              <div className="flex items-start gap-2 mt-1.5">
                                <span className="flex-shrink-0" style={{ minWidth: '44px' }}></span>
                                <p className="text-xs text-gray-500 line-clamp-1">企业资金充裕但活期收益低，通过协定存款方案成功营销</p>
                              </div>
                            )}
                          </button>
                          {expandedCaseId === 'deposit1' && (
                            <div className="px-3 pb-3 border-t border-purple-100">
                              <div className="bg-purple-50 rounded p-2 mt-2 mb-2">
                                <div className="text-xs font-medium text-purple-700 mb-1">与当前客户相似点</div>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">日均余额高</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">资金周转稳定</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">收益意识强</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">企业日均存款余额高但全部为活期，对资金收益有明确诉求。</p>
                              <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 space-y-1">
                                <p><span className="text-orange-500 font-medium">发现：</span>通过流水分析发现账户长期保持高余额。</p>
                                <p><span className="text-blue-500 font-medium">方案：</span>定制协定存款+通知存款组合方案，测算年化增收。</p>
                                <p><span className="text-green-500 font-medium">成果：</span>客户将<span className="font-semibold text-green-600">5000万转为协定存款</span>，年增收约40万。</p>
                              </div>
                              <div className="bg-amber-50 rounded p-2 mt-2 flex items-start gap-1">
                                <Lightbulb size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">关注客户账户资金规律，主动提供增值方案是存款营销关键。</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 存款案例二 */}
                        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                          <button
                            onClick={() => setExpandedCaseId(expandedCaseId === 'deposit2' ? null : 'deposit2')}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded font-medium flex-shrink-0" style={{ minWidth: '44px', textAlign: 'center' }}>案例二</span>
                                <span className="text-sm font-medium text-gray-800">宁波创新科技集团</span>
                                <span className="px-1.5 py-0.5 text-xs text-green-700 bg-green-100 rounded">结构性存款3000万</span>
                              </div>
                              <ChevronRight size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${expandedCaseId === 'deposit2' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedCaseId !== 'deposit2' && (
                              <div className="flex items-start gap-2 mt-1.5">
                                <span className="flex-shrink-0" style={{ minWidth: '44px' }}></span>
                                <p className="text-xs text-gray-500 line-clamp-1">集团闲置资金理财需求，通过结构性存款满足保本增值诉求</p>
                              </div>
                            )}
                          </button>
                          {expandedCaseId === 'deposit2' && (
                            <div className="px-3 pb-3 border-t border-purple-100">
                              <div className="bg-purple-50 rounded p-2 mt-2 mb-2">
                                <div className="text-xs font-medium text-purple-700 mb-1">与当前客户相似点</div>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">风险偏好稳健</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">追求收益</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">资金量大</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">集团财务对理财有需求，但担心本金安全，原资金存放他行理财。</p>
                              <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 space-y-1">
                                <p><span className="text-orange-500 font-medium">痛点：</span>他行理财收益下降，寻求更优方案。</p>
                                <p><span className="text-blue-500 font-medium">方案：</span>推荐挂钩利率的结构性存款，保本前提下争取更高收益。</p>
                                <p><span className="text-green-500 font-medium">成果：</span>成功营销<span className="font-semibold text-green-600">3000万结构性存款</span>，后续追加2000万。</p>
                              </div>
                              <div className="bg-amber-50 rounded p-2 mt-2 flex items-start gap-1">
                                <Lightbulb size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">抓住客户保本增值核心诉求，对比竞品展示产品优势。</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {caseCategoryTab === 'loan' && (
                      <>
                        {/* 贷款案例一 */}
                        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                          <button
                            onClick={() => setExpandedCaseId(expandedCaseId === 'loan1' ? null : 'loan1')}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded font-medium flex-shrink-0" style={{ minWidth: '44px', textAlign: 'center' }}>案例一</span>
                                <span className="text-sm font-medium text-gray-800">苏州恒创精密科技有限公司</span>
                                <span className="px-1.5 py-0.5 text-xs text-green-700 bg-green-100 rounded">科创贷2000万</span>
                              </div>
                              <ChevronRight size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${expandedCaseId === 'loan1' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedCaseId !== 'loan1' && (
                              <div className="flex items-start gap-2 mt-1.5">
                                <span className="flex-shrink-0" style={{ minWidth: '44px' }}></span>
                                <p className="text-xs text-gray-500 line-clamp-1">高新技术企业扩产融资需求，通过科创信用贷成功授信</p>
                              </div>
                            )}
                          </button>
                          {expandedCaseId === 'loan1' && (
                            <div className="px-3 pb-3 border-t border-purple-100">
                              <div className="bg-purple-50 rounded p-2 mt-2 mb-2">
                                <div className="text-xs font-medium text-purple-700 mb-1">与当前客户相似点</div>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">高新技术企业</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">扩产需求</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">有专利资产</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">企业拥有多项发明专利，需要资金扩大产能，但缺乏传统抵押物。</p>
                              <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 space-y-1">
                                <p><span className="text-orange-500 font-medium">初期：</span>企业担心信用贷款额度不够、利率偏高。</p>
                                <p><span className="text-blue-500 font-medium">方案：</span>结合专利评估和经营数据，定制科创贷方案。</p>
                                <p><span className="text-green-500 font-medium">成果：</span>成功授信<span className="font-semibold text-green-600">2000万科创信用贷</span>，利率低于市场平均。</p>
                              </div>
                              <div className="bg-amber-50 rounded p-2 mt-2 flex items-start gap-1">
                                <Lightbulb size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">突出科创贷纯信用、快审批优势，用专利和经营数据增强信心。</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 贷款案例二 */}
                        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                          <button
                            onClick={() => setExpandedCaseId(expandedCaseId === 'loan2' ? null : 'loan2')}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded font-medium flex-shrink-0" style={{ minWidth: '44px', textAlign: 'center' }}>案例二</span>
                                <span className="text-sm font-medium text-gray-800">浙江供应链科技有限公司</span>
                                <span className="px-1.5 py-0.5 text-xs text-green-700 bg-green-100 rounded">供应链融资1500万</span>
                              </div>
                              <ChevronRight size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${expandedCaseId === 'loan2' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedCaseId !== 'loan2' && (
                              <div className="flex items-start gap-2 mt-1.5">
                                <span className="flex-shrink-0" style={{ minWidth: '44px' }}></span>
                                <p className="text-xs text-gray-500 line-clamp-1">核心企业上游供应商，应收账款融资解决回款周期长问题</p>
                              </div>
                            )}
                          </button>
                          {expandedCaseId === 'loan2' && (
                            <div className="px-3 pb-3 border-t border-purple-100">
                              <div className="bg-purple-50 rounded p-2 mt-2 mb-2">
                                <div className="text-xs font-medium text-purple-700 mb-1">与当前客户相似点</div>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">回款账期长</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">有核心企业订单</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">应收账款多</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">企业为大型制造企业供应商，账期90天，资金周转压力大。</p>
                              <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 space-y-1">
                                <p><span className="text-orange-500 font-medium">痛点：</span>传统贷款需抵押，应收账款无法变现。</p>
                                <p><span className="text-blue-500 font-medium">方案：</span>依托核心企业信用，应收账款质押融资。</p>
                                <p><span className="text-green-500 font-medium">成果：</span>48小时放款<span className="font-semibold text-green-600">1500万</span>，有效缓解资金压力。</p>
                              </div>
                              <div className="bg-amber-50 rounded p-2 mt-2 flex items-start gap-1">
                                <Lightbulb size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">挖掘供应链关系，利用核心企业信用背书降低融资门槛。</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {caseCategoryTab === 'settlement' && (
                      <>
                        {/* 结算案例一 */}
                        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                          <button
                            onClick={() => setExpandedCaseId(expandedCaseId === 'settlement1' ? null : 'settlement1')}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded font-medium flex-shrink-0" style={{ minWidth: '44px', textAlign: 'center' }}>案例一</span>
                                <span className="text-sm font-medium text-gray-800">上海智造科技有限公司</span>
                                <span className="px-1.5 py-0.5 text-xs text-green-700 bg-green-100 rounded">银企直连上线</span>
                              </div>
                              <ChevronRight size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${expandedCaseId === 'settlement1' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedCaseId !== 'settlement1' && (
                              <div className="flex items-start gap-2 mt-1.5">
                                <span className="flex-shrink-0" style={{ minWidth: '44px' }}></span>
                                <p className="text-xs text-gray-500 line-clamp-1">企业ERP系统与银行直连，实现资金收付自动化处理</p>
                              </div>
                            )}
                          </button>
                          {expandedCaseId === 'settlement1' && (
                            <div className="px-3 pb-3 border-t border-purple-100">
                              <div className="bg-purple-50 rounded p-2 mt-2 mb-2">
                                <div className="text-xs font-medium text-purple-700 mb-1">与当前客户相似点</div>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">有ERP系统</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">多账户管理</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">支付量大</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">企业财务每天处理大量收付款，手工操作效率低、易出错。</p>
                              <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 space-y-1">
                                <p><span className="text-orange-500 font-medium">痛点：</span>财务人员每天重复操作，对账耗时费力。</p>
                                <p><span className="text-blue-500 font-medium">方案：</span>银企直连对接ERP，实现批量支付和自动对账。</p>
                                <p><span className="text-green-500 font-medium">成果：</span>财务效率<span className="font-semibold text-green-600">提升80%</span>，错误率降为零。</p>
                              </div>
                              <div className="bg-amber-50 rounded p-2 mt-2 flex items-start gap-1">
                                <Lightbulb size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">从财务痛点切入，用效率提升数据打动决策者。</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 结算案例二 */}
                        <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                          <button
                            onClick={() => setExpandedCaseId(expandedCaseId === 'settlement2' ? null : 'settlement2')}
                            className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 text-xs bg-purple-600 text-white rounded font-medium flex-shrink-0" style={{ minWidth: '44px', textAlign: 'center' }}>案例二</span>
                                <span className="text-sm font-medium text-gray-800">杭州外贸进出口有限公司</span>
                                <span className="px-1.5 py-0.5 text-xs text-green-700 bg-green-100 rounded">跨境结算300万美元</span>
                              </div>
                              <ChevronRight size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${expandedCaseId === 'settlement2' ? 'rotate-90' : ''}`} />
                            </div>
                            {expandedCaseId !== 'settlement2' && (
                              <div className="flex items-start gap-2 mt-1.5">
                                <span className="flex-shrink-0" style={{ minWidth: '44px' }}></span>
                                <p className="text-xs text-gray-500 line-clamp-1">外贸企业跨境结算需求，提供优惠汇率和专业汇率风险管理</p>
                              </div>
                            )}
                          </button>
                          {expandedCaseId === 'settlement2' && (
                            <div className="px-3 pb-3 border-t border-purple-100">
                              <div className="bg-purple-50 rounded p-2 mt-2 mb-2">
                                <div className="text-xs font-medium text-purple-700 mb-1">与当前客户相似点</div>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">有外汇业务</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">汇率波动敏感</span>
                                  <span className="px-1.5 py-0.5 text-xs bg-white text-purple-600 rounded border border-purple-200">进出口贸易</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">企业年进出口额超千万美元，受汇率波动影响利润不稳定。</p>
                              <div className="bg-gray-50 rounded p-2 text-xs text-gray-600 space-y-1">
                                <p><span className="text-orange-500 font-medium">痛点：</span>原结算行汇率不优惠，无专业汇率建议。</p>
                                <p><span className="text-blue-500 font-medium">方案：</span>提供优惠汇率+远期锁汇+专业市场分析。</p>
                                <p><span className="text-green-500 font-medium">成果：</span>年结汇<span className="font-semibold text-green-600">300万美元</span>，节省汇兑成本20万。</p>
                              </div>
                              <div className="bg-amber-50 rounded p-2 mt-2 flex items-start gap-1">
                                <Lightbulb size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-800">以汇率优惠为切入点，配合专业服务建立长期合作关系。</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 行动列表 */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700">AI 行动建议</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    {tasks.filter((t) => !adoptedTaskIds.includes(t.id)).length} 项待行动
                  </span>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1 mb-3">
                  {[...tasks]
                    .sort((a, b) => {
                      // 已行动的排在后面
                      const aActioned = adoptedTaskIds.includes(a.id) ? 1 : 0;
                      const bActioned = adoptedTaskIds.includes(b.id) ? 1 : 0;
                      return aActioned - bActioned;
                    })
                    .map((task, idx) => {
                      const isOpen = openTaskId ? openTaskId === task.id : idx === 0;

                      return (
                        <div
                          key={task.id}
                          className="rounded-lg border p-3 transition-all bg-white border-gray-200"
                        >
                          <button
                            onClick={() => setOpenTaskId(isOpen ? null : task.id)}
                            className="flex items-start gap-2 text-left w-full"
                          >
                            <ChevronRight
                              size={16}
                              className={`mt-1 flex-shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="text-sm font-medium text-gray-800">
                                  {task.title}
                                </h5>
                                {adoptedTaskIds.includes(task.id) ? (
                                  <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500 flex items-center gap-1">
                                    <Check size={10} />
                                    已行动
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-xs bg-green-50 text-green-700">待行动</span>
                                )}
                              </div>
                              {!isOpen && (
                                <p className="text-xs text-gray-500 truncate mt-1">
                                  {task.description}
                                </p>
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="mt-3">
                              <div className="bg-white rounded p-3 border border-green-100">
                                <div className="flex items-center gap-1 mb-1">
                                  <MessageSquare size={12} className="text-green-600" />
                                  <span className="text-xs font-medium text-green-700">AI 行动建议</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
                                {task.suggestedScript && (
                                  <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1 mb-1">
                                      <MessageCircle size={12} className="text-blue-500" />
                                      <span className="text-xs font-medium text-blue-600">参考内容</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed bg-blue-50 rounded p-2">{task.suggestedScript}</p>
                                  </div>
                                )}
                                {/* 行动按钮 */}
                                {(() => {
                                  const config = actionCategoryConfig[task.category];
                                  if (!config) return null;
                                  const ActionIcon = config.icon;
                                  const isActioned = adoptedTaskIds.includes(task.id);

                                  if (isActioned) {
                                    return (
                                      <button
                                        className="w-full mt-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all bg-gray-100 text-gray-500 cursor-default"
                                        style={{ padding: '10px 16px', fontSize: '14px' }}
                                        disabled
                                      >
                                        <Check size={16} />
                                        已完成行动
                                      </button>
                                    );
                                  }

                                  return (
                                    <button
                                      onClick={() => adoptTask(task.id)}
                                      className={`w-full mt-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-sm ${config.bg} ${config.text} ${config.hoverBg}`}
                                      style={{ padding: '10px 16px', fontSize: '14px' }}
                                    >
                                      <ActionIcon size={16} />
                                      {config.label}
                                    </button>
                                  );
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </motion.aside>
          </div>

        </div>
      </div>

    </div>
  );
}
