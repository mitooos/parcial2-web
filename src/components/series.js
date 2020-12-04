import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Graph from "./graph";

const Series = () => {
  const enUrl =
    "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";
  const esUrl =
    "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";

  const [series, setSeries] = useState([]);

  const fetchSeries = async (url) => {
    const rawData = await fetch(url);
    const jsonData = await rawData.json();
    localStorage.setItem("series", JSON.stringify(jsonData));
    setSeries(jsonData);
  };

  useEffect(() => {
    if (!navigator.onLine) {
      let localStorageItems = localStorage.getItem("series");
      if (localStorageItems) {
        setSeries(JSON.parse(localStorageItems));
      }
    } else {
      let url = navigator.language.substring(0, 2) === "es" ? esUrl : enUrl;
      fetchSeries(url);
    }
  }, []);

  const render = () => {
    if (series.length > 0) {
      return (
        <div>
          <h2>Series</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <FormattedMessage id="name" />
                </th>
                <th>
                  <FormattedMessage id="channel" />
                </th>
                <th>
                  <FormattedMessage id="description" />
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((serie, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{serie.name}</td>
                    <td>{serie.channel}</td>
                    <td>{serie.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3>
            <FormattedMessage id="seasons" />
          </h3>
          <Graph data={series} />
        </div>
      );
    } else {
      return <h2>No data</h2>;
    }
  };

  return render();
};

export default Series;
