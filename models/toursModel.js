import { sql } from "../dbConnection.js";

export const getAllToursM = async (sort) => {
  const sortMap = {
    DESC: sql`name DESC`,
    ASC: sql`name ASC`,
  };

  const orderBy = sortMap[sort] || sql`name ASC`;

  const toursList = await sql`
    select * from tours order by ${orderBy}
    `;
  return toursList;
};

export const getTourByIDM = async (id) => {
  const toursList = await sql`
    select * from tours 
    where tours.id = ${id}
    `;

  return toursList[0]; //toursList is array
};

export const postNewTourM = async (newTour) => {
  const { name, duration, maxgroupsize, difficulty, category, price } = newTour;

  const tour = { name, duration, maxgroupsize, difficulty, category, price };

  const toursList = await sql`
  insert into tours ${sql(
    tour,
    "name",
    "duration",
    "maxgroupsize",
    "difficulty",
    "category",
    "price",
  )}
  returning *  
`;
  return toursList[0];
};

export const updateTourM = async (id, data) => {
  const columns = Object.keys(data);

  const toursList = await sql`
    update tours set ${sql(data, columns)}
  where tours.id = ${id}
  returning *
`;
  return toursList[0];
};

export const deleteTourByIDM = async (id) => {
  const toursList = await sql`
    delete from tours 
    where tours.id = ${id}
    returning *
    `;
  return toursList[0];
};