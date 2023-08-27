import classNames from "classnames/bind";
import styles from "./Account.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src='https://0.soompi.io/wp-content/uploads/2023/06/27054113/go-yoon-jung-3.jpeg' alt="go yoon jung" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>go yoon jung</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                </h4>
                <span className={cx('usernames')}>go_yoon_jung</span>

            </div>
        </div>
     );
}

export default AccountItem;