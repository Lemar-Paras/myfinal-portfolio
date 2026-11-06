import { useState } from 'react'
import java from '../../assets/technology-icons/java.svg'
import php from '../../assets/technology-icons/php.svg'
import tailwindcss from '../../assets/technology-icons/tailwindcss.svg'
import alpinejs from '../../assets/technology-icons/alpinejs.svg'
import laravel from '../../assets/technology-icons/laravel.svg'
import mysql from '../../assets/technology-icons/mysql.svg'
import vite from '../../assets/technology-icons/vite.svg'
import javascript from '../../assets/technology-icons/javascript.svg'
import python from '../../assets/technology-icons/python.svg'
import dart from '../../assets/technology-icons/dart.svg'
import html5 from '../../assets/technology-icons/html5.svg'
import css3 from '../../assets/technology-icons/css3.svg'
import supabase from '../../assets/technology-icons/supabase.svg'
import xampp from '../../assets/technology-icons/xampp.svg'
import flutter from '../../assets/technology-icons/flutter.svg'
import react from '../../assets/technology-icons/react.svg'

const icons = { java, php, tailwindcss, alpinejs, laravel, mysql, vite, javascript, python, dart, html5, css3, supabase, xampp, flutter, react }

export default function TechnologyIcon({ technology }) {
  const [failedSource, setFailedSource] = useState(null)
  const source = icons[technology.icon]
  const monogram = technology.monogram || technology.name.slice(0, 2).toUpperCase()

  // The adjacent visible technology name supplies the accessible label.
  return <span className="technology-icon" aria-hidden="true">
    {source && failedSource !== source
      ? <img src={source} alt="" width="34" height="34" decoding="async" onError={() => setFailedSource(source)} />
      : <span className="technology-monogram">{monogram}</span>}
  </span>
}
