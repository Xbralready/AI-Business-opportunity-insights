# AI 信贷员系统 - 工程需求文档（详细版）

> 版本：v11.0
> 更新日期：2025-01-19
> 范围：客户商机列表、客户商机详情页

---

## 一、客户商机列表页（CustomerList）

### 1.1 页面功能概述

**功能定位**：展示客户经理负责的所有对公客户商机，支持搜索筛选，快速定位目标客户并进入详情页。

**页面路由**：`/customers`

---

### 1.2 模块结构

```
├── 顶部标题栏（Header）
├── 筛选栏（FilterBar）
└── 客户商机卡片列表（CustomerCardList）
```

---

### 1.3 模块详细说明

#### 1.3.1 顶部标题栏（Header）

##### 功能描述
显示页面标题、商机统计数量、数据更新时间和刷新按钮。

##### 元素内容逻辑

| 元素 | 内容逻辑 | 数据来源 |
|------|----------|----------|
| 页面标题 | 固定文案："AI 商机洞察" | 静态 |
| 商机数量 | 动态统计当前筛选结果数量，格式："共 {n} 条商机" | `filteredCustomers.length` |
| 更新时间 | 显示当前时间，格式："HH:mm:ss 更新" | `new Date().toLocaleString()` |
| 刷新按钮 | RefreshCw 图标 | 静态图标 |

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 刷新按钮点击 | 用户点击刷新图标 | 当前为占位功能，无实际刷新逻辑 |
| 刷新按钮悬停 | 鼠标 hover | 背景色变为 `gray-100`，图标色变为 `gray-700` |

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| 数据为空 | 显示"共 0 条商机" |
| 筛选后无结果 | 显示"共 0 条商机"，卡片列表区域为空 |

---

#### 1.3.2 筛选栏（FilterBar）

##### 功能描述
提供搜索和筛选功能，帮助用户快速定位目标客户。

##### 元素内容逻辑

| 元素 | 类型 | 内容逻辑 | 默认值 |
|------|------|----------|--------|
| 搜索框 | 输入框 | 支持模糊搜索客户名称、行业、AI洞察、需求标签 | 空字符串 |
| 客户类型筛选 | 下拉选择器 | 筛选客户等级：全部类型/战略客户/核心客户/有效客户 | "all" |
| 行业筛选 | 下拉选择器 | 动态获取所有客户的行业列表去重后作为选项 | "all" |
| AI建档按钮 | 按钮 | 跳转外部链接进行AI建档 | - |

##### 搜索逻辑详细说明

```typescript
// 搜索匹配规则（任一字段匹配即返回true）
const matchesSearch = searchTerm === '' ||
  customer.companyName.toLowerCase().includes(searchLower) ||    // 公司名称
  customer.industry.toLowerCase().includes(searchLower) ||       // 行业
  (customer.aiInsight && customer.aiInsight.toLowerCase().includes(searchLower)) ||  // AI洞察
  (customer.needTags && customer.needTags.some(tag => tag.toLowerCase().includes(searchLower)));  // 需求标签
```

##### 筛选组合逻辑

```typescript
// 三个筛选条件为 AND 关系
return matchesSearch && matchesIndustry && matchesLevel;
```

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 搜索输入 | 用户在搜索框输入 | 实时过滤客户列表（无防抖） |
| 清空搜索 | 用户删除所有输入内容 | 显示全部客户（受其他筛选条件约束） |
| 选择客户类型 | 下拉选择 | 立即过滤客户列表 |
| 选择行业 | 下拉选择 | 立即过滤客户列表 |
| 点击AI建档 | 点击按钮 | 新窗口打开蓝湖链接 |
| 输入框聚焦 | 点击输入框 | 边框显示绿色聚焦态 ring-2 ring-green-500 |

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| 搜索无匹配结果 | 卡片列表显示空白，顶部显示"共 0 条商机" |
| 行业列表为空 | 行业下拉仅显示"全部行业"选项 |
| 特殊字符输入 | 不做特殊处理，直接作为搜索词使用 |

