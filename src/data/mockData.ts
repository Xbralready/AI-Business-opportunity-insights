// 类型定义
export type CorporateCustomer = {
  id: string;
  companyName: string;
  industry: string;
  registeredCapital: string;
  establishedYear: number;
  legalRepresentative: string;
  contactPerson: string;
  contactPhone: string;
  address: string;
  status: 'pending' | 'following' | 'applying' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  lastContactTime: string;
  contactCount: number;
  creditAmount: string;
  existingProducts: string[];
  tags: string[];
}

export type CustomerProfile = {
  internalInfo: {
    accountOpenDate: string;
    mainAccount: string;
    averageBalance: string;
    depositAmount: string;
    loanBalance: string;
    creditUsageRate: number;
    overdueCount: number;
    relationshipManager: string;
  };
  externalData: {
    creditScore: number;
    taxRating: string;
    socialSecurityCount: number;
    patents: number;
    certifications: string[];
  };
  transactionAnalysis: {
    monthlyInflow: string;
    monthlyOutflow: string;
    mainCustomers: string[];
    mainSuppliers: string[];
    seasonalPattern: string;
    concentrationRisk: string;
  };
  billDetails: {
    acceptanceAmount: string;
    discountAmount: string;
    billCount: number;
    averageTerm: string;
    mainCounterparties: string[];
  };
  graphInfo: {
    shareholders: { name: string; ratio: string }[];
    subsidiaries: { name: string; ratio: string }[];
    relatedParties: { name: string; relation: string }[];
    supplyChain: { upstream: string[]; downstream: string[] };
  };
  customerJourney: {
    touchpoints: { date: string; channel: string; action: string; result: string }[];
    currentStage: string;
    nextAction: string;
  };
  publicPrivateLinkage: {
    relatedIndividuals: { name: string; role: string; products: string[] }[];
    crossSellOpportunities: string[];
  };
  competitorInfo: {
    otherBankLoans: { bank: string; amount: string; rate: string }[];
    totalExternalDebt: string;
    recentInquiries: number;
  };
  internationalPayments: {
    exportVolume: string;
    importVolume: string;
    mainCountries: string[];
    fxExposure: string;
    tradeFinanceUsage: string;
  };
}

export type ProductRecommendation = {
  id: string;
  category: 'loan' | 'international' | 'bill' | 'settlement' | 'wealth';
  name: string;
  description: string;
  amount: string;
  rate?: string;
  term?: string;
  matchScore: number;
  reasons: string[];
  highlights: string[];
}

export type ActionTask = {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  category: 'contact' | 'document' | 'visit' | 'follow_up' | 'approval';
  aiExecutable: boolean;
  suggestedScript?: string;
}

export type ActionHandbook = {
  summary: string;
  keyInsights: string[];
  recommendedStrategy: string;
  tasks: ActionTask[];
  timeline: { phase: string; actions: string[] }[];
}

