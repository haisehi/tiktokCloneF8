import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faPlus,
        faEllipsisVertical,
        faLanguage,
        faCircleQuestion,
        faKeyboard,
        faUser,
        faGear,
        faCoins,
        faSignOut 
    } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Header.module.scss';
import images from "~/assets/images";
import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";
import { UploadIcon } from "~/components/Icons";
import Image from "~/components/image";
import Search from "../Search";

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title:'English',
        children:{
            title:'language',
            data:[
                {
                    type:faLanguage,
                    code:'en',
                    title:'English',
                },
                {
                    type:faLanguage,
                    code:'vi',
                    title:'Tiếng Việt',
                }
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title:'Feedback and help',
        to:'/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title:'Keyboard shortcuts',
    },
]

function Header() {
    const currentUser = true;

    // handle logic
    const handleMenuChange =(menuItem)=>{
        switch(menuItem.type){
            case 'language':
                // handle change to language
                break;
            default:
        }
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title:'View Profile',
            to:'/@jisoo',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title:'Get coins',
            to:'/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title:'Settings',
            to:'/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title:'Log out',
            to:'/logout',
            separate:true,
        },
    ]

    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                    <img src={images.logo} alt="logo-tiktok"/>

                <Search />

                <div className={cx('actions')}>
                {currentUser ? (
                    <Tippy delay={[0,200]} content="Upload video" placement="bottom">
                        <button className={cx('action-btn')}>
                            <UploadIcon />
                        </button>
                    </Tippy>
                ) : (
                    <>
                    <Button text leftIcon={<FontAwesomeIcon icon={faPlus}/>}>
                        Upload
                    </Button>
                    <Button primary>Log in</Button>
                    </>
                )}

                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image 
                            className={cx('user-avatar')} 
                            src="https://i.pinimg.com/736x/32/b1/64/32b164c689fb0bd5673170c768653ec9.jp" 
                            alt="avatar"
                            //fallback="https://th.bing.com/th?id=OSK.3a3f297cc53867ef71012d15422fad1c&w=148&h=148&c=7&o=6&dpr=1.3&pid=SANGAM"
                            />
                        ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                        )}
                    </Menu>
                </div>

            </div>
        </header>
     );
}

export default Header;