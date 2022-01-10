import CalHeatMap from "cal-heatmap"
import React from "react";
import moment from 'moment';
import { timeHours } from "d3-time";

class CalHeatmapPlot extends React.Component {

    constructor(props) {
        super(props);
        this.cal = new CalHeatMap();

        this.startDate = new Date(2013, 6, 25);
        this.startTimestamp = new Date(2013, 6, 1).getTime()/1000;

        this.data = {};

        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }
        Date.prototype.floorHours = function() {
            this.setMinutes(0);
            this.setSeconds(0);
            return this;
        }

    }

    GAconverter(data) {
        var i, total, results = {};
        for(i = 0, total = data.length; i < total; i++) {
            results[+data[i].Hour * 3600 + this.startTimestamp] = +data[i].Visits;
        }
        return results;
    }

    componentDidMount() {

        fetch(`http://ec2-3-121-160-188.eu-central-1.compute.amazonaws.com:5000/barplotdata?schedule_filename=${this.props.schedule}&classroom_filename=${this.props.classroom}`)
        .then((res) => res.json())
        .then((json) => {
            
            let size = json["starting_time_and_length_of_classes"]["start_time"].length;
            this.data = {};

            for (let i = 0; i < size; i++)
            {
                let classStartTime = new Date(json["starting_time_and_length_of_classes"]["start_date"][`${i}`]);
                let classEndTime = new Date(classStartTime).addHours(json["starting_time_and_length_of_classes"]["length_of_class_in_hours"][`${i}`]);

                classStartTime.floorHours();
                classEndTime.floorHours();
                //console.log(classStartTime);
                //console.log(classEndTime);

                let datesToAdd = [ classStartTime ];
                datesToAdd.push(new Date(classStartTime).addHours(1));
                if (datesToAdd[1].getHours() != classEndTime.getHours())
                {
                    datesToAdd.push(classEndTime);
                }

                for (let j = 0; j < datesToAdd.length; j++)
                {
                    if (this.data[`${datesToAdd[j].getTime() / 1000}`] != undefined)
                    {
                        this.data[`${datesToAdd[j].getTime() / 1000}`] += 1;
                    }
                    else 
                    {
                        this.data[`${datesToAdd[j].getTime() / 1000}`] = 1;
                    }
                }
            }

            console.log(this.data);

            let startDate = json["starting_time_and_length_of_classes"]["start_date"][0];
            let endDate = json["starting_time_and_length_of_classes"]["start_date"][size - 1];

            this.cal.init({
                domain: "day",
                data: this.data,
                minDate: new Date(startDate),
                maxDate: new Date(endDate),
                start: new Date(startDate),
                end: new Date(endDate),
                cellSize: 20,
                cellPadding: 10,
                cellRadius: 3,
                range: 55,
                colLimit: 1,
                previousSelector: "#previous",
                nextSelector: "#next",
                legend: [20, 40, 60, 80],
                legendColors: {
                    empty: "#ededed",
                    min: "#40ffd8",
                    max: "#f20013"
                }
                //domainLabelFormat: "%d%m"
            });
        });
    }

    render() {
        return (
            <div style={{marginTop: '50px'}}>
                <button id="previous" style={{marginBottom: '10px', marginRight: '5px', border: '1px solid blue'}} className="btn" onClick={() => { this.cal.previous(7); }}>backwards</button>
                <button id="next" style={{marginBottom: '10px', border: '1px solid blue'}} className="btn" onClick={() => { this.cal.next(7); }}>forwards</button>
                <div id="cal-heatmap"></div>
            </div>
        );    
    }    
}

export default CalHeatmapPlot;
