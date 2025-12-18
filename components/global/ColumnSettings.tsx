'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import GlobalDrawer from './GlobalDrawer'
import { TColumnDef } from './GlobalTable'
import { GripVertical } from 'lucide-react'
import { TableNames } from '@/types/table'
import { ReactSortable } from "react-sortablejs";

const ColumnSettings = <T,>(
    {columns, setColumns, tableName}
    :{
    columns: TColumnDef<T>[],
    setColumns: Dispatch<SetStateAction<TColumnDef<T>[]>>
    tableName: TableNames
    }
    ) => {
      const [drawerOpen, setDrawerOpen] = useState(false)
      const [thisColumns, setThisColumns] = useState(columns)
    const isAllSelected = !thisColumns?.some(c => c.isVisible === false)

    const handleChange = (id: keyof T, checked:boolean)=>{
        const newColumns = thisColumns?.map(col => ({...col, isVisible: col.id === id ? checked: col.isVisible}))
        setThisColumns(newColumns)
    }

    useEffect(()=>{
        setThisColumns(columns)
    },[columns])

    const handleApply = () => {
        setColumns(thisColumns)
        const localStoreData = localStorage.getItem('table_colums')

        if(!localStoreData){
          localStorage.setItem('table_colums', JSON.stringify({
            [tableName]: thisColumns
          }))
        }else{
            const localData = JSON.parse(localStoreData)
            localStorage.setItem('table_colums', JSON.stringify({
            ...localData,
            [tableName]: thisColumns
          }))
        }

        setDrawerOpen(false)
    }

    const handleToggleAll = () => {
        if(isAllSelected){
            setThisColumns(prev => prev.map(col => ({...col, isVisible: col.canHide === false ? true: false})))
        }else{
            setThisColumns(prev => prev.map(col => ({...col, isVisible: true})))
        }
    }

  return (
    <div>
        <button className='bg-orange-600 text-white px-4 py-2 rounded-md' onClick={() => setDrawerOpen(true)}>Table Columns</button>
        <GlobalDrawer open={drawerOpen} withCloseButton={false} setOpen={()=>{
            setDrawerOpen(false)
            setThisColumns(columns)
        }}>
          <div className='flex flex-col h-full'>
              <div className="border-b border-gray-200 flex items-center justify-between p-4">
                <h3 className="font-semibold text-lg text-gray-700">Table columns</h3>
                <button className="cursor-pointer" onClick={() =>setDrawerOpen(false)}>X</button>
              </div>
              <div className="p-4 flex-1">
                  <div className='flex gap-2'>
                    <input onChange={handleToggleAll} id="select-all" type="checkbox" checked={isAllSelected}></input>
                    <label className='cursor-pointer' htmlFor="select-all">Select all</label>
                  </div>

                  <div className='mt-4 space-y-2.5'>
                    <ReactSortable list={thisColumns as any} setList={setThisColumns as any}>
                        {
                        thisColumns?.map(col => 
                        <div key={String(col.id)} className='flex gap-2'>
                            <button className='cursor-pointer'><GripVertical size={18}/></button>
                            <input disabled={col.canHide === false} onChange={(e)=> handleChange(col.id, Boolean(e.target.checked))} id={String(col.id)} type="checkbox" checked={col.isVisible}></input>
                            <label className='cursor-pointer' htmlFor={String(col.id)}>
                                {
                                    typeof col.header === 'function' ? col.header(undefined): col.header
                                }
                            </label>
                        </div>
                        )
                    }
                    </ReactSortable>
                  </div>
              </div>

              <div className='mt-auto border-t border-gray-300 w-full flex items-center justify-center gap-3 p-4'>
                    <button onClick={handleApply} className='bg-green-700 w-full border border-green-800 text-white py-2 cursor-pointer rounded-lg'>Apply</button>
                    <button onClick={()=> {
                        setDrawerOpen(false)
                        setThisColumns(columns)
                    }} className='bg-background cursor-pointer w-full border border-gray-400 py-2 rounded-lg' >Cancel</button>
              </div>
          </div>
        </GlobalDrawer>
    </div>
  )
}

export default ColumnSettings
