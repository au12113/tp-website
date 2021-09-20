import React from 'react'

import './css/collapse-table.css'

class CollapseTable extends React.Component {
    state = { isCollapse: false }

    render () {
      const spec = this.props.data
      const columns = spec.details[0].values.length + 1

      return (
            <table className="table table-hover mb-0" key={spec.header}>
                <thead onClick={() => this.setState({ isCollapse: !this.state.isCollapse })}>
                    <tr className="table-primary">
                        <th className="px-3" colSpan={columns} scope="row" >
                            <i className={`bi bi-caret-${this.state.isCollapse ? 'down' : 'up'}-fill float-left mr-3`}></i>
                            {spec.header}
                        </th>
                    </tr>
                </thead>
                <tbody className={`spec-table ${this.state.isCollapse ? 'hide' : ''}`}>
                {spec.details.map((value, mIndex) => {
                  if (value === Object(value)) {
                    return (<tr key={value.name}>
                            <th scope="row">{value.name}</th>
                            {
                                value.values.map((val, modelIndex) => {
                                  return (<td key={value.name + '_' + modelIndex}>{
                                        Array.isArray(val)
                                          ? <ul style={{ paddingInlineStart: '15px' }}>
                                            {val.map((o, i) => <li key={value.name + '_' + modelIndex + '_' + i}>{o}</li>)}</ul>
                                          : (typeof val === 'boolean' ? (val === true ? 'มี' : 'ไม่มี') : val)
                                    }</td>)
                                })
                            }
                        </tr>)
                  } else {
                    return (<td>{value}</td>)
                  }
                })}
                </tbody>
            </table>
      )
    }
}

export default CollapseTable
