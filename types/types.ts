export type EventType = {
    eventName: string,
    eventUrl: string | null,
    eventTime: string | null,
    eventDate: string
}

export type UserEventType = {
    event_date: string,
    event_name: string,
    event_time: string | null,
    event_url: string | null,
    id: number,
    user_id: number
}