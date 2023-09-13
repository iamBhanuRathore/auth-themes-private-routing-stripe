"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import { useTheme } from "next-themes"
import { Button } from '@nextui-org/react';
const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true)
    }, []);
    if (!mounted) return null
    return (
        <div className='flex space-x-3'>
            <Button onClick={() => setTheme("dark")}>Dark</Button>
            <Button onClick={() => setTheme("light")}>Light</Button>
            <Button onClick={() => setTheme("pink")}>Pink</Button>
        </div>
    )
}

export default ThemeSwitcher
