import React from 'react'
import {FaPlus} from "react-icons/fa"

export default function CreateDocument({onClick}) {
  return (
    <div className="document-container-full" onClick={onClick}>
      <div className="document-top">
          <div className='centered document-new'>
            <FaPlus/>
          </div>
      </div>
      <div className="document-bottom" >
        <span>Create Blank Document</span>
        
      </div>
    </div>
  )
}
