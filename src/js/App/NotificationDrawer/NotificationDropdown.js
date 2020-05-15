import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownItem, KebabToggle, DropdownPosition } from '@patternfly/react-core';

const NotificationDropdown = ({ actions }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dropdown
            onSelect={() => setIsOpen(false)}
            toggle={<KebabToggle onToggle={() => setIsOpen(!isOpen)} />}
            isOpen={isOpen}
            position={DropdownPosition.right}
            isPlain
            dropdownItems={actions.map((item, key) => (
                <DropdownItem
                    key={ item.value || key }
                    component="button"
                    onClick={ item.onClick }
                    {...item.props}
                >
                    {item.label}
                </DropdownItem>
            ))}
        />
    );
};

NotificationDropdown.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        onClick: PropTypes.func
    }))
};

export default NotificationDropdown;
