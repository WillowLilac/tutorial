import React, {useState} from "react";
import {BookDescription} from "./BookDescription";
import BookSearchItem from "./BookSearchItem";

type BookSearchDialogProps = {
    maxResults: number;
    onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps) => {
    const [books, setBooks] = useState([] as BookDescription[]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };

    //検索ボタンを押したときの処理
    const handleSearchClick = () => {
        if(!title && !author) {
            alert("input title or author!");
            return;
        }
        //TODO:検索実行
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
                <div className="condition">
                    <input
                        type="text"
                        onChange={handleTitleInputChange}
                        placeholder="search with title"
                    />
                    <input
                        type="text"
                        onChange={handleAuthorInputChange}
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