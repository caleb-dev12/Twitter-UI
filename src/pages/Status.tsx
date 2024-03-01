import { FormEvent, KeyboardEvent, useState } from "react";
import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import Tweet from "../components/Tweet";

import "./Status.css";
import { PaperPlaneRight } from "phosphor-react";

/**
 * Fluxo de renderização
 * 
 * 1. ao alterar o estado de um componente, TODO o componente é recalculado
 * 2. toda vez que seu componente pai renderizar
 * 3. toda vez que alguma das suas propriedades mudarem. 
 */

/**
 * Algoritmo de reconciliação
 * 
 * 1. criar em memória a nova versão do HTML do componente
 * 2. Compara essa nova versão com a versão anterior do HTML (diff)
 * 3. aplicar as operações JavaScript para alterar somente o necessário do HTML 
 */

export function Status() {
// estado
  const [newAnswer, setNewAnswers] = useState('')
  const [answers, setAnswers] = useState([
    "Meu primeiro tweet", 
    "Teste", 
    "Deu certo"
  ])

  const createNewAnswer = (event: FormEvent) => {
    event.preventDefault()

    // isso fará com que o newTweet seja adicionado aos tweets já existentes
    setAnswers([newAnswer, ...answers])
    setNewAnswers('')
  }

  function handleHotKeySubmit(event: KeyboardEvent) {
    if (event.key === "Enter" && event.ctrlKey || event.metaKey) {
      setAnswers([newAnswer, ...answers])
      setNewAnswers('')
    }
  }

  return (
    <main className="status">
        <Header title="Tweet" />

        <Tweet
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Esse, pariatur vitae quod cum placeat incidunt vero quisquam magnam 
            exercitationem dolores deleniti reiciendis? Ullam, molestiae. 
            Tempora quo quis commodi eaque ipsam?"
        />

        <form onSubmit={createNewAnswer} className="answer-tweet-form">
            <label htmlFor="tweet">
            <img src="https://github.com/caleb-dev12.png" alt="Caleb Freires" />
            <textarea 
              id="tweet" 
              placeholder="Tweet your answer"
              onKeyDown={handleHotKeySubmit} 
              onChange={(event) => {
                setNewAnswers(event.target.value)
              }}
            />
            </label>

            <button type="submit">
              <PaperPlaneRight />
              <span>Answer</span>
            </button>
        </form>

        <Separator />

        {answers.map((answer: any) => {
            return <Tweet key={answer} content={answer} />;
        })}
    </main>
  );
}
