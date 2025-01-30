
interface PropsInterface {
  label: string;
  extension: string;
  file: null | File;
  onChange: (file: File) => void;
}

export type ComponentT = (props: PropsInterface) => JSX.Element