---

#### 1.3.3 客户商机卡片列表（CustomerCardList）

##### 功能描述
以卡片形式展示筛选后的客户列表，每张卡片包含客户核心信息、AI洞察和需求标签。

##### 卡片结构

```
├── 第一行：企业图标 + 企业名称 + 行业 + 客户等级标签 + AI建档按钮
├── 第二行：AI 核心洞察（条件显示）
└── 第三行：需求标签（条件显示）
```

##### 元素内容逻辑

| 元素 | 内容逻辑 | 样式规则 |
|------|----------|----------|
| 企业图标 | Building2 图标，背景色根据客户类型：corporate=蓝色渐变, retail=紫色渐变, individual=橙色渐变 | 48x48px 圆角正方形 |
| 企业名称 | `customer.companyName` | 16px 半粗体 |
| 行业 | `customer.industry` | 14px 灰色 |
| 客户等级 | `customer.customerLevel`，三种等级对应不同颜色：战略客户=红色, 核心客户=橙色, 有效客户=绿色 | 圆角标签 |
| AI洞察 | `customer.aiInsight`，前置 Sparkles 图标 | 绿色渐变背景 |
| 需求标签 | `customer.needTags` 数组循环渲染 | 蓝色标签样式 |
| 卡片AI建档按钮 | 固定文案"AI 建档" | 绿色按钮 |

##### 条件显示逻辑

```typescript
// AI洞察条件显示
{customer.aiInsight && (
  <div>AI 核心洞察内容</div>
)}

// 需求标签条件显示
{customer.needTags && customer.needTags.length > 0 && (
  <div>需求标签列表</div>
)}
```

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 卡片点击 | 用户点击卡片任意区域（除AI建档按钮外） | 路由跳转到 `/customers/{id}` |
| 卡片悬停 | 鼠标 hover | 添加阴影 `shadow-lg`，边框变绿 `border-green-300` |
| AI建档按钮点击 | 点击卡片内的AI建档按钮 | 阻止冒泡 + 新窗口打开蓝湖链接 |

##### 列表数据过滤逻辑

```typescript
// 仅显示对公客户
const corporateCustomers = mockCustomers.filter(c => c.customerType === 'corporate');

// 应用筛选条件
const filteredCustomers = corporateCustomers.filter((customer) => {
  // 搜索匹配 + 行业匹配 + 等级匹配
});
```

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| 客户列表为空 | 显示空白区域，无特殊提示 |
| 单个客户缺少aiInsight | 不显示AI洞察区域 |
| 单个客户缺少needTags | 不显示需求标签区域 |
| 客户缺少customerLevel | 不显示客户等级标签 |

---

### 1.4 状态管理

| 状态变量 | 类型 | 初始值 | 作用 |
|----------|------|--------|------|
| `searchTerm` | string | `''` | 搜索关键词 |
| `industryFilter` | string | `'all'` | 行业筛选值 |
| `customerLevelFilter` | string | `'all'` | 客户等级筛选值 |

---

## 二、客户商机详情页（CustomerDetail）

### 2.1 页面功能概述

**功能定位**：展示单个客户的完整画像，包括AI客户画像、AI产品推荐、AI行动手册三大核心模块，辅助客户经理制定营销策略。

**页面路由**：`/customers/:id`

---

### 2.2 模块结构

```
├── 顶部标题栏（Header）
├── 客户基础信息卡片（CustomerBasicInfo）
├── 两栏布局
│   ├── 左列
│   │   ├── AI 客户画像（PunchCard + 维度解读）
│   │   └── AI 产品推荐（需求词云 + 产品卡片）
│   └── 右列
│       └── AI 行动手册（策略 + 案例 + 行动建议）
```

---

### 2.3 模块详细说明

#### 2.3.1 顶部标题栏（Header）

##### 功能描述
显示返回按钮、客户名称和基础信息。

##### 元素内容逻辑

