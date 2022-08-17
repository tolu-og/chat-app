import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const style = {
  main: `flex flex-col p-[10px] relative`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubsscribe = onSnapshot(q, (querySnapShot) => {
      let messages = [];
      querySnapShot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubsscribe;
  }, []);

  const scroll = useRef();

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
      </main>
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;
