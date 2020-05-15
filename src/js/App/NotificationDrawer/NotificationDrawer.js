/* eslint-disable  */
import React, { useState, Fragment } from 'react';
import { NotificationDrawer, NotificationDrawerBody, NotificationDrawerHeader, NotificationDrawerList,
    NotificationDrawerListItem, NotificationDrawerListItemBody, NotificationDrawerListItemHeader,
    NotificationDrawerGroupList, NotificationDrawerGroup,
    DrawerPanelContent, DrawerHead } from '@patternfly/react-core';
import { useSelector, useDispatch } from 'react-redux'
import { markAsRead, deleteNotification } from '../../redux/actions';
import NotificationDropdown from './NotificationDropdown';
import './NotificationDrawer.scss';

const calculateReadUnreadCount = (notificationsGroup) => notificationsGroup.reduce((acc, curr) => {
    const unreadNotifications = curr?.items?.filter(({ isRead }) => !isRead) || [];
    return {
        unreadCount: acc.unreadCount + unreadNotifications.length,
        readCount: acc.readCount + (curr.items.length - unreadNotifications.length)
    }
}, { unreadCount: 0, readCount: 0 })

const BasicNotificationDrawer = () => {
    const dispatch = useDispatch();
    const [openedGroups, setOpenedGroups] = useState([]);

    const notificationGroups = useSelector(({ chrome: { notifications } }) => notifications?.groups || {});

    const onGroupToggle = (isOpen, groupName) => {
        setOpenedGroups(
            isOpen ?
                [...openedGroups, groupName] :
                openedGroups.filter(item => item !== groupName)
        );
    }

    const { unreadCount } = calculateReadUnreadCount(Object.values(notificationGroups));
   
    return (
        <DrawerPanelContent className="ins-c-notification-drawer">
            <DrawerHead>
                <NotificationDrawer className="ins-c-notification-drawer">
                    <NotificationDrawerHeader count={ unreadCount !== 0 ? unreadCount : 'None' }>
                    <NotificationDropdown
                        actions={[
                            {
                                label: 'Mark all as read',
                                onClick: () => dispatch(markAsRead(undefined, undefined, true))
                            },
                            {
                                label: 'Remove all notifications',
                                onClick: () => dispatch(deleteNotification(undefined, undefined, true))
                            }
                        ]}
                    />
                    </NotificationDrawerHeader>
                    <NotificationDrawerBody className="ins-c-notification-drawer__body">
                        <NotificationDrawerGroupList>
                            {Object.values(notificationGroups).map((item, key) => (
                                item?.items?.length !== 0 ? <NotificationDrawerGroup
                                    key={item?.groupName || key}
                                    title={item?.title}
                                    isExpanded={openedGroups.includes(item?.groupName || key)}
                                    count={item?.items?.filter(({ isRead }) => !isRead)?.length || 0}
                                    onExpand={(_e, value) => onGroupToggle(value, item?.groupName || key)}
                                >
                                    <NotificationDrawerList isHidden={!openedGroups.includes(item?.groupName || key)}>
                                        {(item?.items || []).map((notification, notifiationKey) => (
                                            <NotificationDrawerListItem
                                                onClick={() => dispatch(markAsRead(
                                                    item?.groupName || key,
                                                    notifiationKey
                                                ))}
                                                key={ notifiationKey }
                                                variant={ notification?.type || 'info' }
                                                isRead={ notification?.isRead || false }
                                            >
                                                { notification.header && (
                                                    <NotificationDrawerListItemHeader
                                                        variant={ notification?.type || 'info' }
                                                        title={ notification.header }
                                                        srTitle={ `${notification?.type || 'info'} notification:` }
                                                    >
                                                        <NotificationDropdown
                                                            actions={[
                                                                {
                                                                    label: 'Delete',
                                                                    onClick: () => dispatch(deleteNotification(
                                                                        item?.groupName || key,
                                                                        notifiationKey
                                                                    ))
                                                                },
                                                                {
                                                                    label: 'Mark as read',
                                                                    onClick: () => dispatch(markAsRead(
                                                                        item?.groupName || key,
                                                                        notifiationKey
                                                                    ))
                                                                },
                                                                ...item?.actionUrl ? [{
                                                                    label: 'Action',
                                                                    onClick: () => location.href = item.actionUrl
                                                                }] : []
                                                            ]}
                                                        />
                                                    </NotificationDrawerListItemHeader>
                                                ) }
                                                { notification.body && (
                                                    <NotificationDrawerListItemBody
                                                        timestamp={ notification.timestamp }
                                                    >
                                                        { notification.body }
                                                </NotificationDrawerListItemBody>
                                                ) }
                                            </NotificationDrawerListItem>
                                        ))}
                                    </NotificationDrawerList>
                                </NotificationDrawerGroup> : <Fragment />
                            ))}
                        </NotificationDrawerGroupList>
                    </NotificationDrawerBody>
                </NotificationDrawer>
            </DrawerHead>
        </DrawerPanelContent>
    );
}

export default BasicNotificationDrawer;
