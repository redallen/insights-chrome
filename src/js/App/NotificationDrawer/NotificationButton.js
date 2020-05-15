import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessagesIcon } from '@patternfly/react-icons';
import { Button, Badge } from '@patternfly/react-core';
import { toggleDrawer } from '../../redux/actions';
import { calculateReadUnreadCount } from './helpers';
import './NotificationDrawer.scss';

const NotificationButton = () => {
    const dispatch = useDispatch();
    const notificationGroups = useSelector(({ chrome: { notifications } }) => notifications?.groups || {});
    const { unreadCount } = calculateReadUnreadCount(Object.values(notificationGroups));

    return (
        <Button variant="plain" onClick={() => dispatch(toggleDrawer())}>
            <MessagesIcon />
            <Badge className="ins-c-notification-drawer__badge" key={1} isRead>{unreadCount}</Badge>
        </Button>
    );
};

export default NotificationButton;
