//import './css/jquery.dataTables.css'
// import 'datatables.net-dt/css/jquery.datatables.css'
import React, {Component} from 'react'
import $ from 'jquery'
//import App from "./App";

$.DataTable = require('datatables.net')
require( 'datatables.net-bs5' )( window, $ );

export class Table extends Component {
    componentDidMount() {
        console.log(this.el);
        this.$el = $(this.el)
        this.$el.DataTable({
            data: this.props.data,
            columns: [
                { title: "ID" },
                { title: "Name" }
            ]
        })
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <table className="display" width="100%" ref = {el => this.el = el }></table>

            </div>
        );
    }
}