// 模拟对公客户列表
export const mockCustomers: CorporateCustomer[] = [
  {
    id: '1',
    companyName: '杭州智联科技有限公司',
    industry: '信息技术',
    registeredCapital: '5000万',
    establishedYear: 2015,
    legalRepresentative: '张建国',
    contactPerson: '李明',
    contactPhone: '138****5678',
    address: '浙江省杭州市西湖区文三路123号',
    status: 'following',
    riskLevel: 'low',
    lastContactTime: '2024-01-15 14:30',
    contactCount: 8,
    creditAmount: '2000万',
    existingProducts: ['普惠贷款', '企业网银'],
    tags: ['高新技术企业', '优质客户', '有扩产需求']
  },
  {
    id: '2',
    companyName: '宁波远洋贸易集团',
    industry: '国际贸易',
    registeredCapital: '1.2亿',
    establishedYear: 2008,
    legalRepresentative: '王海波',
    contactPerson: '陈芳',
    contactPhone: '139****8901',
    address: '浙江省宁波市北仑区港口大道88号',
    status: 'applying',
    riskLevel: 'medium',
    lastContactTime: '2024-01-14 10:00',
    contactCount: 12,
    creditAmount: '8000万',
    existingProducts: ['国际信用证', '外汇结算', '贸易融资'],
    tags: ['出口大户', '多币种需求', '供应链核心']
  },
  {
    id: '3',
    companyName: '苏州精密制造股份有限公司',
    industry: '高端制造',
    registeredCapital: '8000万',
    establishedYear: 2010,
    legalRepresentative: '刘德华',
    contactPerson: '周杰',
    contactPhone: '137****2345',
    address: '江苏省苏州市工业园区星湖街218号',
    status: 'pending',
    riskLevel: 'low',
    lastContactTime: '2024-01-10 16:45',
    contactCount: 3,
    creditAmount: '5000万',
    existingProducts: ['基本户'],
    tags: ['专精特新', '设备更新需求', '政府补贴']
  },
  {
    id: '4',
    companyName: '上海鼎盛地产开发有限公司',
    industry: '房地产',
    registeredCapital: '2亿',
    establishedYear: 2005,
    legalRepresentative: '赵强',
    contactPerson: '孙丽',
    contactPhone: '136****6789',
    address: '上海市浦东新区陆家嘴环路1000号',
    status: 'following',
    riskLevel: 'high',
    lastContactTime: '2024-01-12 09:30',
    contactCount: 15,
    creditAmount: '3亿',
    existingProducts: ['开发贷', '银团贷款'],
    tags: ['重点监控', '现金流紧张', '项目延期']
  },
  {
    id: '5',
    companyName: '广州新能源汽车科技有限公司',
    industry: '新能源汽车',
    registeredCapital: '1.5亿',
    establishedYear: 2018,
    legalRepresentative: '马云飞',
    contactPerson: '黄伟',
    contactPhone: '135****4321',
    address: '广东省广州市南沙区港前大道南168号',
    status: 'approved',
    riskLevel: 'low',
    lastContactTime: '2024-01-16 11:00',
    contactCount: 20,
    creditAmount: '1.2亿',
    existingProducts: ['流动资金贷款', '设备融资租赁', '票据池'],
    tags: ['战略客户', '政策支持', '快速增长']
  },
  {
    id: '6',
    companyName: '深圳华创电子有限公司',
    industry: '电子信息',
    registeredCapital: '3000万',
    establishedYear: 2016,
    legalRepresentative: '林志强',
    contactPerson: '吴敏',
    contactPhone: '134****7890',
    address: '广东省深圳市南山区科技园南区',
    status: 'pending',
    riskLevel: 'medium',
    lastContactTime: '2024-01-08 15:20',
    contactCount: 5,
    creditAmount: '1500万',
    existingProducts: ['企业网银'],
    tags: ['芯片产业链', '有融资需求', '首贷户']
  }
];

// 模拟客户详情画像数据
export const mockCustomerProfile: CustomerProfile = {
  internalInfo: {
    accountOpenDate: '2015-06-18',
    mainAccount: '6225 **** **** 8888',
    averageBalance: '2,850万',
    depositAmount: '4,200万',
    loanBalance: '1,800万',
    creditUsageRate: 72,
    overdueCount: 0,
    relationshipManager: '李世伟'
  },
  externalData: {
    creditScore: 82,
    taxRating: 'A级',
    socialSecurityCount: 156,
    patents: 23,
    certifications: ['高新技术企业', 'ISO9001', '软件企业认定', '专精特新']
  },
  transactionAnalysis: {
    monthlyInflow: '1,250万',
    monthlyOutflow: '980万',
    mainCustomers: ['阿里巴巴', '华为技术', '中兴通讯', '字节跳动'],
    mainSuppliers: ['台积电代理商', '京东方', '立讯精密'],
    seasonalPattern: 'Q4为业务高峰，12月回款集中',
    concentrationRisk: '前5大客户占比62%，集中度中等'
  },
  billDetails: {
    acceptanceAmount: '3,500万',
    discountAmount: '1,200万',
    billCount: 45,
    averageTerm: '90天',
    mainCounterparties: ['华为技术', '中兴通讯', '小米科技']
  },
  graphInfo: {
    shareholders: [
      { name: '张建国', ratio: '45%' },
      { name: '李明', ratio: '30%' },
      { name: '深圳创投基金', ratio: '15%' },
      { name: '员工持股平台', ratio: '10%' }
    ],
    subsidiaries: [
      { name: '杭州智联软件有限公司', ratio: '100%' },
      { name: '上海智联信息技术有限公司', ratio: '80%' }
    ],
    relatedParties: [
      { name: '杭州智联投资有限公司', relation: '实控人控制' },
      { name: '张建国', relation: '法定代表人/实控人' }
    ],
    supplyChain: {
      upstream: ['台积电代理商', '京东方', '立讯精密', '蓝思科技'],
      downstream: ['华为技术', '中兴通讯', '小米科技', '阿里云']
    }
  },
  customerJourney: {
    touchpoints: [
      { date: '2024-01-15', channel: '电话', action: '产品介绍', result: '客户表示有兴趣' },
      { date: '2024-01-10', channel: '上门拜访', action: '需求调研', result: '明确扩产融资需求' },
      { date: '2024-01-05', channel: '微信', action: '发送产品资料', result: '已读未回复' },
      { date: '2023-12-28', channel: '电话', action: '年末回访', result: '了解Q1计划' },
      { date: '2023-12-15', channel: '网点', action: '办理业务', result: '开通票据池' }
    ],
    currentStage: '需求确认',
    nextAction: '提交授信申请材料'
  },
  publicPrivateLinkage: {
    relatedIndividuals: [
      { name: '张建国', role: '法定代表人', products: ['私人银行', '信用卡白金卡', '理财'] },
      { name: '李明', role: '股东/总经理', products: ['储蓄卡', '房贷'] },
      { name: '王芳', role: '财务总监', products: ['工资卡', '理财'] }
    ],
    crossSellOpportunities: ['高管家族信托', '员工代发工资', '股权激励托管']
  },
  competitorInfo: {
    otherBankLoans: [
      { bank: '工商银行', amount: '1,000万', rate: '3.85%' },
      { bank: '建设银行', amount: '500万', rate: '4.0%' }
    ],
    totalExternalDebt: '1,500万',
    recentInquiries: 3
  },
  internationalPayments: {
    exportVolume: '800万美元/年',
    importVolume: '500万美元/年',
    mainCountries: ['美国', '德国', '日本', '韩国'],
    fxExposure: '美元敞口约300万',
    tradeFinanceUsage: '信用证使用率40%'
  }
};

