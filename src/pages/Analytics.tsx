import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Users,
  FileText,
  PhoneCall,
  Clock,
  TrendingUp,
  CheckCircle,
  Sparkles,
  Image,
  Mic,
  File,
  AlertCircle,
  Zap
} from 'lucide-react';

// 环形进度条组件
function CircleProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = '#3b82f6',
  bgColor = '#e5e7eb',
  children
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const offset = circumference - progress * circumference;

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
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
          style={{ transition: 'all 0.5s' }}
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
    </div>
  );
}

// 今日数据指标
const todayMetrics = [
  { id: 'calls', label: '电话拨打量', value: 120, target: 150, unit: '次', icon: Phone, color: '#3b82f6' },
  { id: 'visits', label: '面访量', value: 6, target: 10, unit: '次', icon: Users, color: '#3b82f6' },
  { id: 'cases', label: '进件量', value: 7, target: 15, unit: '次', icon: FileText, color: '#3b82f6' },
  { id: 'effective', label: '有效电话量', value: 89, target: 120, unit: '次', icon: PhoneCall, color: '#3b82f6' },
  { id: 'duration', label: '通话总时长', value: 811, target: 1500, unit: '分', icon: Clock, color: '#3b82f6' },
  { id: 'avgDuration', label: '平均通话时长', value: 4, target: 10, unit: '分', icon: Clock, color: '#3b82f6' },
  { id: 'conversion', label: '进件转化率', value: 64, target: 85, unit: '%', icon: TrendingUp, color: '#3b82f6' },
  { id: 'approval', label: '审批通过率', value: 72, target: 88, unit: '%', icon: CheckCircle, color: '#3b82f6' }
];

// 最近活动
const recentActivities = [
  { id: '1', type: 'call', content: '跟 刘强 拨打电话', time: '1分钟前', highlight: '刘强' },
  { id: '2', type: 'image', content: '上传3张图片', time: '5小时前' },
  { id: '3', type: 'audio', content: '上传1段面访录音', time: '6小时前' },
  { id: '4', type: 'file', content: '上传1个文件', time: '6小时前' },
  { id: '5', type: 'call', content: '跟 王小青 拨打电话', time: '8小时前', highlight: '王小青' },
  { id: '6', type: 'call', content: '跟 李萌 拨打电话', time: '10小时前', highlight: '李萌' },
  { id: '7', type: 'file', content: '上传5个文件', time: '1天前' }
];

// AI 解读要点
const aiInsights = [
  { type: 'warning', text: '电话触达明显低于同组平均，拉低预测达成率。' },
  { type: 'warning', text: '首贷客户不足，高潜客户还停留在意向阶段。' },
  { type: 'success', text: '存量客户经营较好，为本月业绩提供了稳定底盘。' }
];

// 风险点
const riskPoints = [
  { time: "2'40\"", content: '提到了竞品花呗' },
  { time: "5'03\"", content: '客户认为我方利息过高' },
  { time: "6'23\"", content: '客户收入结构不稳定（兼职比例较高）' },
  { time: "6'48\"", content: '客户近半年负债率波动大' },
  { time: "7'03\"", content: '客户对审批时间表示担忧' }
];

// 商机点
const opportunityPoints = [
  { time: "3'20\"", content: '客户有购车计划，可推荐车贷' },
  { time: "8'15\"", content: '客户询问理财产品' },
  { time: "10'02\"", content: '客户提到家人也有贷款需求' }
];

const activityIcons: Record<string, React.ElementType> = {
  call: Phone,
  image: Image,
  audio: Mic,
  file: File
};

