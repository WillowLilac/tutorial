import React, {useRef} from "react";
import {BookDescription} from "./BookDescription";
import BookSearchItem from "./BookSearchItem";
import {useBookData} from "./useBookData";

type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);

    const [books, setIsSearching] = useBookData(
        titleRef.current ? titleRef.current!.value : "",
        authorRef.current ? authorRef.current!.value : "",
        props.maxResults
    )

    //検索ボタンを押したときの処理
    const handleSearchClick = () => {
        if(!titleRef.current!.value && !authorRef.current!.value) {
            alert("input title or author!");
            return;
        }
        //検索実行
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