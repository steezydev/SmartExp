interface ICurrency {

}

interface iPlanet {
  [index: string]: iPlaPo;
}

interface iPlaPo {
  name: string;
  sign: string;
}

export default <iPlanet>{
  RUB: {
    name: 'RUB',
    sign: '₽'
  },
  USD: {
    name: 'USD',
    sign: '$'
  },
  EUR: {
    name: 'EUR',
    sign: '€'
  }
}