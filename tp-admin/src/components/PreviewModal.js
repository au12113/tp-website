import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'

const PreviewModal = () => {
  const [imgFile, setImgFile] = useState('')

  return (
    <Modal>
      <img
        src={``}
        alt=''
        loading='lazy'
      />
    </Modal>
  )
}

export default PreviewModal