import React from "react";
import { VictoryPie } from "victory";

const dataHandler = (results: any[]) => {
  return results
    .filter((result) => result.votes !== null)
    .map((result) => ({
      value: result.votes,
      text: result.candidateNo.padStart(2, "0"),
    }));
};

const SummaryPie: React.FC<{ data: any[] }> = ({ data }) => {
  let colors = ["#0c3866", "#49c0b6", "#ce181e", "#007cc0", "#ffc20e"];

  return (
    <div className="p-2 rounded-md border border-slate-300">
      <h3 className="text-4xl font-bold text-center">Summary</h3>
      <div className="flex flex-col lg:flex-row items-center">
        {dataHandler(data).length > 0 && (
          <div className="flex-none w-[350px] sm:w-[480px] lg:w-[300px] xl:w-[480px]">
            <VictoryPie
              data={dataHandler(data)}
              sortOrder="descending"
              colorScale={colors}
              x="text"
              y="value"
              labels={({ datum }) => `${datum.text}`}
              labelIndicator
              style={{
                labels: {
                  fill: "black",
                  fontSize: 20,
                  fontFamily: "Poppins",
                },
              }}
              padding={40}
            />
          </div>
        )}
        <div className="grow flex flex-col items-center justify-center w-full">
          {data.map((item, index) => (
            <div
              key={item.candidateNo}
              className="p-2 shadow-sm mt-4 mx-2 rounded-md flex flex-row w-full border"
              style={{ borderColor: colors[index] }}
            >
              <div
                className="py-4 min-w-16 bg-primary mr-4 text-white text-3xl font-bold rounded-md text-center  flex-none"
                style={{ backgroundColor: colors[index] }}
              >
                {item.candidateNo}
              </div>
              <div className="grow border-r border-slate-300 xl:mr-4 xl:pr-0 pr-2 mr-2 flex flex-col justify-center">
                <h3 className="xl:text-2xl text-xl font-bold">{item.name}</h3>
                <p className="xl:text-lg text-base">{item.electionParty}</p>
              </div>
              <div className="py-2 flex-none">
                <h3 className="xl:text-2xl text-xl font-bold text-right">
                  {item.percentage} %
                </h3>
                <p className="text-base xl:text-lg text-right">
                  Votes: {item.votes ? item.votes : 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryPie;
