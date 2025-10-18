export type Operation = '+' | '-' | '×' | '÷'

export interface CalculatorState {
  displayValue: string
  expression: string
  previousValue: number | null
  operation: Operation | null
  waitingForNewValue: boolean
}

export const calculate = (firstValue: number, secondValue: number, operation: Operation): number => {
  switch (operation) {
    case '+':
      return firstValue + secondValue
    case '-':
      return firstValue - secondValue
    case '×':
      return firstValue * secondValue
    case '÷':
      return secondValue !== 0 ? firstValue / secondValue : 0
    default:
      return secondValue
  }
}

export const formatNumber = (num: number): string => {
  const str = num.toString()
  if (str.includes('e')) {
    return num.toPrecision(10)
  }
  return str
}

export const isValidNumber = (str: string): boolean => {
  return !isNaN(parseFloat(str)) && isFinite(parseFloat(str))
}