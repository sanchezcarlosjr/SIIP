export const validity = {
  type: "xor",
  model: "validity",
  criteria: [
    {
      value: "Vigente",
      default: true
    },
    {
      value: "No Vigente"
    }
  ]
}
export const campus = {
  type: "xor",
  model: "campus",
  criteria: [
    {
        value: 'Mexicali'
    },
    {
        value: 'Ensenada'
    },
    {
        value: 'Tijuana'
    }
  ]
}
export const gender = {
  type: "xor",
  model: "gender",
  criteria: [
    {
      value: "Hombre"
    },
    {
      value: "Mujer"
    }
  ]
}
export const close_to_retirement = {
  type: "xor",
  model: "close_to_retirement",
  criteria: [{
    value: "Prox. a jubilarse"
  }]
}
export const grade = {
  type: "or",
  model: "grade",
  criteria: [
    {
      value: "En formación"
    },
    {
      value: "En consolidación"
    },
    {
      value: "Consolidado"
    }
  ]
}
export const leaders = {
  type: "xor",
  model: "leaders",
  criteria: [{
    value: "Líder"
  }]
}
