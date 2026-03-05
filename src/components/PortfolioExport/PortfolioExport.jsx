import React, { useState } from 'react';
import { useTheme } from '../../context/useTheme';
import { useActivity } from '../../context/ActivityContext';
import {
  exportHoldingsToCSV,
  exportTransactionsToCSV,
  exportPerformanceToCSV,
  exportPortfolioToPDF,
} from '../../services/portfolioExportService';
import toast from 'react-hot-toast';
import './PortfolioExport.css';

const PortfolioExport = ({ portfolioData }) => {
  const { isDark } = useTheme();
  const { activities } = useActivity();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportHoldingsCSV = () => {
    try {
      setIsExporting(true);
      const holdings = portfolioData?.holdings || [];
      const summary = portfolioData?.summary || {};
      exportHoldingsToCSV(holdings, summary);
      toast.success('Holdings exported to CSV');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export holdings');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportTransactionsCSV = () => {
    try {
      setIsExporting(true);
      const transactions = activities || [];
      if (transactions.length === 0) {
        toast.error('No transactions to export');
        return;
      }
      exportTransactionsToCSV(transactions);
      toast.success('Transactions exported to CSV');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export transactions');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPerformanceCSV = () => {
    try {
      setIsExporting(true);
      const performanceData = portfolioData?.performance || {};
      exportPerformanceToCSV(performanceData);
      toast.success('Performance report exported to CSV');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export performance report');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportFullReportPDF = () => {
    try {
      setIsExporting(true);
      const data = {
        summary: portfolioData?.summary || {},
        holdings: portfolioData?.holdings || [],
        transactions: activities || [],
        performance: portfolioData?.performance || {},
      };
      exportPortfolioToPDF(data);
      toast.success('Full report exported to PDF');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PDF report');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 ${
        isDark
          ? 'bg-[#14141f] border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
          : 'bg-white border-gray-200 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[rgba(0,217,255,0.1)] border border-[rgba(0,217,255,0.2)] flex items-center justify-center shadow-lg">
          <svg
            className="w-6 h-6 text-[#00d9ff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Export Portfolio
        </h2>
      </div>

      <p className={`mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Download your portfolio data in various formats
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleExportHoldingsCSV}
          disabled={isExporting}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] text-[#00d9ff] border border-[rgba(0,217,255,0.3)]'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Holdings CSV
        </button>

        <button
          onClick={handleExportTransactionsCSV}
          disabled={isExporting}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] text-[#00d9ff] border border-[rgba(0,217,255,0.3)]'
              : 'bg-green-50 hover:bg-green-100 text-green-600 border border-green-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Transactions CSV
        </button>

        <button
          onClick={handleExportPerformanceCSV}
          disabled={isExporting}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-[rgba(0,217,255,0.1)] hover:bg-[rgba(0,217,255,0.2)] text-[#00d9ff] border border-[rgba(0,217,255,0.3)]'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Performance CSV
        </button>

        <button
          onClick={handleExportFullReportPDF}
          disabled={isExporting}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
            isDark
              ? 'bg-[rgba(255,59,48,0.1)] hover:bg-[rgba(255,59,48,0.2)] text-[#ff3b30] border border-[rgba(255,59,48,0.3)]'
              : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Full Report PDF
        </button>
      </div>

      <div className={`mt-6 p-4 rounded-lg text-sm ${isDark ? 'bg-[rgba(0,217,255,0.05)] text-gray-300' : 'bg-blue-50 text-gray-700'}`}>
        <p>
          <strong>Note:</strong> Your portfolio data is exported directly from your browser. No data is stored on our servers. Ensure your data is current before exporting.
        </p>
      </div>
    </div>
  );
};

export default PortfolioExport;
