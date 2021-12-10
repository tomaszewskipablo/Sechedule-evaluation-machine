import React from 'react';
import moment from 'moment';

const DayNames = {
  0: 'Mond',
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
  let date = moment(startDate).add(index * 5, 'day');
  let hourName = date.format('MMM');

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
  let days = Math.abs(range[0].diff(range[1], 'days'));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(5));
  let months = Array.from(new Array(Math.floor(days / 5)));

  let min = Math.min(0, ...data.map(d => d.value));
  let max = Math.max(...data.map(d => d.value));

  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = 'DDMMYYYY';

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
            let date = moment(startDate).add(index, 'day');
            let dataPoint = data.find(d => moment(date).format(DayFormat) === moment(d.date).format(DayFormat));
            let alpha = colorMultiplier * dataPoint.value;
            let color = colorFunc({ alpha });

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

function GithubDensityPlot() {
  // 1 year range
  let startDate = moment().add(-365, 'days');
  let dateRange = [startDate, moment()];

  let data = Array.from(new Array(365)).map((_, index) => {
    return {
      date: moment(startDate).add(index, 'day'),
      value: Math.floor(Math.random() * 100)
    };
  });

  return (
    <>
      <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`} />
      <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(220, 5,  3, ${alpha})`} />
      <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(5, 5,  200, ${alpha})`} />
    </>
  )
}

export default GithubDensityPlot;
//ReactDOM.render(<App />, document.getElementById('container'));