| 元素 | 内容逻辑 | 数据来源 |
|------|----------|----------|
| 返回按钮 | ArrowLeft 图标 | 静态 |
| 客户名称 | `customer.companyName` | mockCustomers |
| 行业信息 | 格式："{industry} · 成立{年数}年" | 计算：`2024 - customer.establishedYear` |

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 返回按钮点击 | 点击返回图标 | `navigate('/customers')` 返回列表页 |
| 返回按钮悬停 | 鼠标 hover | 背景色变为 `gray-100` |

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| URL中id无效 | 使用 `mockCustomers[0]` 作为默认客户 |

---

#### 2.3.2 客户基础信息卡片（CustomerBasicInfo）

##### 功能描述
全宽展示客户核心信息和AI洞察摘要。

##### 元素内容逻辑

| 元素 | 内容逻辑 | 样式 |
|------|----------|------|
| 企业图标 | Building2 图标 | 蓝色背景 48x48px |
| 企业名称 | `customer.companyName` | 18px 半粗体 |
| 客户等级标签 | `profile.cooperationAndContribution.customerLevel` | 蓝色圆角标签 |
| 数据更新时间 | 固定文案 "数据更新于 2024-01-15" | 12px 灰色 |
| 行业 | `customer.industry`，前置 Briefcase 图标 | 14px 灰色 |
| 地址 | 固定文案 "杭州市"，前置 MapPin 图标 | 14px 灰色 |
| 员工数 | `profile.businessFundamentals.basicInfo.employeeCount` + "人" | 14px 灰色 |
| AI核心洞察 | 包含高亮关键词的洞察文本 | 绿色背景卡片 |

##### AI核心洞察高亮规则

```jsx
// 固定高亮词汇用 span 包裹
<span className="text-green-600 font-semibold">优质高新技术企业</span>
<span className="text-green-600 font-semibold">扩产融资需求约2000万</span>
<span className="text-green-600 font-semibold">科创信用贷</span>
```

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 无 | - | 此卡片为纯展示，无交互 |

---

#### 2.3.3 AI 客户画像模块

##### 功能描述
通过 PunchCard 图表展示9个维度的客户画像数据，支持点击维度查看详细解读。

##### 子组件结构

```
├── 模块标题："AI 客户画像"
└── PunchCard 图表（含内嵌解读面板）
```

##### PunchCard 图表数据结构

```typescript
interface PunchCardData {
  dimension: string;      // 维度名称（9个维度）
  points: {
    label: string;        // 数据点名称
    score: number;        // 分数 0-100
    type: 'positive' | 'negative';  // 正向/负向
  }[];
}
```

##### 9个维度列表

| 维度名称 | 正向点数 | 负向点数 |
|----------|----------|----------|
| 基本信息 | 3 | 2 |
| 行业分析 | 2 | 2 |
| 经营与资金 | 2 | 2 |
| 融资与授用信 | 3 | 2 |
| 价值贡献 | 2 | 2 |
| 竞品业务渗透 | 2 | 2 |
| 风险合规 | 3 | 2 |
| 决策链 | 2 | 2 |
| 我行业务渗透 | 2 | 2 |

##### 维度解读内容结构

```typescript
interface DimensionInterpretation {
  summary: string;         // 综合摘要
  positive: string[];      // 正向解读列表
  negative: string[];      // 负向解读列表
  rating: 'excellent' | 'good' | 'fair' | 'poor';  // 评级
  stars: number;           // 星级 1-5
}
```

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 维度点击 | 点击 PunchCard 中的维度标签 | 切换选中状态：已选中则取消，未选中则选中 |
| 选中状态变化 | `selectedDimension` 状态变化 | 解读面板显示对应维度的详细内容 |
| 未选中任何维度 | `selectedDimension === null` | 显示综合 AI 解读内容 |

##### 状态管理

| 状态变量 | 类型 | 初始值 |
|----------|------|--------|
| `selectedDimension` | `string \| null` | `'基本信息'` |

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| 维度数据缺失 | 使用默认空数组 |
| 解读内容缺失 | 显示综合解读作为 fallback |

---

#### 2.3.4 AI 产品推荐模块

