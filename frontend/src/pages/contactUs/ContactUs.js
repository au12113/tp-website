import React from 'react'
import TPBackend from '../../apis/tpBackend'
import BranchCard from './BranchCard'

class ContactUs extends React.Component {
  state = { branchList: [] }

  componentDidMount () {
    this.getAllBranch()
  }

  getAllBranch = async () => {
    const response = await TPBackend.get('/contactus')
    console.log(response.data)
    this.setState({ branchList: response.data })
  }

  renderBranch = (branch) => {
    return <BranchCard key={branch.name} branch={branch} />
  }

  renderBranchList = (province) => {
    return (
      <div className="branch-list" key={province}>
        <h3>{province}</h3>
        <div className="row equal" style={{ margin: '0px 0px' }}>
          {this.state.branchList[province].map(branch => this.renderBranch(branch))}
        </div>
      </div>
    )
  }

  render () {
    if (this.state.branchList.length === 0) {
      return (
        <div>
          Loading
        </div>
      )
    } else {
      return (
        <div className="container">
          {Object.keys(this.state.branchList).map((province, index) => this.renderBranchList(province))}
        </div>
      )
    }
  }
}

export default ContactUs
