import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <main className="flex-1 overflow-hidden flex justify-center items-center">
            {children}
        </main>
    )
}
export default Layout
