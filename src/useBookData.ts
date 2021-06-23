import { useState, useEffect} from "react";
import { BookDescription } from "./BookDescription";

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

export const useBookData = () => {
    const [books, setBooks] = useState([] as BookDescription[]);
    const [isSearching, setIsSearching] = useState(false);

    
}