##### 功能描述
展示客户需求词云和基于需求匹配的产品推荐，支持产品与需求的联动高亮。

##### 子组件结构

```
├── 模块标题："AI 产品推荐"
├── 左侧：需求词云区域（40%宽度）
│   ├── 标题："客户需求洞察"
│   ├── 副标题说明
│   ├── NeedsWordCloud 组件
│   └── 关联需求标签展示
└── 右侧：产品推荐区域（60%宽度）
    ├── 产品分类 Tab（存款/贷款/结算）
    └── 产品卡片列表
```

##### 需求词云数据结构

```typescript
interface CustomerNeed {
  text: string;       // 需求文本
  weight: number;     // 权重 0-100（决定字体大小）
  urgent?: boolean;   // 是否紧迫（决定颜色）
}
```

##### 需求词云显示规则

| 条件 | 颜色规则 |
|------|----------|
| 高亮状态（关联产品） | `#16a34a` green-600 |
| 紧迫且权重≥90 | `#15803d` green-700 |
| 紧迫且权重≥70 | `#16a34a` green-600 |
| 紧迫且权重<70 | `#ea580c` orange-600 |
| 非紧迫/未高亮 | `#9ca3af` gray-400 |

##### 需求词云字体大小公式

```javascript
const fontSize = 12 + (need.weight / 100) * 20;  // 范围：12px - 32px
```

##### 产品分类 Tab

| Tab键值 | 显示文案 |
|---------|----------|
| `deposit` | 存款类产品 |
| `loan` | 贷款类产品 |
| `settlement` | 结算类产品 |

##### 产品卡片数据结构

```typescript
interface ProductRecommendation {
  id: string;
  name: string;           // 产品名称
  category: 'deposit' | 'loan' | 'settlement';
  matchScore: number;     // 匹配度
  summary: string;        // 产品摘要
  reason: string;         // 推荐理由
  talkingPoints?: string; // 沟通要点
  relatedNeeds: string[]; // 关联的客户需求
}
```

##### 产品卡片元素

| 元素 | 内容逻辑 | 条件显示 |
|------|----------|----------|
| 产品图标 | 根据 category：deposit=Wallet, loan=Banknote, settlement=CreditCard | 始终显示 |
| 产品名称 | `product.name` | 始终显示 |
| 产品摘要 | `product.summary` | 始终显示 |
| 推荐理由 | `product.reason`，前置 Lightbulb 图标 | 始终显示 |
| 沟通要点 | `product.talkingPoints`，前置 MessageCircle 图标 | 仅当 talkingPoints 存在时 |

##### 交互逻辑

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| Tab切换 | 点击产品分类Tab | 1. 更新 `productCategoryTab` 状态<br>2. 切换产品列表<br>3. **不清空** `selectedProductId`，但 `selectedProduct` 会根据新 category 重新计算 |
| 产品卡片点击 | 点击产品卡片 | 1. 更新 `selectedProductId` 为该产品ID<br>2. 卡片显示选中态（绿色边框+阴影）<br>3. 需求词云高亮该产品的 `relatedNeeds` |
| 产品卡片悬停 | 鼠标 hover 未选中卡片 | 边框变绿 `border-green-300`，添加阴影 |

##### 词云与产品卡片联动逻辑

```typescript
// selectedProduct 的计算逻辑（关键！）
const selectedProduct = selectedProductId
  ? productRecommendations.find(p => p.id === selectedProductId && p.category === productCategoryTab)
  : null;

// 词云高亮逻辑
<NeedsWordCloud
  needs={customerNeeds}
  highlightNeeds={selectedProduct?.relatedNeeds || []}
/>

// 关联需求标签显示逻辑
{selectedProduct ? (
  selectedProduct.relatedNeeds.map((need) => (
    <span className="bg-green-100 text-green-700">{need}</span>
  ))
) : (
  <span className="text-gray-400">点击下方产品卡片查看</span>
)}
```

##### 状态管理

