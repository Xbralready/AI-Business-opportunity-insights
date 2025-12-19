// 类型定义
export type CustomerType = 'corporate' | 'retail' | 'individual';

export type CorporateCustomer = {
  id: string;
  customerType: CustomerType;
  companyName: string;
  industry: string;
  registeredCapital: string;
  establishedYear: number;
  legalRepresentative: string;
  contactPerson: string;
  contactPhone: string;
  address: string;
  status: 'pending' | 'following' | 'applying' | 'disbursed';
  riskLevel: 'low' | 'medium' | 'high';
  lastContactTime: string;
  contactCount: number;
  creditAmount: string;
  existingProducts: string[];
  tags: string[];
  // 对公客户特有字段
  customerLevel?: '战略客户' | '核心客户' | '有效客户';
  customerStar?: string[];
  // AI 核心洞察
  aiInsight?: string;
  // 客户需求标签
  needTags?: string[];
  // 零售客户特有字段
  retailLevel?: '飞燕' | '小燕' | '银' | '金' | '私行' | '钻石';
  // 个体户特有字段
  merchantName?: string;
}

// 新的客户画像结构 - 按业务逻辑重组为5个主题模块
export type CustomerProfile = {
  // AI 价值速览
  aiSummary: {
    score: number;
    level: '优质' | '良好' | '关注';
    creditLevel: string;
    riskLevel: '低风险' | '中风险' | '高风险';
    oneLiner: string;
    coreTags: string[];
    // 七维度评分
    dimensionScores: {
      businessFundamentals: number;      // 企业基本面
      operationAndIndustry: number;      // 经营与行业
      financialStatements: number;       // 财务三表
      debtAndCredit: number;             // 债务与授信
      transactionAndFunds: number;       // 交易与资金流
      decisionChain: number;             // 决策链
      riskCompliance: number;            // 风险合规
    };
  };

  // 模块1: 企业基本面 - 整合行内客户概览 + 外部数据
  businessFundamentals: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
    // 基础信息
    basicInfo: {
      customerId: string;
      unifiedId: string;
      registeredCapital: string;
      paidInCapital: string;
      establishedDate: string;
      registrationAuthority: string;
      businessScope: string;
      operatingStatus: string;
      employeeCount: number;
      address: string;
    };
    // 资质认证
    certifications: string[];
    taxRating: string;
    creditScore: number;
    patents: number;
    // 管理层
    management: { name: string; position: string }[];
    // 股东信息
    shareholders: { name: string; ratio: string; type: string }[];
    // 分支机构
    branches: { name: string; code: string }[];
    // 对外投资
    investments: { company: string; capital: string; ratio: string }[];
    // 企业变更
    changes: { date: string; item: string; before: string; after: string }[];
    // 被执行信息
    executions: { caseNo: string; court: string; amount: string; date: string }[];
  };

  // AI画像模块2: 经营与行业
  operationAndIndustry: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
  };

  // AI画像模块3: 财务三表与质量
  financialStatements: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
  };

  // AI画像模块4: 债务与授信全景
  debtAndCredit: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
  };

  // AI画像模块5: 交易与资金流画像
  transactionAndFunds: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
  };

  // AI画像模块6: 决策链与流程
  decisionChain: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
  };

  // AI画像模块7: 风险合规
  riskCompliance: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
  };

  // 详情页数据模块: 经营与资金 - 整合流水分析 + 票据明细 + 国际收支
  operationAndFunds: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
    // 资产融资概况
    assetSummary: {
      totalAssets: string;
      dailyAvgAssets: string;
      onBalanceLoan: string;
      onBalanceLoanAvg: string;
      offBalanceLoan: string;
      offBalanceLoanAvg: string;
    };
    // 流水分析
    cashFlow: {
      monthlyInflow: string;
      monthlyOutflow: string;
      inflowYoY: string;
      outflowYoY: string;
      seasonalPattern: string;
      concentrationRisk: string;
    };
    // 流入流出Top10
    topCounterparties: {
      inflow: { rank: number; bankName: string; name: string; amount: string; count: number; isOurCustomer: boolean }[];
      outflow: { rank: number; bankName: string; name: string; amount: string; count: number; isOurCustomer: boolean }[];
    };
    // 同名转账
    sameNameTransfers: { date: string; bankName: string; name: string; amount: string; direction: 'in' | 'out' }[];
    // 票据明细
    billDetails: {
      receiveBills: { counterparty: string; bankName: string; amount: string; region: string; isOurCustomer: boolean }[];
      payBills: { counterparty: string; bankName: string; amount: string; region: string; isOurCustomer: boolean }[];
      acceptance: { counterparty: string; bankName: string; amount: string; region: string; isOurCustomer: boolean }[];
      discount: { counterparty: string; bankName: string; amount: string; region: string; isOurCustomer: boolean }[];
      billSummary: {
        silverBillCount: number;
        silverBillAmount: string;
        commercialBillCount: number;
        commercialBillAmount: string;
      };
    };
    // 国际收支
    internationalPayments: {
      historyData: { year: string; fxTotal: string; ourSettlement: string; ourRatio: string }[];
      currentYear: { fxTotal: string; ourSettlement: string; ourRatio: string };
      thisYearSettlement: string;
      lastYearSettlement: string;
      yoyGrowth: string;
    };
    // 贴现量
    discountVolume: {
      thisYear: string;
      lastYear: string;
      yoyGrowth: string;
    };
  };

  // 详情页数据模块: 合作与贡献 - 整合持有产品 + 客户贡献度 + 客户旅程
  cooperationAndContribution: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
    // 客户等级
    customerLevel: string;
    customerStar: string[];
    // 开户信息
    accountInfo: {
      openDate: string;
      mainAccount: string;
      relationshipManager: string;
      belongBranch: string;
    };
    // 持有产品
    products: {
      deposit: string[];
      loan: string[];
      bill: string[];
      international: string[];
      investment: string[];
      signed: string[];
    };
    // 签约产品
    signedServices: string[];
    // 客户贡献度
    contribution: {
      depositFTP: string;
      loanFTP: string;
      depositAvg: string;
      loanAvg: string;
      depositInterestRate: string;
      loanInterestRate: string;
      comprehensiveContribution: string;
      annualizedIncome: string;
      loanEquityPer10k: string;
      discountFTP: string;
    };
    // 历史营收
    historyRevenue: { year: string; depositFTP: string; loanFTP: string }[];
    // 客户旅程
    journey: {
      touchpoints: { date: string; activity: string; description: string; type: string; creator: string; branch: string }[];
      currentStage: string;
      nextAction: string;
    };
  };

  // 详情页数据模块: 关系图谱 - 整合图谱信息 + 公私联动
  relationshipGraph: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
    // 关系链类型
    relationTypes: ('交易链' | '担保链' | '票据链')[];
    // 关联企业
    relatedCompanies: { name: string; relation: string; riskLevel?: string }[];
    // 供应链
    supplyChain: { upstream: string[]; downstream: string[] };
    // 关联圈授用信
    groupCredit: {
      entities: { name: string; isCore: boolean; totalCredit: string; normalCredit: string; normalUsed: string; lowRiskCredit: string; lowRiskUsed: string }[];
    };
    // 公私联动 - 企业关键联系人
    keyContacts: {
      name: string;
      role: string;
      // 零售客户视图
      retailView: {
        debitWithdrawFreq: string;
        debitIncomeLevel: string;
        isFrequentCustomer: boolean;
        lastLargeTransferDays: number;
        recentWealthPurchase: string;
        preferredChannel: string;
        customTags: string[];
        aum: string;
        lum: string;
        details: {
          fixedDeposit: string;
          currentDeposit: string;
          wealth: string;
          dailyProfit: string;
          preciousMetal: string;
          insurance: string;
          mortgage: string;
          consumptionLoan: string;
          businessLoan: string;
          payrollFromUs: boolean;
        };
      };
    }[];
    // 交叉销售机会
    crossSellOpportunities: string[];
  };

  // 详情页数据模块: 竞争情报 - 整合他行情报
  competitiveIntelligence: {
    aiInsight: string;
    aiDetails: {
      positive: string[];
      negative: string[];
      actions: string[];
    };
    // 他行业务
    otherBankBusiness: {
      bankName: string;
      businessType: '贷款' | '理财' | '保险';
      productName: string;
      amount: string;
      maturityDate: string;
      rate: string;
      remark: string;
    }[];
    // 汇总
    summary: {
      totalExternalDebt: string;
      recentInquiries: number;
      ourMarketShare: string;
    };
    // 竞争策略建议
    strategyAdvice: string[];
  };
}

