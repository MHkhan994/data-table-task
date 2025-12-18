'use client'
import { Loader } from 'lucide-react'
import React, { ReactNode, useCallback, useRef } from 'react'

export type TColumnDef<T> = {
    id: keyof T,
    cell: (_:T | undefined) => ReactNode,
    header: ReactNode | string | ((_:T | undefined) => ReactNode)
    isVisible: boolean,
    canHide?: boolean
  
}

type TTableProps<T> = {
  data: T[],
  defaultColumns: TColumnDef<T>[]
  className?:string
  limit?: number,
  loading?: boolean
  tableName: string;
  onEndRow: () => void
  hasMore: boolean
  page: number
}


const GlobalTable = <T,>({data, defaultColumns, className, limit = 15, loading =false, onEndRow, hasMore=false, page}: TTableProps<T>) => {
  const visibleColumns = defaultColumns.filter(col => col.isVisible)

  const observer = useRef<IntersectionObserver | null>(null)

  const lastRowRef = useCallback((node: HTMLTableRowElement) => {
    if(loading || !hasMore){
      return
    }
    if(observer.current) observer.current?.disconnect()

      observer.current = new IntersectionObserver((entries => {
        if(entries[0].isIntersecting){
          onEndRow()
        }
      }))

      if(node) observer.current.observe(node)
  },[loading, onEndRow, hasMore])


  return (
    <div className={`w-full overflow-auto min-w-150 border rounded-md border-gray-200 max-h-[80vh] ${className}`}>
      <table className='w-full'>
        <thead className='shadow-md sticky top-0 z-50'>
          <tr className='bg-green-50'>
            {
              visibleColumns?.map((col, i)=> <th className='text-start text-sm px-4 py-3 text-gray-700' key={i}>
                {typeof col.header === 'function' ? col.header(data?.find((d, idx) => i === idx)) : col.header}
              </th>)
            }
          </tr>
        </thead>
       
          <tbody>
              {
                (loading && page === 1) ? 
                <>
                {
                  Array.from({length: limit})?.map((_, i) => <tr key={i}>
                    {
                      visibleColumns?.map(col => <td key={String(col.id)} className='px-4 py-1'>
                        <div className="animate-pulse bg-gray-300 rounded-xl flex items-center gap-4 p-3.5" ></div>
                      </td>)
                    }
                  </tr>)
                }
                </>
                :
                <>
                {
                data?.map((row, i) => 
            data.length - 1 === i ? <tr key={i} ref={lastRowRef}>                 
                  {
                    visibleColumns?.map((col, i) => <td className='px-4 py-2 text-gray-600' key={String(col.id)}>
                      {col?.cell?.(data?.find((d, idx) => i === idx))}
                    </td>)
                  }
            </tr>:
            <tr key={i}>                 
                  {
                    visibleColumns?.map((col, i) => <td className='px-4 py-2 text-gray-600' key={String(col.id)}>
                      {col?.cell?.(data?.find((d, idx) => i === idx))}
                    </td>)
                  }
            </tr>
                )
              }</>
              }

            
           
        </tbody>
      </table>
                {
                loading && page !== 1 && 
                <div className="flex w-full justify-center items-cente gap-2 mb-3" >
                  <Loader className='animate-spin'/>
                  Loading more...
                </div>
              }
    </div>
  )
}

export default GlobalTable

