export function capitalizeItem(item) {
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const caps = item.split(' ').map(capitalize).join(' ')

  return caps.trim()

}


