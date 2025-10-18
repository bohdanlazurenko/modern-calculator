import Button from './Button'

interface KeypadProps {
  onKeyPress: (key: string) => void
}

export default function Keypad({ onKeyPress }: KeypadProps) {
  const buttons = [
    ['C', 'DEL', '÷', '×'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '='],
  ]

  const getButtonVariant = (key: string): 'primary' | 'secondary' | 'operator' | 'equals' => {
    if (key === 'C' || key === 'DEL') return 'secondary'
    if (['÷', '×', '-', '+'].includes(key)) return 'operator'
    if (key === '=') return 'equals'
    return 'primary'
  }

  const getButtonSpan = (key: string, row: string[]): string => {
    if (row.length === 2 && key === '0') return 'col-span-2'
    if (row.length === 2 && key === '=') return 'col-span-2'
    return ''
  }

  return (
    <div className="p-4 bg-gray-50">
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-2 mb-2 last:mb-0">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              variant={getButtonVariant(key)}
              className={getButtonSpan(key, row)}
            >
              {key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}