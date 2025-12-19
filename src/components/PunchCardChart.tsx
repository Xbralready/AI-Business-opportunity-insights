import { useState } from 'react';

/* ============================================
   Punch Card Chart - AI客户画像可视化
   Tab 切换形式，每次展示一个维度的详情
   ============================================ */

// 单个关键点数据
interface KeyPoint {
  label: string;      // 关键点名称
  score: number;      // 位置分数 0-100 (0=最差, 50=中间, 100=最好)
  type: 'positive' | 'negative';  // 正向/负向
}

// 单个维度数据
interface DimensionData {
  dimension: string;  // 维度名称
  points: KeyPoint[]; // 该维度的关键点列表
}

// 维度解读数据
interface DimensionInterpretation {
  summary: string;
  positive: string[];
  negative: string[];
  stars: number;
  rating: string;
}

interface PunchCardChartProps {
  data: DimensionData[];
  selectedDimension?: string | null;
  onDimensionClick?: (dimension: string) => void;
  dimensionInterpretations?: Record<string, DimensionInterpretation>;
}

export default function PunchCardChart({
  data,
  selectedDimension,
  onDimensionClick,
  dimensionInterpretations
}: PunchCardChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // 默认选中第一个维度
  const activeDimension = selectedDimension || data[0]?.dimension;
  const activeData = data.find(d => d.dimension === activeDimension);
  const activeInterpretation = activeDimension && dimensionInterpretations
    ? dimensionInterpretations[activeDimension]
    : null;

  // 横轴配置
  const axisWidth = 680;
  const axisHeight = 90;
  const padding = { left: 40, right: 40 };
  const chartWidth = axisWidth - padding.left - padding.right;
  const midX = padding.left + chartWidth / 2;
  const axisY = 40;

  return (
    <div className="w-full">
      {/* Tab 标签栏 */}
      <div className="flex flex-wrap gap-2 mb-6 justify-start">
        {data.map((dim) => {
          const isActive = dim.dimension === activeDimension;
          return (
            <button
              key={dim.dimension}
              onClick={() => onDimensionClick?.(dim.dimension)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dim.dimension}
            </button>
          );
        })}
      </div>

      {/* 横轴图卡片 */}
      {activeData && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
          <div className="text-sm font-medium text-green-600 mb-4">{activeDimension}</div>
          <div className="flex justify-center">
            <svg width={axisWidth} height={axisHeight}>
              {/* 横轴线 */}
              <line
                x1={padding.left}
                y1={axisY}
                x2={axisWidth - padding.right}
                y2={axisY}
                stroke="#e5e7eb"
                strokeWidth={1}
              />

              {/* 中间分隔线 */}
              <line
                x1={midX}
                y1={axisY - 25}
                x2={midX}
                y2={axisY + 25}
                stroke="#9ca3af"
                strokeWidth={1}
                strokeDasharray="4,2"
              />

              {/* 轴标签 */}
              <text x={padding.left - 5} y={axisY + 5} textAnchor="end" style={{ fontSize: '12px', fill: '#9ca3af' }}>
                差
              </text>
              <text x={axisWidth - padding.right + 5} y={axisY + 5} textAnchor="start" style={{ fontSize: '12px', fill: '#9ca3af' }}>
                好
              </text>

              {/* 气泡点 */}
              {activeData.points.map((point, idx) => {
                const x = padding.left + (point.score / 100) * chartWidth;
                const isHovered = hoveredPoint === point.label;
                const bubbleRadius = isHovered ? 10 : 8;
                const pointColor = point.type === 'positive' ? '#22c55e' : '#ef4444';

                return (
                  <g
                    key={idx}
                    onMouseEnter={() => setHoveredPoint(point.label)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* 气泡光晕 */}
                    <circle
                      cx={x}
                      cy={axisY}
                      r={bubbleRadius + 6}
                      fill={pointColor}
                      opacity={isHovered ? 0.2 : 0}
                      style={{ transition: 'all 0.2s ease' }}
                    />

                    {/* 气泡 */}
                    <circle
                      cx={x}
                      cy={axisY}
                      r={bubbleRadius}
                      fill={pointColor}
                      stroke="white"
                      strokeWidth={1.5}
                      style={{ transition: 'all 0.2s ease' }}
                    />

                    {/* 标签 - 交替上下显示避免重叠 */}
                    <text
                      x={x}
                      y={idx % 2 === 0 ? axisY - 20 : axisY + 28}
                      textAnchor="middle"
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        fill: '#374151',
                      }}
                    >
                      {point.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* 解析详情 */}
      {activeInterpretation && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-medium text-gray-800 mb-4">因素解析</div>

          <div className="space-y-4">
            {/* 解析总结 */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
              <div className="text-sm font-semibold text-gray-700 mb-2">解析总结</div>
              <p className="text-sm text-gray-600 leading-relaxed">{activeInterpretation.summary}</p>
            </div>

            {/* 负向因素 */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
              <div className="text-sm font-semibold text-red-600 mb-3">负向因素</div>
              <ul className="space-y-2">
                {activeInterpretation.negative.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 正向因素 */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <div className="text-sm font-semibold text-green-600 mb-3">正向因素</div>
              <ul className="space-y-2">
                {activeInterpretation.positive.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================
   辅助函数：将原始数据转换为 PunchCard 数据格式
   ============================================ */
export function transformToChartData(dimensionInterpretations: Record<string, {
  positive: string[];
  negative: string[];
}>): DimensionData[] {
  const dimensions = [
    '基本信息',
    '行业分析',
    '经营与资金',
    '融资与授用信',
    '价值贡献',
    '竞品业务渗透',
    '风险合规',
    '决策链',
    '我行业务渗透'
  ];

  return dimensions.map(dimension => {
    const data = dimensionInterpretations[dimension];
    if (!data) {
      return { dimension, points: [] };
    }

    const points: KeyPoint[] = [];

    // 处理正向内容 - 分布在右半边 (55-95)，间距更大
    data.positive.forEach((text, idx) => {
      const label = extractKeyLabel(text);
      // 均匀分布在 55-95 之间
      const totalPositive = data.positive.length;
      const score = totalPositive === 1 ? 75 : 55 + (idx / (totalPositive - 1)) * 40;
      points.push({ label, score: Math.min(95, score), type: 'positive' });
    });

    // 处理负向内容 - 分布在左半边 (5-45)，间距更大
    data.negative.forEach((text, idx) => {
      const label = extractKeyLabel(text);
      // 均匀分布在 5-45 之间
      const totalNegative = data.negative.length;
      const score = totalNegative === 1 ? 25 : 5 + (idx / (totalNegative - 1)) * 40;
      points.push({ label, score: Math.min(45, score), type: 'negative' });
    });

    return { dimension, points };
  });
}

// 提取关键标签（简化长文本）
function extractKeyLabel(text: string): string {
  let label = text.replace(/[（(][^）)]*[）)]/g, '');
  const commaIdx = Math.min(
    label.indexOf('，') > 0 ? label.indexOf('，') : 999,
    label.indexOf('、') > 0 ? label.indexOf('、') : 999,
    label.indexOf('；') > 0 ? label.indexOf('；') : 999
  );
  if (commaIdx < 999) {
    label = label.substring(0, commaIdx);
  }
  if (label.length > 10) {
    label = label.substring(0, 10) + '...';
  }
  return label.trim();
}
