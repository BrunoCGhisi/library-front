import { useState, useEffect } from "react";
import { Status_LoanVO } from "../../services/types";
import axios from "axios";

const Status_emprestimos = () => {
  const [status_loans, setStatus_loans] = useState<Status_LoanVO[]>();
  const [status_atual, setStatus_atual] = useState("");

  const [open, setOpen] = useState(false);
  const addOn = () => setOpen(true);
  const addOf = () => setOpen(false);

  //----------------------------------------------------------
  async function getStatus_loan() {
    try {
      const response = await axios.get("http://localhost:3000/sttsEmprestimo");
      setStatus_loans(response.data.status_emprestimos);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    }
  }

  async function postStatus_loan() {
    try {
      const response = await axios.post(
        "http://localhost:3000/sttsEmprestimo",
        {
          status_atual: status_atual,
        }
      );
      getStatus_loan();
      if (response.status === 200)
        alert("Stts_emprestimo cadastro com sucesso!");
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro
    }
  }

  async function putStatus_loan(id: string) {
    try {
      const response = await axios.put(
        `http://localhost:3000/sttsEmprestimo?id=${id}`,
        {
          status_atual: status_atual,
        }
      );
      if (response.status === 200)
        alert("Stts_emprestimo atualizado com sucesso!");
      getStatus_loan();
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    }
  }

  async function delStatus_loan(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/sttsEmprestimo?id=${id}`
      );
      getStatus_loan();
      if (response.status === 200) alert("reserva atualizado com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }
  //------------------------------------------------------
  useEffect(() => {
    getStatus_loan();
  }, []);

  return (
    <div>
      <h1> Aqui estão os autores dos seus livros favoritos: </h1>
      <h2> use com sabedoria </h2>
      <h3> Separamos a obra do autor {`>:(`} </h3>
      {status_loans && status_loans?.length > 0 ? (
        status_loans.map((stts_emprestimo) => (
          <div
            key={stts_emprestimo.id_status}
            style={{
              display: "flex",
              border: "1px solid #ff0",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <span> Id_status {stts_emprestimo.id_status} </span>
            <span> Status {stts_emprestimo.status_atual} </span>
            <button onClick={() => putStatus_loan(stts_emprestimo.id_status)}>
              {" "}
              Alterar reserva{" "}
            </button>
            <button onClick={() => delStatus_loan(stts_emprestimo.id_status)}>
              {" "}
              Deletar reserva{" "}
            </button>
          </div>
        ))
      ) : (
        <h1>Carregando...</h1>
      )}

      <input
        type="text"
        id="status_atual"
        placeholder="status_atual"
        value={status_atual}
        onChange={(e) => setStatus_atual(e.target.value)}
      />

      <button onClick={postStatus_loan}> Adicionar Status </button>
    </div>
  );
};

export default Status_emprestimos;
