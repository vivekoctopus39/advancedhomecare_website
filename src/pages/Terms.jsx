import LegalDocument from '../components/common/LegalDocument'
import { useContent } from '../hooks/useContent'

export default function Terms() {
  const { legal } = useContent()
  return <LegalDocument document={legal.terms} />
}
