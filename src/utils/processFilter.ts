export default (filters: Record<string, boolean>) => {
  const options: any = {}

  if (filters.filter_expenses && filters.filter_incomes) {
    options.type = ['EXPENSE', 'INCOME']
  } else if (filters.filter_expenses) {
    options.type = 'EXPENSE'
  } else {
    options.type = 'INCOME'
  }
  
  return options
}