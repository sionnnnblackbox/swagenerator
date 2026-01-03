
export enum ThemeMode {
  BLACK = 'BLACK',
  PINK = 'PINK'
}

export interface GeneratorState {
  text: string;
  theme: ThemeMode;
  fontSize: number;
  customBgColor: string;
  customTextColor: string;
  useCustomColors: boolean;
}
