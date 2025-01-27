import { useState } from "react";
import { FileInput } from "./components/FileInput"
import { Container } from "./styled"
import { toast, ToastContainer } from 'react-toastify';
function App() {
  const [pemFile, setPemFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);

  const sentAction = () => {
    if(!pemFile || !certFile) {
      toast('Please seleect files')
    }
  }

  return (
    <Container>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        <FileInput onChange={(file) => setPemFile(file)} label="Upload .pem file" extension=".pem" />
        <FileInput onChange={(file) => setCertFile(file)} label="Upload .cert file" extension=".cert" />
        <div className="actions">
          <button onClick={() => sentAction()} className="submit-button" type="submit">Sent</button>
        </div>
      </form>

      <ToastContainer />
    </Container>
  )
}

export default App