| 状态变量 | 类型 | 初始值 |
|----------|------|--------|
| `productCategoryTab` | `string` | `'deposit'` |
| `selectedProductId` | `string \| null` | `null` |

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| 未选中任何产品 | 词云无高亮，关联需求标签显示"点击下方产品卡片查看" |
| 切换Tab后选中产品不在当前分类 | `selectedProduct` 为 null，词云恢复无高亮状态 |
| 产品无 relatedNeeds | 高亮列表为空数组，词云无高亮 |
| 产品无 talkingPoints | 不显示沟通要点区域 |

---

#### 2.3.5 AI 行动手册模块

##### 功能描述
展示行动策略、优秀营销案例和AI行动建议列表，辅助客户经理执行营销计划。

##### 子组件结构

```
├── 模块标题："AI 行动手册"
├── 行动策略卡片（蓝色背景）
│   ├── 策略摘要
│   ├── 4个策略要点（2x2网格）
│   └── 优秀营销案例
│       ├── 产品类型Tab（存款/贷款/结算）
│       └── 案例列表（可展开）
└── AI 行动建议列表
    ├── 待行动数量统计
    └── 行动任务卡片（手风琴式）
```

##### 行动策略要点

| 要点名称 | 图标 | 内容来源 |
|----------|------|----------|
| 主攻方向 | Sparkles | 固定文案 |
| 关键动作 | Target | 固定文案 |
| 目标 | TrendingUp | 固定文案 |
| 节奏 | Clock | 固定文案 |

##### 优秀营销案例数据结构

**案例Tab**

| Tab键值 | 显示文案 |
|---------|----------|
| `deposit` | 存款类产品 |
| `loan` | 贷款类产品 |
| `settlement` | 结算类产品 |

**案例卡片内容**

| 元素 | 说明 |
|------|------|
| 案例编号 | "案例一"/"案例二" |
| 企业名称 | 案例企业名称 |
| 成果标签 | 如"新增存款5000万"、"科创贷2000万" |
| 案例摘要 | 折叠状态显示的简介 |
| 相似点标签 | 与当前客户的相似特征 |
| 详细过程 | 发现→方案→成果 三段式 |
| 经验提示 | 黄色背景提示 |

##### AI 行动建议任务数据结构

```typescript
interface ActionTask {
  id: string;
  title: string;              // 任务标题
  description: string;        // AI行动建议描述
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  category: 'contact' | 'document' | 'visit' | 'follow_up' | 'approval';
  suggestedScript?: string;   // 参考内容
}
```

##### 任务分类与行动按钮配置

| category | 图标 | 按钮文案 | 按钮颜色 |
|----------|------|----------|----------|
| `contact` | Phone | 拨打电话 | 蓝色 bg-blue-500 |
| `document` | FileText | 准备文档 | 紫色 bg-purple-500 |
| `visit` | MapPinned | 预约拜访 | 橙色 bg-orange-500 |
| `follow_up` | MessageSquare | 发送消息 | 绿色 bg-green-500 |
| `approval` | Send | 提交审批 | 靛蓝色 bg-indigo-500 |

##### 任务状态标签

| 状态 | 显示样式 |
|------|----------|
| 待行动（未点击行动按钮） | 绿色标签 "待行动" |
| 已行动（点击行动按钮后） | 灰色标签 + Check图标 "已行动" |

##### 行动按钮状态

| 状态 | 按钮显示 |
|------|----------|
| 未行动 | 彩色按钮，显示对应行动文案 |
| 已行动 | 灰色按钮，显示 Check图标 + "已完成行动"，禁用状态 |

##### 交互逻辑

**案例交互**

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 案例Tab切换 | 点击案例产品类型Tab | 1. 更新 `caseCategoryTab`<br>2. 重置 `expandedCaseId` 为 null |
| 案例展开/折叠 | 点击案例标题行 | 切换 `expandedCaseId`：已展开则折叠，未展开则展开 |

**任务交互**

