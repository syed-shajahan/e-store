import React from 'react'
import { MODAL_TITLES } from '../../utils/types/enums'

const EmptyCart = () => {
  return (

    <div className="my-4">
    <img src="/empty.png" alt="" className="max-w-[300px] m-auto" />
    <p className="text-center">{MODAL_TITLES.PLS_ADD_PRODUCTS}</p>
  </div>
  )
}

export default EmptyCart