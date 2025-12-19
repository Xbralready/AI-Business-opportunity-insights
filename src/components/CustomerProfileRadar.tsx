import { useState } from 'react';

/* ============================================
   七维度配置
   ============================================ */
const dimensionConfig = [
  { key: 'businessFundamentals', label: '企业基本面' },
  { key: 'operationAndIndustry', label: '经营与行业' },
  { key: 'financialStatements', label: '财务三表' },
  { key: 'debtAndCredit', label: '债务与授信' },
  { key: 'transactionAndFunds', label: '交易与资金流' },
  { key: 'decisionChain', label: '决策链' },
  { key: 'riskCompliance', label: '风险合规' },
];

/* ============================================
   分数标签组件
   ============================================ */
function ScoreLabel({ score }: { score: number }) {
  // 根据分数返回标签和颜色
  let label = '一般';
  let colorClass = 'text-gray-500 bg-gray-50';

  if (score >= 80) {
    label = '优秀';
    colorClass = 'text-red-600 bg-red-50';
  } else if (score >= 70) {
    label = '良好';
    colorClass = 'text-blue-600 bg-blue-50';
  } else if (score >= 60) {
    label = '中等';
    colorClass = 'text-amber-600 bg-amber-50';
  }

  return (
    <span className={`text-xs px-1.5 py-0.5 rounded ${colorClass}`}>
      {label}
    </span>
  );
}

/* ============================================
   Radar Chart Component - 紧凑版
   ============================================ */
interface RadarChartProps {
  scores: {
    businessFundamentals: number;
    operationAndIndustry: number;
    financialStatements: number;
    debtAndCredit: number;
    transactionAndFunds: number;
    decisionChain: number;
    riskCompliance: number;
  };
  size?: number;
}

interface RadarChartWithClickProps extends RadarChartProps {
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

function RadarChart({ scores, size = 280, selectedIndex, onSelectIndex }: RadarChartWithClickProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 55;
  const levels = 5;
  const numAxes = 7;
  const angleStep = (2 * Math.PI) / numAxes;
  const startAngle = -Math.PI / 2;

  const getPoint = (angle: number, radius: number) => ({
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  });

  const renderGrid = () => {
    const grids = [];
    for (let level = 1; level <= levels; level++) {
      const radius = (maxRadius / levels) * level;
      const points = [];
      for (let i = 0; i < numAxes; i++) {
        const angle = startAngle + i * angleStep;
        const point = getPoint(angle, radius);
        points.push(`${point.x},${point.y}`);
      }
      grids.push(
        <polygon
          key={level}
          points={points.join(' ')}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      );
    }
    return grids;
  };

  const renderAxes = () => {
    return dimensionConfig.map((dim, i) => {
      const angle = startAngle + i * angleStep;
      const endPoint = getPoint(angle, maxRadius);
      return (
        <line
          key={dim.key}
          x1={centerX}
          y1={centerY}
          x2={endPoint.x}
          y2={endPoint.y}
          stroke="#e5e7eb"
          strokeWidth={1}
        />
      );
    });
  };

  const renderDataArea = () => {
    const scoreValues = [
      scores.businessFundamentals,
      scores.operationAndIndustry,
      scores.financialStatements,
      scores.debtAndCredit,
      scores.transactionAndFunds,
      scores.decisionChain,
      scores.riskCompliance,
    ];

    const points = scoreValues.map((score, i) => {
      const angle = startAngle + i * angleStep;
      const radius = (score / 100) * maxRadius;
      return getPoint(angle, radius);
    });

    const pathData = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z';

    return (
      <>
        <path
          d={pathData}
          fill="rgba(34, 197, 94, 0.15)"
          stroke="#22c55e"
          strokeWidth={1.5}
        />
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={2.5}
            fill="#22c55e"
          />
        ))}
      </>
    );
  };

  const scoreValues = [
    scores.businessFundamentals,
    scores.operationAndIndustry,
    scores.financialStatements,
    scores.debtAndCredit,
    scores.transactionAndFunds,
    scores.decisionChain,
    scores.riskCompliance,
  ];

  const renderLabels = () => {
    return dimensionConfig.map((dim, i) => {
      const angle = startAngle + i * angleStep;
      const labelRadius = maxRadius + 30;
      const point = getPoint(angle, labelRadius);
      const isSelected = selectedIndex === i;

      let textAnchor: 'start' | 'middle' | 'end' = 'middle';
      let dx = 0;
      if (i >= 1 && i <= 3) {
        textAnchor = 'start';
        dx = 4;
      } else if (i >= 4 && i <= 6) {
        textAnchor = 'end';
        dx = -4;
      }

      return (
        <g
          key={dim.key}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectIndex(i)}
        >
          <text
            x={point.x + dx}
            y={point.y - 6}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            style={{
              fontSize: '11px',
              fontWeight: isSelected ? 600 : 500,
              fill: isSelected ? '#059669' : '#374151',
            }}
          >
            {dim.label}
          </text>
          <text
            x={point.x + dx}
            y={point.y + 8}
            textAnchor={textAnchor}
            dominantBaseline="middle"
            style={{
              fontSize: '12px',
              fontWeight: 600,
              fill: isSelected ? '#059669' : '#6b7280',
            }}
          >
            {scoreValues[i]}分
          </text>
        </g>
      );
    });
  };

  const padding = 50;
  const svgSize = size + padding * 2;

  return (
    <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
      <g transform={`translate(${padding}, ${padding})`}>
        {renderGrid()}
        {renderAxes()}
        {renderDataArea()}
        {renderLabels()}
      </g>
    </svg>
  );
}