| 交互行为 | 触发条件 | 响应动作 |
|----------|----------|----------|
| 任务展开/折叠 | 点击任务标题行 | 切换 `openTaskId`：已展开则折叠，未展开则展开 |
| 行动按钮点击 | 点击"拨打电话"等行动按钮 | 1. 将任务ID加入 `adoptedTaskIds` 数组<br>2. 任务标签变为"已行动"<br>3. 按钮变为"已完成行动"禁用态 |

##### 任务排序逻辑

```typescript
// 已行动的任务排在后面
[...tasks].sort((a, b) => {
  const aActioned = adoptedTaskIds.includes(a.id) ? 1 : 0;
  const bActioned = adoptedTaskIds.includes(b.id) ? 1 : 0;
  return aActioned - bActioned;
});
```

##### 待行动数量计算

```typescript
const pendingCount = tasks.filter((t) => !adoptedTaskIds.includes(t.id)).length;
```

##### 默认展开逻辑

```typescript
// 页面加载时默认展开第一条未完成的任务
useEffect(() => {
  if (tasks.length === 0) return;
  const firstPending = tasks.find(t => t.status !== 'completed');
  setOpenTaskId((prev) => prev ?? (firstPending ? firstPending.id : tasks[0].id));
}, [tasks]);
```

##### 状态管理

| 状态变量 | 类型 | 初始值 |
|----------|------|--------|
| `tasks` | `ActionTask[]` | `handbook.tasks` |
| `adoptedTaskIds` | `string[]` | `[]` |
| `openTaskId` | `string \| null` | 自动计算（第一条未完成任务） |
| `expandedCaseId` | `string \| null` | `null` |
| `caseCategoryTab` | `'deposit' \| 'loan' \| 'settlement'` | `'deposit'` |

##### 异常情况处理

| 异常场景 | 处理方式 |
|----------|----------|
| 任务列表为空 | 显示"0 项待行动"，列表区域为空 |
| 任务无 suggestedScript | 不显示"参考内容"区域 |
| 所有任务都已行动 | 显示"0 项待行动"，所有任务显示已完成状态 |
| 案例数据缺失 | 案例区域显示空白 |

---

### 2.4 响应式布局

##### 断点规则

| 屏幕宽度 | 布局方式 |
|----------|----------|
| ≥1280px (xl) | 两栏布局：左侧 2fr，右侧 1fr |
| <1280px | 单栏布局：垂直堆叠 |

##### 高度同步逻辑

```typescript
// 右侧AI行动手册高度与左侧同步
const [rightHeight, setRightHeight] = useState<number | undefined>(undefined);

useEffect(() => {
  const measure = () => {
    if (leftColumnRef.current) {
      setRightHeight(leftColumnRef.current.offsetHeight);
    }
  };
  measure();
  window.addEventListener('resize', measure);
  return () => window.removeEventListener('resize', measure);
}, []);
```

---

### 2.5 动画效果

##### Framer Motion 动画配置

| 组件 | 动画类型 | 配置 |
|------|----------|------|
| 模块卡片 | 入场动画 | `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` |
| 产品列表切换 | 切换动画 | `AnimatePresence mode="wait"` + fade + slide |
| 详情延迟 | 错峰入场 | `transition={{ delay: 0.1/0.2/0.3 }}` |

---

## 三、完整测试用例

### 3.1 客户商机列表页测试用例

