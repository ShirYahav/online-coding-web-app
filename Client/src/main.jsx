import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CodeBlocksList from './components/codeBlocksArea/codeBlocksList'

createRoot(document.getElementById('root')).render(
  <CodeBlocksList/>
)
