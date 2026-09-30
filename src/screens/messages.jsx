import {
  LuMessageCircle,
  LuSearch,
  LuPenLine,
  LuArchive,
  LuShieldCheck,
  LuSparkles,
  LuChevronLeft,
} from "react-icons/lu";

import "../styles/messages.css";

export default function Messages({set}) {
  return (
    <section className="messages page">
      <header className="messages-header">
        <div>
          <h1 onClick={()=>set("home")}>
            <LuChevronLeft/>
            Messages</h1>
          <p>Your conversations</p>
        </div>

        <button className="compose-button">
          <LuPenLine />
        </button>
      </header>

      <div className="messages-search">
        <LuSearch />

        <span>Search conversations</span>
      </div>

      <div className="message-filters">
        <button className="filter active">All</button>

        <button className="filter">Unread</button>

        <button className="filter">Archived</button>
      </div>

      <div className="messages-empty">
        <div className="empty-orbit">
          <div className="empty-icon">
            <LuMessageCircle />
          </div>

          <span className="orbit-dot dot-one"></span>
          <span className="orbit-dot dot-two"></span>
          <span className="orbit-dot dot-three"></span>
        </div>

        <h2>No messages yet</h2>

        <p>Your conversations will appear here when you start chatting.</p>

        <button className="start-message">
          <LuPenLine />
          Start a conversation
        </button>
      </div>

      <div className="messages-info">
        <div className="message-info-item">
          <div className="message-info-icon">
            <LuShieldCheck />
          </div>

          <div>
            <strong>Private & secure</strong>
            <span>Your conversations stay protected.</span>
          </div>
        </div>

        <div className="message-info-item">
          <div className="message-info-icon">
            <LuArchive />
          </div>

          <div>
            <strong>Organize your chats</strong>
            <span>Archive conversations you don't need.</span>
          </div>
        </div>

        <div className="message-info-item">
          <div className="message-info-icon">
            <LuSparkles />
          </div>

          <div>
            <strong>Riot Messages</strong>
            <span>A cleaner way to stay connected.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
