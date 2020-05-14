/* eslint-disable  */
import React, { useState, Fragment } from 'react';
import { Dropdown, DropdownItem, DropdownPosition, DropdownDirection,
    DropdownSeparator, KebabToggle, NotificationDrawer, NotificationDrawerBody, NotificationDrawerHeader, NotificationDrawerList,
    NotificationDrawerListItem, NotificationDrawerListItemBody, NotificationDrawerListItemHeader,
    Popover, PopoverPosition, Button, Badge,
    Drawer, DrawerPanelContent, DrawerContent, DrawerContentBody, DrawerPanelBody, DrawerHead, DrawerActions, DrawerCloseButton } from '@patternfly/react-core';
import { MessagesIcon } from '@patternfly/react-icons';
import './NotificationDrawer.scss';
import PropTypes from 'prop-types';

const dropdownItems = [
    <DropdownItem key="link">Link</DropdownItem>,
    <DropdownItem key="action" component="button">
        Action
      </DropdownItem>,
    <DropdownSeparator key="separator" />,
    <DropdownItem key="disabled link" isDisabled>
        Disabled Link
      </DropdownItem>
];


const BasicNotificationDrawer = (props) => {

    const [showDrawer, setShowDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('');
    const [notifications, setNotifications] = useState([{description: 'awesome stuff happened', timestamp: '10 minutes ago', title: "Something happened!"}]);

    const onToggle = isOpen => setOpen(isOpen);
    const onFocus = id => {
        if (id) {
            const element = document.getElementById(id);
            element.focus();
        }
    }
    const onSelect = event => {
        setOpen(!open);
        setActive('');
        onFocus(event.target.id);

    }
    const onClick = event => {
        setActive(event.target.id);
        onFocus(event.target.id);
    }

    const panelContent = (
        <DrawerPanelContent>
            <DrawerHead>
                <NotificationDrawer
                    className="ins-c-notification-drawer"
                >
                    <NotificationDrawerHeader count={notifications.length}>
                        <Dropdown
                            onClick={onClick}
                            onSelect={onSelect}
                            toggle={<KebabToggle onToggle={onToggle} id="toggle-id-basic" />}
                            isOpen={open && active === 'toggle-id-basic'}
                            isPlain
                            dropdownItems={dropdownItems}
                            id="notification-0"
                            position={DropdownPosition.right}
                        />
                    </NotificationDrawerHeader>
                    <NotificationDrawerBody
                        className="ins-c-notification-drawer__body"
                    >
                        <NotificationDrawerList>
                            {notifications.map(notification => (
                                <NotificationDrawerListItem variant="info">
                                    <NotificationDrawerListItemHeader variant="info" title={notification.title || 'Title'} srTitle="Info notification:">
                                        <Dropdown
                                            position={DropdownPosition.right}
                                            onClick={onClick}
                                            onSelect={onSelect}
                                            toggle={<KebabToggle onToggle={onToggle} id="toggle-id-1" />}
                                            isOpen={open && active === 'toggle-id-1'}
                                            isPlain
                                            dropdownItems={dropdownItems}
                                            id="notification-1"
                                        />
                                    </NotificationDrawerListItemHeader>
                                    <NotificationDrawerListItemBody timestamp={notification.timestamp}>
                                        {notification.description || 'Description'}
                                    </NotificationDrawerListItemBody>
                                </NotificationDrawerListItem>
                            ))}
                        </NotificationDrawerList>
                    </NotificationDrawerBody>
                </NotificationDrawer>
            </DrawerHead>
        </DrawerPanelContent>);

   
    return (
        <React.Fragment>
            <Button variant="plain" onClick={() => setShowDrawer(!showDrawer)}>
                <MessagesIcon />
                <Badge className="ins-c-notification-drawer__badge" key={1} isRead>{notifications.length}</Badge>
            </Button>
            <Drawer isExpanded={showDrawer}>
                <DrawerContent panelContent={panelContent}>
                    <DrawerContentBody/>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
}

NotificationDrawer.propTypes = {
    notifications: PropTypes.array,
    open: PropTypes.bool,
    active: PropTypes.string
};

export default BasicNotificationDrawer;
