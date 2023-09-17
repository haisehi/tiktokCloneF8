import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark,
        faSpinner,
        faMagnifyingGlass,
        faPlus,
        faEllipsisVertical,
        faLanguage,
        faCircleQuestion,
        faKeyboard,
        faCloudUpload,
        faUser,
        faGear,
        faCoins,
        faSignOut 
    } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import 'tippy.js/dist/tippy.css'; // optional

import styles from './Header.module.scss';
import images from "~/assets/images";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import AccountItem from "~/components/AccountItem";
import Button from "~/components/Button";
import Menu from "~/components/Popper/Menu";

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
    const [searchResult,setSearchResult] = useState([])

    const currentUser = true;

    useEffect(()=>{
        setTimeout(()=>{
            setSearchResult([])
        },0)
    },[])

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
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo-tiktok"/>
                </div>
                <HeadlessTippy 
                    interactive
                    visible={searchResult.length>0}
                    render={attrs=>(
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>
                                    Accounts
                                </h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                    >
                    <div className={cx('search')}>
                        <input placeholder="Search"/>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                {currentUser ? (
                    <Tippy delay={[0,200]} content="Upload video" placement="bottom">
                        <button className={cx('action-btn')}>
                            <FontAwesomeIcon icon={faCloudUpload} />
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
                            <img className={cx('user-avatar')} 
                            src="https://i.pinimg.com/736x/32/b1/64/32b164c689fb0bd5673170c768653ec9.jpg" 
                            alt="avatar"/>
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