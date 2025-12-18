'use client'

import ColumnSettings from "@/components/global/ColumnSettings";
import GlobalTable, { TColumnDef } from "@/components/global/GlobalTable";
import { TableNames } from "@/types/table";
import { TUser } from "@/types/user";
import { delay } from "@/utils/delay";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [users, setUsers] = useState<TUser[] >([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)


  const userColumns: TColumnDef<TUser>[] = [
    {
      id: 'name',
      header: 'User Name',
      cell:(row) => {
        return <p>{row?.name || 'N/A'}</p>
      },
      isVisible: true,
      canHide: false
    },
    {
      id: 'email',
      header: 'Email',
      cell:(row) => {
        return <p>{row?.email || 'N/A'}</p>
      },
      isVisible: true,
      canHide:false
    },
            {
      id: 'username',
      header: 'Username',
      cell:(row) => {
        return <p>{row?.username || 'N/A'}</p>
      },
      isVisible: true
    },
    {
      id: 'phone',
      header: 'Phone',
      cell:(row) => {
        return <p>{row?.phone || 'N/A'}</p>
      },
      isVisible: true
    },
    {
      id: 'address',
      header: 'Address',
      cell:(row) => {
        return <div className="space-y-1 text-sm">
          <p><span className="font-semibold">City:</span> {row?.address?.city || 'N/A'}</p>
          <p>Street: {row?.address?.street || 'N/A'}</p>
          <p>Zip Code: {row?.address?.zipcode || 'N/A'}</p>
        </div>
      },
      isVisible: true
    },
        {
      id: 'website',
      header: 'Website',
      cell:(row) => {
        return <Link className="text-blue-600 hover:underline" href={row?.website || '/'} target="_blank">{row?.website || 'N/A'}</Link>
      },
      isVisible: true
    },
        {
      id: 'company',
      header: 'Company',
      cell:(row) => {
        return <p>{row?.company?.name || 'N/A'}</p>
      },
      isVisible: true
    },

  ]

  const [columns, setColumns] = useState(userColumns)

  const fetchUsers = async (page: number = 1, limit: number =15) => {
    setLoading(true)
    await delay(1000)
    try{
      const res = await axios.get(`/api/users?page=${page}&limit=${limit}`)
      const data = res.data

      if(data){
        setUsers(prev => [...prev, ...(data.data || [])])
        setTotal(data?.pagination?.total)
        setHasMore(data?.pagination?.hasMore)
      }
      setLoading(false)
    }catch(error){
      console.log(error) 
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchUsers(page)
  },[page])


   useEffect(()=>{
    const syncStoredColumns = () => {
        const localStoreData = localStorage.getItem('table_colums')

        if(!localStoreData){
          return 
        }

        const localData = JSON.parse(localStoreData)
        const localStoredColumns:TColumnDef<TUser>[] = localData[TableNames.users_data_table]

        if(localStoredColumns){
          setColumns(prev => localStoredColumns?.map(col => {

            const matchedCol = prev.find(c => c.id === col.id)
            return {...col, cell: matchedCol?.cell || col.cell}
          }))
        }
    }

    syncStoredColumns()
   },[])


  return (
    <div className="max-w-7xl mx-auto py-5">
      <div className="py-3 flex gap-2 items-center justify-end">
      <ColumnSettings tableName={TableNames.users_data_table} columns={columns} setColumns={setColumns}/>
      </div>
        <GlobalTable
        onEndRow={() => setPage(prev => prev + 1)}
        tableName={TableNames.users_data_table}
        data={users}
        defaultColumns={columns}
        loading={loading}
        hasMore={hasMore}
        page={page}
        />
    </div>
  );
}
