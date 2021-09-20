import React from 'react'

import './branchCard.css'

class BranchCard extends React.Component {
  state = { showMap: false }

  arrayRender = (x) => {
    if (x.includes(',')) {
      return x.split(',').map((item, index) => { return <a href={`tel:${item}`} key={item}>{item}{index === x.length - 1 ? '' : ', '}</a> })
    } else {
      return <a href={`tel:${x}`} key={x}>{x}</a>
    }
  }

  render () {
    const { branch } = this.props
    return (<div className="col-12 col-lg-6 p-1" key={branch.name}>
      <div className="branch-card">
        <div className="branch-header m-0">
          <h4 className="branch-title">{branch.name}</h4>
        </div>
        <div className="branch-body">
          <p>{branch.address} {branch.subdistrict} {branch.district} จังหวัด{branch.province} {branch.postcode}</p>
          {branch.tel !== undefined ? <p>โทร: {this.arrayRender(branch.tel)}</p> : ''}
        </div>
        <div className="branch-map-container">
          <a href={branch.url} className="d-lg-none">
            <button type="button" className="btn btn-outline-primary">
              ไปที่ Google Map
            </button>
          </a>
          <div className="d-none d-lg-block">
            <button type="button"
              className="btn btn-outline-primary"
              onClick={() => this.setState({ showMap: !this.state.showMap })}
            >{this.state.showMap ? 'ซ่อนแผนที่' : 'แสดงแผนที่'}</button>
            <iframe title={branch.name} src={`${branch.embed}&language=th`}
              className={`branch-map  ${this.state.showMap ? 'd-flex' : 'd-none'}`}
              allowFullScreen="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>)
  }
}

export default BranchCard
