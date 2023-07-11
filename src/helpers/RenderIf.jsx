import React from "react"

function RenderIf({ dependency, children }) {
  return (
    <div className="renderIf">
      {dependency.length > 0 ? (
        children
      ) : (
        <div className="loading">Data is loading...</div>
      )}
    </div>
  )
}

export default RenderIf
