import React, {useState} from "react";
import Modal from "react-modal";
import "./App.css";
import { BookToRead } from "./BookToRead";
import BookRow from "./BookRow";
import BookSearchDialog from "./BookSearchDialog";

//モーダル表示時にオーバーレイで覆うDOM領域を指定
Modal.setAppElement("#root");

//モーダルダイアログおよびオーバーレイの外観のスタイル設定
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)"
  }
};

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    authors: "ダミー",
    memo: ""
  },
  {
    id: 2,
    title: "React Hooks入門",
    authors: "ダミー",
    memo: ""
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    authors: "ダミー",
    memo: ""
  }
];

const App = () => {
  const [books,setBooks] = useState(dummyBooks);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //削除処理の関数
  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id != id);
    setBooks(newBooks);
  };

  //メモ変更処理の関数
  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => {
      return b.id == id
       ? {...b, memo: memo}
       : b;
    });
    setBooks(newBooks);
  }

  //本を追加ボタンのクリック時の処理の関数
  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  //モーダルを閉じる処理の関数
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const BookRows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id, memo) => handleBookMemoChange(id,memo)}
        onDelete={(id) => handleBookDelete(id)}
      />
    );
  });

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like" onClick={handleAddClick}>本を追加</div>
      </section>
      <section className="main">
        {BookRows}
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      ></Modal>
    </div>
  );
};

export default App;
