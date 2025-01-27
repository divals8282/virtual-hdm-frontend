
interface PropsInterface {
  label: string;
  extension: string;
  onChange: (file: File) => void;
}

export type ComponentT = (props: PropsInterface) => JSX.Element