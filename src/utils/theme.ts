interface ITheme {
  primary: {
    main: string,
    light: string,
    dark: string,
    contrast: string
  },
  borderColor: string,
  background: {
    main: string,
    paper: string
  }
}

export const getTheme = (mode: 'dark' | 'light') => {
  const light: ITheme = {
    primary: {
      main: '#591893',
      light: '#7921c7',
      dark: '#43166b',
      contrast: 'white',
    },
    borderColor: '#d9d9d9',
    background: {
      main: '',
      paper: ''
    }
  }

  return light
}

