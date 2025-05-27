import fs from "node:fs";
import * as csv from "csv-parse/sync";

const importMeds = () => {
  const stream = fs.readFileSync("./data/meds.csv");
  const meds = csv.parse(stream, {});

  const result = meds.slice(1).map((m) => {
    return {
      name: m[1],
      form: m[3],
      isPresRequired: m[9] === "PR",
      brand: m[5],
      storing: m[11],
    };
  });
  return result;
};

export default { importMeds };
