import classNames from "classnames/bind";
import styles from "./Account.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Image from "../image";

const cx = classNames.bind(styles)

function AccountItem({ data }) {
    return ( 
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image 
            className={cx('avatar')} 
            src={data.avatar} 
            alt={data.nickname} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                </h4>
                <span className={cx('usernames')}>{data.nickname}</span>

            </div>
        </Link>
     );
}

export default AccountItem;