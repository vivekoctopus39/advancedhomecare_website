import LegalDocument from '../components/common/LegalDocument'
import { useContent } from '../hooks/useContent'

export default function PrivacyPolicy() {
  const { legal } = useContent()
  return <LegalDocument document={legal['privacy-policy']} />
}
