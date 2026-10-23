function getWeatherDescription(code: number): string {
  switch (code) {
    case 0:
      return "Klart";
    case 1:
      return "Mestadels klart";
    case 2:
      return "Delvis molnigt";
    case 3:
      return "Mulet";
    case 45:
    case 48:
      return "Dimma";
    case 51:
    case 53:
    case 55:
      return "Duggregn";
    case 56:
    case 57:
      return "Underkylt duggregn";
    case 61:
    case 63:
    case 65:
      return "Regn";
    case 66:
    case 67:
      return "Underkylt regn";
    case 71:
    case 73:
    case 75:
      return "Snöfall";
    case 77:
      return "Snökorn";
    case 80:
    case 81:
    case 82:
      return "Regnskurar";
    case 85:
    case 86:
      return "Snöbyar";
    case 95:
      return "Åska";
    case 96:
    case 99:
      return "Åska med hagel";
    default:
      return "Okänt väder";
  }
}

export { getWeatherDescription };