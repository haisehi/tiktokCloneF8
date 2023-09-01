import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary=false,
    outline=false,
    text=false,
    disable=false,
    rounded=false,
    small=false,
    large=false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button'
    const props = {
        onClick,
        ...passProps,
    }
    // remove event listeners when button is disabled
    if(disable){
        Object.keys(props).forEach(key => {
            if(key.startsWith('on') && typeof props[key] === 'function'){
                delete props[key];
            }
        })
    }
    
    if(to){
        props.to = to
        Comp = Link
    } else if(href){
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper',{
        [className]:className,
        primary,
        outline,
        text,
        disable,
        rounded,
        small,
        large,
    })
    
    return ( 
        <Comp className={cx(classes)} {...props}>
            {leftIcon && <span className={cx('icon-left')}>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className={cx('icon-right')}>{rightIcon}</span>}
        </Comp>
     );
}

export default Button;