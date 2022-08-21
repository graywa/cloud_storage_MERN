export const formatSize = (size) => {
  const GB = 1024*1024*1024
  const MB = 1024*1024
  const KB = 1024

  if(size > GB) {
    return (size / GB).toFixed(1) + ' GB'
  }
  if(size > MB) {
    return (size / MB).toFixed(1) + ' MB'
  }
  if(size > KB) {
    return (size / KB).toFixed(1) + ' KB'
  }

  return size + ' B'
}