interface DisplayProps {
  value: string
  expression: string
}

export default function Display({ value, expression }: DisplayProps) {
  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="text-right">
        {expression && (
          <div className="text-gray-400 text-sm min-h-[1.5rem]">
            {expression}
          </div>
        )}
        <div className="text-4xl font-light mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {value}
        </div>
      </div>
    </div>
  )
}