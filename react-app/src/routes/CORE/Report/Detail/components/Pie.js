import React, { Component } from 'react';

export class Pie extends React.Component {
    render() {
        return (
            <div className="pie-react">
              <div ref="pieReact" style={{width: "100%", height: "200px"}}></div>
            </div>
        )
    }
}