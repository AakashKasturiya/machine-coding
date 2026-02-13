import React from 'react'

import { PageShell } from '../components/Pages/PageShell'

export const Home = () => {
  return (
    <PageShell showPreview={false}>
      <div>
        <h1>Welcome Home</h1>
        <p>Select from the menu to visit Todo, Modal, or Search pages</p>
      </div>
    </PageShell>
  )
}
