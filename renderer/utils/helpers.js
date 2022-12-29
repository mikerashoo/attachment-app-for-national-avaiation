export const generatePaymentNo = (printId) => {
    return 'NA' + String(printId).padStart(6, '0');
  }