export type ProductRecommendation = {
  id: string;
  category: 'deposit' | 'loan' | 'settlement';
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

// 模拟客户列表（对公、零售、个体户）
export const mockCustomers: CorporateCustomer[] = [
  // 对公客户
  {
    id: '1',
    customerType: 'corporate',
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
    tags: ['高新技术企业', '优质客户', '有扩产需求'],
    customerLevel: '战略客户',
    customerStar: ['存款', '贷款', '国结'],
    aiInsight: '优质高新技术企业，经营稳健，有明确扩产融资需求约2000万，票据业务活跃，公私联动潜力大',
    needTags: ['流动资金周转', '设备采购', '票据贴现']
  },
  {
    id: '2',
    customerType: 'corporate',
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
    tags: ['出口大户', '多币种需求', '供应链核心'],
    customerLevel: '核心客户',
    customerStar: ['国结', '贴现'],
    aiInsight: '国际贸易核心企业，外汇结算量大，年进出口额超1.2亿，有信用证和贸易融资需求，汇率风险管理意识强',
    needTags: ['国际信用证', '外汇避险', '贸易融资']
  },
  {
    id: '3',
    customerType: 'corporate',
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
    tags: ['专精特新', '设备更新需求', '政府补贴'],
    customerLevel: '有效客户',
    customerStar: ['存款'],
    aiInsight: '专精特新制造企业，设备更新需求明确，有政府补贴支持，首贷潜力客户，建议优先开发设备融资租赁业务',
    needTags: ['设备更新', '首贷需求', '政府补贴']
  },
  {
    id: '4',
    customerType: 'corporate',
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
    tags: ['重点监控', '现金流紧张', '项目延期'],
    customerLevel: '核心客户',
    customerStar: ['贷款'],
    aiInsight: '房地产行业客户，现金流承压明显，项目存在延期风险，需重点关注还款来源和项目进度，建议加强贷后管理',
    needTags: ['项目续建', '现金流周转', '还款管理']
  },
  {
    id: '5',
    customerType: 'corporate',
    companyName: '广州新能源汽车科技有限公司',
    industry: '新能源汽车',
    registeredCapital: '1.5亿',
    establishedYear: 2018,
    legalRepresentative: '马云飞',
    contactPerson: '黄伟',
    contactPhone: '135****4321',
    address: '广东省广州市南沙区港前大道南168号',
    status: 'disbursed',
    riskLevel: 'low',
    lastContactTime: '2024-01-16 11:00',
    contactCount: 20,
    creditAmount: '1.2亿',
    existingProducts: ['流动资金贷款', '设备融资租赁', '票据池'],
    tags: ['战略客户', '政策支持', '快速增长'],
    customerLevel: '战略客户',
    customerStar: ['存款', '贷款', '贴现', '代发工资'],
    aiInsight: '战略级新能源车企，政策支持力度大，产能扩张迅速，资金需求旺盛，票据业务活跃，综合贡献度高',
    needTags: ['产能扩张', '供应链融资', '绿色金融']
  },
  {
    id: '6',
    customerType: 'corporate',
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
    tags: ['芯片产业链', '有融资需求', '首贷户'],
    customerLevel: '有效客户',
    customerStar: [],
    aiInsight: '芯片产业链企业，有首贷融资需求，流水表现良好，处于快速发展期，可重点开发为潜力客户',
    needTags: ['首贷需求', '研发投入', '供应商付款']
  },
  // 零售客户
  {
    id: '7',
    customerType: 'retail',
    companyName: '王志远',
    industry: '个人客户',
    registeredCapital: '-',
    establishedYear: 1985,
    legalRepresentative: '王志远',
    contactPerson: '王志远',
    contactPhone: '139****1234',
    address: '浙江省杭州市滨江区江南大道288号',
    status: 'following',
    riskLevel: 'low',
    lastContactTime: '2024-01-18 10:30',
    contactCount: 6,
    creditAmount: '500万',
    existingProducts: ['私人银行', '理财产品', '信用卡白金卡'],
    tags: ['高净值客户', '企业主', '理财偏好稳健'],
    retailLevel: '私行',
    aiInsight: '私行级高净值客户，同时为企业主身份，AUM稳定增长，偏好稳健理财产品，有家族信托和财富传承需求',
    needTags: ['财富管理', '家族信托', '企业投融资']
  },
  // 个体户
  {
    id: '8',
    customerType: 'individual',
    companyName: '杭州鑫源五金建材商行',
    merchantName: '杭州鑫源五金建材商行',
    industry: '批发零售',
    registeredCapital: '50万',
    establishedYear: 2019,
    legalRepresentative: '陈大明',
    contactPerson: '陈大明',
    contactPhone: '136****5678',
    address: '浙江省杭州市余杭区良渚街道勾庄路156号',
    status: 'disbursed',
    riskLevel: 'low',
    lastContactTime: '2024-01-17 14:00',
    contactCount: 4,
    creditAmount: '100万',
    existingProducts: ['经营贷', '收款码'],
    tags: ['经营稳定', '流水良好', '有增贷需求'],
    aiInsight: '经营稳定的五金建材商户，流水表现良好，有增贷扩店需求，POS收款活跃，适合推介小微经营贷产品',
    needTags: ['增贷需求', '门店扩张', '流动资金']
  }
];

// 模拟客户详情画像数据 - 新的5个主题模块结构
export const mockCustomerProfile: CustomerProfile = {
  // AI 价值速览
  aiSummary: {
    score: 87,
    level: '优质',
    creditLevel: 'AA',
    riskLevel: '低风险',
    oneLiner: '优质高新技术企业，经营稳健，有明确扩产融资需求约2000万，票据业务活跃，公私联动潜力大，建议优先推进科创信用贷。',
    coreTags: ['高新技术企业', 'A级纳税', '有融资需求', '票据活跃', '公私联动潜力'],
    // 七维度评分（满分100）
    dimensionScores: {
      businessFundamentals: 80,    // 企业基本面
      operationAndIndustry: 70,    // 经营与行业
      financialStatements: 70,     // 财务三表
      debtAndCredit: 60,           // 债务与授信
      transactionAndFunds: 60,     // 交易与资金流
      decisionChain: 60,           // 决策链
      riskCompliance: 70           // 风险合规
    }
  },

  // 模块1: 企业基本面（工商/股权/集团/关联/资质）
  businessFundamentals: {
    aiInsight: '基本面"可授信底座"扎实，但关联交易需要用证据把闭环做硬。',
    aiDetails: {
      positive: [
        '实控人清晰、股权结构可穿透，集团架构明确（研发/制造/售后分工清楚）',
        '资质体系完善（高新、专精特新、ISO等），经营范围与业务匹配'
      ],
      negative: [
        '存在一定比例关联交易（通过贸易公司承接部分采购/转售），若闭环不清晰易被质疑真实性或合规性'
      ],
      actions: [
        '拉齐集团穿透与受益所有人链条；形成"关联方清单"',
        '对关联交易做"三流一致"核验：合同/发票/物流与资金流对应；确认定价公允与商业合理性',
        '资质证照有效期与经营地点一致性复核'
      ]
    },
    basicInfo: {
      customerId: '2002832998585',
      unifiedId: '91330106MA2AXXX',
      registeredCapital: '5000万',
      paidInCapital: '5000万',
      establishedDate: '2015-06-18',
      registrationAuthority: '杭州市市场监督管理局',
      businessScope: '软件开发、信息技术服务、电子产品销售',
      operatingStatus: '存续',
      employeeCount: 156,
      address: '浙江省杭州市西湖区文三路123号'
    },
    certifications: ['高新技术企业', 'ISO9001', '软件企业认定', '专精特新'],
    taxRating: 'A级',
    creditScore: 82,
    patents: 23,
    management: [
      { name: '张建国', position: '董事长/总经理' },
      { name: '李明', position: '副总经理' },
      { name: '王芳', position: '财务总监' }
    ],
    shareholders: [
      { name: '张建国', ratio: '45%', type: '自然人' },
      { name: '李明', ratio: '30%', type: '自然人' },
      { name: '深圳创投基金', ratio: '15%', type: '企业法人' },
      { name: '员工持股平台', ratio: '10%', type: '有限合伙' }
    ],
    branches: [
      { name: '杭州智联软件有限公司', code: '91330106MA2BXXX' },
      { name: '上海智联信息技术有限公司', code: '91310115MA1KXXX' }
    ],
    investments: [
      { company: '杭州智联软件有限公司', capital: '1000万', ratio: '100%' },
      { company: '上海智联信息技术有限公司', capital: '500万', ratio: '80%' }
    ],
    changes: [
      { date: '2023-08-15', item: '注册资本变更', before: '3000万', after: '5000万' },
      { date: '2022-03-20', item: '经营范围变更', before: '软件开发', after: '软件开发、信息技术服务' }
    ],
    executions: []
  },

  // 模块2: 经营与行业（主营/竞争力/上下游/集中度/景气/政策）
  operationAndIndustry: {
    aiInsight: '生意方向对、订单能力强，但高度依赖大客户，必须围绕回款节点设计方案。',
    aiDetails: {
      positive: [
        '处在新能源装备赛道，订单获取能力强，客户粘性来自联合开发与交付能力',
        '上下游结构明确，项目制模式成熟，淡旺季规律可预判'
      ],
      negative: [
        '客户集中度偏高（头部客户占比大），一旦验收推迟或压账期，现金流会被"单点打穿"',
        '行业内卷加剧，议价压力增大，毛利存在下行风险'
      ],
      actions: [
        '对最大客户做"稳定性体检"：框架协议、项目排期、替换风险、历史回款纪律',
        '拆解订单到回款的关键节点（交付/验收/开票/付款条件），锁定最脆弱的环节',
        '给出"以回款为中心"的融资方案（周转+应收工具组合），而非单点贷款'
      ]
    }
  },

  // 模块3: 财务三表与质量（收入/利润/结构/现金流/周转/审计税票）
  financialStatements: {
    aiInsight: '报表质量不错，但现金流与应收质量决定授信边界与产品组合。',
    aiDetails: {
      positive: [
        '审计意见干净、纳税与开票匹配度高，财务可信度较好',
        '盈利水平符合项目制企业特征，资产负债结构可解释'
      ],
      negative: [
        '经营现金流波动大，Q4应收上升带来阶段性现金流转负',
        '应收账款周转偏慢且对大客户集中，回款不确定性被放大',
        '在制品/存货占比高（项目制常见），存在跌价与验收不及预期风险'
      ],
      actions: [
        '抽样核验大额应收（合同、验收、回款记录），把"可回款性"做实',
        '设定还款路径与回款绑定（回款归集/回款专户/还款触发）',
        '授信结构上"短周转 + 应收类工具"并行，避免用长期资金硬扛账期'
      ]
    }
  },

  // 模块4: 债务与授信全景（合作行/额度已用/到期/担保圈/表外或有）
  debtAndCredit: {
    aiInsight: '债务可管理，但到期集中与或有负债决定风控强度与授信节奏。',
    aiDetails: {
      positive: [
        '多家银行合作、授信框架成熟，融资需求客观存在且具持续性',
        '流贷、票据、保函等工具使用合理，说明财务有工具化管理能力'
      ],
      negative: [
        '一年内到期集中，存在再融资压力（容易被动续贷、议价能力弱）',
        '对外担保与较高保函余额属于或有负债，极端情况下会"从表外打到表内"'
      ],
      actions: [
        '做"到期结构表 + 还款计划表"，把集中到期拆散或前置安排',
        '输出"或有负债清单"，对对外担保设置信息披露与触发条款',
        '审核保函条款风险（是否见索即付、索赔条件、有效期），必要时做条款优化'
      ]
    }
  },

  // 模块5: 交易与资金流画像（收付款/对手方/账期/渠道/账户分布）
  transactionAndFunds: {
    aiInsight: '资金流是"钱包入口"，规模够大但割裂明显，必须把闭环拉回来才算真正合作。',
    aiDetails: {
      positive: [
        '收付款规模大且规律性强，具备做现金管理、归集、直连的基础',
        '付款分散、收款集中，适合用产品提升对账效率和资金周转'
      ],
      negative: [
        '"回款在A行、付款在B行"导致资金割裂，主办行沉淀弱；对银行而言综合贡献不稳定',
        '账户分散带来客户内部对账成本与资金闲置成本'
      ],
      actions: [
        '以"效率提升"为抓手推动结算归集：回款优先入主账户、关键供应商付款集中化',
        '推银企直连/自动对账，先做最小闭环试点（减少改造阻力）',
        '将授信条件与结算合作挂钩（合理的归集/交易量承诺）'
      ]
    }
  },

  // 模块6: 决策链与流程（CEO/CFO/法务/采购建联）
  decisionChain: {
    aiInsight: '能否成交取决于是否进入决策闭环；关键不是讲方案，而是把关键人同时拉到桌面。',
    aiDetails: {
      positive: [
        '决策角色分工清晰：业务看交付，财务看现金流与成本，法务看条款风险，采购看付款效率',
        '流程成熟，具备推动综合方案落地的组织基础'
      ],
      negative: [
        '若仅停留在业务端，无法进入CFO与法务的决策闭环，容易"反复拉扯、周期拖长、方案夭折"'
      ],
      actions: [
        '组织"三方会"：业务+财务+法务同时在场，把现金流、条款、系统一次讲透',
        '把沟通从"价格"升级为"现金流可控 + 条款可控 + 流程可控"',
        '明确里程碑：材料清单、方案确认、审批节点、上线节点'
      ]
    }
  },

  // 模块7: 风险合规（诉讼执行/失信限高/环保安监/AML/受益所有人/关联异常）
  riskCompliance: {
    aiInsight: '合规底线基本过关，小额诉讼与环保记录属于"可管理风险"，但必须材料化、条款化。',
    aiDetails: {
      positive: [
        '无失信、无限高，受益所有人可穿透，反洗钱信息可采集，整体可控',
        '风险事件金额不大，且可通过材料与整改闭环管理'
      ],
      negative: [
        '存在供应商质量纠纷诉讼（虽金额不大但需关注是否反复发生）',
        '曾有环保处罚记录（需确认是否彻底整改、是否存在再次触发概率）'
      ],
      actions: [
        '获取诉讼材料与进展，评估是否可能引发执行/冻结风险',
        '获取环保整改证明与复查记录；将"再发生"作为贷后关注点',
        '在授信条款中设置风险触发与信息披露义务（可管理而非一票否决）'
      ]
    }
  },

  // 详情页数据: 经营与资金
  operationAndFunds: {
    aiInsight: '资金流稳健，月均净流入270万，Q4为回款高峰；票据业务活跃（月均45笔）但分散多行，归集潜力大；国际业务占比15%，有汇率风险敞口。',
    aiDetails: {
      positive: [
        '月均净流入270万，资金流向健康稳定',
        'Q4为回款高峰期，现金流预期良好',
        '票据业务活跃，月均45笔，票据管理能力强',
        '日均存款余额稳定增长，客户黏性高'
      ],
      negative: [
        '票据分散多家银行，归集我行比例偏低（约30%）',
        '国际业务美元敞口300万，存在汇率波动风险',
        '应收账款周转周期较长，约45天'
      ],
      actions: [
        '推介票据池业务，将分散票据归集至我行管理',
        '建议配置远期结售汇锁定汇率，降低美元敞口风险',
        '关注Q4回款节点，适时推介短期理财产品'
      ]
    },
    assetSummary: {
      totalAssets: '22,222.22万',
      dailyAvgAssets: '1,111.11万',
      onBalanceLoan: '1,800万',
      onBalanceLoanAvg: '1,650万',
      offBalanceLoan: '500万',
      offBalanceLoanAvg: '480万'
    },
    cashFlow: {
      monthlyInflow: '1,250万',
      monthlyOutflow: '980万',
      inflowYoY: '+12%',
      outflowYoY: '+8%',
      seasonalPattern: 'Q4为业务高峰，12月回款集中',
      concentrationRisk: '前5大客户占比62%，集中度中等'
    },
    topCounterparties: {
      inflow: [
        { rank: 1, bankName: '工商银行', name: '华为技术有限公司', amount: '320万', count: 15, isOurCustomer: false },
        { rank: 2, bankName: '建设银行', name: '阿里巴巴网络技术', amount: '280万', count: 12, isOurCustomer: false },
        { rank: 3, bankName: '我行', name: '中兴通讯股份有限公司', amount: '210万', count: 8, isOurCustomer: true },
        { rank: 4, bankName: '招商银行', name: '字节跳动有限公司', amount: '180万', count: 6, isOurCustomer: false },
        { rank: 5, bankName: '我行', name: '小米科技有限公司', amount: '150万', count: 5, isOurCustomer: true }
      ],
      outflow: [
        { rank: 1, bankName: '中国银行', name: '台积电代理商', amount: '280万', count: 10, isOurCustomer: false },
        { rank: 2, bankName: '工商银行', name: '京东方科技集团', amount: '220万', count: 8, isOurCustomer: false },
        { rank: 3, bankName: '我行', name: '立讯精密工业', amount: '180万', count: 6, isOurCustomer: true },
        { rank: 4, bankName: '建设银行', name: '蓝思科技股份', amount: '120万', count: 5, isOurCustomer: false },
        { rank: 5, bankName: '农业银行', name: '欣旺达电子', amount: '90万', count: 4, isOurCustomer: false }
      ]
    },
    sameNameTransfers: [
      { date: '2024-01-10', bankName: '工商银行', name: '杭州智联科技有限公司', amount: '500万', direction: 'out' },
      { date: '2024-01-05', bankName: '建设银行', name: '杭州智联科技有限公司', amount: '300万', direction: 'in' }
    ],
    billDetails: {
      receiveBills: [
        { counterparty: '华为技术', bankName: '工商银行', amount: '500万', region: '广东深圳', isOurCustomer: false },
        { counterparty: '中兴通讯', bankName: '我行', amount: '380万', region: '广东深圳', isOurCustomer: true },
        { counterparty: '小米科技', bankName: '建设银行', amount: '320万', region: '北京', isOurCustomer: false }
      ],
      payBills: [
        { counterparty: '京东方', bankName: '工商银行', amount: '420万', region: '北京', isOurCustomer: false },
        { counterparty: '立讯精密', bankName: '我行', amount: '280万', region: '广东东莞', isOurCustomer: true }
      ],
      acceptance: [
        { counterparty: '华为技术', bankName: '工商银行', amount: '600万', region: '广东深圳', isOurCustomer: false },
        { counterparty: '阿里云', bankName: '我行', amount: '400万', region: '浙江杭州', isOurCustomer: true }
      ],
      discount: [
        { counterparty: '中兴通讯', bankName: '我行', amount: '350万', region: '广东深圳', isOurCustomer: true }
      ],
      billSummary: {
        silverBillCount: 35,
        silverBillAmount: '2,800万',
        commercialBillCount: 10,
        commercialBillAmount: '700万'
      }
    },
    internationalPayments: {
      historyData: [
        { year: '2023', fxTotal: '1,300万美元', ourSettlement: '520万美元', ourRatio: '40%' },
        { year: '2022', fxTotal: '1,100万美元', ourSettlement: '385万美元', ourRatio: '35%' }
      ],
      currentYear: { fxTotal: '1,500万美元', ourSettlement: '675万美元', ourRatio: '45%' },
      thisYearSettlement: '675万美元',
      lastYearSettlement: '520万美元',
      yoyGrowth: '+29.8%'
    },
    discountVolume: {
      thisYear: '1,200万',
      lastYear: '980万',
      yoyGrowth: '+22.4%'
    }
  },

  // 详情页数据: 合作与贡献
  cooperationAndContribution: {
    aiInsight: '合作9年的老客户，产品渗透度较高，存贷款综合贡献度良好，但国际结算和票据业务我行占比偏低，有提升空间。',
    aiDetails: {
      positive: [
        '合作9年老客户，客户关系深厚稳定',
        '综合贡献度246万/年，排名支行前20%',
        '产品渗透度高，已签约7项核心服务',
        '存款日均余额2,850万，贡献FTP收益156.8万'
      ],
      negative: [
        '国际结算业务我行占比仅35%，大部分在工行办理',
        '票据业务分散，我行仅占30%市场份额',
        '理财产品配置为空，AUM贡献偏低'
      ],
      actions: [
        '推介跨境人民币结算，提升国际业务占比至50%+',
        '洽谈票据归集方案，争取票据业务主办行地位',
        '针对企业闲置资金，推介稳健型企业理财产品'
      ]
    },
    customerLevel: '战略客户',
    customerStar: ['存款', '贷款', '国结'],
    accountInfo: {
      openDate: '2015-06-18',
      mainAccount: '6225 **** **** 8888',
      relationshipManager: '李世伟',
      belongBranch: '杭州西湖支行'
    },
    products: {
      deposit: ['活期存款', '定期存款', '协定存款'],
      loan: ['普惠贷款', '流动资金贷款'],
      bill: ['电子票据', '票据池'],
      international: ['国际信用证', '外汇结算'],
      investment: [],
      signed: ['企业网银', '代发工资', '电子票据', '自助回单']
    },
    signedServices: ['电子票据', '定期收费', '企业短信', '自助回单', '代发工资', '网银', '对账单'],
    contribution: {
      depositFTP: '156.8万',
      loanFTP: '89.2万',
      depositAvg: '2,850万',
      loanAvg: '1,650万',
      depositInterestRate: '1.82%',
      loanInterestRate: '3.65%',
      comprehensiveContribution: '246万',
      annualizedIncome: '85万',
      loanEquityPer10k: '52元',
      discountFTP: '18.5万'
    },
    historyRevenue: [
      { year: '2023', depositFTP: '142.5万', loanFTP: '78.6万' },
      { year: '2022', depositFTP: '128.3万', loanFTP: '65.2万' },
      { year: '2021', depositFTP: '115.8万', loanFTP: '58.4万' }
    ],
    journey: {
      touchpoints: [
        { date: '2024-01-15', activity: '电话', description: '产品介绍', type: '主动营销', creator: '李世伟', branch: '西湖支行' },
        { date: '2024-01-10', activity: '上门拜访', description: '需求调研，明确扩产融资需求', type: '客户拜访', creator: '李世伟', branch: '西湖支行' },
        { date: '2024-01-05', activity: '微信', description: '发送产品资料', type: '日常维护', creator: '李世伟', branch: '西湖支行' },
        { date: '2023-12-28', activity: '电话', description: '年末回访，了解Q1计划', type: '例行回访', creator: '李世伟', branch: '西湖支行' },
        { date: '2023-12-15', activity: '网点办理', description: '开通票据池业务', type: '业务办理', creator: '柜员小王', branch: '西湖支行' }
      ],
      currentStage: '需求确认',
      nextAction: '提交授信申请材料'
    }
  },

  // 详情页数据: 关系图谱
  relationshipGraph: {
    aiInsight: '股权结构清晰，实控人张建国为私行客户，公私联动基础好；供应链上下游均有我行客户，可通过供应链金融加深合作。',
    aiDetails: {
      positive: [
        '实控人张建国为我行私行客户，AUM达1,200万',
        '供应链上下游均有我行存量客户，联动基础好',
        '下游客户含华为、中兴等优质核心企业',
        '关联圈授信使用率健康，风险可控'
      ],
      negative: [
        '财务总监王芳非我行客户，代发工资在建行',
        '子公司上海智联仅有少量业务，深度不足'
      ],
      actions: [
        '推动代发工资业务迁移，同步营销财务总监个人业务',
        '依托核心企业华为，拓展供应链融资业务',
        '加强子公司上海智联的业务渗透，实现集团全覆盖',
        '关注实控人私行资产配置需求，提升综合服务'
      ]
    },
    relationTypes: ['交易链', '担保链', '票据链'],
    relatedCompanies: [
      { name: '杭州智联软件有限公司', relation: '全资子公司' },
      { name: '上海智联信息技术有限公司', relation: '控股子公司' },
      { name: '杭州智联投资有限公司', relation: '实控人控制' }
    ],
    supplyChain: {
      upstream: ['台积电代理商', '京东方', '立讯精密', '蓝思科技'],
      downstream: ['华为技术', '中兴通讯', '小米科技', '阿里云']
    },
    groupCredit: {
      entities: [
        { name: '杭州智联科技有限公司', isCore: true, totalCredit: '3000万', normalCredit: '2000万', normalUsed: '1800万', lowRiskCredit: '1000万', lowRiskUsed: '500万' },
        { name: '杭州智联软件有限公司', isCore: false, totalCredit: '500万', normalCredit: '500万', normalUsed: '300万', lowRiskCredit: '0', lowRiskUsed: '0' }
      ]
    },
    keyContacts: [
      {
        name: '张建国',
        role: '法定代表人',
        retailView: {
          debitWithdrawFreq: '低',
          debitIncomeLevel: '高',
          isFrequentCustomer: true,
          lastLargeTransferDays: 7,
          recentWealthPurchase: '150万',
          preferredChannel: '手机银行',
          customTags: ['企业主', '稳健型投资'],
          aum: '1,580万',
          lum: '320万',
          details: {
            fixedDeposit: '500万',
            currentDeposit: '280万',
            wealth: '650万',
            dailyProfit: '150万',
            preciousMetal: '0',
            insurance: '50万',
            mortgage: '320万',
            consumptionLoan: '0',
            businessLoan: '0',
            payrollFromUs: true
          }
        }
      },
      {
        name: '王芳',
        role: '财务总监',
        retailView: {
          debitWithdrawFreq: '中',
          debitIncomeLevel: '中',
          isFrequentCustomer: true,
          lastLargeTransferDays: 15,
          recentWealthPurchase: '30万',
          preferredChannel: '柜面',
          customTags: ['工资卡客户'],
          aum: '85万',
          lum: '0',
          details: {
            fixedDeposit: '30万',
            currentDeposit: '25万',
            wealth: '30万',
            dailyProfit: '0',
            preciousMetal: '0',
            insurance: '0',
            mortgage: '0',
            consumptionLoan: '0',
            businessLoan: '0',
            payrollFromUs: true
          }
        }
      }
    ],
    crossSellOpportunities: ['高管家族信托', '员工代发工资', '股权激励托管', '企业年金']
  },

  // 详情页数据: 竞争情报
  competitiveIntelligence: {
    aiInsight: '他行负债1500万，主要在工行和建行，利率3.85%-4.0%；我行科创贷可提供3.45%优惠利率，有明显价格优势。',
    aiDetails: {
      positive: [
        '我行科创贷利率3.45%，较工行/建行低0.4-0.55个百分点',
        '建行500万信用贷9月到期，存在转换机会',
        '我行市场份额已达55%，具有主办行优势',
        '客户对我行服务满意度高，粘性较强'
      ],
      negative: [
        '工行1000万抵押贷款利率较低，短期难以撬动',
        '招商银行理财200万，客户有资金分散习惯',
        '近期有3次他行贷款查询，关注竞争动态'
      ],
      actions: [
        '建行贷款到期前2个月主动沟通，准备科创贷置换方案',
        '设计"票据池+跨境结算"打包方案，提升综合竞争力',
        '关注工行贷款到期时间，提前准备价格更优的续贷方案',
        '推介我行企业理财产品，争取资金归集'
      ]
    },
    otherBankBusiness: [
      { bankName: '工商银行', businessType: '贷款', productName: '流动资金贷款', amount: '1,000万', maturityDate: '2024-06-30', rate: '3.85%', remark: '抵押贷款' },
      { bankName: '建设银行', businessType: '贷款', productName: '信用贷款', amount: '500万', maturityDate: '2024-09-15', rate: '4.0%', remark: '到期可能转我行' },
      { bankName: '招商银行', businessType: '理财', productName: '日日鑫', amount: '200万', maturityDate: '-', rate: '2.8%', remark: '活期理财' }
    ],
    summary: {
      totalExternalDebt: '1,500万',
      recentInquiries: 3,
      ourMarketShare: '55%'
    },
    strategyAdvice: [
      '工行贷款利率3.85%，我行科创贷可提供3.45%优惠利率，形成价格优势',
      '建行信用贷9月到期，提前2个月介入，争取转我行',
      '通过票据池+跨境结算打包服务，提升综合服务粘性',
      '利用法人私行关系，推动公私联动深度绑定'
    ]
  }
};

// 模拟产品推荐
export const mockProductRecommendations: ProductRecommendation[] = [
  // 存款类产品
  {
    id: '1',
    category: 'deposit',
    name: '协定存款',
    description: '企业活期账户与定期收益相结合，兼顾流动性与收益',
    amount: '100万起',
    rate: '1.15%',
    matchScore: 88,
    reasons: [
      '企业日均余额2850万，适合协定存款',
      '可在保持流动性同时获得更高收益',
      '优化企业闲置资金管理'
    ],
    highlights: ['灵活存取', '收益稳定', '自动转存']
  },
  {
    id: '2',
    category: 'deposit',
    name: '通知存款',
    description: '短期大额资金增值，提前通知即可支取',
    amount: '50万起',
    rate: '1天0.45%/7天1.0%',
    matchScore: 82,
    reasons: [
      '企业有短期闲置资金需求',
      '比活期利率高，流动性好',
      '适合资金周转周期较短的企业'
    ],
    highlights: ['利率优惠', '期限灵活', '大额增值']
  },
  {
    id: '3',
    category: 'deposit',
    name: '结构性存款',
    description: '本金保障+浮动收益，挂钩利率/汇率等指标',
    amount: '100万起',
    rate: '1.5%-3.8%',
    term: '1-12个月',
    matchScore: 75,
    reasons: [
      '企业风险偏好稳健',
      '在保本基础上追求更高收益',
      '可根据市场行情获得浮动收益'
    ],
    highlights: ['本金保障', '收益浮动', '期限可选']
  },
  // 贷款类产品
  {
    id: '4',
    category: 'loan',
    name: '流动资金贷款',
    description: '满足企业日常经营周转的短期融资需求',
    amount: '500-3000万',
    rate: '3.45%起',
    term: '1年期',
    matchScore: 95,
    reasons: [
      '企业经营稳健，有明确资金周转需求',
      '近3年税务评级均为A级',
      '可解决回款账期导致的资金缺口'
    ],
    highlights: ['审批快速', '利率优惠', '随借随还']
  },
  {
    id: '5',
    category: 'loan',
    name: '科创企业信用贷',
    description: '面向高新技术企业的纯信用贷款产品，无需抵押担保',
    amount: '500-2000万',
    rate: '3.65%起',
    term: '1-3年',
    matchScore: 92,
    reasons: [
      '企业为高新技术企业，符合产品准入条件',
      '专利数量23项，研发实力强',
      '无需抵押担保，纯信用授信'
    ],
    highlights: ['纯信用', '额度高', '循环使用']
  },
  {
    id: '6',
    category: 'loan',
    name: '供应链融资',
    description: '基于核心企业信用的应收账款融资',
    amount: '100-2000万',
    rate: '3.8%起',
    term: '90-180天',
    matchScore: 85,
    reasons: [
      '下游客户包含华为、中兴等优质核心企业',
      '应收账款周转健康',
      '可降低融资成本约0.5%'
    ],
    highlights: ['依托核心企业', '放款快', '成本低']
  },
  {
    id: '7',
    category: 'loan',
    name: '固定资产贷款',
    description: '支持企业设备采购、厂房建设等固定资产投资',
    amount: '1000-5000万',
    rate: '4.0%起',
    term: '3-5年',
    matchScore: 78,
    reasons: [
      '企业有扩产设备采购需求',
      '可匹配设备折旧周期还款',
      '支持企业产能升级'
    ],
    highlights: ['期限长', '额度大', '专项用途']
  },
  // 结算类产品
  {
    id: '8',
    category: 'settlement',
    name: '企业网银',
    description: '提供转账、查询、代发等一站式网上银行服务',
    amount: '不限',
    matchScore: 90,
    reasons: [
      '提升企业财务处理效率',
      '7×24小时随时办理业务',
      '降低企业运营成本'
    ],
    highlights: ['便捷高效', '安全可靠', '功能全面']
  },
  {
    id: '9',
    category: 'settlement',
    name: '银企直连',
    description: '企业ERP系统与银行系统直接对接，实现资金自动化管理',
    amount: '不限',
    matchScore: 85,
    reasons: [
      '企业有多账户管理需求',
      '可实现资金自动归集调拨',
      '提升财务管理自动化水平'
    ],
    highlights: ['系统直连', '自动对账', '效率提升']
  },
  {
    id: '10',
    category: 'settlement',
    name: '代发工资',
    description: '批量代发员工工资、奖金、福利等',
    amount: '按员工数量',
    matchScore: 82,
    reasons: [
      '企业员工156人，代发需求明确',
      '可绑定员工个人金融服务',
      '提升员工与企业粘性'
    ],
    highlights: ['批量处理', '准时发放', '员工服务']
  },
  {
    id: '11',
    category: 'settlement',
    name: '跨境结算',
    description: '提供进出口贸易的跨境收付款服务',
    amount: '按贸易金额',
    matchScore: 78,
    reasons: [
      '企业年进出口额超1300万美元',
      '可降低汇兑成本',
      '提供汇率风险管理方案'
    ],
    highlights: ['币种齐全', '汇率优惠', '到账快']
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
      aiExecutable: false,
      suggestedScript: '方案要点：额度建议2000万，期限3年，利率3.45%（可协商），采用信用+应收账款质押组合担保方式。重点突出我行科创贷审批快、额度足、利率优的特点。'
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
      aiExecutable: false,
      suggestedScript: '王总，了解到贵司每月有45笔左右的票据业务分散在多家银行。我行票据池可以帮您统一管理，好处是：1）额度共享，灵活调配；2）在线贴现，秒级到账；3）票据托管费全免。建议先把3家以上的票据归集过来试用。'
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
      aiExecutable: false,
      suggestedScript: '审批要点：1）重点说明企业高新资质和稳定经营；2）强调我行存量合作良好、无逾期；3）附上同业授信情况对比；4）建议审批时限控制在5个工作日内，客户急需资金。'
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
