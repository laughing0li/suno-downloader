// components/NotificationListener.tsx
'use client'

import { useEffect, useState } from 'react'

type Notification = {
    message: string
}

export default function NotificationListener() {
    const [notifications, setNotifications] = useState<Notification[]>([])

    useEffect(() => {
        const clientId = 'client_' + Math.random().toString(36).substr(2, 9)
        const eventSource = new EventSource(`/api/sse?clientId=${clientId}`)

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setNotifications((prev) => [...prev, data])
        }

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <div>
            <h2>Notifications</h2>
            {notifications.map((notification, index) => (
                <p key={index}>{notification.message}</p>
            ))}
        </div>
    )
}