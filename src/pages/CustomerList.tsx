import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  Building2,
  RefreshCw,
  FilePlus,
  Sparkles
} from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import type { CorporateCustomer, CustomerType } from '../data/mockData';

const customerTypeMap: Record<CustomerType, { label: string; color: string; icon: React.ElementType }> = {
  corporate: { label: '对公', color: 'bg-blue-100 text-blue-700', icon: Building2 },
  retail: { label: '零售', color: 'bg-purple-100 text-purple-700', icon: Building2 },
  individual: { label: '个体户', color: 'bg-orange-100 text-orange-700', icon: Building2 }
};

const customerLevelMap: Record<string, { color: string }> = {
  '战略客户': { color: 'bg-red-100 text-red-700' },
  '核心客户': { color: 'bg-orange-100 text-orange-700' },
  '有效客户': { color: 'bg-green-100 text-green-700' }
};

export default function CustomerList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [customerLevelFilter, setCustomerLevelFilter] = useState('all');

  // 只显示对公客户
  const corporateCustomers = mockCustomers.filter(c => c.customerType === 'corporate');

  const filteredCustomers = corporateCustomers.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
      customer.companyName.toLowerCase().includes(searchLower) ||
      customer.industry.toLowerCase().includes(searchLower) ||
      (customer.aiInsight && customer.aiInsight.toLowerCase().includes(searchLower)) ||
      (customer.needTags && customer.needTags.some(tag => tag.toLowerCase().includes(searchLower)));
    const matchesIndustry = industryFilter === 'all' || customer.industry === industryFilter;
    const matchesLevel = customerLevelFilter === 'all' || customer.customerLevel === customerLevelFilter;
    return matchesSearch && matchesIndustry && matchesLevel;
  });

  const industries = [...new Set(corporateCustomers.map((c) => c.industry))];

  const handleCustomerClick = (customer: CorporateCustomer) => {
    navigate(`/customers/${customer.id}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI 商机洞察</h1>
            <p className="text-sm text-gray-500 mt-1">
              共 {filteredCustomers.length} 条商机
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {new Date().toLocaleString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}{' '}
              更新
            </span>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* 筛选栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-4">
          {/* 搜索框 */}
          <div className="flex items-center flex-1 max-w-md border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent">
            <Search size={18} className="text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="搜索客户名称、行业、洞察、需求..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 0, outline: 0 }}
              className="w-full px-3 py-2 text-sm bg-transparent"
            />
          </div>

          {/* 客户类型筛选 */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-green-500">
            <select
              value={customerLevelFilter}
              onChange={(e) => setCustomerLevelFilter(e.target.value)}
              style={{ border: 0, outline: 0 }}
              className="appearance-none bg-transparent px-4 py-2 pr-2 text-sm cursor-pointer"
            >
              <option value="all">全部类型</option>
              <option value="战略客户">战略客户</option>
              <option value="核心客户">核心客户</option>
              <option value="有效客户">有效客户</option>
            </select>
            <ChevronDown size={16} className="text-gray-400 mr-3 flex-shrink-0" />
          </div>

          {/* 行业筛选 */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-green-500">
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              style={{ border: 0, outline: 0 }}
              className="appearance-none bg-transparent px-4 py-2 pr-2 text-sm cursor-pointer"
            >
              <option value="all">全部行业</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="text-gray-400 mr-3 flex-shrink-0" />
          </div>

          {/* AI 建档按钮 */}
          <button
            onClick={() => window.open('https://lanhuapp.com/link/#/invite?sid=qX0LWceD', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all"
          >
            <FilePlus size={16} />
            AI 建档
          </button>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {filteredCustomers.map((customer) => {
            const customerType = customerTypeMap[customer.customerType];
            const TypeIcon = customerType.icon;
            const levelStyle = customer.customerLevel ? customerLevelMap[customer.customerLevel] : null;

            // 根据客户类型设置不同的图标背景色
            const iconBgColor = customer.customerType === 'corporate'
              ? 'from-blue-500 to-blue-600'
              : customer.customerType === 'retail'
              ? 'from-purple-500 to-purple-600'
              : 'from-orange-500 to-orange-600';

            return (
              <div
                key={customer.id}
                onClick={() => handleCustomerClick(customer)}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer group"
              >
                {/* 第一行：企业名称、行业、客户类型、AI建档 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${iconBgColor} rounded-lg flex items-center justify-center`}>
                      <TypeIcon size={20} className="text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">
                        {customer.companyName}
                      </h3>
                      <span className="text-sm text-gray-500">{customer.industry}</span>
                      {customer.customerLevel && levelStyle && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelStyle.color}`}>
                          {customer.customerLevel}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('https://lanhuapp.com/link/#/invite?sid=qX0LWceD', '_blank');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium transition-all hover:bg-green-700"
                  >
                    <FilePlus size={14} />
                    AI 建档
                  </button>
                </div>

                {/* AI 核心洞察 */}
                {customer.aiInsight && (
                  <div className="mt-3 flex items-start gap-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg px-3 py-2">
                    <Sparkles size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{customer.aiInsight}</p>
                  </div>
                )}

                {/* 客户需求标签 */}
                {customer.needTags && customer.needTags.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400">客户需求:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {customer.needTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
