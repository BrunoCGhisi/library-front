import { useState, useEffect }  from 'react'
import { ReserveVO }            from '../../services/types'
import  axios                   from 'axios';

const Reservas = () => {

  const [reserves, setReserves]                 = useState<ReserveVO[]>()  //Arruma isso imediatamente Maria Joana
  const [fk_livro, setFk_livro]               = useState("");
  const [fk_membro, setFk_membro]             = useState("");
  const [data_reserva, setData_reserva]       = useState("");
  const [data_retirada, setData_retirada]     = useState("");
  const [status_reserva, setStatus_reserva]   = useState(1);
  const [status_retirada, setStatus_retirada] = useState(0);

    const [open, setOpen] = useState(false);
    const addOn = () => setOpen(true);
    const addOf = () => setOpen(false);

//----------------------------------------------------------
    async function getReserve(){
        try {

            const response = await axios.get("http://localhost:3000/reserva");
            setReserves(response.data.reservas)   

        } catch (error: any) {
            console.log("Erro na requisição:", error.response.data); 
        }
    }
        
    async function postReserve() {
        
        try {
            const response = await axios.post('http://localhost:3000/reserva', {
                fk_livro: fk_livro,
                fk_membro: fk_membro,
                data_reserva: data_reserva,
                data_retirada: data_retirada,
                status_reserva: status_reserva,
                status_retirada: status_retirada,
            });
            getReserve();
            if (response.status === 200) alert("reserva cadastro com sucesso!");

        } catch (error: any) {
        console.error("Erro na requisição:", error.response.data); // Log detalhado do erro 
        }
    }

    async function putReserve(id:string) {
        try {
            const response = await axios.put(`http://localhost:3000/reserva?id=${id}`, {
                fk_livro: fk_livro,
                fk_membro: fk_membro,
                data_reserva: data_reserva,
                data_retirada: data_retirada,
                status_reserva: status_reserva,
                status_retirada: status_retirada,
        });
            if (response.status === 200) alert("reserva atualizado com sucesso!");
            getReserve(); 
        } catch (error: any) {
            console.error("Erro na requisição:", error.response.data);
        }
    }

    async function delReserve(id:string) {
        try {
            const response = await axios.delete(`http://localhost:3000/reserva?id=${id}`);
            getReserve(); 
            if (response.status === 200) alert("reserva atualizado com sucesso!");
        } catch (error: any) {
            new Error(error);
        }
    }
//------------------------------------------------------
    useEffect(() => {
        getReserve();
    }, []);

return(

    <div>
        <h1> Aqui estão os autores dos seus livros favoritos: </h1>
        <h2> use com sabedoria </h2>
        <h3> Separamos a obra do autor {`>:(`} </h3>
        {reserves && reserves?.length > 0 ? reserves.map((reserva) => 
            ( 
                <div
                    key={reserva.id_reserva}
                    style={{
                    display: 'flex',
                    border: '1px solid #ff0',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center'
                    }}> 

                    <span> Id_reserva {reserva.id_reserva}  </span>
                    <span> Data    {reserva.status_reserva}     </span>
                    <button onClick={ () => putReserve(reserva.id_reserva)}> Alterar reserva </button>
                    <button onClick={ () => delReserve(reserva.id_reserva)}> Deletar reserva </button>
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
          id  ="data_reserva"
          placeholder='data_reserva'
          value ={data_reserva}
          onChange ={(e) => setData_reserva(e.target.value)}
        />

        <input 
          type="text"
          id  ="data_retirada"
          placeholder='data_retirada'
          value ={data_retirada}
          onChange ={(e) => setData_retirada(e.target.value)}
        />
          
        <input 
          type="text"
          id  ="status_reserva"
          placeholder='status_reserva'
          value ={status_reserva}
          onChange ={(e) => setStatus_reserva(Number(e.target.value))}
        />

        <input 
          type="text"
          id  ="status_retirada"
          placeholder='status_retirada'
          value ={status_retirada}
          onChange ={(e) => setStatus_retirada(Number(e.target.value))}
        />

        <button onClick={postReserve}> Adicionar Reserca </button>
    </div>


)

}

export default Reservas;