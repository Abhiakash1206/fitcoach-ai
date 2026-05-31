import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  return (
    <div className="messages">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}
      {loading && (
        <div className="msg-row assistant">
          <div className="typing-bubble">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}
    </div>
  );
}
