import './styles.css';
import { Card } from '../../components/Card/inde';
import { useState, useEffect } from 'react';

export function Home() {

  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]); // Imutabilidade: quando um estado é atualizado ele é substituído por completo.
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent]); 
    // Para recupera o que tinha antes no estado e juntar com o estado atual deve-se usar o prevState (pode ser qualquer nome) e o spread operator(três pontos). Se não fizer isso
    // pelo conseito da imutabilidade, todo o estado será substituído pelo novo. 
  }

  useEffect(() => {
    // É executado assim que a interface é renderizada.
    fetch(`https://api.github.com/users/jessicaduarte95`)
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, []) // Array de dependências. Sempre que mudar o estado do que está dentro do array de depedênias, o useEffect será executado.

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil"/>
        </div>
      </header>
      <input type="text" placeholder="Digite o nome..." onChange={e => setStudentName(e.target.value)}/>
      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      
      {
        students.map(student => (
          <Card key={student.time} name={student.name} time= {student.time}/>
        ))
      }
    </div>
  )
}
