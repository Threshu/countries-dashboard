/**
 * Formats large numbers with thousand separators
 * @param population - Number to format
 * @returns Formatted number (e.g., "1,234,567")
 */
export function formatPopulation (population: number): string {
  return new Intl.NumberFormat('en-US').format(population);
}

/**
 * Formats monetary amount with currency symbol
 * @param amount - Amount to format
 * @param currencyCode - Currency code (e.g., "USD", "EUR", "PLN")
 * @returns Formatted amount (e.g., "$1,500.00", "€2,000.00")
 */
export function formatCurrency (amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch(error) {
    return `${currencyCode} ${formatPopulation(amount)}`;
  }
}
