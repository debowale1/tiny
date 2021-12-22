import React from 'react'

const Sidebar = () => {
  return (
      <div className="position-sticky" style={{top: '2rem'}}>
        <div className="p-4 mb-3 bg-light rounded">
          <h4 className="fst-italic">About</h4>
          <p className="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
        </div>

        <div className="p-4">
          <h4 className="fst-italic">Archives</h4>
          <ol className="list-unstyled mb-0">
            <li><a href="/">March 2021</a></li>
            <li><a href="/">February 2021</a></li>
            <li><a href="/">January 2021</a></li>
            <li><a href="/">December 2020</a></li>
            <li><a href="/">November 2020</a></li>
            <li><a href="/">October 2020</a></li>
            <li><a href="/">September 2020</a></li>
            <li><a href="/">August 2020</a></li>
            <li><a href="/">July 2020</a></li>
            <li><a href="/">June 2020</a></li>
            <li><a href="/">May 2020</a></li>
            <li><a href="/">April 2020</a></li>
          </ol>
        </div>

        <div className="p-4">
          <h4 className="fst-italic">Elsewhere</h4>
          <ol className="list-unstyled">
            <li><a href="/">GitHub</a></li>
            <li><a href="/">Twitter</a></li>
            <li><a href="/">Facebook</a></li>
          </ol>
        </div>
      </div>
  )
}

export default Sidebar
