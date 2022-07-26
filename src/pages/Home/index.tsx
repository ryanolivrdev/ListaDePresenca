import { useState, useEffect } from "react";
import "./styles.css";

import { Card, CardProps } from "../../components/card";

interface ApiResponse {
  name: string;
  avatar_url: string;
}

interface User {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudent] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);
  const [GithubUser, setGithubUser] = useState("" as string);
  const [style, setStyle] = useState("popover");

function handleAddGithubUser() {
    setStyle("disabled")
  }

  console.log(GithubUser);

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudent((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.github.com/users/${GithubUser}`);
      const data = await response.json() as ApiResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, [GithubUser]);

  return (
    <div className="container">
      <div className={style}>
        <div>
          <h1>Digite seu Usuário do Github</h1>
          <input type="text" onChange={(e) => setGithubUser(e.target.value)} />
          <button onClick={handleAddGithubUser}>Logar</button>
        </div>
      </div>
      <header>
        <h1>Lista de presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
