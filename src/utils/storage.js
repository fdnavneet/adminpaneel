export const getEmployees  = () => {
  const data = localStorage.getItem("employees")
  if(data){
    return JSON.parse(data)
  } else {
    return []
  }
}

export const saveEmployees  = (data) => {
  localStorage.setItem("employees",JSON.stringify(data))
}