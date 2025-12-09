import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ChevronDown,
  Building2,
  Phone,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { mockCustomers } from '../data/mockData';
import type { CorporateCustomer } from '../data/mockData';

const statusMap = {
  pending: { label: '待跟进', color: 'bg-orange-100 text-orange-700' },
  following: { label: '跟进中', color: 'bg-blue-100 text-blue-700' },
  applying: { label: '进件中', color: 'bg-purple-100 text-purple-700' },
  approved: { label: '已批复', color: 'bg-green-100 text-green-700' },
  rejected: { label: '已拒绝', color: 'bg-red-100 text-red-700' }
};

const riskMap = {
  low: { label: '低风险', color: 'text-green-600', icon: CheckCircle },
  medium: { label: '中风险', color: 'text-yellow-600', icon: AlertTriangle },
  high: { label: '高风险', color: 'text-red-600', icon: AlertTriangle }
};

export default function CustomerList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.companyName.includes(searchTerm) ||
      customer.industry.includes(searchTerm) ||
      customer.legalRepresentative.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || customer.industry === industryFilter;
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const industries = [...new Set(mockCustomers.map((c) => c.industry))];

  const handleCustomerClick = (customer: CorporateCustomer) => {
    navigate(`/customers/${customer.id}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 顶部标题栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">客户触达</h1>
            <p className="text-sm text-gray-500 mt-1">
              共 {filteredCustomers.length} 家对公客户
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
              placeholder="搜索企业名称、行业、法人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 0, outline: 0 }}
              className="w-full px-3 py-2 text-sm bg-transparent"
            />
          </div>

          {/* 状态筛选 */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-green-500">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ border: 0, outline: 0 }}
              className="appearance-none bg-transparent px-4 py-2 pr-2 text-sm cursor-pointer"
            >
              <option value="all">全部状态</option>
              <option value="pending">待跟进</option>
              <option value="following">跟进中</option>
              <option value="applying">进件中</option>
              <option value="approved">已批复</option>
              <option value="rejected">已拒绝</option>
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

          {/* 更多筛选 */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            更多筛选
          </button>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {filteredCustomers.map((customer) => {
            const status = statusMap[customer.status];
            const risk = riskMap[customer.riskLevel];
            const RiskIcon = risk.icon;

            return (
              <div
                key={customer.id}
                onClick={() => handleCustomerClick(customer)}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-green-300 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  {/* 左侧企业信息 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Building2 size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {customer.companyName}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                            {status.label}
                          </span>
                          <span className={`flex items-center gap-1 text-xs ${risk.color}`}>
                            <RiskIcon size={14} />
                            {risk.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{customer.industry}</span>
                          <span>·</span>
                          <span>注册资本 {customer.registeredCapital}</span>
                          <span>·</span>
                          <span>成立于 {customer.establishedYear} 年</span>
                        </div>
                      </div>
                    </div>

                    {/* 详细信息 */}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">法人代表</span>
                        <span className="text-gray-700">{customer.legalRepresentative}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">
                          {customer.contactPerson} {customer.contactPhone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp size={14} className="text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">授信额度 {customer.creditAmount}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="text-gray-700">{customer.address}</span>
                    </div>

                    {/* 标签和产品 */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 whitespace-nowrap">已有产品:</span>
                        <div className="flex flex-wrap gap-1">
                          {customer.existingProducts.map((product) => (
                            <span
                              key={product}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs whitespace-nowrap"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 whitespace-nowrap">标签:</span>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右侧跟进信息 */}
                  <div className="flex flex-col items-end gap-2 ml-6">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>最近跟进: {customer.lastContactTime}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      累计跟进 {customer.contactCount} 次
                    </div>
                    <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all hover:bg-green-600">
                      查看详情
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
