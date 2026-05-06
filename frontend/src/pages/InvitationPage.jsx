import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import invitationData from '../mock/invitationData.json'
import { templateRegistry } from '../config/templateRegistry'

function InvitationPage() {
  const { token } = useParams()
  const [searchParams] = useSearchParams()
  const TemplateComponent = templateRegistry['template-one'].component

  const guestName = useMemo(() => {
    const guestFromQuery = searchParams.get('to')
    if (guestFromQuery) {
      return guestFromQuery
    }

    if (!token) {
      return invitationData.guestName
    }

    return token
      .replace(/[-_]+/g, ' ')
      .trim()
      .replace(/\b\w/g, (character) => character.toUpperCase())
  }, [searchParams, token])

  return (
    <main className="app-shell">
      <TemplateComponent data={invitationData} guestName={guestName} />
    </main>
  )
}

export default InvitationPage
