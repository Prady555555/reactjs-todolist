import React from "react"

export const Footer = ({len}) => {
  return (
    <div> {(len >1)? <p>you have {len} lists</p> : <p>you have {len} list</p> } </div>
  )
}
