import React, { Component } from 'react'
import './statistics.css'
import * as d3 from 'd3';
import {FormattedMessage} from "react-intl";
import {userActions} from "../../../_actions/user.actions";
import {store} from "../../../_helpers/store";

class Statistics extends Component {

    constructor(props) {
        super(props);
        this.createLineChart = this.createLineChart.bind(this)
        this.getStatistics = this.getStatistics.bind(this)
        this.getData = this.getData.bind(this)
        this.getData()
        this.state = {
            graphData: [],
        }
    }
    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }
    getData() {
        if(this.props.user && this.props.user.uid){
            fetch("/api/storyboards/user/" + this.props.user.uid, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.props.user.token}`
                }
            }).then((res) => {
                return res.json()
            }).then((res) => {
                let data = res

                for(let i = 0; i<data.length; i++){
                    this.getStatistics(data[i].id)
                }

                this.createLineChart()

                if (!res.valid) {
                    console.log("IVnVALID HOME")
                    console.log("STATE CH")
                }
            })
        }
    }
    getStatistics(id){
        if(id){
            fetch("/api/cards/story/" + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.props.user.token}`
                }
            }).then((res) => {
                return res.json()
            }).then((res) => {

                console.log(res)
                let total = this.state.graphData
                res.forEach(x => {
                    let existe= false
                    for(let i = 0; i<total.length; i++){
                        if(total[i].date === x.timestamp) {
                            existe = true
                            total[i].value = total[i].value + 1
                        }
                    }
                    if(!total.length || !existe){
                        total.push({date: x.timestamp, value: 1})
                    }
                })
                console.log(total)

                this.createLineChart()

                this.setState({
                    graphData: total
                })


                if (!res.valid) {
                    console.log("IVnVALID HOME")
                    console.log("STATE CH")
                }
            })
        }
    }
    createLineChart() {

        const node2 = this.node2
        let margin = {top: 50, right: 50, bottom: 100, left: 100}
            , width = 1600 - margin.left - margin.right // Use the window's width
            , height = 500 - margin.top - margin.bottom; // Use the window's height

        let xScale = d3.scaleBand()
            .domain(this.state.graphData.map(d => d.date) )
            .range([0, width])
            .padding(1); // output

        let yScale = d3.scaleLinear()
            .domain([0, 10]) // input
            .range([height, 0]); // output

        let line = d3.line()
            .x(function(d, i) { return xScale(d.date); })
            .y(function(d) { return yScale(d.value); })
            .curve(d3.curveMonotoneX) // apply smoothing to the line

        let dataset = this.state.graphData


        let svg = d3.select(node2).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


        svg.append("path")
            .datum(dataset) // 10. Binds data to the line
            .attr("class", "line") // Assign a class for styling
            .attr("d", line); // 11. Calls the line generator


        svg.selectAll(".dot")
            .data(dataset)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d) { return xScale(d.date) })
            .attr("cy", function(d) { return yScale(d.value) })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) {
                console.log(a)
            })
            .on("mouseout", function() {  })

    }

       render() {

        if (this.props.show) {
            return (
                <div className="statistics">
                    <div className="statisticsTitle">
                        <FormattedMessage id="StatisticsPhrase"/>
                    </div>

                    <div className="statisticsTitle">
                        <FormattedMessage id="Wow"/>
                    </div>
                    <div className="graph" id="graph">
                        <div className="graphTitle">
                            <FormattedMessage id="CardsCreated"/>
                        </div>
                    </div>

                    <svg ref={node2 => this.node2 = node2}
                         width={window.innerWidth} height={window.innerHeight}>
                    </svg>
                </div>

            );
        } else {

            return (
                <div />
            );
        }
    }
}

export default Statistics
