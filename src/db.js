import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";

// Reuse same session ID across refreshes, new one each day
const TODAY = new Date().toDateString();
const STORED = localStorage.getItem("fitcoach_session");
const STORED_DATE = localStorage.getItem("fitcoach_session_date");

// New session every day, same session within same day
let SESSION_ID;
if (STORED && STORED_DATE === TODAY) {
  SESSION_ID = STORED;
} else {
  SESSION_ID = "session_" + Date.now();
  localStorage.setItem("fitcoach_session", SESSION_ID);
  localStorage.setItem("fitcoach_session_date", TODAY);
}

export { SESSION_ID };

export async function saveMessage(role, content) {
  await addDoc(collection(db, "chats"), {
    role,
    content,
    sessionId: SESSION_ID,
    createdAt: serverTimestamp(),
  });
}

export async function loadMessages(sessionId) {
  const q = query(
    collection(db, "chats"),
    where("sessionId", "==", sessionId),
    orderBy("createdAt", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}