export default function Analytics() {
  const [selectedActivity, setSelectedActivity] = useState<string | null>('1');

  const currentPerformance = 73.44;
  const targetPerformance = 100;
  const progressPercent = (currentPerformance / targetPerformance) * 100;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 主内容区 */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* 第一行：当前业绩 + AI 解读 */}
        <div className="flex gap-6">
          {/* 当前业绩模块 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 flex-1"
          >
            <div className="text-sm text-gray-500 mb-2">当前业绩</div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-6xl font-bold text-gray-900">{currentPerformance}</span>
              <span className="text-base text-gray-400">万</span>
            </div>
            <div className="text-sm text-gray-500 mb-2">目标业绩{targetPerformance}万</div>
            {/* 进度条 */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden" style={{ maxWidth: '400px' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
              />
            </div>
          </motion.div>

          {/* AI 解读模块 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
            style={{ width: '380px', flexShrink: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-green-500" />
              <span className="text-sm font-medium text-green-600">AI 解读</span>
            </div>
            <ul className="space-y-3">
              {aiInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    insight.type === 'warning' ? 'bg-amber-500' : 'bg-green-500'
                  }`} />
                  <span className="text-sm text-gray-600">{insight.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 第二行：今日数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-sm text-gray-700 font-medium mb-4">今日数据</div>
          <div className="flex justify-between">
            {todayMetrics.map((metric) => {
              const Icon = metric.icon;
              const percent = (metric.value / metric.target) * 100;
              return (
                <div key={metric.id} className="flex flex-col items-center">
                  <CircleProgress
                    value={percent}
                    max={100}
                    size={64}
                    strokeWidth={4}
                    color="#3b82f6"
                    bgColor="#e5e7eb"
                  >
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                      <span style={{ fontSize: '12px' }} className="text-gray-400 ml-[2px]">{metric.unit}</span>
                    </div>
                  </CircleProgress>
                  <div className="text-xs text-gray-400">目标{metric.target}{metric.unit}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-600">
                    <Icon size={12} className="text-gray-400" />
                    <span>{metric.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 第三行：最近活动 + AI 解析 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-sm text-gray-700 font-medium mb-4">最近</div>
          <div className="grid grid-cols-2 gap-6">
            {/* 左侧 - 活动列表 */}
            <div className="space-y-1">
              {recentActivities.map((activity) => {
                const Icon = activityIcons[activity.type] || File;
                const isSelected = selectedActivity === activity.id;
                return (
                  <div
                    key={activity.id}
                    onClick={() => setSelectedActivity(activity.id)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isSelected ? 'text-blue-500' : 'text-gray-400'} />
                      <span className="text-sm text-gray-700">
                        {activity.highlight ? (
                          <>
                            跟 <span className="text-blue-600 font-medium">{activity.highlight}</span> 拨打电话
                          </>
                        ) : (
                          activity.content
                        )}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                );
              })}
            </div>

            {/* 右侧 - AI 解析 */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-green-500" />
                  <span className="text-sm font-medium text-green-600">AI 解析</span>
                </div>
                <button className="text-xs text-gray-400 hover:text-gray-600">原始录音</button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                立刻申请降息，给客户回拨，说降息政策，出3套房贷置换方案给客户。
              </p>

              {/* 时间轴标记 */}
              <div className="mb-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative h-6">
                    {/* 时间轴背景条 */}
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full" style={{ transform: 'translateY(-50%)' }}></div>
                    {/* 时间轴进度 */}
                    <div className="absolute top-1/2 left-0 h-1.5 bg-blue-300 rounded-full" style={{ transform: 'translateY(-50%)', width: '100%' }}></div>
                    {/* 风险点泡泡 */}
                    <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '20%' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '40%' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '55%' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '58%' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-red-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '62%' }}></div>
                    {/* 商机点泡泡 */}
                    <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '28%' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '72%' }}></div>
                    <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full border border-white shadow-sm" style={{ top: '50%', transform: 'translateY(-50%)', left: '88%' }}></div>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">11'20"</span>
                </div>
                {/* 图例 */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-[10px] text-gray-400">风险点</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[10px] text-gray-400">商机点</span>
                  </div>
                </div>
              </div>

              {/* 风险点 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <AlertCircle size={12} className="text-red-500" />
                    <span className="text-xs font-medium text-red-600">风险</span>
                  </div>
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{riskPoints.length}</span>
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {riskPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-gray-400 w-12 flex-shrink-0">{point.time}</span>
                      <span className="text-gray-600">{point.content}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 商机点 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Zap size={12} className="text-green-500" />
                    <span className="text-xs font-medium text-green-600">商机</span>
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">{opportunityPoints.length}</span>
                </div>
                <div className="space-y-1">
                  {opportunityPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-gray-400 w-12 flex-shrink-0">{point.time}</span>
                      <span className="text-gray-600">{point.content}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 立即行动按钮 */}
              <button className="w-full py-3 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-all">
                立即行动
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
