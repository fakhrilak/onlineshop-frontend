import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ToggleButton.css'
import { Socket } from '../../config/API';

const CheckedIcon = () => <>Off</>;
const UncheckedIcon = () => <>On</>;

const ToggleButton = ( props ) => {
    const {data} = props
    console.log(props)
    const [toggle, setToggle] = useState(data.value_actuator);
    const { defaultChecked, onChange, disabled, className } = props;

    useEffect(() => {
        if (defaultChecked) {
            setToggle(defaultChecked)
        }
    }, [defaultChecked]);

    const triggerToggle = () => {
        if ( disabled ) {
            return;
        }
        setToggle(!toggle);
        const data ={
            id : props.data._id,
            userId: props.data.UserId,
            value : toggle
        }
        Socket.emit("actuator",data)
        if ( typeof onChange === 'function' ) {
            onChange(!toggle);
        }
    }

    const getIcon = (type) => {
        const { icons } = props;
        if ( ! icons ) {
            return null;
        }

        return icons[type] === undefined ?
            ToggleButton.defaultProps.icons[type] :
            icons[type];
    }

    const toggleClasses = classNames('wrg-toggle', {
        'wrg-toggle--checked': toggle,
        'wrg-toggle--disabled': disabled
    }, className);

    return (
        <div onClick={triggerToggle} className={toggleClasses}>
            <div className="wrg-toggle-container">
                <div className="wrg-toggle-check">
                    <span>{ getIcon('checked') }</span>
                </div>
                <div className="wrg-toggle-uncheck">
                    <span>{ getIcon('unchecked') }</span>
                </div>
            </div>
            <div className="wrg-toggle-circle"></div>
            <input type="checkbox" aria-label="Toggle Button" className="wrg-toggle-input" placeholder="test"/>
        </div>
    );
}

ToggleButton.defaultProps = {
    icons: {
        checked: <CheckedIcon />, 
        unchecked: <UncheckedIcon />
    }
};

ToggleButton.propTypes = {
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    icons: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            checked: PropTypes.node,
            unchecked: PropTypes.node
        })
    ])
};

export default ToggleButton;