import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from "react";

import AccountItem from "~/components/AccountItem";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { ClearIcon, SearchIcon } from "~/components/Icons";
import styles from "./Search.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResults, setShowResults] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    // useEffect của search result
    useEffect(() => {
        if(!searchValue.trim()){
            setSearchResult([])
            return;
        }

        setLoading(true)

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(()=>{
                setLoading(false);
            })
    }, [searchValue])

    // logic clear when clicked on clearIcon
    const handClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }
    // hide results
    const handHideResult = () => {
        setShowResults(false)
    }
    return (
        <HeadlessTippy
            interactive
            visible={showResults && searchResult.length > 0}
            render={attrs => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>
                            Accounts
                        </h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}

                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handHideResult}
        >

            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search account and videos"
                    spellCheck={false}
                    onChange={(e) => {
                        e.target.value=e.target.value.trimStart()
                        setSearchValue(e.target.value)
                    }}
                    onFocus={() => setShowResults(true)}
                />

                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handClear}>
                        <ClearIcon />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;