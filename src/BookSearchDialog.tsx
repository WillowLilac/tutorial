import React, {useState, useEffect, useRef} from "react";
import {BookDescription} from "./BookDescription";
import BookSearchItem from "./BookSearchItem";

//検索URLを組み立てる関数
const buildSearchUrl = (title: string, author: string, maxResults: number): string => {
    let url = "https://www.googleapis.com/books/v1/volumes?q=";
    const conditions: string[] = []
    if(title)
        conditions.push(`intitle:${title}`);
    if(author)
        conditions.push(`inauthor:${author}`);
    return url + conditions.join('+') + `&maxResults=${maxResults}`;
};

//APIの呼び出し結果(JSON)からコンポーネントが欲しい形でデータを抽出する関数
const extractBooks = (json: any): BookDescription[] => {
    const items: any[] = json.items;
    return items.map((item: any) => {
        const volumeInfo: any = item.volumeInfo;
        return {
            title: volumeInfo.title,
            authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : "",
            thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : ""
        }
    });
};

type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const bookArray: BookDescription[] = [];
    const [books, setBooks] = useState(bookArray);
    const [isSearching, setIsSearching] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);

    //副作用(API通信)の実装
    useEffect(() => {
        if(isSearching) {
            const url = buildSearchUrl(titleRef.current!.value, authorRef.current!.value, props.maxResults);
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    return extractBooks(json);
                })
                .then((books) => {
                    setBooks(books);
                })
                .catch((err) => {
                    console.error(err);
                });
            
        }
        setIsSearching(false);
    },[isSearching,props.maxResults]);

    //検索ボタンを押したときの処理
    const handleSearchClick = () => {
        if(!titleRef.current!.value && !authorRef.current!.value) {
            alert("input title or author!");
            return;
        }
        //TODO:検索実行
        setIsSearching(true);
    };

    //書籍追加イベントに対するコールバック
    const handleBookAdd = (book: BookDescription) => {
        props.onBookAdd(book);
    };

    //レンダリング処理
    const bookItems = books.map((b, idx) => {
        return(
            <BookSearchItem
                description={b}
                onBookAdd={(b) => handleBookAdd(b)}
                key={idx}
            />
        );
    });

    return(
        <div className="dialog">
            <div className="operation">
                <div className="conditions">
                    <input
                        type="text"
                        ref={titleRef}
                        placeholder="search with title"
                    />
                    <input
                        type="text"
                        ref={authorRef}
                        placeholder="search with author name"
                    />
                </div>
                <div className="button-like" onClick={handleSearchClick}>
                    search!
                </div>
            </div>
            <div className="search-results">{bookItems}</div>
        </div>
    );
};

export default BookSearchDialog;