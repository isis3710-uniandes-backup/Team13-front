import React, { Component } from 'react'
import './statistics.css'
import * as d3 from 'd3';

class Statistics extends Component {

    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this)
        this.createLineChart = this.createLineChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createBarChart()
        this.createLineChart()
    }
    createLineChart() {

        const node2 = this.node2
        let margin = {top: 50, right: 50, bottom: 50, left: 50}
            , width = window.innerWidth/2 - margin.left - margin.right // Use the window's width
            , height = window.innerHeight/2 - margin.top - margin.bottom; // Use the window's height

        let n = 21;


        let xScale = d3.scaleLinear()
            .domain([0, n-1]) // input
            .range([0, width]); // output

        console.log(xScale)


// 6. Y scale will use the randomly generate number
        let yScale = d3.scaleLinear()
            .domain([0, 1]) // input
            .range([height, 0]); // output

        console.log(yScale)


// 7. d3's line generator
        let line = d3.line()
            .x(function(d, i) { return xScale(i); })
            .y(function(d) { return yScale(d.y); })
            .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        let dataset = d3.range(n).map( () => { return {"y": d3.randomUniform(1)() } })


// 1. Add the SVG to the page and employ #2
        let svg = d3.select(node2).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator
        svg.append("path")
            .datum(dataset) // 10. Binds data to the line
            .attr("class", "line") // Assign a class for styling
            .attr("d", line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint
        svg.selectAll(".dot")
            .data(dataset)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function(d, i) { return xScale(i) })
            .attr("cy", function(d) { return yScale(d.y) })
            .attr("r", 5)
            .on("mouseover", function(a, b, c) {
                console.log(a)
                this.attr('class', 'focus')
            })
            .on("mouseout", function() {  })


    }

    createBarChart() {
        const node = this.node
        const dataMax = d3.max(this.props.data)
        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]])
        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')

        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove()

        d3.select(node)
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d,i) => i * 25)
            .attr('y', d => this.props.size[1] - yScale(d))
    .attr('height', d => yScale(d))
            .attr('width', 25)
    }
       render() {

        if (this.props.show) {
            return (
                <div className="statistics">
                    <svg ref={node => this.node = node}
                         width={500} height={500}>
                    </svg>

                    <svg ref={node2 => this.node2 = node2}
                         width={500} height={500}>
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
