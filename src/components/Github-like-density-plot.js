import React, { useEffect, useState } from 'react';
import moment from 'moment';

const DayNames = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri'
};

const cellSize = 15; // don't increase this too much

function Cell({ color }) {
  let style = {
    backgroundColor: color,
    width: cellSize,
    height: cellSize
  };

  return (
    <div className='timeline-cells-cell' style={style}></div>
  )
}

function Hour({ startDate, index }) {
  let date = moment(startDate).add(index, 'hour');
  let hourName = date.format('hh');

  return (
    <div className={`timeline-months-month ${hourName}`}>
      {hourName}
    </div>
  )
}

function WeekDay({ index }) {
    let style = {
        width: cellSize,
        height: cellSize
    };

  return (
    <div className='timeline-weekdays-weekday' style={style}>
      {DayNames[index]}
    </div>
  )
}

function Timeline({ range, data, colorFunc }) {
  let hours = Math.abs(range[0].diff(range[1], 'hours'));
  let cells = Array.from(new Array(hours * 5));
  let weekDays = Array.from(new Array(5));
  let months = Array.from(new Array(Math.floor(hours)));

  let min = Math.min(0, ...data.map(d => d.value));
  let max = Math.max(...data.map(d => d.value));

  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = 'hh';

  return (
    <div className='timeline'>

      <div className="timeline-months">
        {months.map((_, index) => <Hour key={index} index={index} startDate={startDate} />)}
      </div>

      <div className="timeline-body">

        <div className="timeline-weekdays">
          {weekDays.map((_, index) => <WeekDay key={index} index={index} startDate={startDate} />)}
        </div>

        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, 'hours');
            let dataPoint = data.find(d => moment(date).format(DayFormat) === moment(d.date).format(DayFormat));
            //console.log(dataPoint);
            let color = "";
            if (data.length > 0)
            {
              let alpha = colorMultiplier * dataPoint.value;
              color = colorFunc({ alpha });
            }
            
            return (
              <Cell
                key={index}
                index={index}
                date={date}
                color={color}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function GithubDensityPlot(props) {

  const [data, setData] = useState([]);
  //console.log(data);

  useEffect(() => {
    fetch(`http://ec2-3-121-160-188.eu-central-1.compute.amazonaws.com:5000/barplotdata?schedule_filename=${props.schedule}&classroom_filename=${props.classroom}`)
    .then((res) => res.json())
    .then((json) => {
      //console.log(json);

      let weekdays = [
        "Qua",
        "Qui",
        "Seg",
        "Sex",
        "Sáb",
        "Ter"
      ];

      let newData = [];
      for (let j = 0; j < 6; j++)
      {
        for (let i = 8; i <= 23; i++)
        {
          newData.push({ 
            date: moment('1971-jan-1 00:00').add(i, 'hours'),
            value: json["number_of_classes_per_day_and_hour"][weekdays[j]][`${i}`]
          });
        }
      }
      setData(newData);
      //console.log(data);
    });
  });
  
  return (
    <>
      <Timeline range={props.dateRange} data={data} colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`} />
    </>
  );
}

export default GithubDensityPlot;
//ReactDOM.render(<App />, document.getElementById('container'));