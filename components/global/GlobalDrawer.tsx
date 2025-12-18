
'use client'
import React, { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const GlobalDrawer = ({ withCloseButton=true,open, setOpen, children}:{open: boolean, setOpen: (_: boolean) => void, children: ReactNode, withCloseButton?: boolean}) => {

    const bodyRef = useRef<null | HTMLDivElement>(null)

    
    useEffect(()=>{
        const handleOutsideClick = (e: MouseEvent) => {
            if(!e.target || !bodyRef.current || !open){
                return
            }
    
            if(!bodyRef.current.contains(e.target as Node)){
                setOpen(false)
            }
        }
        document.addEventListener('click', handleOutsideClick)

        return ()=> {
            return document.removeEventListener('click', handleOutsideClick)
        }
    },[open])

    const modalBody = <div className='fixed inset-0 z-999 bg-black/30 backdrop-blur-xs flex items-center justify-end'>
        <div ref={bodyRef} className='h-full w-80 bg-background relative'>
            {withCloseButton && <button onClick={()=> setOpen(false)} className='text-xs size-5 rounded-md bg-red-800 text-white flex items-center justify-center absolute right-1 top-1'>X</button>}
            {children}
        </div>
    </div>

  if(open){
    return createPortal(modalBody, document.body)
  }
  else{
    return <></>
  }
}

export default GlobalDrawer