| 用例编号 | 测试场景 | 测试步骤 | 预期结果 |
|----------|----------|----------|----------|
| CL-001 | 页面加载 | 访问 /customers | 显示所有对公客户卡片，顶部显示正确商机数量 |
| CL-002 | 搜索-公司名称 | 输入"智联" | 只显示包含"智联"的客户 |
| CL-003 | 搜索-行业 | 输入"信息技术" | 显示信息技术行业客户 |
| CL-004 | 搜索-AI洞察 | 输入"高新技术" | 显示AI洞察包含"高新技术"的客户 |
| CL-005 | 搜索-需求标签 | 输入"流动资金" | 显示需求标签包含"流动资金"的客户 |
| CL-006 | 搜索-无结果 | 输入"不存在的关键词" | 显示"共 0 条商机"，卡片列表为空 |
| CL-007 | 筛选-客户类型 | 选择"战略客户" | 只显示战略客户等级的客户 |
| CL-008 | 筛选-行业 | 选择"信息技术" | 只显示信息技术行业客户 |
| CL-009 | 组合筛选 | 搜索"科技" + 选择"核心客户" | 同时满足两个条件的客户 |
| CL-010 | 卡片点击跳转 | 点击客户卡片 | 跳转到对应客户详情页 |
| CL-011 | AI建档按钮-标题栏 | 点击顶部AI建档按钮 | 新窗口打开蓝湖链接 |
| CL-012 | AI建档按钮-卡片 | 点击卡片内AI建档按钮 | 新窗口打开蓝湖链接，不触发卡片跳转 |
| CL-013 | 卡片hover效果 | 鼠标悬停在卡片上 | 卡片显示阴影和绿色边框 |
| CL-014 | 客户等级颜色 | 查看不同等级客户 | 战略=红色标签，核心=橙色标签，有效=绿色标签 |

### 3.2 客户商机详情页测试用例

#### 基础功能

| 用例编号 | 测试场景 | 测试步骤 | 预期结果 |
|----------|----------|----------|----------|
| CD-001 | 页面加载 | 访问 /customers/1 | 正确显示客户信息，各模块正常渲染 |
| CD-002 | 返回按钮 | 点击返回箭头 | 返回客户列表页 |
| CD-003 | 无效ID | 访问 /customers/999 | 显示默认客户（第一个客户）的信息 |

#### AI客户画像模块

| 用例编号 | 测试场景 | 测试步骤 | 预期结果 |
|----------|----------|----------|----------|
| CD-004 | 默认维度选中 | 页面加载完成 | 默认选中"基本信息"维度，显示对应解读 |
| CD-005 | 维度切换 | 点击"行业分析"维度 | 切换到行业分析维度解读 |
| CD-006 | 取消维度选中 | 点击已选中的维度 | 取消选中，显示综合AI解读 |
| CD-007 | 维度解读内容 | 选中任意维度 | 显示该维度的摘要、正向点、负向点 |

#### AI产品推荐模块

| 用例编号 | 测试场景 | 测试步骤 | 预期结果 |
|----------|----------|----------|----------|
| CD-008 | 默认Tab | 页面加载完成 | 默认显示"存款类产品"Tab |
| CD-009 | Tab切换 | 点击"贷款类产品"Tab | 切换到贷款产品列表 |
| CD-010 | 产品卡片选中 | 点击任意产品卡片 | 卡片显示选中态（绿色边框），词云高亮关联需求 |
| CD-011 | 词云联动-选中产品 | 选中"流动资金贷款"产品 | 词云中"流动资金周转"、"回款账期长"高亮显示 |
| CD-012 | 词云联动-未选中 | 不选中任何产品 | 词云无高亮，关联需求显示"点击下方产品卡片查看" |
| CD-013 | Tab切换-词云重置 | 选中存款产品后切换到贷款Tab | 词云恢复无高亮状态（因选中产品不在当前分类） |
| CD-014 | 产品卡片hover | 鼠标悬停未选中卡片 | 卡片显示绿色边框和轻微阴影 |
| CD-015 | 沟通要点显示 | 查看有沟通要点的产品 | 显示蓝色背景的沟通要点区域 |
| CD-016 | 沟通要点隐藏 | 查看无沟通要点的产品 | 不显示沟通要点区域 |

#### AI行动手册模块