/* ============================================
   AI Details 类型
   ============================================ */
interface AIDetails {
  positive: string[];
  negative: string[];
  actions: string[];
}

/* ============================================
   Main Customer Profile Radar Component
   ============================================ */
interface CustomerProfileRadarProps {
  profile: {
    aiSummary: {
      score: number;
      dimensionScores: {
        businessFundamentals: number;
        operationAndIndustry: number;
        financialStatements: number;
        debtAndCredit: number;
        transactionAndFunds: number;
        decisionChain: number;
        riskCompliance: number;
      };
    };
    businessFundamentals: { aiInsight: string; aiDetails: AIDetails };
    operationAndIndustry: { aiInsight: string; aiDetails: AIDetails };
    financialStatements: { aiInsight: string; aiDetails: AIDetails };
    debtAndCredit: { aiInsight: string; aiDetails: AIDetails };
    transactionAndFunds: { aiInsight: string; aiDetails: AIDetails };
    decisionChain: { aiInsight: string; aiDetails: AIDetails };
    riskCompliance: { aiInsight: string; aiDetails: AIDetails };
  };
}

export default function CustomerProfileRadar({ profile }: CustomerProfileRadarProps) {
  const { aiSummary } = profile;
  const scores = aiSummary.dimensionScores;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const dimensions = [
    { key: 'businessFundamentals', label: '企业基本面', score: scores.businessFundamentals, insight: profile.businessFundamentals.aiInsight, details: profile.businessFundamentals.aiDetails },
    { key: 'operationAndIndustry', label: '经营与行业', score: scores.operationAndIndustry, insight: profile.operationAndIndustry.aiInsight, details: profile.operationAndIndustry.aiDetails },
    { key: 'financialStatements', label: '财务三表', score: scores.financialStatements, insight: profile.financialStatements.aiInsight, details: profile.financialStatements.aiDetails },
    { key: 'debtAndCredit', label: '债务与授信', score: scores.debtAndCredit, insight: profile.debtAndCredit.aiInsight, details: profile.debtAndCredit.aiDetails },
    { key: 'transactionAndFunds', label: '交易与资金流', score: scores.transactionAndFunds, insight: profile.transactionAndFunds.aiInsight, details: profile.transactionAndFunds.aiDetails },
    { key: 'decisionChain', label: '决策链', score: scores.decisionChain, insight: profile.decisionChain.aiInsight, details: profile.decisionChain.aiDetails },
    { key: 'riskCompliance', label: '风险合规', score: scores.riskCompliance, insight: profile.riskCompliance.aiInsight, details: profile.riskCompliance.aiDetails },
  ];

  const selected = dimensions[selectedIndex];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* 标题区 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI 客户画像</h3>
          <p className="text-sm text-gray-500 mt-0.5">基于7个维度的智能分析</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">综合评分</span>
          <span className="text-xl font-semibold text-red-600">{aiSummary.score}</span>
        </div>
      </div>

      {/* 内容区 - 两栏布局：雷达图(40%) + 详情(60%) */}
      <div className="p-4">
        <div className="flex gap-6">
          {/* 左侧：可点击的雷达图 - 40% */}
          <div className="w-[40%] flex items-center justify-center">
            <RadarChart
              scores={scores}
              size={280}
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
            />
          </div>

          {/* 右侧：详情面板 */}
          <div className="flex-1 min-w-0">
            {/* AI 解读 */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-base font-medium text-gray-900">{selected.label}</span>
                <span className="text-base font-semibold text-red-600">{selected.score}分</span>
                <ScoreLabel score={selected.score} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{selected.insight}</p>
            </div>

            {/* 正面因素 + 关注事项 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* 正面因素 - 勾选清单 + 进度条 */}
              <div className="bg-white rounded-xl p-3">
                <div className="text-xs font-medium text-red-600 mb-3">正面因素</div>
                <div>
                  {selected.details.positive?.slice(0, 2).map((text, i) => {
                    const weight = i === 0 ? 85 : 70;
                    return (
                      <div key={i} className={`flex items-start gap-3 py-2.5 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
                        <div className="w-1.5 h-12 rounded-full bg-red-100 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
                            <span className="text-xs text-red-600 font-medium flex-shrink-0">{weight}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-red-400" style={{ width: `${weight}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 关注事项 - 警告图标 + 标签式色条 */}
              <div className="bg-white rounded-xl p-3">
                <div className="text-xs font-medium text-amber-600 mb-3">关注事项</div>
                <div>
                  {selected.details.negative?.slice(0, 2).map((text, i) => {
                    const level = i === 0 ? '中' : '低';
                    const levelColor = i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600';
                    return (
                      <div key={i} className={`flex items-start gap-3 py-2.5 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
                        <div className="w-1.5 h-12 rounded-full bg-amber-100 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${levelColor}`}>{level}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${i === 0 ? 'bg-amber-300' : 'bg-gray-300'}`} style={{ width: i === 0 ? '60%' : '30%' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 执行路径 - 步骤进度条/时间轴 */}
            <div className="bg-white rounded-xl p-3">
              <div className="text-xs font-medium text-blue-600 mb-3">执行路径</div>
              <div className="pl-1">
                {selected.details.actions?.slice(0, 3).map((text, i) => {
                  const isCurrent = i === 0;
                  const totalSteps = Math.min(3, selected.details.actions?.length || 0);
                  return (
                    <div key={i} className="flex gap-3">
                      {/* 左侧时间轴 */}
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isCurrent ? 'bg-blue-500' : 'bg-gray-300'}`} />
                        {i < totalSteps - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
                      </div>
                      {/* 右侧内容 */}
                      <div className={`flex-1 pb-3 ${i < totalSteps - 1 ? '' : 'pb-0'}`}>
                        <div className={`p-2.5 rounded-lg ${isCurrent ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-medium ${isCurrent ? 'text-blue-700' : 'text-gray-700'}`}>
                              步骤 {i + 1}
                            </span>
                            {isCurrent && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">当前</span>}
                          </div>
                          <p className={`text-sm leading-relaxed ${isCurrent ? 'text-gray-800' : 'text-gray-500'}`}>
                            {text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
