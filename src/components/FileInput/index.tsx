import { useEffect, useRef, useState } from 'react';
import { Container } from './styled';
import { toast } from 'react-toastify';
import { ComponentT } from './types';

export const FileInput: ComponentT = ({ file, label, extension, onChange }) => {

  const [fileName, setFileName] = useState(label);
  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (file) {
      setFileName(file.name)
    }
  }, [file])

  return (
    <Container>
      <p>{fileName}</p>
      <button type='button' className='action-button' onClick={() => fileInputRef.current.click()}>Set File</button>
      <input accept={extension} ref={fileInputRef} onChange={() => {
        const file = fileInputRef.current.files[0];
        const regexp = /^\d{8}_\d{8}$/;

        const name = file.name.replace(/\.[^/.]+$/, "");
        const isValidName = regexp.test(name);

        if (!isValidName) {
          fileInputRef.current.value = "";
          toast('Invalid file name');
          setFileName(label);
          onChange(null)
          return false;
        }

        onChange(file);
      }} type='file' hidden />
    </Container>
  )
}