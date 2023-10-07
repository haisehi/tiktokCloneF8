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
import { useDebounce } from "~/hooks";
import * as searchService from "~/apiServices/searchServices";

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResults, setShowResults] = useState(true)
    const [loading, setLoading] = useState(false)

    const debounce = useDebounce(searchValue, 500)

    const inputRef = useRef()

    // useEffect của search result
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([])
            return;
        }

        const fetchApi = async ()=>{
            setLoading(true)

            const result = await searchService.search(debounce)
            setSearchResult(result)

            setLoading(false)

        }

        fetchApi()

    }, [debounce])

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
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. 
        <div>
            <HeadlessTippy
            appendTo={()=>document.body}
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
                        e.target.value = e.target.value.trimStart()
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

                <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
        </div>
    );
}

export default Search;