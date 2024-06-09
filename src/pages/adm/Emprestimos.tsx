import { useState, useEffect }  from 'react'
import { LoanVO }               from '../../services/types'
import  axios                   from 'axios';

const Emprestimos = () => {

  const [loans, setLoans]                     = useState<LoanVO[]>() 
  const [fk_livro, setFk_livro]               = useState("");
  const [fk_membro, setFk_membro]             = useState("");
  const [data_emprestimo, setData_emprestimo] = useState("");
  const [data_retorno, setData_retorno]       = useState("");
  const [fk_status, setFk_status]             = useState(0);
//----------------------------------------------------------
    async function getLoan(){
        try {

            const response = await axios.get("http://localhost:3000/emprestimo");
            setLoans(response.data.emprestimos)   

        } catch (error: any) {
            console.log("Erro na requisição:", error.response.data); 
        }
    }
        
    async function postLoan() {
        
        try {
            const response = await axios.post('http://localhost:3000/emprestimo', {
                fk_livro: fk_livro,
                fk_membro: fk_membro,
                data_emprestimo: data_emprestimo,
                data_retorno: data_retorno,
                fk_status: fk_status
            });
            getLoan();
            if (response.status === 200) alert("reserva cadastro com sucesso!");

        } catch (error: any) {
            console.error("Erro na requisição:", error.response.data); // Log detalhado do erro 
        }
    }

    async function putLoan(id:string) {
        try {
            const response = await axios.put(`http://localhost:3000/emprestimo?id=${id}`, {
                fk_livro: fk_livro,
                fk_membro: fk_membro,
                data_emprestimo: data_emprestimo,
                data_retorno: data_retorno,
                fk_status: fk_status
        });
            if (response.status === 200) alert("reserva atualizado com sucesso!");
            getLoan(); 
        } catch (error: any) {
            console.error("Erro na requisição:", error.response.data);
        }
    }

    async function delLoan(id:string) {
        try {
            const response = await axios.delete(`http://localhost:3000/emprestimo?id=${id}`);
            getLoan(); 
            if (response.status === 200) alert("reserva atualizado com sucesso!");
        } catch (error: any) {
            new Error(error);
        }
    }

//------------------------------------------------------
useEffect(() => {
    getLoan();
}, []);

return(

<div>
    <h1> Aqui estão os autores dos seus livros favoritos: </h1>
    <h2> use com sabedoria </h2>
    <h3> Separamos a obra do autor {`>:(`} </h3>
    {loans && loans?.length > 0 ? loans.map((emprestimo) => 
        ( 
            <div
                key={emprestimo.id_emprestimo}
                style={{
                display: 'flex',
                border: '1px solid #ff0',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
                }}> 

                <span> Id_emprestimo {emprestimo.id_emprestimo}  </span>
                <span> Data    {emprestimo.data_emprestimo}     </span>
                <button onClick={ () => putLoan(emprestimo.id_emprestimo)}> Alterar emprestimo </button>
                <button onClick={ () => delLoan(emprestimo.id_emprestimo)}> Deletar emprestimo </button>
            </div>
        )) : 
        (
            <h1>Carregando...</h1>
        )
    }
     
    <input 
      type="text"
      id  ="fk_livro"
      placeholder='fk_livro'
      value ={fk_livro}
      onChange ={(e) => setFk_livro(e.target.value)}
    />

    <input 
      type="text"
      id  ="fk_membro"
      placeholder='fk_membro'
      value ={fk_membro}
      onChange ={(e) => setFk_membro(e.target.value)}
    />

    <input 
      type="text"
      id  ="data_emprestimo"
      placeholder='data_emprestimo'
      value ={data_emprestimo}
      onChange ={(e) => setData_emprestimo(e.target.value)}
    />

    <input 
      type="text"
      id  ="data_retorno"
      placeholder='data_retorno'
      value ={data_retorno}
      onChange ={(e) => setData_retorno(e.target.value)}
    />
      
    <input 
      type="text"
      id  ="fk_status"
      placeholder='fk_status'
      value ={fk_status}
      onChange ={(e) => setFk_status(Number(e.target.value))}
    />

    <button onClick={postLoan}> Adicionar Emprestimo </button>
</div>


)

}

export default Emprestimos;

