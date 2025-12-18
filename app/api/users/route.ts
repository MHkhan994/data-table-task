import { users } from "@/lib/usersData"
import { NextRequest } from 'next/server';

export const GET = async(req: NextRequest) => {
    const defaultUsers = users
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')

    const numPage = page ? Number(page) : 1
    const numLimit = limit ? Number(limit): 15


    const startIndex = (numPage -1 ) * numLimit
    const endIndex = startIndex + numLimit

    const resUsers = defaultUsers.slice(startIndex, endIndex)
    const total = defaultUsers.length

    const hasMore = endIndex < total

    return new Response(JSON.stringify({
        data: resUsers,
        pagination: {
            limit: numLimit,
            page: numPage,
            total,
            hasMore
        }
    }), {
    headers: { 'Content-Type': 'application/json' },
  })
    
}