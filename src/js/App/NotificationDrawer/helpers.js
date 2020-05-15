export const calculateReadUnreadCount = (notificationsGroup) => notificationsGroup.reduce((acc, curr) => {
    const unreadNotifications = curr?.items?.filter(({ isRead }) => !isRead) || [];
    return {
        unreadCount: acc.unreadCount + unreadNotifications.length,
        readCount: acc.readCount + (curr.items.length - unreadNotifications.length)
    };
}, { unreadCount: 0, readCount: 0 });
