"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const HomePage = () => {
    const router = useRouter();
    return (
        <div>
            HomePage
            <button onClick={() => router.push("/")}>Back to main Page</button>
        </div>
    )
}

export default HomePage
