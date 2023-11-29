import React from 'react'
import { Layout } from '../components'
import { BooksForm } from '../components/BooksForm'

export const AdminScreen:React.FC = ():JSX.Element => {
  
  return (
    <Layout title="Admin">
    <div >
        <BooksForm/>
    </div>
  </Layout>
  )
}