// 模拟产品推荐
export const mockProductRecommendations: ProductRecommendation[] = [
  {
    id: '1',
    category: 'loan',
    name: '科创企业信用贷',
    description: '面向高新技术企业的纯信用贷款产品，无需抵押担保',
    amount: '500-3000万',
    rate: '3.45%起',
    term: '1-3年',
    matchScore: 95,
    reasons: [
      '企业为高新技术企业，符合产品准入条件',
      '近3年税务评级均为A级',
      '专利数量23项，研发实力强'
    ],
    highlights: ['审批快速', '利率优惠', '循环使用']
  },
  {
    id: '2',
    category: 'loan',
    name: '供应链融资',
    description: '基于核心企业信用的应收账款融资',
    amount: '100-2000万',
    rate: '3.65%起',
    term: '90-180天',
    matchScore: 88,
    reasons: [
      '下游客户包含华为、中兴等优质核心企业',
      '应收账款周转健康',
      '可降低融资成本约0.5%'
    ],
    highlights: ['依托核心企业信用', '放款快', '随借随还']
  },
  {
    id: '3',
    category: 'bill',
    name: '票据池业务',
    description: '票据归集管理，提供质押融资和票据托收服务',
    amount: '按票据金额',
    rate: '质押率90%',
    matchScore: 92,
    reasons: [
      '企业票据业务活跃，月均45笔',
      '可有效盘活票据资产',
      '提升资金使用效率'
    ],
    highlights: ['统一管理', '灵活质押', '到期自动托收']
  },
  {
    id: '4',
    category: 'international',
    name: '跨境人民币结算',
    description: '提供进出口人民币结算服务，规避汇率风险',
    amount: '按贸易金额',
    matchScore: 85,
    reasons: [
      '企业年进出口额超1300万美元',
      '美元敞口300万，存在汇率风险',
      '人民币结算可降低汇兑成本'
    ],
    highlights: ['规避汇率风险', '结算便利', '政策支持']
  },
  {
    id: '5',
    category: 'international',
    name: '出口信用保险融资',
    description: '基于出口信用保险保单的贸易融资产品',
    amount: '保单金额的80%',
    rate: '3.8%起',
    term: '90天',
    matchScore: 78,
    reasons: [
      '出口业务占比较大',
      '可有效转移海外买家信用风险',
      '加速回款周期'
    ],
    highlights: ['风险转移', '加速回款', '拓展海外市场']
  },
  {
    id: '6',
    category: 'settlement',
    name: '企业现金管理',
    description: '资金归集、自动理财、收付款一体化管理',
    amount: '不限',
    matchScore: 82,
    reasons: [
      '企业有2家子公司，适合资金归集',
      '日均余额2850万，可提升收益',
      '优化财务管理效率'
    ],
    highlights: ['自动归集', '智能理财', '收付一体']
  },
  {
    id: '7',
    category: 'wealth',
    name: '员工福利代发',
    description: '工资代发+员工福利+消费金融一体化方案',
    amount: '按员工数量',
    matchScore: 75,
    reasons: [
      '企业员工156人，代发潜力大',
      '可绑定员工消费金融产品',
      '提升员工粘性和企业合作深度'
    ],
    highlights: ['批量开户', '薪资理财', '员工贷款']
  }
];

