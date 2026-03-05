import React from 'react';
import { useTheme } from '../../context/useTheme';
import { useActivity } from '../../context/ActivityContext';
import PortfolioExport from '../../components/PortfolioExport/PortfolioExport';

const PortfolioExportPage = () => {
  const { isDark } = useTheme();
  const { activities } = useActivity();

  // Portfolio data structure for export
  const portfolioData = {
    holdings: [],
    summary: {
      totalValue: 0,
      totalInvestment: 0,
      profitLoss: 0,
      returnPercentage: 0,
      totalAssets: 0,
      change24h: 0,
    },
    performance: {
      totalValue: 0,
      change24h: 0,
      change24hPercent: 0,
      totalProfitLoss: 0,
      returnPercent: 0,
      totalAssets: 0,
      topPerformers: [],
    },
    transactions: activities || [],
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Export Portfolio
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Download your portfolio data in CSV or PDF format for offline access and record keeping
        </p>
      </div>

      {/* Main Export Component */}
      <PortfolioExport portfolioData={portfolioData} />

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CSV Export Info */}
        <div
          className={`rounded-2xl p-6 border transition-all duration-300 ${
            isDark
              ? 'bg-[#14141f] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
              : 'bg-white border-gray-200 shadow-xl'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              CSV Format
            </h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Export your holdings, transactions, and performance data in CSV format. Perfect for Excel and spreadsheet analysis.
          </p>
        </div>

        {/* PDF Export Info */}
        <div
          className={`rounded-2xl p-6 border transition-all duration-300 ${
            isDark
              ? 'bg-[#14141f] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
              : 'bg-white border-gray-200 shadow-xl'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              PDF Report
            </h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate a professional PDF report with your complete portfolio overview, holdings breakdown, and recent transactions.
          </p>
        </div>

        {/* Privacy Info */}
        <div
          className={`rounded-2xl p-6 border transition-all duration-300 ${
            isDark
              ? 'bg-[#14141f] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
              : 'bg-white border-gray-200 shadow-xl'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              100% Private
            </h3>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            All exports are processed locally in your browser. Your data is never sent to our servers.
          </p>
        </div>
      </div>

      {/* Features List */}
      <div
        className={`rounded-2xl p-8 border transition-all duration-300 ${
          isDark
            ? 'bg-[#14141f] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
            : 'bg-white border-gray-200 shadow-xl'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          What You Can Export
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portfolio Holdings */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-[#00d9ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Portfolio Holdings
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Coin names, symbols, amounts, current prices, and portfolio percentages
                </p>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-[#00d9ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Transaction History
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Complete record of all buy/sell transactions with dates, amounts, and prices
                </p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-[#00d9ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Performance Report
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Portfolio value, profit/loss, ROI percentages, and top-performing assets
                </p>
              </div>
            </div>
          </div>

          {/* PDF Summary */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-[#00d9ff]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Complete PDF Report
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Professional summary combining portfolio overview, holdings, and recent transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div
        className={`rounded-2xl p-8 border transition-all duration-300 ${
          isDark
            ? 'bg-[rgba(0,217,255,0.05)] border-[rgba(0,217,255,0.1)]'
            : 'bg-cyan-50 border-cyan-200'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Use Cases
        </h2>
        <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          <li className="flex items-start gap-3">
            <span className="text-[#00d9ff] text-xl mt-1">•</span>
            <span>Share detailed portfolio reports with financial advisors or tax professionals</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d9ff] text-xl mt-1">•</span>
            <span>Maintain offline backups of your investment records</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d9ff] text-xl mt-1">•</span>
            <span>Analyze portfolio performance using spreadsheet tools</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d9ff] text-xl mt-1">•</span>
            <span>Generate tax documents for cryptocurrency transactions</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d9ff] text-xl mt-1">•</span>
            <span>Track investment history and performance trends over time</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioExportPage;
