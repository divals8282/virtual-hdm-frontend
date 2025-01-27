import { useRef, useState } from 'react';
import { Container } from './styled';
import { toast } from 'react-toastify';
import { ComponentT } from './types';

export const FileInput: ComponentT = ({ label, extension, onChange }) => {

  const [fileName, setFileName] = useState(label);
  const fileInputRef = useRef<HTMLInputElement>();
  
  return (
    <Container>
      <p>{fileName}</p>
      <button type='button' className='action-button' onClick={() => fileInputRef.current.click()}>Set File</button>
      <input accept={extension} ref={fileInputRef} onChange={() => {
        const file = fileInputRef.current.files[0];
        const regexp = new RegExp('[0-9]{8}', 'g');
        
        const name = file.name.replace(/\.[^/.]+$/, "");
        const isValidName = regexp.test(name);

        if(!isValidName) {
          fileInputRef.current.value = "";
          toast('Invalid file name');
          setFileName(label);
          return false;
        }
        
        onChange(file);
        setFileName(file.name)
      }} type='file' hidden/>
    </Container>
  )
}