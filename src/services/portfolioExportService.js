import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export portfolio holdings to CSV
 * @param {Array} holdings - Array of holdings with coin data
 * @param {Object} portfolioSummary - Summary data including total value, balance
 * @returns {void} Downloads CSV file
 */
export const exportHoldingsToCSV = (holdings, portfolioSummary) => {
  if (!holdings || holdings.length === 0) {
    alert('No holdings to export');
    return;
  }

  const headers = ['Coin Name', 'Symbol', 'Amount', 'Current Price', 'Total Value', 'Percentage of Portfolio'];
  const rows = holdings.map((holding) => [
    holding.name || 'N/A',
    holding.symbol?.toUpperCase() || 'N/A',
    holding.amount?.toFixed(8) || '0',
    holding.currentPrice?.toFixed(2) || '0',
    (holding.amount * holding.currentPrice)?.toFixed(2) || '0',
    holding.percentage?.toFixed(2) + '%' || '0%',
  ]);

  // Add summary section
  rows.push([]);
  rows.push(['Portfolio Summary']);
  rows.push(['Total Portfolio Value', '', '', '', portfolioSummary?.totalValue?.toFixed(2) || '0', '']);
  rows.push(['Total Investment', '', '', '', portfolioSummary?.totalInvestment?.toFixed(2) || '0', '']);
  rows.push(['Profit/Loss', '', '', '', portfolioSummary?.profitLoss?.toFixed(2) || '0', '']);
  rows.push(['Return %', '', '', '', portfolioSummary?.returnPercentage?.toFixed(2) + '%' || '0%', '']);

  let csvContent = headers.join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  downloadFile(csvContent, `portfolio-holdings-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
};

/**
 * Export transaction history to CSV
 * @param {Array} transactions - Array of transaction records
 * @returns {void} Downloads CSV file
 */
export const exportTransactionsToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    alert('No transactions to export');
    return;
  }

  const headers = ['Date', 'Type', 'Coin', 'Amount', 'Price per Unit', 'Total Value', 'Status'];
  const rows = transactions.map((tx) => {
    const date = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A';
    return [
      date,
      tx.type?.toUpperCase() || 'N/A',
      tx.coinName || 'N/A',
      tx.amount?.toFixed(8) || '0',
      tx.pricePerUnit?.toFixed(2) || '0',
      (tx.amount * tx.pricePerUnit)?.toFixed(2) || '0',
      tx.status || 'Completed',
    ];
  });

  let csvContent = headers.join(',') + '\n';
  rows.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  downloadFile(csvContent, `transaction-history-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
};

/**
 * Export performance report to CSV
 * @param {Object} performanceData - Performance metrics
 * @returns {void} Downloads CSV file
 */
export const exportPerformanceToCSV = (performanceData) => {
  let csvContent = 'Portfolio Performance Report\n';
  csvContent += `Generated: ${new Date().toLocaleString()}\n\n`;

  csvContent += 'Performance Metrics\n';
  csvContent += 'Metric,Value\n';
  csvContent += `Total Portfolio Value,$${performanceData?.totalValue?.toFixed(2) || '0'}\n`;
  csvContent += `24h Change,$${performanceData?.change24h?.toFixed(2) || '0'}\n`;
  csvContent += `24h Change %,${performanceData?.change24hPercent?.toFixed(2) || '0'}%\n`;
  csvContent += `Total Profit/Loss,$${performanceData?.totalProfitLoss?.toFixed(2) || '0'}\n`;
  csvContent += `Return %,${performanceData?.returnPercent?.toFixed(2) || '0'}%\n`;
  csvContent += `Total Assets,${performanceData?.totalAssets || '0'}\n`;

  if (performanceData?.topPerformers && performanceData.topPerformers.length > 0) {
    csvContent += '\n\nTop Performers\n';
    csvContent += 'Coin,Performance %\n';
    performanceData.topPerformers.forEach((coin) => {
      csvContent += `${coin.name || 'N/A'},${coin.performance?.toFixed(2) || '0'}%\n`;
    });
  }

  downloadFile(csvContent, `performance-report-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
};

/**
 * Export portfolio overview to PDF
 * @param {Object} data - Complete portfolio data
 * @returns {void} Downloads PDF file
 */
export const exportPortfolioToPDF = (data) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Title
  doc.setFontSize(24);
  doc.setTextColor(0, 217, 255);
  doc.text('Portfolio Report', pageWidth / 2, yPosition, { align: 'center' });

  // Date
  yPosition += 15;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: 'center' });

  // Portfolio Summary Section
  yPosition += 20;
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Portfolio Summary', 20, yPosition);

  const summaryData = [
    ['Total Portfolio Value', `$${data?.summary?.totalValue?.toFixed(2) || '0'}`],
    ['Total Investment', `$${data?.summary?.totalInvestment?.toFixed(2) || '0'}`],
    ['Profit/Loss', `$${data?.summary?.profitLoss?.toFixed(2) || '0'}`],
    ['Return %', `${data?.summary?.returnPercentage?.toFixed(2) || '0'}%`],
    ['Total Assets', `${data?.summary?.totalAssets || '0'}`],
    ['24h Change', `$${data?.summary?.change24h?.toFixed(2) || '0'}`],
  ];

  yPosition += 10;
  doc.autoTable({
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'striped',
    headStyles: { fillColor: [0, 217, 255], textColor: 255 },
    margin: { left: 20, right: 20 },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // Holdings Table
  if (data?.holdings && data.holdings.length > 0) {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Holdings', 20, yPosition);

    const holdingsData = data.holdings.map((holding) => [
      holding.name,
      holding.symbol?.toUpperCase(),
      holding.amount?.toFixed(8),
      `$${holding.currentPrice?.toFixed(2)}`,
      `$${(holding.amount * holding.currentPrice)?.toFixed(2)}`,
      `${holding.percentage?.toFixed(2)}%`,
    ]);

    yPosition += 10;
    doc.autoTable({
      startY: yPosition,
      head: [['Coin Name', 'Symbol', 'Amount', 'Current Price', 'Total Value', '%']],
      body: holdingsData,
      theme: 'striped',
      headStyles: { fillColor: [0, 217, 255], textColor: 255 },
      margin: { left: 20, right: 20 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 35 },
        4: { cellWidth: 35 },
        5: { cellWidth: 15 },
      },
    });

    yPosition = doc.lastAutoTable.finalY + 15;
  }

  // Transaction History
  if (data?.transactions && data.transactions.length > 0) {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Recent Transactions', 20, yPosition);

    const transactionData = data.transactions.slice(0, 10).map((tx) => [
      new Date(tx.timestamp).toLocaleDateString(),
      tx.type?.toUpperCase(),
      tx.coinName,
      tx.amount?.toFixed(8),
      `$${tx.pricePerUnit?.toFixed(2)}`,
      `$${(tx.amount * tx.pricePerUnit)?.toFixed(2)}`,
    ]);

    yPosition += 10;
    doc.autoTable({
      startY: yPosition,
      head: [['Date', 'Type', 'Coin', 'Amount', 'Price/Unit', 'Total']],
      body: transactionData,
      theme: 'striped',
      headStyles: { fillColor: [0, 217, 255], textColor: 255 },
      margin: { left: 20, right: 20 },
    });
  }

  // Footer
  const footerY = pageHeight - 10;
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`Page ${doc.internal.pages.length - 1}`, pageWidth / 2, footerY, { align: 'center' });

  // Save PDF
  doc.save(`portfolio-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * Helper function to download file
 * @param {string} content - File content
 * @param {string} filename - Filename for download
 * @param {string} mimeType - MIME type of the file
 */
const downloadFile = (content, filename, mimeType) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
