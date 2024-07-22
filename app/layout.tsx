import '@/styles/tailwind.css'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

function Layout({
    children
}: Props) {
    return children 
}
export default Layout