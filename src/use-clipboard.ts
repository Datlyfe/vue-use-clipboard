import { ref } from '@vue/composition-api'
import copyToClipboard from './copy-to-clipboard'

export const useClipboard = () => {
  const clipboard = ref<string>(null)

  const setClipboard = (text: string) => {
    clipboard.value = text
    return copyToClipboard(text)
  }

  return [clipboard, setClipboard]
}

export default useClipboard
