import { FormEvent, KeyboardEvent ,useState } from "react";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import Tweet from "../components/Tweet";

import "./Timeline.css";


export function Timeline() {
  // estado
  const [newTweet, setNewTweet] = useState('')
  const [tweets, setTweets] = useState([
    "Meu primeiro tweet", 
    "Teste", 
    "Deu certo"
  ])

  const createNewTweet = (event: FormEvent) => {
    event.preventDefault()

    // isso fará com que o newTweet seja adicionado aos tweets já existentes
    setTweets([newTweet, ...tweets])
    setNewTweet('')
  }

  function handleHotKeySubmit(event: KeyboardEvent) {
    if (event.key === "Enter" && event.ctrlKey || event.metaKey) {
      setTweets([newTweet, ...tweets])
      setNewTweet('')
    }
  }

  return (
    <main className="timeline">
      <Header title="Home" />

      <form onSubmit={createNewTweet} className="new-tweet-form">
        <label htmlFor="tweet">
          <img src="https://github.com/caleb-dev12.png" alt="Caleb Freires" />
          <textarea 
            id="tweet" 
            placeholder="What's happening" 
            value={newTweet}
            onKeyDown={handleHotKeySubmit}
            onChange={(event) => {
              // toda vez que é mudado o valor da textarea, o valor de newTweets é mudado
              setNewTweet(event.target.value)
            }}
          />
        </label>

        <button type="submit">Tweet</button>
      </form>

      <Separator />

      {tweets.map((tweet) => {
        return <Tweet key={tweet} content={tweet} />;
      })}
    </main>
  );
}
