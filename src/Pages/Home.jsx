import React, { useEffect, useState } from 'react'
import Document from '../Components/Document'
import Logo from '../Components/Logo'
import { useCreateDocumentsMutation, useGetAllDocumentsQuery } from '../services/api'
import { useNavigate } from 'react-router-dom'
import CreateDocument from '../Components/CreateDocument'

export default function Home() {
  const navigate = useNavigate()
  const {data} = useGetAllDocumentsQuery();

  const [createDocuments, {data: createDocumentData,isSuccess: createDocumentsSuccess}] = useCreateDocumentsMutation()


  const handleCreateDocuments = async () => {
    await createDocuments()
  }

  useEffect(()=> {
    if(createDocumentsSuccess){
      navigate(`/document/${createDocumentData?.document?._id}`)
    }
  },[createDocumentsSuccess])



  const convertDeltaToHtml = (delta) => {
    if (!delta || !delta.ops) return "";

    const ops = delta.ops;
    let html = "";

    ops.forEach((op) => {
      if (op.insert) {
        if (op.attributes && op.attributes.bold) {
          html += `<strong>${op.insert}</strong>`;
        } else {
          html += `${op.insert}`;
        }
      }
    });

    return html;
  };


  return (
    <>
    <Logo/>
    <main className="main home-main">
      <div className="home-top">
        <div className='home-top-left'>
          <CreateDocument onClick={handleCreateDocuments}/>
        </div>
        {/* <span className='text-center text-bold home-top-right'>Other features not available</span> */}
      </div>
      <div className="home-bottom">
        <h3>My Documents</h3>
        <div className="document-scroll">
          {
            data?.documents?.map((document, index)=> {
              console.log(document)
              const html = convertDeltaToHtml(document.data);
              return (
                <Document key={index} body={html} title={document?.title || "title missing"} onClick={()=> navigate(`/document/${document?._id}`)}/>
              )
            })
          }

        </div>
      </div>
    </main>
    </>
  )
}
