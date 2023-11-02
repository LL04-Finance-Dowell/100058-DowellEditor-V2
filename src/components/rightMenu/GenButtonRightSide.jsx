import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../contexts/contextProvider'

const GenButtonRightSide = () => {
 const { genSelOpt, setGenSelOpt, setConfirmRemove, confirmRemove } = useStateContext();
 const [isJustEntered, setIsJustEntered] = useState(true);

 useEffect(() => {
  setIsJustEntered(false);
  setGenSelOpt('');
 }, [])

 return (
  <div className="gen_btn_right_side">
   <select className='gen_btn_sel' defaultValue={isJustEntered ? '' : genSelOpt} onChange={e => setGenSelOpt(e.target.value)}>
    <option value="" disabled>Select type</option>
    <option value="cta">CTA</option>
    <option value="pay">Pay</option>
    <option value="email">Email</option>
   </select>


   <button className="gen_rem_btn" onClick={() => setConfirmRemove(!confirmRemove)}>
    Remove Button
   </button>
  </div>
 )
}

export default GenButtonRightSide