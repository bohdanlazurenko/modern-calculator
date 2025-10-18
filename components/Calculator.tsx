'use client'

import { useState } from 'react'
import Display from './Display'
import Keypad from './Keypad'

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState('0')
  const [expression, setExpression] = useState('')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplayValue(num)
      setWaitingForNewValue(false)
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplayValue('0.')
      setWaitingForNewValue(false)
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.')
    }
  }

  const clear = () => {
    setDisplayValue('0')
    setExpression('')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const deleteLastChar = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1))
    } else {
      setDisplayValue('0')
    }
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(displayValue)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplayValue(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
    setExpression(`${displayValue} ${nextOperation}`)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
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

  const performEquals = () => {
    const inputValue = parseFloat(displayValue)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplayValue(String(newValue))
      setExpression('')
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleKeyPress = (key: string) => {
    if (/[0-9]/.test(key)) {
      inputNumber(key)
    } else if (key === '.') {
      inputDecimal()
    } else if (key === 'C') {
      clear()
    } else if (key === 'DEL') {
      deleteLastChar()
    } else if (['+', '-', '×', '÷'].includes(key)) {
      performOperation(key)
    } else if (key === '=') {
      performEquals()
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <Display value={displayValue} expression={expression} />
      <Keypad onKeyPress={handleKeyPress} />
    </div>
  )
}