| 用例编号 | 测试场景 | 测试步骤 | 预期结果 |
|----------|----------|----------|----------|
| CD-017 | 默认任务展开 | 页面加载完成 | 第一条待处理任务默认展开 |
| CD-018 | 任务展开/折叠 | 点击任务标题 | 切换展开/折叠状态 |
| CD-019 | 行动按钮点击 | 点击"拨打电话"按钮 | 任务标签变为"已行动"，按钮变为"已完成行动"并禁用 |
| CD-020 | 已行动任务排序 | 标记任务为已行动 | 已行动任务移到列表底部 |
| CD-021 | 待行动数量更新 | 标记任务为已行动 | 顶部"待行动"数量减少 |
| CD-022 | 案例Tab切换 | 点击"贷款类产品"案例Tab | 切换到贷款案例列表，之前展开的案例收起 |
| CD-023 | 案例展开 | 点击案例标题 | 显示案例详细内容 |
| CD-024 | 案例折叠 | 点击已展开案例标题 | 收起案例详情 |
| CD-025 | 参考内容显示 | 展开有参考内容的任务 | 显示蓝色背景的"参考内容"区域 |
| CD-026 | 行动按钮类型 | 查看不同类型任务 | contact=蓝色拨打电话，document=紫色准备文档，visit=橙色预约拜访 |

#### 响应式布局

| 用例编号 | 测试场景 | 测试步骤 | 预期结果 |
|----------|----------|----------|----------|
| CD-027 | 大屏布局 | 屏幕宽度≥1280px | 左右两栏布局 |
| CD-028 | 小屏布局 | 屏幕宽度<1280px | 单栏垂直布局 |
| CD-029 | 屏幕缩放 | 从大屏缩放到小屏 | 布局自动切换 |

---

## 四、数据字典

### 4.1 客户类型（CustomerType）

| 值 | 说明 |
|----|------|
| `corporate` | 对公客户 |
| `retail` | 零售客户 |
| `individual` | 个体户 |

### 4.2 客户等级（CustomerLevel）

| 值 | 说明 | 颜色 |
|----|------|------|
| `战略客户` | 最高级别客户 | 红色 bg-red-100 text-red-700 |
| `核心客户` | 重要客户 | 橙色 bg-orange-100 text-orange-700 |
| `有效客户` | 一般客户 | 绿色 bg-green-100 text-green-700 |

### 4.3 产品分类（ProductCategory）

| 值 | 说明 | 图标 | 颜色 |
|----|------|------|------|
| `deposit` | 存款类产品 | Wallet | 蓝色 |
| `loan` | 贷款类产品 | Banknote | 绿色 |
| `settlement` | 结算类产品 | CreditCard | 紫色 |

### 4.4 任务类型（TaskCategory）

| 值 | 说明 | 图标 | 按钮文案 | 颜色 |
|----|------|------|----------|------|
| `contact` | 联系客户 | Phone | 拨打电话 | 蓝色 |
| `document` | 文档准备 | FileText | 准备文档 | 紫色 |
| `visit` | 上门拜访 | MapPinned | 预约拜访 | 橙色 |
| `follow_up` | 跟进沟通 | MessageSquare | 发送消息 | 绿色 |
| `approval` | 审批流程 | Send | 提交审批 | 靛蓝色 |

---

## 五、附录

### 5.1 技术栈

- **框架**：React 19.2 + TypeScript
- **构建工具**：Vite 7.x
- **样式**：TailwindCSS（内联样式）
- **动画**：Framer Motion 12.x
- **路由**：React Router DOM 7.x
- **图标**：Lucide React

### 5.2 项目结构

```
src/
├── pages/
│   ├── CustomerList.tsx      # 客户商机列表页
│   └── CustomerDetail.tsx    # 客户商机详情页
├── components/
│   └── PunchCardChart.tsx    # Punch Card 图表组件
├── data/
│   └── mockData.ts           # 模拟数据
└── App.tsx                   # 路由配置
```

### 5.3 关键状态流转图

```
[客户商机列表页]
searchTerm + industryFilter + customerLevelFilter
         ↓
    filteredCustomers
         ↓
    CustomerCardList

[客户商机详情页 - AI产品推荐]
productCategoryTab → 筛选产品列表
        ↓
selectedProductId → 计算 selectedProduct（需同时匹配 id 和 category）
        ↓
selectedProduct?.relatedNeeds → 词云高亮
```

### 5.4 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v11.0 | 2025-01-19 | 初始版本：完整PRD文档 |

---

**文档结束**
