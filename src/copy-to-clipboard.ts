const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    try {
      return navigator.clipboard.writeText(text)
    } catch (err) {
      throw err !== undefined
        ? err
        : new DOMException('The request is not allowed', 'NotAllowedError')
    }
  }

  let span = document.createElement('span')
  span.textContent = text
  span.style.whiteSpace = 'pre'
  document.body.appendChild(span)

  const selection = window.getSelection()
  const range = window.document.createRange()
  selection && selection.removeAllRanges()
  range.selectNode(span)
  selection && selection.addRange(range)

  let success = false
  try {
    success = window.document.execCommand('copy')
  } catch (err) {
    console.log('error', err)
  }

  selection && selection.removeAllRanges()
  window.document.body.removeChild(span)

  return success
    ? Promise.resolve()
    : Promise.reject(
        new DOMException('The request is not allowed', 'NotAllowedError')
      )
}

export default copyToClipboard