// 模拟行动手册
export const mockActionHandbook: ActionHandbook = {
  summary: '杭州智联科技是一家优质的高新技术企业客户，当前处于需求确认阶段。企业有明确的扩产融资需求（约2000万），同时在票据、国际业务方面存在交叉销售机会。建议近期重点推进科创信用贷申请，同步挖掘票据池和跨境结算需求。',
  keyInsights: [
    '企业Q4业绩高峰刚过，Q1有设备采购和扩产计划，融资需求紧迫',
    '法人张建国已是私人银行客户，关系良好，可通过公私联动推进',
    '竞争对手工行、建行已有授信，我行需要在利率和服务上形成差异化',
    '企业票据业务活跃但分散，票据池业务是明确的增量机会'
  ],
  recommendedStrategy: '以科创企业信用贷为主打产品切入，利率可在3.45%基础上适当优惠；同步推进票据池业务整合其票据资产；中期挖掘跨境人民币结算需求，形成综合服务方案锁定客户。',
  tasks: [
    {
      id: '1',
      title: '电话确认融资需求细节',
      description: '与财务总监王芳电话沟通，确认扩产融资的具体金额、期限、用途，了解设备采购时间节点',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-17',
      category: 'contact',
      aiExecutable: true,
      suggestedScript: '王总您好，我是中银的李世伟。上次拜访了解到贵司Q1有扩产计划，想跟您确认一下具体的资金需求情况。方便的话，能否告知预计需要多少资金、什么时候需要到位？我们好提前准备授信方案。'
    },
    {
      id: '2',
      title: '准备科创贷产品方案',
      description: '根据企业情况定制科创企业信用贷方案，包括额度、利率、期限建议，准备初步授信测算',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-18',
      category: 'document',
      aiExecutable: false
    },
    {
      id: '3',
      title: '收集授信申请材料',
      description: '向企业索取最新财务报表、审计报告、纳税证明、专利证书等授信申请所需材料',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-19',
      category: 'document',
      aiExecutable: true,
      suggestedScript: '王总，为加快授信审批进度，需要贵司提供以下材料：1）2023年度财务报表及审计报告；2）近12个月纳税申报表；3）高新技术企业证书；4）主要专利证书复印件。材料齐全后我们可以在一周内完成审批。'
    },
    {
      id: '4',
      title: '安排上门拜访',
      description: '与法人张建国预约上门拜访，介绍综合金融服务方案，增进高层关系',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-22',
      category: 'visit',
      aiExecutable: true,
      suggestedScript: '张总您好，我是中银的李世伟。针对贵司的融资需求，我们准备了一套综合金融服务方案，包括信贷、票据、国际业务等，想当面向您汇报。请问您这周哪天方便？我带着方案上门拜访。'
    },
    {
      id: '5',
      title: '推进票据池业务',
      description: '向企业介绍票据池业务优势，争取将分散的票据归集到我行管理',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-25',
      category: 'follow_up',
      aiExecutable: false
    },
    {
      id: '6',
      title: '发送员工代发方案',
      description: '准备员工工资代发方案，发送给HR负责人，挖掘批量获客机会',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-01-30',
      category: 'follow_up',
      aiExecutable: true,
      suggestedScript: '您好，针对贵司156名员工，我行可提供一站式薪资代发服务，包括：批量开户绿色通道、工资理财自动转存、员工消费贷优惠等。附件是详细方案，期待与贵司合作。'
    },
    {
      id: '7',
      title: '提交授信审批',
      description: '整理完整授信材料，提交分行审批，跟进审批进度',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-02-01',
      category: 'approval',
      aiExecutable: false
    }
  ],
  timeline: [
    {
      phase: '第1周：需求确认',
      actions: ['电话确认融资需求', '收集基础材料', '准备初步方案']
    },
    {
      phase: '第2周：方案呈现',
      actions: ['上门拜访高层', '呈现综合方案', '获取材料清单']
    },
    {
      phase: '第3周：授信推进',
      actions: ['完成材料收集', '提交授信审批', '推进票据池签约']
    },
    {
      phase: '第4周：落地执行',
      actions: ['授信审批通过', '签署合同', '首笔放款', '启动交叉销售']
    }
  ]
};
