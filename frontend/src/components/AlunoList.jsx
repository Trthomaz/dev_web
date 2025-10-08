import { useEffect, useState } from "react";
import api from "../api/api";

export default function AlunoList() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    api.get("/alunos").then((res) => setAlunos(res.data));
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul>
        {alunos.map((a) => (
          <li key={a.id}>
            {a.nome} — {a.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
