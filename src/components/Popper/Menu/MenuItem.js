import classNames from "classnames/bind";
import PropTypes from 'prop-types'

import styles from './Menu.module.scss'
import Button from "~/components/Button";

const cx = classNames.bind(styles)

function MenuItem({data,onClick}) {
    const classes = cx('menu-item',{
        separate:data.separate,
    })
    return ( 
        <Button onClick={onClick} className={classes} leftIcon={data.icon} to={data.to}>{data.title}</Button>
     );
}
MenuItem.propTypes ={
    data : PropTypes.object.isRequired,
    onClick :PropTypes.func
}

export default MenuItem;